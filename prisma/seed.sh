#!/bin/bash

# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

# Variables
DATABASE_USER=
DATABASE_USER_PASSWORD=
DATABASE_NAME=chess-battle
TABLE_NAME="Card"
CSV_FILE="prisma/seedData.csv"

# Run the \copy command in psql
PGPASSWORD=$DATABASE_USER_PASSWORD psql -U $DATABASE_USER -d $DATABASE_NAME -c "\copy \"$TABLE_NAME\"(id, name, level, attack, health, \"attackPattern\", \"movementPattern\", text, \"adjacencyBonus\", weakness, \"unsplashImgId\") FROM '$CSV_FILE' DELIMITER ',' CSV HEADER;"
