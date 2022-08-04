#!/bin/bash

METHOD="$1"

function execute_command() {
  echo "$ $1"
  $1
}

CLI_PATH="./node_modules/typeorm/cli"
DATA_SOURCE="./src/db/data-source.ts"

if [[ "$METHOD" == "create" ]]; then
  execute_command "ts-node $CLI_PATH migration:create ./src/db/migrations/$2"
fi

if [[ "$METHOD" == "generate" ]]; then
  execute_command "ts-node $CLI_PATH migration:generate ./src/db/migrations/$2 -d $DATA_SOURCE"
  yarn lint
fi

if [[ "$METHOD" == "run" ]]; then
  execute_command "ts-node $CLI_PATH migration:run -d $DATA_SOURCE"
fi

if [[ "$METHOD" == "revert" ]]; then
  execute_command "ts-node $CLI_PATH migration:revert -d $DATA_SOURCE"
fi
