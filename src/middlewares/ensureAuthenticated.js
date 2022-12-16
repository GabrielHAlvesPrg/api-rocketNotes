const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization; //Dentro do cabeçalho(header) da requisição do usuário, vai ter o token de autorização.

  if(!authHeader){
    throw new AppError("JWT Token não informado", 401);
  }

  //posição [Bearer xxxxx]
  const [, token] = authHeader.split(" ")// estou quebrando o texto em um array, pegando apenas a segunda posição e passando para uma variável chamada token.

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    // Estou desestruturando o sub do resultado do verify que esta verificando se o token é válido, se for valido vou dar um apelido para o sub de user_id.

    request.user = {
      // estou criando na requisição, uma propriedade chamada user, e dentro dela vou criar uma propriedade chamada id, voltar o id para numero e ela será o user_id.
      id: Number(user_id),
    };

    return next();
  }catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;