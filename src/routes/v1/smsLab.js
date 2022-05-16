const SmsController = require("../../controllers/smsController");

const smsRoutes = async (fastify) => {
  fastify.route({
    method: ["POST"],
    url: "/smsSend/code",
    logLevel: "warn", 
    handler: SmsController.getSmsLab,
  });
 
};

module.exports = smsRoutes;
