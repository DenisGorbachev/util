#!/usr/bin/env bash

set -eux

DIR="$(dirname "$(realpath "$0")")"
CWD="$DIR/.."
TARGET="$CWD/dist/esm/src"

rimraf "$CWD/dist"
yarn build:esm
yarn version --patch
cp "$CWD/src/*.d.ts" "$TARGET"
cp "$CWD/dotenv.cjs" "$TARGET"
cp "$CWD/package.json" "$TARGET"
yarn publish "$TARGET"
