
const message = require('./modulo/config.js');
const categoriaDAO = require('../model/DAO/categoria.js');

const getListarCategoria = async function() {
    try {
        // Criar o objeto JSON
        let categoriaJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosCategoria = await categoriaDAO.selectAllCategoria();
        console.log(dadosCategoria);

        // Validação para verificar se existem dados 
        if (dadosCategoria) {
            // Criar o JSON para devolver para o APP
            categoriaJSON.categoria = dadosCategoria;
            categoriaJSON.quantidade = dadosCategoria.length;
            categoriaJSON.status_code = 200;
            return categoriaJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getBuscarCategoriaId = async function (id){

    try{

    
    // Recebe o id do genero
    let idCategoria = id;
    //Cria o objeto JSON
    let categoriaJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idCategoria == '' || idCategoria == undefined || isNaN(idCategoria)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosCategoria = await categoriaDAO.selectCategoriabyID(id)

        // verifca se o DAO retornou dados 
        if(dadosCategoria){

            // Validação para verificar a quantidade de itens retornados
            if(dadosCategoria.length > 0){
                 // Cria o JSON para retorno 
                 categoriaJSON.categoria = dadosCategoria;
                 categoriaJSON.status_code = 200;

            return categoriaJSON;
            } else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}
}

const setInserirNovaCategoria = async function (dadosCategoria, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let categoriaJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosCategoria.nome == ''    || dadosCategoria.nome == undefined                  ||  dadosCategoria.nome == null                        || dadosCategoria.nome.length > 45   
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        // Encaminha os dados do filme para o DAO inserir dados
        let novaCategoria = await categoriaDAO.insertCategoria(dadosCategoria);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novaCategoria)
        {

            let lastId = await categoriaDAO.lastIDCategoria()
            dadosCategoria.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            categoriaJSON.categoria  = dadosCategoria
            categoriaJSON.status = message.SUCCESS_CREATED_ITEM.status
            categoriaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            categoriaJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return categoriaJSON; // 201
        }else{
         
            return message.ERROR_INTERNAL_SERVER_DB // 500
            }
         
      }
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
} catch(error){
    return message.ERROR_INTERNAL_SERVER // 500
}

}

const setExcluirCategoria = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idCategoria = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idCategoria == '' || idCategoria == undefined || isNaN(idCategoria)){
          return message.ERROR_INVALID_ID //400
      }else{
             let categoriaDeletado = await categoriaDAO.deleteCategoria(idCategoria)
  
             if(categoriaDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

module.exports = {
    getListarCategoria,
    getBuscarCategoriaId,
    setInserirNovaCategoria,
    setExcluirCategoria
};