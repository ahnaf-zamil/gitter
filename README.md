# Twitter

A Twitter clone made with Golang. 


## How to run frontend
### Install dependencies
```
cd web
npm install # or `yarn install` if you use yarn
```

### Start server
```
npm start # or `yarn start`
```

## How to run API

### Build
```
cd api
go build -o ./bin/api
```

### Start API
Build/Compile it first, then run this
```
./bin/api
```

### Migrate database
I made a migrate command which allows you to auto-migrate the schema changes
```
./bin/api migrate
```
