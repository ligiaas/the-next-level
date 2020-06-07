// O knexfile terá algumas configs que a nossa conexão com o DB não tem
// Mesmo esse arq sendo ts o knex ainda não suporta a sintaxe export default logo vc faz com o module.exports
import path from 'path'
module.exports = {
    client: 'sqlite3', 
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
        // vc precisa passar o caminho até database como param
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
    // O sqlite não suporta valores padrões na hora de inserir dados então nós passamos essa flag acima
}

// feito iss no terminal vc roda o seguinte comando, lembrando q knesfile.ts é o nome desse arq de config
// npx knex migrate:latest --knexfile knexfile.ts migrate:latest
// comando rodado sem erro, o DB é criado database.sqlite p/ visualizar o arq instala o plugin no vscode SQLite
// cmd + shift + p e Open Database
