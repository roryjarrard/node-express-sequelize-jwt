const db = require('../database')
const { genSaltSync, hashSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    getUsers: async (req, res) => {

        db.User.findAll()
            .then(users => {
                res.json({
                    users
                })
            })
            .catch(err => {
                res.json({
                    message: "Could not get users",
                    error: err
                })
            })
    },

    getUser: async (req, res) => {
        const id = req.params.id
        db.User.findByPk(id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({message: 'User not found'})
                }
                return res.json({user})
            })
            .catch((error) => {
                return res.status(500).json({error})
            })
    },

    createUser: (req, res) => {
        const { first_name, last_name, email, password } = req.body
        const salt = genSaltSync(10)
        db.User.create({
            first_name,
            last_name,
            email,
            password: hashSync(password, salt)
        })
            .then((response) => {
                // Now create a web token
                const user = response.dataValues
                const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET)
                return res.status(201).json({accessToken})
            })
            .catch((error) => {
                if (error.errors && error.errors.length) {
                    error = error.errors[0].message
                }
                return res.status(500).json({message: 'error creating user', error})
            })
    },

    login: async (req, res) => {
        const { email, password } = req.body

        db.User.findOne({where: {email}})
            .then((response) => {
                if (!response) {
                    return res.status(401).json({message: 'invalid credentials'})
                }

                const user = response.dataValues
                const passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    return res.status(401).json({
                        messsage: 'invalid credentials'
                    })
                }

                const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET)
                return res.status(200).json({accessToken})
            })
            .catch((error) => {
                if (error.errors && error.errors.length) {
                    error = error.errors[0].message
                }
                return res.status(500).json({message: 'error logging in', error})
            })
    }
}
