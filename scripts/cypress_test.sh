#!/bin/bash

./scripts/fake_lpb.sh
./node_modules/.bin/cypress $@
