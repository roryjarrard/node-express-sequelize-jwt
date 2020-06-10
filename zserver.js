require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const userRouter = require('./api/user/user.router')
app.use('/api/user', userRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on :${port}...`)
})

const db = require('./api/database')

const startDB = async () => {
    await db.sequelize.sync({force: true})
}

startDB()
    .then(() => {
        const { genSaltSync, hashSync } = require('bcrypt')
        const salt = genSaltSync(10)
        db.User.create({
            first_name: 'Rory',
            last_name: 'Jarrard',
            email: 'roryjarrard@gmail.com',
            password: hashSync('silver', salt)
        })
            .then((response) => {
                console.log('user created:', response.dataValues)
            })
            .catch((error) => {
                console.log('error creating user:', error)
            })
    })
    .catch((error) => {
        console.log('Error seeding users table:', error)
    })
