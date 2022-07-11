# Getting Started

Install dependencies:

```
npm i
```

Run first server:

```
npm run runDev
```

Open new terminal window, run auth server:

```
npm run devStartAuth
```

Make the following http requests (you can use Postman or use the request.rest file if you have the Rest Client extension in VS Code):

### Login

```
POST http://localhost:4000/login
Content-Type: application/json

{
  "username": "John"
}
```

### Logout

```
DELETE http://localhost:4000/logout
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3lsZSIsImlhdCI6MTY1NzUyMjE4M30.juDbHMAoHphiM_lITtWO8QqUuthcPVHLt6SzCootEQo"
}
```

### Generate Access Tokens from Refresh Token

(Provide refresh Token)

```
POST http://localhost:4000/token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3lsZSIsImlhdCI6MTY1NzUyMjE5Nn0.3u_uHLwgdSi-Lciw7MwGnPvvw85FdRjqjmQeMP3Bw8o"
}
```

### Get user posts from Access Token

(Provide Access Token)

```
GET http://localhost:3000/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3lsZSIsImlhdCI6MTY1NzUyMjIyMCwiZXhwIjoxNjU3NTIyMjM1fQ.5PvbkYgSmW6bhzvVfapyhs9orlEgFuXIMuqImNJHQCM
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
