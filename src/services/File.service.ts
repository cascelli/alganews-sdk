import { File } from "../@types";
import { v4 as uuid } from "uuid"; // Importa a versao 4 do modulo uuid e renomeia para uuid para manter a compatibilidade com o modulo uuidv4 anterior
import { Service } from "../Service";

class FileService extends Service {
  private static getSignedUrl(fileInfo: File.UploadRequestInput) {
    return this.Http.post<File.UploadRequest>("/upload-requests", fileInfo)
      .then(this.getData)
      .then((res) => res.uploadSignedUrl);
  }

  private static uploadFileToSignedUrl(signedUrl: string, file: File) {
    return (
      this.Http

        // Implementacao de envio de arquivo parao Google Cloud Platform
        .put<{}>(signedUrl, file, {
          headers: { "Content-Type": file.type },
        })
        .then(this.getData)
    );
  }

  private static getFileExtension(fileName: string) {
    // Obtem a extensao do arquivo partindo o nome do arquivo pelo separador '.' atraves dos metodos split e slice
    // Ex : arquivo.fotp.png => slit => ['arquivo', 'foto'. 'png'] => slice(-1) => 'png'
    // Usando desestruturacao para obter o nome do arquivo [extension]
    const [extension] = fileName.split(".").slice(-1); // -1 correponde ao ultimo elemento do array obtido com split

    return extension;
  }

  private static generateFileName(extension: string) {
    return `${uuid()}.${extension}`;
  }

  static async upload(file: File) {
    const extension = this.getFileExtension(file.name);

    const fileName = this.generateFileName(extension);

    const signedUrl = await FileService.getSignedUrl({
      fileName,
      contentLength: file.size,
    });

    await FileService.uploadFileToSignedUrl(signedUrl, file);

    return signedUrl.split("?")[0];
  }
}

export default FileService;
