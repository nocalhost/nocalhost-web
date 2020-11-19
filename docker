#!/usr/bin/env bash

image_tag_name=$(git rev-parse HEAD)
[[ -z $(git status -s) ]] || image_tag_name="${image_tag_name}-dirty"

docker build -t nocalhost-web .
docker tag nocalhost-web:latest nocalhost-web:${image_tag_name}