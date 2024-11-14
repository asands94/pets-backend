const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT

const petRouter = require('./controllers/pets.js')
const testJWTRouter = require('./controllers/test-jwt')
const usersRouter = require('./controllers/users')
const profilesRouter = require('./controllers/profiles')

app.use(cors({ origin: 'http://localhost:5173' }))

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(express.json())
app.use(morgan('dev'))

// Routes go here
app.use('/test-jwt', testJWTRouter)
app.use('/pets', petRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)

app.listen(PORT, () => {
  console.log('The express app is ready!')
})
