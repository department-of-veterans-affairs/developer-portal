# based on https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker

FROM node:12

# Install chromium dependencies
RUN apt-get update && apt-get install -y chromium fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont libxss1 libxtst6 wget --no-install-recommends \
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

# Change default global node module directory
RUN mkdir ~/.npm-global && npm config set prefix '~/.npm-global' && export PATH=~/.npm-global/bin:$PATH
RUN npm install -g npm
RUN npm install -g @sentry/cli

COPY --chown=jenkins:jenkins package.json package-lock.json ./

RUN npm install

COPY . .
