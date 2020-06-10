require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const db = require('./api/database')
db.sequelize.sync()

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on :${port}...`)
})
