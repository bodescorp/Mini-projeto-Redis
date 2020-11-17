const { response } = require('express');
const express = require('express');
const routes = express.Router();

const produtosControler = require('./controles/produtosControler');
const usersControler = require('./controles/usersControler');
const cartControler = require('./controles/cartControler');
const sessionControler = require('./controles/sessionControler');
const valControler = require('./controles/valControler');
const cartMongo = require('./controles/cartMongoControler');



routes.post('/session', sessionControler.create);

routes.get('/produtos', produtosControler.list);
routes.post('/produtos', produtosControler.create);
routes.delete('/produtos/:id', produtosControler.delete)

routes.get('/users', usersControler.list);
routes.post('/users', usersControler.create);
routes.delete('/users/:id', usersControler.delete);

routes.post('/cart', cartControler.create);
routes.get('/cart/:loginUser', cartControler.list);
//routes.delete('cart/:id', cartControler.delet);

routes.get('/val/:loginUser', valControler.vale);

routes.post('/compras', cartMongo.addPedido);
routes.get('/compras/:User', cartMongo.getCarrinhos);
routes.get('/itens/:descricao', cartMongo.findProduto);

module.exports = routes;