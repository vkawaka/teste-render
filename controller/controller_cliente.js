const message = require('./modulo/config.js');
const clienteDAO = require('../model/DAO/cliente.js');

const getListarCLiente = async function() {
    try {
        // Criar o objeto JSON
        let clienteJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosCliente = await clienteDAO.selectAllCliente();

        // Validação para verificar se existem dados 
        if (dadosCliente) {
            // Criar o JSON para devolver para o APP
            clienteJSON.cliente = dadosCliente;
            clienteJSON.quantidade = dadosCliente.length;
            clienteJSON.status_code = 200;
            return clienteJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}


const getBuscarClienteId = async function (id){

    try{

    
    // Recebe o id do genero
    let idCliente = id;
    //Cria o objeto JSON
    let clienteJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idCliente == '' || idCliente == undefined || isNaN(idCliente)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosCliente = await clienteDAO.selectClientebyID(id)

        // verifca se o DAO retornou dados 
        if(dadosCliente){

            // Validação para verificar a quantidade de itens retornados
            if(dadosCliente.length > 0){
                 // Cria o JSON para retorno 
                 clienteJSON.cliente = dadosCliente;
                 clienteJSON.status_code = 200;

            return clienteJSON;
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


const setInserirNovoCliente = async function (dadosCliente, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let clienteJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosCliente.nome == ''    || dadosCliente.nome == undefined                  ||  dadosCliente.nome == null                        || dadosCliente.nome.length > 100 ||
    dadosCliente.email == '' || dadosCliente.email == undefined  || dadosCliente.email == null || dadosCliente.email.length > 100 ||
    dadosCliente.telefone == '' || dadosCliente.telefone == undefined || dadosCliente.telefone == null || dadosCliente.length  > 45 ||
    dadosCliente.senha == ''  || dadosCliente.senha == undefined || dadosCliente.senha == null  || dadosCliente.length > 45 ||
    dadosCliente.id_endereco == ''  || dadosCliente.id_endereco == undefined || dadosCliente.id_endereco == null 
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        // Encaminha os dados do filme para o DAO inserir dados
        let novoCliente = await clienteDAO.insertCliente(dadosCliente);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoCliente)
        {

            let lastId = await clienteDAO.lastIDCliente()
            dadosCliente.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            clienteJSON.cliente  = dadosCliente
            clienteJSON.status = message.SUCCESS_CREATED_ITEM.status
            clienteJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            clienteJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return clienteJSON; // 201
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

const setExcluirCliente = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idCliente = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idCliente == '' || idCliente == undefined || isNaN(idCliente)){
          return message.ERROR_INVALID_ID //400
      }else{
             let clienteDeletado = await clienteDAO.deleteCliente(idCliente)
  
             if(clienteDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

 const setAtualizarCliente = async function(id, dadosCliente, contentType){
    
    try{
        let idCliente = id;

        if(idCliente == '' || idCliente == undefined || isNaN (idCliente)|| idCliente == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updateClienteJSON = {};
            
            if(dadosCliente.nome == ''    || dadosCliente.nome == undefined                  ||  dadosCliente.nome == null                        || dadosCliente.nome.length > 100 ||
    dadosCliente.email == '' || dadosCliente.email == undefined  || dadosCliente.email == null || dadosCliente.email.length > 100 ||
    dadosCliente.telefone == '' || dadosCliente.telefone == undefined || dadosCliente.telefone == null || dadosCliente.length  > 45 ||
    dadosCliente.senha == ''  || dadosCliente.senha == undefined || dadosCliente.senha == null  || dadosCliente.length > 45 ||
    dadosCliente.id_endereco == ''  || dadosCliente.id_endereco == undefined || dadosCliente.id_endereco == null 
    ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let clienteById = await clienteDAO.selectClientebyID(id)


            if(clienteById.length > 0){
                
                    let uptadeCliente = await clienteDAO.updateCliente(id,dadosCliente);
                    
                   
                    if(uptadeCliente){
                      
                        updateClienteJSON.cliente = dadosCliente
                        updateClienteJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updateClienteJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateClienteJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return updateClienteJSON;
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
    getListarCLiente,
    getBuscarClienteId,
    setInserirNovoCliente,
    setExcluirCliente,
    setAtualizarCliente
};