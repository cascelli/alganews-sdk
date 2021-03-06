import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import handleAxiosResponseError from "./utils/handleAxiosResponseError";
import handleAxiosResponseSuccess from "./utils/handleAxiosResponseSuccess";

// cria uma instancia do Axios
const Http = axios.create();

// Clase basica para uso em serviços
//class Service { // Inserido export para evitar erro de importacao nos arquivos *.service.ts desta pasta
export class Service {
  // protected so pod eser acessada por ela mesma ou pelos herdeiros dessa classe
  // Isso forçará outras classes a estenderem dela para poder usar os serviços criados
  protected static Http = Http; // a propriedade protected Http receberá o valor da instancia de Http do Axios

  protected static getData = getData; // Obtem apenas os dados da requisicao para facilitar

  public static setBaseUrl(baseURL: string) {
    this.Http.defaults.baseURL = baseURL;
  }

  // Cria um interceptador publico de requisições para uso com API blindada (segurança - Cap 17.10)
  public static setRequestInterceptors(
    onFulfilled: (
      request: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>, // define AxiosRequestConfig como sincrono ou assincrono
    onRejected?: (error: any) => any
  ) {
    Http.interceptors.request.use(onFulfilled, onRejected);
  }

  // Cria um interceptador publico de respostas para uso com API blindada (segurança - Cap 17.10)
  public static setResponseInterceptors(
    onFulfilled: (
      response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>, // define AxiosResponse como sincrono ou assincrono
    onRejected?: (error: any) => any
  ) {
    Http.interceptors.response.use(onFulfilled, onRejected);
  }
}

function getData<T>(res: AxiosResponse<T>) {
  return res.data; // Obtem a propriedade "data" de response (res) de uma requisicao a API do backend
}

// Configura o BaseURL alterando a propriedade protegida criada acima
Http.defaults.baseURL = "Http://localhost:8080";

// Intercepta response do axios
Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError
);
