#!/bin/sh

set -o errexit

head=$(git rev-parse --abbrev-ref HEAD)

printf "\n=====>\tFetching new commits...\n"

# Ensure we are merging the release into current branch tips to avoid pushes being rejected
git fetch origin

printf "\n=====>\tMerging to master: %s...\n" "${head}"

git checkout master
git merge "${head}"

# Print the repo status after merging, for troubleshooting purposes
git status
git log --oneline HEAD~10..HEAD

printf "\n=====>\tPushing...\n"

git push origin master
