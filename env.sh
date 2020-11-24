#!/bin/sh
echo "window._env_ = {" > ./env.js
awk '
 BEGIN {
 OFS = ":"
 for (x in ENVIRON)
   print x ": \"" (ENVIRON[x]) "\","
}' | grep -E '^API_HOST|^GIT_COMMIT_SHA|^NOCALHOST_ENV' >> ./env.js
echo "}" >> ./env.js