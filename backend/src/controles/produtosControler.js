const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('produtos').count();

        const produtos = await connection('produtos')
        .limit(5)
        .offset((page - 1 )* 5)
        .select ('*');
        
        response.header('X-Total-Count', count['count(*)']);
        return response.json(produtos);
    },

    async create(request, response) {
        const { descricao, preco } = request.body;

        await connection('produtos').insert({
            descricao,
            preco,
        });

        return response.json({ descricao });
    },

    async delete(request, response) {
        const { id } = request.params;

        const user = await connection('produtos')
            .where('id', id)
            .select('id')
            .first();
        await connection('produtos')
            .where('id', id)
            .delete();
        return response.status(204).send();
    }
};

