#!/bin/bash
set -e

# Create custom schema
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE SCHEMA IF NOT EXISTS cqu_schema;
    GRANT ALL ON SCHEMA cqu_schema TO $POSTGRES_USER;
EOSQL

echo "Schema 'cqu_schema' created successfully"
