const path = require('path')
const autoload = require('fastify-autoload')

async function app(fastify, options){
    //auto-load, based on directory
    fastify.register(autoload,{
        dir: path.join(__dirname, 'v1'),
        options: { prefix: '/api/v1' }
    })
}
module.exports = app