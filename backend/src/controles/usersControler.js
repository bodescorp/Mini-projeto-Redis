const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const user = await connection('users').select('*');

        return response.json(user);
    },

    async create(request, response) {
        const { nome,login } = request.body;

        await connection('users').insert({
            nome,
            login,
        });

        return response.json({ login });
    },

    async delete(request, response) {
        const { id } = request.params;

        const user = await connection('users')
            .where('id', id)
            .select('id')
            .first();
        await connection('users')
            .where('id', id)
            .delete();
        return response.status(204).send();
    }
};

