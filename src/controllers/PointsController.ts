import { Request, Response } from 'express'
import knex from '../database/connection'

const root = 'http://localhost:3333'

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query // usamos os Query params p/ filtros

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.points_id')
            .whereIn('point_items.items_id', parsedItems)
            // whereIn => tenha pelo menos um 'point_items.items_id' dentro de parsedItems
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct() // p/ não repetir pontos, só me mostre pontos distintos
            .select('points.*') // eu quero buscar todos os dados da tabela points e não da tabela que eu fiz join

        return response.json(points)
    }

    async create(request: Request, response: Response) {
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
    
        const trx = await knex.transaction()

        const point = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    
        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
    
        const pointItems = items.map((item_id: number) => {
            return {
                items_id: item_id,
                points_id: point_id
            }
        })
    
        await trx('point_items').insert(pointItems)

        await trx.commit()
        // O commit vai fazer os inserts no banco de dados, se vc não der o commit ele nunca vai fazer os inserts
        // O commit sempre deve ser feito quando usar o transaction(). O seu response até pode acontecer como sucesso
        // mas o registro no DB não acontece. O commit() deve ser feito no final de todo o uso do transaction()
    
        return response.json({
            id: point_id,
            ...point
        })
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const point = await knex('points').where('id', id).first()
        // usa o método first pq sabe-se q o id é único então não retornará mais de um resultado
        // se vc não usar o first o point retorna como um array

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' })
        }

        /*
            SELECT * FROM items
                JOIN point_items ON items.id = point_items.item_id
                WHERE point_items.point_id = {id}
            
            Esse mesmo select feito em SQL é feito abaixo em js com o knex
        */

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.items_id')
            .where('point_items.points_id', id)
            .select('items.title')

        return response.json({point, items})
    }
}

export default PointsController