const message = require('./modulo/config.js');
const pagamentoDAO = require('../model/DAO/pagamento.js');

const getListarPagamento = async function() {
    try {
        // Criar o objeto JSON
        let pagamentoJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosPagamento = await pagamentoDAO.selectAllPagamento();

        // Validação para verificar se existem dados 
        if (dadosPagamento) {
            // Criar o JSON para devolver para o APP
            pagamentoJSON.pagamento = dadosPagamento;
            pagamentoJSON.quantidade = dadosPagamento.length;
            pagamentoJSON.status_code = 200;
            return pagamentoJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}


const getBuscarPagamentoId = async function (id){

    try{

    
    // Recebe o id do genero
    let idPagamento = id;
    //Cria o objeto JSON
    let pagamentoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idPagamento == '' || idPagamento == undefined || isNaN(idPagamento)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosPagamento = await pagamentoDAO.selectPagamentobyID(id)

        // verifca se o DAO retornou dados 
        if(dadosPagamento){

            // Validação para verificar a quantidade de itens retornados
            if(dadosPagamento.length > 0){
                 // Cria o JSON para retorno 
                 pagamentoJSON.pagamento = dadosPagamento;
                 pagamentoJSON.status_code = 200;

            return pagamentoJSON;
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


const setInserirNovoPagamento = async function (dadosPagamento, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let pagamentoJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosPagamento.valor_total == ''    || dadosPagamento.valor_total == undefined                  ||  dadosPagamento.valor_total == null      || 
    dadosPagamento.horario_pagamento == '' || dadosPagamento.horario_pagamento == undefined  || dadosPagamento.horario_pagamento == null || dadosPagamento.horario_pagamento.length > 10 ||
    dadosPagamento.id_forma_pagamento == ''  || dadosPagamento.id_forma_pagamento == undefined ||dadosPagamento.id_forma_pagamento == null 
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        // Encaminha os dados do filme para o DAO inserir dados
        let novoPagamento = await pagamentoDAO.insertPagamento(dadosPagamento);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoPagamento)
        {

            let lastId = await pagamentoDAO.lastIDPagamento()
            dadosPagamento.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            pagamentoJSON.pagamento  = dadosPagamento
            pagamentoJSON.status = message.SUCCESS_CREATED_ITEM.status
            pagamentoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            pagamentoJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return pagamentoJSON; // 201
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

const setExcluirPagamento = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idPagamento = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idPagamento == '' || idPagamento == undefined || isNaN(idPagamento)){
          return message.ERROR_INVALID_ID //400
      }else{
             let pagamentoDeletado = await pagamentoDAO.deletePagamento(idPagamento)
  
             if(pagamentoDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

 const setAtualizarPagamento = async function(id, dadosPagamento, contentType){
    
    try{
        let idPagamento = id;

        if(idPagamento == '' || idPagamento == undefined || isNaN (idPagamento)|| idPagamento == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updatePagamentoJSON = {};
            
            if(dadosPagamento.valor_total == ''    || dadosPagamento.valor_total == undefined                  ||  dadosPagamento.valor_total == null      || 
    dadosPagamento.horario_pagamento == '' || dadosPagamento.horario_pagamento == undefined  || dadosPagamento.horario_pagamento == null || dadosPagamento.horario_pagamento.length > 10 ||
    dadosPagamento.id_forma_pagamento == ''  || dadosPagamento.id_forma_pagamento == undefined ||dadosPagamento.id_forma_pagamento == null 
    ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let pagamentoById = await pagamentoDAO.selectPagamentobyID(id)


            if(pagamentoById.length > 0){
                
                    let uptadePagamento = await pagamentoDAO.updatePagamento(id,dadosPagamento);
                    
                   
                    if(uptadePagamento){
                      
                        updatePagamentoJSON.pagamento = dadosPagamento
                        updatePagamentoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updatePagamentoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updatePagamentoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return updatePagamentoJSON;
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
    getListarPagamento,
    getBuscarPagamentoId,
    setInserirNovoPagamento,
    setExcluirPagamento,
    setAtualizarPagamento
};