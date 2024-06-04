
const message = require('./modulo/config.js');
const enderecoDAO = require('../model/DAO/endereco.js');

const getListarEndereco = async function() {
    try {
        // Criar o objeto JSON
        let enderecoJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosEndereco = await enderecoDAO.selectAllEndereco();
        console.log(dadosEndereco);

        // Validação para verificar se existem dados 
        if (dadosEndereco) {
            // Criar o JSON para devolver para o APP
            enderecoJSON.endereco = dadosEndereco;
            enderecoJSON.quantidade = dadosEndereco.length;
            enderecoJSON.status_code = 200;
            return enderecoJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getBuscarEnderecoId = async function (id){

    try{

    
    // Recebe o id do genero
    let idEndereco = id;
    //Cria o objeto JSON
    let enderecoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idEndereco == '' || idEndereco == undefined || isNaN(idEndereco)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosEndereco = await enderecoDAO.selectEnderecobyID(id)

        // verifca se o DAO retornou dados 
        if(dadosEndereco){

            // Validação para verificar a quantidade de itens retornados
            if(dadosEndereco.length > 0){
                 // Cria o JSON para retorno 
                 enderecoJSON.endereco = dadosEndereco;
                 enderecoJSON.status_code = 200;

            return enderecoJSON;
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

const setInserirNovoEndereco = async function (dadosEndereco, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let enderecoJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosEndereco.cidade == ''    || dadosEndereco.cidade == undefined                  ||  dadosEndereco.cidade == null                        || dadosEndereco.cidade.length > 80 ||
        dadosEndereco.cep == '' || dadosEndereco.cep == undefined || dadosEndereco.cep == null || dadosEndereco.cep.length> 8 || 
        dadosEndereco.rua == '' || dadosEndereco.rua == undefined || dadosEndereco.rua == null || dadosEndereco.rua.length > 100 || 
        dadosEndereco.bairro == '' || dadosEndereco.bairro == undefined || dadosEndereco.bairro == null || dadosEndereco.bairro.length > 45 ||
        dadosEndereco.numero == '' || dadosEndereco.numero == undefined || dadosEndereco.numero == null || dadosEndereco.numero.length > 15
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        // Encaminha os dados do filme para o DAO inserir dados
        let novoEndereco = await enderecoDAO.insertEndereco(dadosEndereco);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoEndereco)
        {

            let lastId = await enderecoDAO.lastIDEndereco()
            dadosEndereco.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            enderecoJSON.endereco  = dadosEndereco
            enderecoJSON.status = message.SUCCESS_CREATED_ITEM.status
            enderecoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            enderecoJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return enderecoJSON; // 201
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

const setExcluirEndereco = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idEndereco = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idEndereco == '' || idEndereco == undefined || isNaN(idEndereco)){
          return message.ERROR_INVALID_ID //400
      }else{
             let enderecoDeletado = await enderecoDAO.deleteEndereco(idEndereco)
  
             if(enderecoDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

 const setAtualizaEndereco = async function(id, dadosEndereco, contentType){
    
    try{
        let idEndereco = id;

        if(idEndereco == '' || idEndereco == undefined || isNaN (idEndereco)|| idEndereco == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updateEnderecoJSON = {};
            
            if(dadosEndereco.cidade == ''    || dadosEndereco.cidade == undefined                  ||  dadosEndereco.cidade == null   || dadosEndereco.cidade.length > 80 ||
            dadosEndereco.cep == '' || dadosEndereco.cep == undefined || dadosEndereco.cep == null || dadosEndereco.cep.length> 8 || 
            dadosEndereco.rua == '' || dadosEndereco.rua == undefined || dadosEndereco.rua == null || dadosEndereco.rua.length > 100 || 
            dadosEndereco.bairro == '' || dadosEndereco.bairro == undefined || dadosEndereco.bairro == null || dadosEndereco.bairro.length > 45 ||
            dadosEndereco.numero == '' || dadosEndereco.numero == undefined || dadosEndereco.numero == null || dadosEndereco.numero.length > 15
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let enderecoById = await enderecoDAO.selectEnderecobyID(id)


            if(enderecoById.length > 0){
                
                    let uptadeEndereco = await enderecoDAO.updateEndereco(id,dadosEndereco);
                    
                   
                    if(uptadeEndereco){
                      
                        updateEnderecoJSON.endereco = dadosEndereco
                        updateEnderecoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updateEnderecoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateEnderecoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return updateEnderecoJSON;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getListarEndereco,
    getBuscarEnderecoId,
    setInserirNovoEndereco,
    setExcluirEndereco,
    setAtualizaEndereco
};