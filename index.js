const shelljs = require("shelljs");

// FIXME Take these from args
const CONTAINER_NAME = "test-health-check";
const RETRIES = 3;

const trim = str => {
  const start = str.indexOf('"') + 1;
  const end = str.indexOf('"', start + 1);
  return str.substring(start, end);
}

let interval;

const exit = (message, code) => {
  console.log(message);
  clearInterval(interval);
  shelljs.exit(code);
}

console.log(`Checking health of container '${CONTAINER_NAME}'`);
let count = 0;
const check = () => {
  const cmd = `docker inspect --format="{{json .State.Health.Status}}" ${CONTAINER_NAME}`;
  let result = shelljs.exec(cmd);
  result = trim(result);

  if(result === "unhealthy") {
    exit("Failure: Health check returned 'unhealthy'", 1);
  } else if(result === "healthy") {
    exit("Success: Health check returned 'healthy'", 0);
  }

  count++;
  if(count === RETRIES) {
    exit(`Failure: Did not receive a successful health check result after ${RETRIES} tries.`, 1);
  }    
}

check();
interval = setInterval(check, 3000);
