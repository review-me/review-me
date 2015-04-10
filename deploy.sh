#!/bin/bash

git clone --branch gh-pages https://github.com/review-me/build.git tmp

rm tmp/index.html
rm tmp/_build.css
rm tmp/_build.js

enb make clean
YENV=prod enb make --no-cache

cp build/build.html tmp/index.html
cp build/_build.css tmp/_build.css
cp build/_build.js tmp/_build.js

cd tmp

git add .
git commit --amend -m "Update"
git push origin +gh-pages

cd ..

rm -rf tmp
