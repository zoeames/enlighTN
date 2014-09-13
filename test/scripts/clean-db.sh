#!/bin/bash

if [ -z "$1" ] ; then
    echo "Enter a database name"
      exit 1
    fi

    mongoimport --jsonArray --drop --db $1 --collection historicMarkers --file ../../db/historic.json
    mongoimport --jsonArray --drop --db $1 --collection metroGalleries --file ../../db/galleries.json
    mongoimport --jsonArray --drop --db $1 --collection metroInstallments --file ../../db/installments.json
    mongoimport --jsonArray --drop --db $1 --collection civicArt --file ../../db/civic.json
    mongoimport --jsonArray --drop --db $1 --collection events --file ../../db/events.json
