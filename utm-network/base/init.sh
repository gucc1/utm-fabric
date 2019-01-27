#!/bin/bash

set -e

NUM_OF_ORG=100
BASE_FILE=$(<./docker-compose-base-template.yaml)
PEER_FILE="$(<./docker-compose-base-peer-template.yaml)"

cp docker-compose-base-template.yaml docker-compose-base-test.yaml
for((i=1;i<=$NUM_OF_ORG;i++));do
  TEMP="$(sed -e "s/NUM_OF_ORG/${i}/g" -e "s/PORT/$((i+1000))/g" docker-compose-base-peer-template.yaml)"
  echo "$TEMP" >> docker-compose-base-test.yaml
  TEMP=$(sed -e "s/NUM_OF_ORG/${i}/g" ../configtx-base.yaml)
	echo "$TEMP" >> configtx-test.yaml
  TEMP=$(sed -e "s/NUM_OF_ORG/${i}/g" crypto-base.yaml)
  echo "$TEMP" >> crypto.yaml
  TEMP=$(sed -e "s/NUM_OF_ORG/${i}/g" cli-base.yaml)
  echo "$TEMP" >> cli-test.yaml
	echo "peer0.org${i}.example.com" >> volume.txt
	echo "-	*Org${i}" >> org.txt
done

