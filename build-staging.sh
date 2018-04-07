#!/bin/bash
VERSION=`node -p "require('./package.json').version"`
NAME=`git log --format="%cd - $VERSION.%h - %s" -n 1 --date=iso`

# build lates battlefield
npm i && npm run build-bfield

# deploy in express public folder
mkdir -p "/var/www/battleproto/$NAME";
cp dist/*.js "/var/www/battleproto/$NAME/index.js";
cp dist/*.css "/var/www/battleproto/$NAME/style.css";
