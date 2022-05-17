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
  app.post('/users', db.createUser)  // creando 
  app.put('/users/:nit', db.updateUser)  //actualizando
  app.delete('/users/:nit', db.deleteUserByNit) //este elimina un usuario nnaguanagua
  
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
