#! /bin/bash
sentry-cli releases new $SENTRY_RELEASE
sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps $SOURCE_DIR
sentry-cli releases finalize $SENTRY_RELEASE
