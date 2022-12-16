const fs = require("fs"); // lida com manipulação de arquivos.
const path = require("path"); //lida com os diretórios (navegação).
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file){
    //Essa função de rename do fs, muda o arquivo de lugar.
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath);//stat, retorna os status do arquivo, se ele esta sendo utilizado por outro programa, se esta corrompido, se esta tudo ok, ...etc.
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);//unlink, remove um arquivo.
  }
}

module.exports = DiskStorage;