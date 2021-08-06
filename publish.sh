#!/bin/bash

npm run clean
npm run build

rm -rf /var/www/laddergame.io/html/*
cp -r src/* /var/www/laddergame.io/html/
