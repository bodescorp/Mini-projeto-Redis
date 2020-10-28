const client = require('../database/redisConnection');
module.exports = {

    

    list(request, response) {
        const { loginUser } = request.params;
        let list = [];
        let som = 0;
        client.get(`${loginUser}`, function (err, reply) {
            if (reply != null) {
                list = JSON.parse(reply);
                

            }
            return response.json(list);
        });




    },
    async create(request, response) {
        const { id, descricao, preco, quantidade, loginUser } = request.body;
        let list = [];

        const produto = {
            id,
            descricao,
            preco,
            quantidade
        }

        await client.get(`${loginUser}`, function (err, reply) {
            if (reply != null) {
                list = JSON.parse(reply);
                //console.log(list)
                list.push(produto);
                //console.log(JSON.parse(reply.toString()));
            } else {
                list.push(produto);
            }
            client.setex(`${loginUser}`, 36, JSON.stringify(list), function (err, response) {
                if (err) throw err;
                //console.log(response);
            });
        });

        return response.json('ok');
    }

}