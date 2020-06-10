const router = require('express').Router()
const { getUsers, getUser, createUser } = require('./user.controller')

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)

module.exports = router
