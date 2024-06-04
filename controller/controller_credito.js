
const message = require('./modulo/config.js');
const creditoDAO = require('../model/DAO/credito.js');

const getListarCredito = async function() {
    try {
        // Criar o objeto JSON
        let creditoJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosCredito = await creditoDAO.selectAllCredito();
        console.log(dadosCredito);

        // Validação para verificar se existem dados 
        if (dadosCredito) {
            // Criar o JSON para devolver para o APP
            creditoJSON.credito = dadosCredito;
            creditoJSON.quantidade = dadosCredito.length;
            creditoJSON.status_code = 200;
            return creditoJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getBuscarCreditoId = async function (id){

    try{

    
    // Recebe o id do genero
    let idCredito = id;
    //Cria o objeto JSON
    let creditoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idCredito == '' || idCredito == undefined || isNaN(idCredito)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosCredito = await creditoDAO.selectCreditobyID(id)

        // verifca se o DAO retornou dados 
        if(dadosCredito){

            // Validação para verificar a quantidade de itens retornados
            if(dadosCredito.length > 0){
                 // Cria o JSON para retorno 
                 creditoJSON.credito = dadosCredito;
                 creditoJSON.status_code = 200;

            return creditoJSON;
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

const setInserirNovoCredito = async function (dadosCredito, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let creditoJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosCredito.numero == ''    || dadosCredito.numero  == undefined                  ||  dadosCredito.numero == null  || dadosCredito.numero.length > 30 ||
        dadosCredito.nome_titular == '' || dadosCredito.nome_titular == undefined || dadosCredito.nome_titular == null || dadosCredito.nome_titular.length> 100 || 
        dadosCredito.validade == '' || dadosCredito.validade == undefined || dadosCredito.validade == null || dadosCredito.validade.length > 10 || 
        dadosCredito.cvv == '' || dadosCredito.cvv == undefined || dadosCredito.cvv == null || dadosCredito.cvv.length > 3
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        // Encaminha os dados do filme para o DAO inserir dados
        let novoCredito = await creditoDAO.insertCredito(dadosCredito);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoCredito)
        {

            let lastId = await creditoDAO.lastIDCredito()
            dadosCredito.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            creditoJSON.credito  = dadosCredito
            creditoJSON.status = message.SUCCESS_CREATED_ITEM.status
            creditoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            creditoJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return creditoJSON; // 201
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

const setExcluirCredito = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idCredito = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idCredito == '' || idCredito == undefined || isNaN(idCredito)){
          return message.ERROR_INVALID_ID //400
      }else{
             let creditoDeletado = await creditoDAO.deleteCredito(idCredito)
  
             if(creditoDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

 const setAtualizaCredito = async function(id, dadosCredito, contentType){
    
    try{
        let idCredito = id;

        if(idCredito == '' || idCredito == undefined || isNaN (idCredito)|| idCredito == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updateCreditoJSON = {};
            
            if(dadosCredito.numero == ''    || dadosCredito.numero  == undefined                  ||  dadosCredito.numero == null  || dadosCredito.numero.length > 30 ||
        dadosCredito.nome_titular == '' || dadosCredito.nome_titular == undefined || dadosCredito.nome_titular == null || dadosCredito.nome_titular.length> 100 || 
        dadosCredito.validade == '' || dadosCredito.validade == undefined || dadosCredito.validade == null || dadosCredito.validade.length > 10 || 
        dadosCredito.cvv == '' || dadosCredito.cvv == undefined || dadosCredito.cvv == null || dadosCredito.cvv.length > 3
    ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let creditoById = await creditoDAO.selectCreditobyID(id)


            if(creditoById.length > 0){
                
                    let uptadeCredito = await creditoDAO.updateCredito(id,dadosCredito);
                    
                   
                    if(uptadeCredito){
                      
                        updateCreditoJSON.credito = dadosCredito
                        updateCreditoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updateCreditoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateCreditoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return updateCreditoJSON;
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
    getListarCredito,
    getBuscarCreditoId,
    setInserirNovoCredito,
    setExcluirCredito,
    setAtualizaCredito
};