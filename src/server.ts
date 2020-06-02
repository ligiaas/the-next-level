import express from 'express'

const app = express()

app.get('/users', (request, response) => {
    response.json([
        'Ligia',
        '🙂',
        'Diego',
        '🌎'
    ])
})

app.listen(3333)