/*
  Este arquivo server.js é o ponto de entrada da aplicação, quando uma requisição chega nele, vai passar pelas rotas, para verificar qual o controller que vai ser executado,
  o que o usuário esta pedindo, então baseado na rota a requisição vai ser entregue a um determinado controller.
*/
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError.js");

const uploadConfig = require("./configs/upload");

const cors = require("cors"); //faz a ligação do back com o front.
const express = require("express"); // Importando o express
const routes = require("./routes");

migrationsRun()//Aqui esta sendo executado o banco de dados;

const app = express() ;// Inicializando o express
app.use(cors());// habilitando para que o back consiga responder as requisições do front.
app.use(express.json());//Aqui estou escolhendo o padrão o qual a API deve seguir para receber essas requisições através do body(corpo) da requisição.

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use(( error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error); //esse comando é para caso for preciso debugar o erro.

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
})

const PORT = 3333 // Constante que define o endereço, o número da porta que a api vai ficar esperando requisições e devolvendo respostas.
app.listen(PORT, () => {console.log(`Server is running on Port ${PORT}`)});