require('dotenv').config()

const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express() 

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => {console.log(error)})
db.once('open', () => console.log('connectet to db'))

app.use(express.json())

const subscribersRouter = require('./routers/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('app listen on port 3000'))

