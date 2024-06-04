
const message = require('./modulo/config.js');
const debitoDAO = require('../model/DAO/debito.js');

const getListarDebito = async function() {
    try {
        // Criar o objeto JSON
        let debitoJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosDebito = await debitoDAO.selectAllDebito();
        console.log(dadosDebito);

        // Validação para verificar se existem dados 
        if (dadosDebito) {
            // Criar o JSON para devolver para o APP
            debitoJSON.debito = dadosDebito;
            debitoJSON.quantidade = dadosDebito.length;
            debitoJSON.status_code = 200;
            return debitoJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getBuscarDebitoId = async function (id){

    try{

    
    // Recebe o id do genero
    let idDebito = id;
    //Cria o objeto JSON
    let debitoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idDebito == '' || idDebito == undefined || isNaN(idDebito)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosDebito = await debitoDAO.selectDebitobyID(id)

        // verifca se o DAO retornou dados 
        if(dadosDebito){

            // Validação para verificar a quantidade de itens retornados
            if(dadosDebito.length > 0){
                 // Cria o JSON para retorno 
                 debitoJSON.debito = dadosDebito;
                 debitoJSON.status_code = 200;

            return debitoJSON;
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

const setInserirNovoDebito = async function (dadosDebito, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let debitoJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosDebito.numero == ''    || dadosDebito.numero  == undefined                  ||  dadosDebito.numero == null  || dadosDebito.numero.length > 30 ||
    dadosDebito.nome_titular == '' || dadosDebito.nome_titular == undefined || dadosDebito.nome_titular == null || dadosDebito.nome_titular.length> 100 || 
    dadosDebito.validade == '' || dadosDebito.validade == undefined || dadosDebito.validade == null || dadosDebito.validade.length > 10 || 
    dadosDebito.cvv == '' || dadosDebito.cvv == undefined || dadosDebito.cvv == null || dadosDebito.cvv.length > 3
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        // Encaminha os dados do filme para o DAO inserir dados
        let novoDebito = await debitoDAO.insertDebito(dadosDebito);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoDebito)
        {

            let lastId = await debitoDAO.lastIDDebito()
            dadosDebito.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            debitoJSON.debito  = dadosDebito
            debitoJSON.status = message.SUCCESS_CREATED_ITEM.status
            debitoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            debitoJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return debitoJSON; // 201
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

const setExcluirDebito = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idDebito = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idDebito == '' || idDebito == undefined || isNaN(idDebito)){
          return message.ERROR_INVALID_ID //400
      }else{
             let debitoDeletado = await debitoDAO.deleteDebito(idDebito)
  
             if(debitoDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

 const setAtualizaDebito = async function(id, dadosDebito, contentType){
    
    try{
        let idDebito = id;

        if(idDebito == '' || idDebito == undefined || isNaN (idDebito)|| idDebito == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updateDebitoJSON = {};
            
            if(dadosDebito.numero == ''    || dadosDebito.numero  == undefined                  ||  dadosDebito.numero == null  || dadosDebito.numero.length > 30 ||
            dadosDebito.nome_titular == '' || dadosDebito.nome_titular == undefined || dadosDebito.nome_titular == null || dadosDebito.nome_titular.length> 100 || 
            dadosDebito.validade == '' || dadosDebito.validade == undefined || dadosDebito.validade == null || dadosDebito.validade.length > 10 || 
            dadosDebito.cvv == '' || dadosDebito.cvv == undefined || dadosDebito.cvv == null || dadosDebito.cvv.length > 3
            ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let debitoById = await debitoDAO.selectDebitobyID(id)


            if(debitoById.length > 0){
                
                    let uptadeDebito = await debitoDAO.updateDebito(id,dadosDebito);
                    
                   
                    if(uptadeDebito){
                      
                        updateDebitoJSON.debito = dadosDebito
                        updateDebitoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updateDebitoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateDebitoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return updateDebitoJSON;
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
    getListarDebito,
    getBuscarDebitoId,
    setInserirNovoDebito,
    setExcluirDebito,
    setAtualizaDebito
};