const client = require('../database/redisConnection');
module.exports = {


    //listagem de Produtos 
    list(request, response) {
        const { loginUser } = request.params;
        let lista = [];
        client.get(`${loginUser}`, function (err, reply) {
            if (reply != null) {
                lista = JSON.parse(reply);


            }
            return response.json(lista);
        });

    },

    //criação da lista de produtos 
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
                //verificar se o produto esta na lista(se tiver aumenta a quantidade)
                let temNaLista = false
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id == id) {
                        list[i].quantidade += produto.quantidade
                        temNaLista = true

                    }
                } if (temNaLista == false) {
                    list.push(produto);
                    console.log(list)

                }

            } else { list.push(produto); }

            //mandar lista para o banco 
            client.setex(`${loginUser}`, 3600, JSON.stringify(list), function (err, response) {
                if (err) throw err;
                //console.log(response);
            });
        });

        return response.json('ok');
    }

}