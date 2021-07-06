# docker-healthcheck

Checks the health status of a docker container until success/failure/max retries detected.

Designed to check that an image built successfully during a pipeline.

## How to use

- Build container as part of your pipeline
- Start your container using `docker run ...`
- Run `yarn docker-healthcheck run` -- this will check the container health until success/failure/max retries, and then exit with 0 or 1.
