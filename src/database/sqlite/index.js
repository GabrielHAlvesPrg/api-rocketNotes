const sqlite3 = require("sqlite3")// Esse é o driver de fato, que vai estabelecer a comunicação com a base de dados.
const sqlite = require("sqlite")//Responsável por conectar.
const path = require("path")// O path é uma biblioteca própria do node(não precisa instalar nada a mais) que, resolve questão dos endereços de acordo com o ambiente. windows,linux...etc.

async function sqliteConnection() {
  const database = await sqlite.open({
    // a propriedade __dirname, que pega de forma automática, a onde estou dentro do projeto.
    filename: path.resolve(__dirname, "..", "database.db"), //Essa propriedade que diz a onde o arquivo ficará salvo.
    //No comando a cima, estou pegando a minha localização no projeto com o __dirname, volto uma pasta com o "..", então cria um arquivo chamado database.db.
    driver: sqlite3.Database
  })

  return database
}

module.exports = sqliteConnection