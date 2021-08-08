#!/bin/bash

. ~/.profile

npm run clean
npm run build

if [[ -z "$PR_NUMBER" ]]; then
    echo "PR number wasn't set, releasing..."
    rm -rf /var/www/laddergame.io/html/*
    cp -r src/* /var/www/laddergame.io/html/
else
    echo "PR number was set, performing dev release for PR: $PR_NUMBER..."
    mkdir -p /var/www/dev.laddergame.io/html/pull-requests/"$PR_NUMBER"
    rm -rf /var/www/dev.laddergame.io/html/pull-requests/"$PR_NUMBER"/*
    cp -r src/* /var/www/dev.laddergame.io/html/pull-requests/"$PR_NUMBER"
fi
