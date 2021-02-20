#!/bin/bash

if [ -z "$1" ]; then
  echo "Environment variable CNAME not set"
else
  echo $1 > ./dist/CNAME
  echo "Complete created CNAME with value $1"
fi
