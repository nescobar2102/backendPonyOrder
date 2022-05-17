const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./dbconexion')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  app.get('/users', db.getUsers) // obtener todo los usuarios
  app.get('/users/:nit', db.getUserByNit)
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
