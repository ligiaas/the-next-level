import knex from 'knex'
import path from 'path'

// quando vamos lidar com caminhos é indicado usar a library path do node
// ela resolve caminhos de arquivos baseado no seu SO então se vc tá usando
//  windows ou qq outro SO ela resolve as diferenças entre SO's. Faz uma padronização
// a função path.resolve() basicamente une caminhos

// monto um const que recebe as configs de conexão com o DB
const connection = knex({
    client: 'sqlite3', // precisa tbm instalar o pcte npm install sqlite3
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
        // a __dirname é uma var global que retorna o caminho do arquivo onde ele está sendo executado
    },
    useNullAsDefault: true
    // O sqlite não suporta valores padrões na hora de inserir dados então nós passamos essa flag acima
})

export default connection