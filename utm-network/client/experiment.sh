#!/bin/bash

if [ $# -ne 1 ]; then
	echo "nodeの数を指定してください"
	exit 1
fi

NUM_OF_NODE=$1

export PATH="$PATH:/Users/gucc1/.ghq/github.com/gucc1/fabric-samples/bin"

set -eu
cd ..
#docker-compose -f docker-compose-e2e.yaml up -d
for numOfUsers in 1 5 10 50 100 500 1000; do
#for numOfUsers in 1; do
    # start container
		echo "==========START CONTAINER========="
    #./byfn.sh up -i 1.3.0 
		./byfn.sh up -i 1.3.0 

    ## set up client
    echo "==========SET UP CLIENT========="
    cd ./client
    rm -rf hfc-key-store/
    node enrollAdmin.js && node registerUser.js
    echo ""
		node experiment.js $numOfUsers $NUM_OF_NODE
    echo "==========CA DOWN========="
    cd ../
    ./byfn.sh down
done
