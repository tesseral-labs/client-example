#!/bin/bash

echo "Cloning example application..."
git clone git@github.com:tesseral-labs/client-example.git

cd client-example

echo "Creating .env file..."
cat <<EOF > .env
TESSERAL_PUBLISHABLE_KEY=$0
EOF

echo "Running the example application..."
make dev
