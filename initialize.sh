InstallDependencies () {
    npm i 
}

CreateEnvLocalFile () {
    cat << EOF > .env.local
# Port variable
PORT=5000
CACHE_PORT=6379

#Database
DATABASE_CONNECTION_PROVIDER="DATABASE_CONNECTION"
DATABASE_CONNECTION_TYPE="postgres"
DATABASE_CONNECTION_HOST="postgres"
DATABASE_CONNECTION_PORT=5432
DATABASE_CONNECTION_USERNAME="postgres"
DATABASE_CONNECTION_PASSWORD="prP6xrJem91N"
DATABASE_CONNECTION_MAINTENANCE="postgres"

#Cache
CACHE_HOST="localhost"
#Jwt variables
SECRET_KEY="SECRET22813371488322"
TOKEN_EXPIRATION_TIME="1d"

#roles
ROLE_KEY="bundle-roles"
EOF
}

InstallDependencies
CreateEnvLocalFile