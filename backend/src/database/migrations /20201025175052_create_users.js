
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();

        table.string('nome').notNullable();
        table.string('login').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
