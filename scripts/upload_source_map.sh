#! /bin/bash
sentry-cli releases new $RELEASE
sentry-cli releases files $RELEASE upload-sourcemaps $SOURCE_DIR
sentry-cli releases finalize $RELEASE
