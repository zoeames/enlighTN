#!/bin/bash

if [ -z "$1" ] ; then
    echo "Enter a database name"
      exit 1
    fi

    mongoimport --jsonArray --drop --db $1 --collection events --file ../../db/events.json
    mongoimport --jsonArray --drop --db $1 --collection locations --file ../../db/locations.json
    mongoimport --jsonArray --drop --db $1 --collection reflections --file ../../db/reflections.json
    mongoimport --jsonArray --drop --db $1 --collection users --file ../../db/users.json
