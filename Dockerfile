# based on https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker

FROM node:10

# Install chromium dependencies
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

WORKDIR /application

# Match the jenkins uid/gid on the host (504)
RUN groupadd --gid 504 jenkins \
    && useradd --uid 504 --gid jenkins --shell /bin/bash --create-home jenkins \
    && chown jenkins:jenkins /application \
    && usermod -aG staff jenkins

USER jenkins

RUN npm --loglevel verbose install -g npm s3-cli

COPY package.json package-lock.json ./

RUN npm --loglevel verbose install

COPY . .
