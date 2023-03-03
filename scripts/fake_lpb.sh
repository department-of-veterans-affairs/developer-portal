#!/bin/bash

cd ./public/data/
# sudo kill -9 $(lsof -t -i:8080)
python -m http.server 8080 &
cd ../../
