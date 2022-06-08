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
const tipodocRoutes = require('./src/routers/tipodoc');
const tipopagoRoutes = require('./src/routers/tipopago');
const tipoempresaRoutes = require('./src/routers/tipoempresa');
const tipoidentificacionRoutes = require('./src/routers/tipoidentificacion');
const cuentaporterceroRoutes = require('./src/routers/cuentaportercero');
const cuotaventasRoutes = require('./src/routers/cuotaventas');
const deptoRoutes = require('./src/routers/depto');
const impuestoRoutes = require('./src/routers/impuesto');
const paisRoutes = require('./src/routers/pais');
const formapagoRoutes = require('./src/routers/formapago');
const carteraproveedoresRoutes = require('./src/routers/carteraproveedores');
const itemRoutes = require('./src/routers/item');
const kitRoutes = require('./src/routers/kit');
const precioitemRoutes = require('./src/routers/precioitem');
const terceroRoutes = require('./src/routers/tercero');
const tiempoentregaRoutes = require('./src/routers/tiempoentrega');

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
app.use(tipodocRoutes);
app.use(tipopagoRoutes);
app.use(tipoempresaRoutes);
app.use(tipoidentificacionRoutes);
app.use(cuentaporterceroRoutes);
app.use(cuotaventasRoutes);
app.use(deptoRoutes);
app.use(impuestoRoutes);
app.use(paisRoutes);
app.use(formapagoRoutes);
app.use(carteraproveedoresRoutes);
app.use(itemRoutes);
app.use(kitRoutes);
app.use(precioitemRoutes);
app.use(tiempoentregaRoutes);
app.use(terceroRoutes);

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
  })
