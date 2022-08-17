# Gitter

A Twitter clone made with Golang. 

I started working on this project to improve my Golang skills, since I'm pretty new to Go.

PS: I **REALLY** dont wanna do the frontend, so PLS someone help me with the frontend :/

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

## License

MIT cuz I really don't care about what you do with my trash Go code.
