const message = require('./modulo/config.js');
const usuarioDAO = require('../model/DAO/usuario.js');

const getListarUsuario = async function() {
    try {
        // Criar o objeto JSON
        let usuarioJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosUsuario = await usuarioDAO.selectAllUsuario();

        // Validação para verificar se existem dados 
        if (dadosUsuario) {
            // Criar o JSON para devolver para o APP
            usuarioJSON.usuario = dadosUsuario;
            usuarioJSON.quantidade = dadosUsuario.length;
            usuarioJSON.status_code = 200;
            return usuarioJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}


const getBuscarUsuarioId = async function (id){

    try{

    
    // Recebe o id do genero
    let idUsuario = id;
    //Cria o objeto JSON
    let usuarioJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosUsario = await usuarioDAO.selectUsuariobyID(id)

        // verifca se o DAO retornou dados 
        if(dadosUsario){

            // Validação para verificar a quantidade de itens retornados
            if(dadosUsario.length > 0){
                 // Cria o JSON para retorno 
                 usuarioJSON.usuario = dadosUsario;
                 usuarioJSON.status_code = 200;

            return usuarioJSON;
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


const setInserirNovoUsuario = async function (dadosUsuario, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let usuarioJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosUsuario.cargo == ''    || dadosUsuario.cargo == undefined                  ||  dadosUsuario.cargo == null                 || dadosUsuario.cargo.length > 100 ||
    dadosUsuario.email == '' || dadosUsuario.email == undefined  || dadosUsuario.email == null || dadosUsuario.email.length > 100 ||
    dadosUsuario.senha == ''  || dadosUsuario.senha == undefined || dadosUsuario.senha == null  || dadosUsuario.length > 45
    
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        // Encaminha os dados do filme para o DAO inserir dados
        let novoUsuario = await usuarioDAO.insertUsuario(dadosUsuario);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoUsuario)
        {

            let lastId = await usuarioDAO.lastIDUsuario()
            dadosUsuario.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            usuarioJSON.usuario  = dadosUsuario
            usuarioJSON.status = message.SUCCESS_CREATED_ITEM.status
            usuarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            usuarioJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return usuarioJSON; // 201
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

const setExcluirUsuario = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idUsuario = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)){
          return message.ERROR_INVALID_ID //400
      }else{
             let usuarioDeletado = await usuarioDAO.deleteUsuario(idUsuario)
  
             if(usuarioDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

 const setAtualizarUsuario = async function(id, dadosUsuario, contentType){
    
    try{
        let idUsuario = id;

        if(idUsuario == '' || idUsuario == undefined || isNaN (idUsuario)|| idUsuario == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updateUsuarioJSON = {};
            
            if(dadosUsuario.cargo == ''    || dadosUsuario.cargo == undefined                  ||  dadosUsuario.cargo == null                 || dadosUsuario.cargo.length > 100 ||
            dadosUsuario.email == '' || dadosUsuario.email == undefined  || dadosUsuario.email == null || dadosUsuario.email.length > 100 ||
            dadosUsuario.senha == ''  || dadosUsuario.senha == undefined || dadosUsuario.senha == null  || dadosUsuario.length > 45 
            ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let usuarioById = await usuarioDAO.selectUsuariobyID(id)


            if(usuarioById.length > 0){
                
                    let uptadeUsuario = await usuarioDAO.updateUsuario(id,dadosUsuario);
                    
                   
                    if(uptadeUsuario){
                      
                        updateUsuarioJSON.usuario = dadosUsuario
                        updateUsuarioJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updateUsuarioJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateUsuarioJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return  updateUsuarioJSON;
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
    getListarUsuario,
    getBuscarUsuarioId,
    setInserirNovoUsuario,
    setExcluirUsuario,
    setAtualizarUsuario
};