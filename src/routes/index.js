/*Este arquivo src/routes/index.js, tem como objetivo reunir todas as rotas na minha aplicação,
todos os grupos de rotas que vão estar separadas por arquivos. 
Para ver a explicação da lógica das rotas novamente, vá para o stage 8 aula: Organizando a estrutura do projeto(duração total de 10:48 min)*/

const { Router } = require("express")

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()
routes.use("/users", usersRouter) /* Toda vez que alguém for acessar o /users, vai ser redirecionado para o userRouter. 
Que é o grupo de rotas do usuário
Quando o cliente chamar o /users, vai ser redirecionado para o usersRouter, se for na raiz "/" vai ser chamado o
userController e lá dentro temos o create que é onde cria o usuário.
*/

routes.use("/sessions", sessionsRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)

module.exports = routes