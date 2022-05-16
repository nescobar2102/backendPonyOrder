const FastifyAuth = require("fastify-auth");

const UserModel = require("../../models/userModel");
const UserController = require("../../controllers/userController");

async function onFile(part) {
  await pump(part.file, fs.createWriteStream("./" + part.filename));
  if (part.file.truncated) {   
    fs.unlinkSync("./" + part.filename);   
    throw new Error("¡Excedió el límite recomendado de 5 MB!");
  } 
}
const authRoutes = async (fastify, opts) => {
    fastify.register(require("fastify-multipart"), {
      attachFieldsToBody: true,
      throwFileSizeLimit: true,
       limits: {
        fieldNameSize: 256,
        fileSize: 5 * 1024 * 1024, 
        headerPairs: 256
      }, 
      fields: 5,
      onFile,
    });
    fastify
      .decorate("asyncVerifyJWT", async (request, reply) => {
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
      })
      .decorate("asyncVerifyEmailAndPassword", async (request, reply) => {
        try {
          const language = request.body?.language || "es";
          if (!request.body) {
            throw new Error(UserMessages.userMessages.login.fails[language]);
          }
  
          const user = await UserModel.findByCredentials(
            request.body.email,
            request.body.password,
            language
          );
          request.user = user;
        } catch (error) {
          throw boom.boomify(error);
        }
      })
      .register(FastifyAuth)
      .after(() => {
        fastify.route({
          method: ["POST"],
          url: "/user/email-register",
          logLevel: "warn",
          handler: UserController.register,
        });
        fastify.route({
          method: ["POST"],
          url: "/user/validate-email",
          logLevel: "warn",
          preHandler: fastify.auth([fastify.asyncVerifyJWT]),
          handler: UserController.validateEmail,
        });         
        fastify.route({
          method: ["POST"],
          url: "/user/login",
          logLevel: "warn",
          handler: UserController.loginUser,
        });
        fastify.route({
          method: ["POST"],
          url: "/user/logout",
          logLevel: "warn",
          preHandler: fastify.auth([fastify.asyncVerifyJWT]),
          handler: UserController.logout, 
        });
        fastify.route({
          method: ["POST"],
          url: "/user/loging2fa",
          logLevel: "warn",
          handler: UserController.login2FA,
        });
        fastify.route({
          method: ["POST"],
          url: "/user/delete2fa", //envia el correo para desactivar el tfa
          logLevel: "warn",
          handler: UserController.delete2FA,
        });
        fastify.route({
          method: ["GET"],
          url: "/user/confirm-delete-2fa",
          logLevel: "warn",
          preHandler: fastify.auth([fastify.asyncVerifyJWT]),
          handler: UserController.confirmDelete2faUser,
        });
        fastify.route({
          method: ["POST"],
          url: "/user/generate-code-psw",
          logLevel: "warn", 
          handler: UserController.generateCodePsw,
        });
        fastify.route({
          method: ["POST"],
          url: "/user/validate-code-psw",
          logLevel: "warn", 
          handler: UserController.validateCodePsw,
        });
        fastify.route({
          method: ["POST"],
          url: "/user/new-password",
          logLevel: "warn",
          preHandler: fastify.auth([fastify.asyncVerifyJWT]),
          handler: UserController.newPasswordUser,
        });
  
    });
  };
  
  module.exports = authRoutes;
  