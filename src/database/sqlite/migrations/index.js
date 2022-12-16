const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers.js')

async function migrationsRun(){
  /*
    Esta função pega todas as migrations, usa o.join('') para juntar todas elas não usando nada como parâmetro.
    Chama o sqliteConnection, usa uma promises com uma array function que executa os esquemas(schemas), que são as
    migrations. A migration serve para automatizar o processo de recriar as tabelas caso for preciso, deixando mais 
    simples a criação da estrutura do banco de dados.
  */
  const schemas = [
    createUsers
  ].join('')

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error))
}

module.exports = migrationsRun