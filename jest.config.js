module.exports = {
  bail: true, //Essa propriedade faz com que se um teste falhar ele para de executar os testes. obs: Por padrão ele vem desabilitado,(false) dessa forma se um teste falhar ele continuara o teste sem interrupção.
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js", //   <rootDir>/src/**/*.spec.js(Dentro da raiz do projeto / dentro do src/ dentro de qualquer pasta, vai ter um arquivo com qualquer nome que a extensão dele será .spec.js)
    // (LINHA 6) Partindo da raiz do projeto, estou pedindo para o jest olhar dentro da pasta src, dentro de qualquer pasta, com qualquer arquivo que tenha qualquer nome, des de que tenha a extensão .spec.js rodar o teste. Isso faz com que ignore a pasta node_modules já que não tem necessidade de rodar o teste dentro dela.
  ],
}