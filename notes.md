# NPM
  - Node Package manager é o gerenciador de pacotes padrão para Node.js.
  - Os pacotes e módulos necessários no projeto Node são instalados usando npm.
  - E também utilizamos o npm para executar script e bibliotecas instaladas.

 * npm init -y (cria o projeto node).

 * npm install express --save (instala e salva a biblioteca express como uma dependência do projeto.
 Obs: Esse comando criara uma pasta chamada node_modules, nao preciso enviar-la para o github(é uma boa pratica coloca-lá no .gitignore), pois ela pode ser gerada a qualquer momento com o comando: npm install).

Uma característica do node muito legal é a possibilidade de acrescentar os módulos conforme for precisando na aplicação.

  * npm start

  * ctrl + c ( para a aplicação)

# NPX
  - O npx significa Node Package Execute e vem com o npm acima da versão 5.2.
  - É um executor de pacotes npm que pode executar qualquer pacote que você quiser do registro npm sem sequer instalar esse pacote.

### Diferença entre NPM e NPX:
  - NPM é uma ferramenta que usa para INSTALAR pacotes.
  - NPX é uma ferramenta que usa para EXECUTAR pacotes.


### Nodemon

  * npm install nodemon --save-dev (Esse comando instala uma biblioteca do node, o nodemon, ele é fica observando as alterações feitas no código, e atualiza o servidor automaticamente para a versão atualizada do código) Obs: A flag --save-dev diz que o nodemon vai ser uma dependência de desenvolvimento, ou seja, só quero utilizar enquanto estiver desenvolvendo a aplicação. Quando o servidor estiver online de forma definitiva não será necessário o nodemon.

  Importante: Lá no arquivo package.json, foi colocado um script novo chamado "dev".
  ``` npm run dev || npm run NomeDoScript
  Com o comando acima, inicio o servidor utilizando o script dev lá do package.json.
  Obs: Por que nao usar o npm start? Porque ele inicia o script padrão do package.json.

### Insomnia 

  Por padrão os navegadores só aceitam o método get, para utilizar os demais métodos(POST, PUT, DELETE, PATCH) durante o desenvolvimento, utilize a ferramenta insomnia.Link: https://insomnia.rest/download 

### GET
  GET é o método de leitura 

### POST 
  POST é o método de envio pelo body(corpo) da requisição. É utilizado principalmente quando queremos cadastrar alguma coisa. Ex: Usuário, produto...

### SELECT
  Select é o comando SQL que lista as informações.


# Middleware

function MyMiddleware(request, response, next){
  console.log('Você passou pelo Middleware')

  if(!request.body.isAdmin){
    return response.json({ message: "User unauthorized"})
  }

  next() //O next é a função do middleware, que chama o destino, ou seja, chama a proxima função a ser executada na pilha do middleware, que neste caso é a função de criar um usuário " usersController.create". 
}

  * Utilizando direto na rota: usersRoutes.post("/", MyMiddleware, usersController.create)
  * Utilizando em todas as rotas de usuário: usersRoutes.use(MyMiddleware)

# Express-async-errors

  * npm install express-async-errors --save 
  Express-async-errors é uma biblioteca que trata de erros tanto do lado do cliente como do lado do servidor.
  É uma dependência de produção, é utilizada inclusive quando a api estiver publicada.

### SQL SERVER

* npm install sqlite3 sqlite --save ( o --save faz com que seja uma dependência de produção)
O comando acima instala o servidor sqllite

### SGBD - Sistema Gerenciador de Banco de Dados

* Beekeeper é uma ferramenta para poder visualizar o que tem dentro do banco de dados.
Link: https://www.beekeeperstudio.io/

# Criptografia de senha 
Para isso precisamos instalar uma dependência com o comando: npm install bcryptjs.
Preciso também importar a função hash, responsável por fazer a criptografia: const { hash } = require("bcryptjs")

# SQL QUERY BUILDER (knexjs)

  * Um query builder, serve para adaptar o código sql para o banco que esta sendo utilizado.
  link: https://knexjs.org/
  instalação: https://knexjs.org/guide/#node-js  ( npm install knex --save )

  * npx knex init - cria o arquivo de configuração do knex(knexfile.js) na raiz do projeto.

  Após finalizar as configurações no arquivo knexfile.js, dentro da pasta database, crie uma pasta chamada "knex", dentro dessa nova pasta crie um arquivo principal index.js.

  ``Migrations
  * Migrations é uma forma de versionar a base de dados.
  * Migrations trabalha na manipulação da base de dados: criando, alterando ou removendo.

  ''Métodos de uma Migrations 
  * UP: Método responsável por criar ou alterar algo no banco de dados.
  * DOWN: Responsável pelo rollback. Ou seja, desfazer as alterações realizadas pela migrations. 

  ''Criando o Migrations
  * Após configurar a migrations no arquivo knexfile.js, execute o seguinte comando no terminal:
    ``` npx knex migrate:make nomeDaMigrations
  Após o comando o knex criará um novo arquivo migrations (no local que foi configurado lá no knexfile.js) que tem uma numeração 000_nomeDaMigrations.Ex: 2022100655458_createNotes.js
  Em seguida, insira a lógica do UP e o DOWN lá no arquivo da migrations criado.

  Para gerar a tabela(ou criar a migrations) que acabou de ser configurada no UP do migrations, insira o comando abaixo o terminal:
    ``` npx knex migrate:latest
  Para deixar esse comando mais simples, é possível criar um script para ele lá no package.json da seguinte forma:
  "migrate": "knex migrate:latest"
  Dessa forma é possível executar o mesmo comando, digitando no terminal apenas:
    ``` npm run migrate 

## JSON WEB TOKEN (JWT)

* npm install jsonwebtoken

## UPLOAD 

- Para fazer upload, vou utilizar uma biblioteca chamada multer.
* npm install multer

# Cors (Compartilhamento de recursos com origens diferentes)

- CORS é uma biblioteca importante, para conectar o back com o front.
  É instalado no back.

* npm install cors

## Axios

- é uma biblioteca que trabalha com requisições http, para consumir requisições como post, get, delete, etc...

* npm install axios