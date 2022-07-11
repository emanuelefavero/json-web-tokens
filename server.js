// npm run devStart
// PORT 3000

require('dotenv').config()
const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

// POSTS
const posts = [
    {
        username: 'John',
        title: 'Post 1',
    },
    {
        username: 'Jack',
        title: 'Post 2',
    },
    {
        username: 'Jack',
        title: 'Post 3',
    },
]

// GET FILTERED POSTS ACCORDING USERNAME TOKEN (provided at login in authServer)
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter((post) => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    // Get TOKEN from header:
    // Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1]
    // 401 Unauthorized - if token is not provided
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // 403 Forbidden - the token is invalid:
        if (err) return res.sendStatus(403)

        // the user is valid, so we can add it to the request:
        req.user = user
        next()
    })
}

const PORT = process.env.PORT || 3000
const serverName = path.basename(__filename)
app.listen(PORT, () => {
    console.log(`${serverName} is running on port ${PORT}`)
})
