#!/bin/sh

branch="$1"

set -o errexit

head=$(git rev-parse --abbrev-ref HEAD)

printf "\n=====>\tChecking out release branch: %s...\n" "${branch}"

git checkout -B "${branch}"

printf "\n=====>\tMerging %s...\n" "${head}"

# In case the release branch existed locally, merge its remote so that when we merge current HEAD
# we merge it into the current version of the release branch.
git merge origin/"${branch}"
git merge --message "chore: release" "${head}"

printf "\n=====>\tPushing...\n"

git push --set-upstream origin "${branch}"

printf "\n=====>\tSwitching back to previous branch: %s...\n" "${head}"

git checkout "${head}"

printf "\n=====>\tRelease in progress: https://github.com/strvcom/heimdall/actions\n"
