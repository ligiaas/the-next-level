import { Request, Response } from 'express'
import knex from '../database/connection'

const root = 'http://localhost:3333'

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*')
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${root}/uploads/${item.image}`
            }
        })
    
        return response.json(serializedItems)
    }
}

export default ItemsController