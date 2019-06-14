#!/bin/bash
echo "Sending secrets to server"
rsync -v -p -e ssh /Users/storj/dev/edhplanner/.prod.env root@$HIVEMIND_SERVER:/root/edhplanner/ 
echo "Done" 