const client = require('../database/redisConnection');
module.exports = {
    
    vale(request, response) {
        const { loginUser } = request.params;
        let list = [];
        let som = 0;
        client.get(`${loginUser}`, function (err, reply) {
            if (reply != null) {
                list = JSON.parse(reply);

                for (let index = 0; index < list.length; index++) {
                    const element = list[index].preco * list[index].quantidade;
                    som += element;

                }

            }
            return response.json(som);
        });
    },


}