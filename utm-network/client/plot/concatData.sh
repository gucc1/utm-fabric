#!/bin/bash
for node in 1 2 4 8 16 30; do
    for user in 1 5 10 50 100 500 1000; do
        cat "../results/production/node$node/user$user"-* | sed -e "/^id.*/D" > "./plot_data/node$node/user$user"
    done
done
