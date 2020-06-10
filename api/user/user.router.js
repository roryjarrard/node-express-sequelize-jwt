const router = require('express').Router()
const { getUsers, getUser } = require('./user.controller')

router.get('/', getUsers)
router.get('/:id', getUser)

module.exports = router
