#!/bin/bash
NUM_OF_ORG=2
export PATH="$PATH:/Users/gucc1/.ghq/github.com/gucc1/fabric-samples/bin"

set -eu
cd ..
for numOfUsers in 1 5 10 50 100; do
    # start container
    ./byfn.sh up
    docker-compose -f docker-compose-e2e.yaml up -d

    # set up client
    echo "==========SET UP CLIENT========="
    cd client/
    rm -rf hfc-key-store/
    node enrollAdmin.js
    node registerUser.js

    echo "==========INVOKE ORG:${NUM_OF_ORG}, USER:${numOfUsers}========="
    node experiment.js $numOfUsers $NUM_OF_ORG 

    echo "==========CA DOWN========="
    cd ..
    ./byfn.sh down
done
