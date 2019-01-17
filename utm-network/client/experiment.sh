#!/bin/bash

if [ $# -ne 1 ]; then
	echo "nodeの数を指定してください"
	exit 1
fi

NUM_OF_NODE=$1

export PATH="$PATH:/Users/gucc1/.ghq/github.com/gucc1/fabric-samples/bin"
RESULT_DIR=$(date +%Y%m%d_%H-%M-%S)
mkdir "results/${RESULT_DIR}"

set -eu
#cd ..
startPoint=0
for numOfUsers in 1 5 10 50 100 500 1000 10000 100000; do
#for numOfUsers in 5; do
    # start container
    #./byfn.sh up
    #docker-compose -f docker-compose-e2e.yaml up -d

    ## set up client
    #echo "==========SET UP CLIENT========="
    #cd client/
    #rm -rf hfc-key-store/
    #node enrollAdmin.js && node registerUser.js
    #echo ""

    echo "==========INVOKE NODE:${NUM_OF_NODE}, USER:${numOfUsers}, START:${startPoint}========="
    node --max-old-space-size=5000 experiment.js $startPoint $numOfUsers $NUM_OF_NODE $RESULT_DIR
		startPoint=$(( $startPoint+$numOfUsers ))

    echo "==========CA DOWN========="
    #cd ..
    #./byfn.sh down
done
