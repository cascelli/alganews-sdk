function generateQueryString(
    params: {[key: string]: string | number | boolean | string[] | undefined}
): string {

    const convertedParams: {[key: string]: string} = {}

    Object
        .keys(params) // recupera todas as chaves de um objeto params
        .forEach(key => { // percorre o array de chaves
            const param = params[key] // recupera o parametro atual do loop
            if(param) // verifica se o parametro existe ( diferente de undefined )
                convertedParams[key] = String(param) // Converte o paramentro para string e o adiciona ao objeto de parametros convertido para string
        })
    const urlParams = new URLSearchParams(convertedParams)

    return `?${urlParams.toString()}` // Acrescenta '?' antes de urlParams para compor a queryString final
}


export default generateQueryString
