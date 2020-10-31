#!/bin/sh

EXT=$1

find src test \
  -name "*.${EXT}" \
  -not -path '*/.*' \
  -not -name '.*.js' \
  -not -name '*.config.js' \
  -not -name "*.d.ts"
