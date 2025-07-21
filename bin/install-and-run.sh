#!/bin/bash

echo "Cloning example application..."
git clone git@github.com:tesseral-labs/tesseral-example.git

cd tesseral-example

echo "Creating .env file..."
cat <<EOF > .env
TESSERAL_PUBLISHABLE_KEY=$1
EOF

echo "Running the example application..."
make dev
