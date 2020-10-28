
exports.up = function (knex) {
    return knex.schema.createTable('produtos', function (table) {
        table.increments();

        table.string('descricao').notNullable();
        table.decimal('preco').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('produtos');
};
