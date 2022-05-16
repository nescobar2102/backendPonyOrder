 const UserModel = require("../models/userModel");

const asyncVerifyJWT = async (request, reply) => {
  try {
    if (!request.headers.authorization) {
      throw new Error("No token was sent");
    }
    const token = request.headers.authorization.replace("Bearer ", "");
    const user = await UserModel.findByToken(token);
    if (!user) {
      return reply.code(401).send(new Error("Authentication failed!"));
    }
    request.user = user;
    request.token = token; 
  } catch (error) {
    // JWT expired
    return reply.code(401).send(error);
  }
};


module.exports = {
    asyncVerifyJWT, 
  };
  