require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if(!headerToken) {
            console.log('Error in auth middleware')
            res.sendStatus(400)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const err = new Error('Unauthorized')
            err.statusCode = 401
            throw err
        }
        next()
    }
}