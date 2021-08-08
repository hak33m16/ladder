#!/bin/bash

set -e

. ~/.profile

set -x

npm install
npm run clean
npm run build

if [[ "$BRANCH_NAME" == "master" ]]; then
    echo "Branch name is 'master', releasing..."
    rm -rf /var/www/laddergame.io/html/*
    cp -r src/* /var/www/laddergame.io/html/
elif [[ -n "$PR_NUMBER" ]]; then
    echo "PR number was set, performing dev release for PR: $PR_NUMBER..."
    mkdir -p /var/www/dev.laddergame.io/html/pull-requests/"$PR_NUMBER"
    rm -rf /var/www/dev.laddergame.io/html/pull-requests/"$PR_NUMBER"/*
    cp -r src/* /var/www/dev.laddergame.io/html/pull-requests/"$PR_NUMBER"
fi
