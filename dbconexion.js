/*const Pool = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PonyOrder',
  password: '123456',
  port: 5432,
})


module.exports = {
  pool, 
}
*/
const { Client } = require('pg')
const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'PonyOrder',
  password: '123456',
  port: 5432,
}
const client = new Client(connectionData)

module.exports = {
  client
}