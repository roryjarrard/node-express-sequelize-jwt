const router = require('express').Router()
const { getUsers, getUser, createUser, login } = require('./user.controller')
const { authenticateToken } = require('../middleware/auth.middleware')

router.get('/', authenticateToken, getUsers)
router.get('/:id', authenticateToken, getUser)
router.post('/', createUser)
router.post('/login', login)

module.exports = router
