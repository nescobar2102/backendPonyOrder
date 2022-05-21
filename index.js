const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
  

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
 

  //import the routes
const userRoutes = require('./src/routers/users');
const empresaRoutes = require('./src/routers/empresa');
const pedidoRoutes = require('./src/routers/pedido');
const barrioRoutes = require('./src/routers/barrio');
const ciudadesRoutes = require('./src/routers/ciudad');
const auxiliarRoutes = require('./src/routers/auxiliar');
const bancoRoutes = require('./src/routers/banco');
const clasificacionItemsRoutes = require('./src/routers/clasificacionItems');
const conceptoRoutes = require('./src/routers/concepto');
const medioContactoRoutes = require('./src/routers/medioContacto');
const zonaRoutes = require('./src/routers/zona');

app.use(userRoutes);
app.use(empresaRoutes);
app.use(pedidoRoutes);
app.use(barrioRoutes);
app.use(ciudadesRoutes);
app.use(auxiliarRoutes);
app.use(bancoRoutes);
app.use(clasificacionItemsRoutes);
app.use(conceptoRoutes);
app.use(medioContactoRoutes);
app.use(zonaRoutes);


  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
  })
