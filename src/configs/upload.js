const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

/*
  O Multer, é a biblioteca que vou utilizar para fazer o upload.
  Para isso informo duas propriedades importantes, o destination que é onde vou enviar o arquivo para a pasta temporária, quando carregar na aplicação.
*/ 
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      /* 
        Vou criar um nome utilizando um hash, para dar um nome para esse arquivo, para evitar que tenha nome de arquivos iguais,
        pois nesse caso o primeiro seria substituído.
        Então isso garante que cada usuário tenha um arquivo com nome único. 
      */ 
      const fileHash = crypto.randomBytes(10).toString("hex");//"hex" (hexadecimal).
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}