#!/usr/bin/env bash

set -eux

DIR="$(dirname "$(realpath "$0")")"
DIST="$DIR/dist"

rimraf "$DIST"
yarn build:esm
yarn version --patch
cp $DIR/src/*.d.ts "$DIST"
cp "$DIR/dotenv.cjs" "$DIST"
cp "$DIR/package.json" "$DIST"
yarn publish --non-interactive "$DIST"
