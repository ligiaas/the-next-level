import express from 'express'
import cors from 'cors'
import routes from './routes'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/uploads/', express.static(path.resolve(__dirname, '..', 'uploads')))
//serve p acessar aqs estáticos como imgs passando o caminho como params

app.listen(3333)