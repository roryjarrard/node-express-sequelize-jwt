const db = require('../database')
const { genSaltSync, hashSync } = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    createUser: async (req, res) => {
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
    }
}
