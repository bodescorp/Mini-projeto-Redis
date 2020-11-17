const client = require('../database/mongoConnection');
module.exports = {

    async addPedido(request, response) {
        const { id, descricao, preco, quantidade, loginUser } = request.body;

        const produtos = {
            id: id,
            descricao,
            preco,
            quantidade,
            loginUser,
            data: new Date()
        };
        const pedidos = client.db(`${process.env.MONGO_DATABASE}`).collection('pedidos');
        pedidos.insertOne(produtos).then(

            response.status(201).send({
                message: "Pedido Finalizado",
            }));
    },

    async getCarrinhos(request, response) {
        const User =parseInt(request.params.User);
        

        const pedidos = client.db(`${process.env.MONGO_DATABASE}`).collection('pedidos');
        const filter = { loginUser: User }
        let listadePedidos = []
        await pedidos.find(filter).forEach((item) => listadePedidos.push(item));
        response.status(200).send({ listadePedidos });
    },


    async findProduto(request, response) {
        const { descricao } = request.params;
        const pedidos = client.db(`${process.env.MONGO_DATABASE}`).collection('pedidos');
        const filter = { descricao: descricao };
        let listadePedidos = []
        await pedidos.find(filter).forEach((item) => listadePedidos.push(item));
        response.status(200).send({ listadePedidos });
    }
}

