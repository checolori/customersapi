const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt')
const authMiddleware = require('./middleware')

const router = new Router()

router.post('/logins', (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    }
    // 1. find user based on email address
    User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(entity => {
            if (!entity) {
                return res.status(400).send({
                    message: 'User with that email does not exist'
                })
            }
            if (bcrypt.compareSync(req.body.password, entity.password)) {
                return res.send({
                    jwt: toJWT({ userId: entity.id })
                })
            }
            return res.status(400).send({
                message: 'Password was incorrect'
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                message: 'Something went wrong'
            })
        })
})

router.get('/secret-endpoint', authMiddleware, (req, res) => {
    res.send({
        message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
})

module.exports = router

