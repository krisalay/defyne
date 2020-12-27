#!/bin/bash

FILE_TYPE=$1

for file in $(find src/ -name "*$FILE_TYPE"); do
  new_filepath=${file#src/}
  mkdir -p "lib/$(dirname $new_filepath)" && cp $file lib/$new_filepath
done
