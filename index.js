const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
//const port = 3000
const user = require('./src/controllers/usuario')
const pedido = require('./src/controllers/pedido')
const empresa = require('./src/controllers/empresa')

app.use(bodyParser.json())
app.use(cors());

const PORT = process.env.PORT || 3000;


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  /*
  // Usuario
  app.get('/users', user.getUsers) // listar los usuarios
  app.get('/users/:nit', user.getUserByNit) // listar un nuevo usuario por Nit
  app.post('/users', user.createUser)  // creando un usuario
  app.put('/users/:nit', user.updateUser)  //actualizando
  app.delete('/users/:nit', user.deleteUserByNit) //Este elimina un usuario nnaguanagua
  app.post('/login' , user.login)*/

  //import the routes
const userRoutes = require('./src/routers/users');
 
app.use(userRoutes);

/*
  // Empresa
  app.get('/empresa', empresa.getEmpresa) // listar las empresa
  app.get('/empresa/:nit', empresa.getEmpresaNit) // listar una empresa por Nit
  app.post('/empresa', empresa.createEmpresa) // creando una nueva empresa
  app.put('/empresa/:nit', empresa.updateEmpresa)
  app.put('/empresa/status/:nit', empresa.updateEmpresaStatus) //actualizar el estado
*/

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
  })
