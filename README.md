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

* seed database with fake users (default 200)
  ```bash
  npm run generate-users
  ```

  * flags:
    * `-- --fresh` fresh database and then generate users:
      ```
      npm run generate-users -- --fresh
      ```
    * `-- --count=number` implicitly set (number) of generated users (default 200)
      ```
      npm run generate-users -- --count=777
      ```
    * or both:
      ```
      npm run generate users -- --fresh --count=3
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
