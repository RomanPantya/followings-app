# Documentation

* environment variables
> create your own `.env` file
> to connect correctly to database
> or be sure that you are ready to
> use default (`.default.env`)
```ts
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=followings-app
```

* install all dependencies
```bash
npm install
```

* seed database with fake users
```bash
npm run generate-200-users
```

* run server
```bash
npm run start:dev
```

* to see swagger documentation navigate to `/doc` route

* you can use collection from this file in your postman:
```bash
followings-app.postman_collection.json
```
