import Knex from 'knex' 
// quando vc quer se referir ao tipo da var e não a var em si vc importa com a primeira letra em maiúsculo

export async function up(knex: Knex) { // aqui vc informa que knex é do tipo Knex p/ ter acesso a todas as infos desse tipo
    // criar a tabela
    return knex.schema.createTable('point_items', table => { // p/ acessar as infos digita ctrl + space
        table.increments('id').primary() // o id é uma chave primária na tabela

        table.integer('points_id')
            .notNullable()
            .references('id') // vou criar uma chave estrangeira na tabela points no campo id
            .inTable('points')
            // todo campo points_id da tabela create_points_items precisa ser um id válido dentro da tabela points
            // esse id dentro da tabela points é chamado de chave estrangeira

        table.integer('items_id')
            .notNullable() // imagem é uma string pq não vamos salvar a imagem inteira
            .references('id')
            .inTable('items')
    })
}

export async function down(knex: Knex) {
    // voltar atrás (deletar a tabela)
    return knex.schema.dropTable('point_items')
}