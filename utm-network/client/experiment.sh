#!/bin/bash

export PATH="$PATH:/Users/gucc1/.ghq/github.com/gucc1/fabric-samples/bin"

set -eu
cd ..
for numOfNode in 1 2 4 8 16 30; do
	#docker-compose -f docker-compose-e2e.yaml up -d
	for numOfUser in 1 5 10 50 100 500 1000; do
	#for numOfUsers in 1; do
			# start container
			echo "==========START CONTAINER========="
			#./byfn.sh up -i 1.3.0 
			./byfn.sh up -i 1.3.0 -o $numOfNode

			## set up client
			echo "==========SET UP CLIENT========="
			cd ./client
			rm -rf hfc-key-store/
			node enrollAdmin.js && node registerUser.js
			echo ""
			node experiment.js $numOfUser $numOfNode production
			echo "==========CA DOWN========="
			cd ../
			./byfn.sh down
	done
done

