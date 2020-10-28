const connection = require('../database/connection');

module.exports= {
    async create(request, response){
        const { login } = request.body;

        const user = await connection('users')
            .where('login', login)
            .select('nome')
            .first();

        if(!user){
            return response.status(400).json({error: 'No User'})
        }

        return response.json(user)
    }
}