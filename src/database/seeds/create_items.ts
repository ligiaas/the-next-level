import Knex from 'knex'

export async function seed(knex: Knex) {
    // como popular a tabela é algo que demora um pouco nós fazemos 
    // essa async com await pra que a chamada aguarde a sua finalização
    await knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas e Baterias', image: 'baterias.svg' },
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
        { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
        { title: 'Óleos de Cozinha', image: 'oleo.svg' }
    ])
}