# Storefront Backend Project

## Prepare env
- add a `.env` file in the root directory and set the missing `###` environment parameters
- create a db in your machine and call it `storedb`
```

db_host = 127.0.0.1
db_user = "postgres"
db_password = "password123"
db_name =  "storedb"
env = "dev"
db_name_test = "storedb_test"
port = 3000
SALT_ROUNDS = 10
BCRYPT_PASSWORD = "hello_there"
token = "EMK]L@a<wy*b^@Z"
db_port = 5432
```

## Set up

- `docker-compose up` to start the docker container
- `yarn install` to install all dependencies
- `yarn test` to build and migrate and test the app the app
- `yarn lint` for linting run 
- `yarn prettier-watch` for onSave prettier 

## Start the app
- `yarn start` to start the app and get access via http://127.0.0.1:3000
```
