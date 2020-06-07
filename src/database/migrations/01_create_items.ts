import Knex from 'knex' 
// quando vc quer se referir ao tipo da var e não a var em si vc importa com a primeira letra em maiúsculo

export async function up(knex: Knex) { // aqui vc informa que knex é do tipo Knex p/ ter acesso a todas as infos desse tipo
    // criar a tabela
    return knex.schema.createTable('items', table => { // p/ acessar as infos digita ctrl + space
        table.increments('id').primary() // o id é uma chave primária na tabela
        table.string('title').notNullable()
        table.string('image').notNullable() // imagem é uma string pq não vamos salvar a imagem inteira
    })
}

export async function down(knex: Knex) {
    // voltar atrás (deletar a tabela)
    return knex.schema.dropTable('items')
}