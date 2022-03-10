import axios, { AxiosResponse } from "axios"
import handleAxiosResponseError from "./utils/handleAxiosResponseError";
import handleAxiosResponseSuccess from "./utils/handleAxiosResponseSuccess";
 
// cria uma instancia do Axios
const Http = axios.create()

// Clase basica para uso em serviços 
class Service {

    // protected so pod eser acessada por ela mesma ou pelos herdeiros dessa classe
    // Isso forçará outras classes a estenderem dela para poder usar os serviços criados
    protected static Http = Http // a propriedade protected Http receberá o valor da instancia de Http do Axios

    protected static getData = getData // Obem apenas os dados da requisicao para facilitar  

}

function getData<T>(res: AxiosResponse<T>) {
    return res.data // Obtem a propriedade "data" de response (res) de uma requisicao a API do backend
}

// Configura o BaseURL alterando a propriedade protegida criada acima
Http.defaults.baseURL = 'Http://localhost:8080'

// Intercepta response do axios
Http.interceptors.response.use(
    handleAxiosResponseSuccess,
    handleAxiosResponseError
);
  