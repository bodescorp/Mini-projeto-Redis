require('dotenv').config();
const redis = require('redis');


const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

module.exports = client;

// client.on('connect', function (error) {
//     console.log('Conectado');
// });

// client.on('error', function (error) {
//     console.log(error);
// });

// const obj = {
//     nome: 'paulo',
//     email: 'glaymar2010@live.com',
//     profissao: 'teste'
// };

//add chave
//client.set('teste', JSON.stringify(obj), function (err, response) {
//    if (err) throw err;
//    console.log(response);
//});

//buscar chave
//client.get('teste', function (err, reply) {
//    if (reply != null) {
//        const teste = JSON.parse(reply.toString());
//        console.log(teste);
//    } else {
//        console.log('chave n encontrada');
//    }
//});

//remover chave

//client.del('teste', function (err, response) {
//    if (err) throw err;
//    console.log(response);
//});

//tempo de vida
//client.setex('teste', 60, json.stringify(obj), function (err, response) {
//    if (err) throw err;
//    console.log(response);
//});

