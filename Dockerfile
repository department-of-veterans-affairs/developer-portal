# based on https://github.com/nodejs/docker-node/blob/master/4.7/slim/Dockerfile

FROM node:8

# Match the jenkins uid/gid on the host (504)
RUN groupadd --gid 504 jenkins \
&& useradd --uid 504 --gid jenkins --shell /bin/bash --create-home jenkins

ENV NODE_ENV production

RUN npm install -g s3-cli

RUN mkdir -p /application

WORKDIR /application

USER jenkins
