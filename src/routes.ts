import express from 'express'
import knex from './database/connection'

const routes = express.Router()
// Usando o express.Router() vc consegue desaclopar as suas rotas do arquivo principal do seu servidor pra outro arquivo
// e vc precisa exportar essas rotas e importa-las no seu arquivo principal do server

const root = 'http://localhost:3333'

routes.get('/items', async (request, response) => {
    // sempre q for fazer uma consulta no DB vc tem que esperar pd leva um tempo por isso tem que colocar o await
    // e pra usar o await a chamada deve ser assíncrona (async)
    const items = await knex('items').select('*')

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `${root}/uploads/${item.image}`
        }
    })
    // quando as infos do DB não estão da forma que eu preciso que esteja eu faço uma serialização pra que elas fiquem
    // eu faço uma serialização de dados pra que eles fiquem com a forma correta pra quem for utiliza-las

    return response.json(serializedItems)
})

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body

    // como nós estamos fazendo querys dependentes uma da outra, nós criamos a const trx com
    // transaction() que se caso a segunda query 'point_items' falhar a primeira 'insertedIds' nem executa
    const trx = await knex.transaction()

    // a const ids recebe o id do ponto de coleta recém criado
    // como é criado um único registro por vez, então ids tem só um id, 
    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    })

    // essa const pointItems, percorre o array de itens q retorna o id do item e o id do ponto de coleta recém criado
    // pra vc pegar o id do point de coleta recém criado vc recebe esse id
    // p/ typescript vc tem que definir o tipo do param. Por isso o (item_id: number)

    const point_id = insertedIds[0] // logo vc pega com o índice zero => ids[0]

    const pointItems = items.map((item_id: number) => {
        return {
            items_id: item_id,
            points_id: point_id
        }
    })

    // pra fazer o relacionmaneto entre tabelas vc precisa inserir dentro da tabela point_intems cada um dos itens que 
    // a tabela points recebeu
    await trx('point_items').insert(pointItems)

    return response.json({ success: true })
})

export default routes