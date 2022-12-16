const { hash, compare } = require("bcryptjs") // Estou importando do bcrypt a função responsável por fazer a criptografia. O compare compara a senha criptografada com a que foi informada pelo usuário.
const AppError = require("../utils/AppError.js") // Importando a classe AppError.
const sqliteConnection = require("../database/sqlite") //Importando a conexão com o banco de dados.
const { response } = require("express")

class UsersController {
  /**
    Uma boa pratica em um controller, é que ele pode ter no MÁXIMO 5 métodos(funções).
    São eles:
      * index - ( GET ) para listar vários registros.
      * show - ( GET ) para exibir um registro especifico.
      * create - ( POST ) para criar um registro.
      * update - ( PUT ) para atualizar um registro.
      * delete - ( DELETE ) para remover um registro.
  */

  async create(request, response) {
    const { name, email, password} = request.body

    const database = await sqliteConnection()
    const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExist){
      throw new AppError("Este e-mail já esta em uso.")
    }

    //Lembrando: o await faz com que o sistema aguarde o retorno da promessa ou função, antes de continuar com a execução dos comandos.
    const hashedPassword = await hash(password, 8) //O Segundo parâmetro da função, define o fator de complexidade da criptografia.

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return response.status(201).json()




    /*
    if(!name){
      throw new AppError("Nome é obrigatório!")
    }
 
    //response.send(`Usuário: ${name}. - E-mail: ${email}. - Senha: ${password}.`)
    //o status(valor) é opcional.É uma informação a mais que esta retornando na resposta da requisição.
    response.status(201).json({ name, email, password})//Nessa linha estou devolvendo a a requisição do body em formato json.
    */
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id;

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!user) { //se o usuário não existir.
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){//Se encontrar um e-mail e se o id desse e-mail for diferente do id do usuário. 
      throw new AppError("Este e-mail já esta em uso.")
    }

    user.name = name ?? user.name // se existir conteúdo dentro de name, então este será utilizado, se não existir conteúdo dentro do name, será utilizando o que ja estava cadastrado.
    user.email = email ?? user.email // ?? ou é um ou é outro.

    if( password && !old_password ){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha.")
    }

    if( password && old_password ){
      const checkOldPassword = await compare (old_password, user.password)

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id] //OBS: No final do updated_at, não é preciso a virgula, pois ela indicaria que vou passar um parâmetro por "?", no caso estou pegando a datetime de uma função do banco de dados.
    )

    return response.json()
  }
}

module.exports = UsersController