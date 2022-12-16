const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController.js");
const UserAvatarController = require("../controllers/UserAvatarController.js");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);


const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

/* GET --------
//request é a requisição que foi feita e o response é o recurso que posso utilizar para fazer a resposta.
usersRoutes.get("/message/:id/:user", (request, response) => { // id e user são os nomes dos meus parâmetros da rota. Um parâmetro é identificado pelos dois pontos antes do nome: ":id" e ele é obrigatório. Os parâmetro são utilizados para dados simples.
  const { id, user } = request.params //Desestruturando o id e o usuário do request.params. Dessa forma evito repetição de código nas linhas abaixo. Sem a desestruturação teria que escrever "request.params.id e request.params.user"

  response.send(`
  Mensagem ID: ${id}.
  Nome do usuário: ${user}.
  `)
})


usersRoutes.get("/users", (request, response) => {
  //Diferente do parâmetro de rota, o query params é opcional.
  const { page, limit } = request.query

  response.send(`Página: ${page}. Mostrar: ${limit}`)
})
*/


// POST --------
usersRoutes.post("/", usersController.create);// "/" raiz do users.
usersRoutes.put("/", ensureAuthenticated, usersController.update);

// patch, serve para atualizar um campo especifico de um registro no banco de dados.
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes // Estou exportando, para quem quiser utilizar este arquivo, poder utilizar.