#!/usr/bin/env bash

image_tag_name=$(git rev-parse HEAD)

[[ -z $(git status -s) ]] || image_tag_name="${image_tag_name}-dirty"


echo $image_tag_name