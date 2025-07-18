#!/bin/bash

echo "Cloning example application..."
git clone git@github.com:tesseral-labs/client-example.git

cd client-example

echo "Running the example application..."
make dev
