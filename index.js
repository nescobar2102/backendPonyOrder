const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
 
var usersRouter = require("./api/controllers/users"); 
var users = express.Router();


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  
users
.route("/users")
.get(usersRouter.findAllUsers)
.post(usersRouter.findAllUsers);

users
  .route("/users/:nit")
  .get(usersRouter.findByNit)
  //.put(usersRouter.updateTVShow)
  .delete(usersRouter.deleteUserByNit);

  app.use("/api", users);
  
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
