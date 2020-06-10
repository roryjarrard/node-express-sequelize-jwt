const db = require('../database')
const { genSaltSync, hashSync } = require('bcrypt')

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
                return res.status(201).json({user: response.dataValues})
            })
            .catch((error) => {
                return res.status(500).json({message: 'error creating user', error})
            })
    }
}
