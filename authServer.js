// npm run devStartAuth
// PORT 4000

require('dotenv').config()
const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

// OUR STORED REFRESH TOKEN
// TIP: in production you would store this in a database
let refreshTokens = []

// VERIFY REFRESH TOKEN
app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken === null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        // CREATE ACCESS TOKEN
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

// LOGOUT (delete refresh tokens, they will be generated again on next login)
app.delete('/logout', (req, res) => {
    // filter out the refresh token that matches the one in the request
    // the user will lose access until next login
    refreshTokens = refreshTokens.filter(
        (refreshToken) => refreshToken !== req.body.refreshToken
    )
    // 204 - successfully processed the request, and is not returning any content.
    res.sendStatus(204)
})

// LOGIN
app.post('/login', (req, res) => {
    // Authenticate User
    // Create json web token
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // TIP: dont put an expiration date on the refresh token, instead handle that manually

    // WHEN WE LOGIN, WE STORE THE REFRESH TOKEN IN OUR REFRESH TOKEN ARRAY
    // TIP: in production you would store this in a database
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    // TIP: make this token expire in 15m (minutes) in a real application
}

const PORT = 4000
const serverName = path.basename(__filename)
app.listen(PORT, () => {
    console.log(`${serverName} is running on port ${PORT}`)
})
