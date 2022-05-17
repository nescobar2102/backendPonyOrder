 const usersModel = require("../models/users_model");

//GET - Return all tvshows in the DB
exports.findAllUsers = function (req, res) {
  usersModel.findAll(function (err, users) {
    if (err) res.send(500, err.message);

    console.log("GET /users");
    res.status(200).jsonp(users);
  });
};
 

//GET - Return a TVShow with specified ID
exports.findByNit = function(req, res) {
  usersModel.findByNit(req.params.nit, function(err, tvshow) {
  if(err) return res.send(500, err.message);

  console.log('GET /tvshow/' + req.params.id);
      res.status(200).jsonp(tvshow);
  });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteUserByNit = function (req, res) {
  usersModel.delete(req.params.nit, function (err, tvshow) {
    tvshow.remove(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};