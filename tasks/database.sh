#!/bin/bash

dotenvFile="$PWD/.env"

METHOD="$1" # create or drop (default: null)

# @example
#   yarn db:create [-d|--debug]
for i in "$@"; do
  case $i in
    -d|--debug)
      DEBUG="true"
    ;;
    --staging)
      dotenvFile="$PWD/.env.staging"
    ;;
    *)
    # unknown option
    ;;
  esac
done

[ -f "$dotenvFile" ] && source "$dotenvFile"

if [[ "$DEBUG" == "true" ]]; then
  echo "[DEBUG]"
  echo "> METHOD: $METHOD"
  echo "> dialect: $DB_DIALECT"
  echo "> host: $DB_HOST"
  echo "> post: $DB_PORT"
  echo "> username: $DB_USERNAME"
  echo "> password: $DB_PASSWORD"
  echo " "
fi

#
# mysql
#
if [[ "$DB_DIALECT" == "mysql" || "$DB_DIALECT" == "mariadb" ]]; then
  function execute_mysql() {
    mysql -u "$DB_USERNAME" -p"$DB_PASSWORD" -h"$DB_HOST" --skip-column-names -e "$1"
  }
  find_result=$(execute_mysql "SHOW DATABASES LIKE '$DB_DATABASE'" 2>&1 | grep "$DB_DATABASE")

  # Create task

  if [[ "$METHOD" == "create" ]]; then
    echo "Creating database '$DB_DATABASE'"
    # check database exists
    if [ "$find_result" == "$DB_DATABASE" ]; then
      echo "Already exists."
    else
      execute_mysql "CREATE DATABASE IF NOT EXISTS \`$DB_DATABASE\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci" 2>/dev/null
      echo "Successfully created."
    fi
  fi

  # Drop task

  if [[ "$METHOD" == "drop" ]]; then
    echo "Dropping database '$DB_DATABASE'"
    # check database exists
    if [ "$find_result" == "$DB_DATABASE" ]; then
      execute_mysql "DROP DATABASE \`$DB_DATABASE\`" >/dev/null
      echo "Successfully dropped."
    else
      echo "Not exists."
    fi
  fi

  if [[ "$METHOD" == "console" ]]; then
    echo "Open DB console ($DB_HOST)"
    mysql -u "$DB_USERNAME" -p"$DB_PASSWORD" -h"$DB_HOST" $DB_DATABASE 2>/dev/null
  fi
fi

#
# postgres
#
if [[ "$DB_DIALECT" == "postgres" ]]; then
  function execute_psql() {
    psql -U "$DB_USERNAME" -h"$DB_HOST" -p"$DB_PORT" -tAc "$1"
  }
  find_result=$(execute_psql "SELECT datname FROM pg_database WHERE datname='$DB_DATABASE'")

  # Create task

  if [[ "$METHOD" == "create" ]]; then
    echo "Creating database '$DB_DATABASE'"
    # check database exists
    if [ "$find_result" == "$DB_DATABASE" ]; then
      echo "Already exists."
    else
      execute_psql "CREATE DATABASE $DB_DATABASE WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8' TEMPLATE=template0" >/dev/null
      #execute_psql "CREATE DATABASE $DB_DATABASE WITH ENCODING 'EUC_KR' LC_COLLATE='ko_KR.euckr' LC_CTYPE='ko_KR.euckr' TEMPLATE=template0" >/dev/null
      echo "Successfully created."
    fi
  fi

  # Drop task

  if [[ "$METHOD" == "drop" ]]; then
    echo "Dropping database '$DB_DATABASE'"
    # check database exists
    if [ "$find_result" == "$DB_DATABASE" ]; then
      execute_psql "DROP DATABASE $DB_DATABASE" >/dev/null
      echo "Successfully dropped."
    else
      echo "Not exists."
    fi
  fi
fi

if [[ "$DEBUG" == "true" ]]; then echo " "; fi;
