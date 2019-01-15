#!/bin/bash
NUM_OF_ORG=8
export PATH="$PATH:/Users/gucc1/.ghq/github.com/gucc1/fabric-samples/bin"
RESULT_DIR=$(date +%Y%m%d_%H-%M-%S)

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
    echo ""
    mkdir "results/${RESULT_DIR}"

    echo "==========INVOKE ORG:${NUM_OF_ORG}, USER:${numOfUsers}========="
    node experiment.js $numOfUsers $NUM_OF_ORG $RESULT_DIR

    echo "==========CA DOWN========="
    cd ..
    ./byfn.sh down
done
