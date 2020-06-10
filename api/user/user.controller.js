const db = require('../database')

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
    }
}
