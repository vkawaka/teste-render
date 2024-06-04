const message = require('./modulo/config.js');
const ingredienteDAO = require('../model/DAO/ingrediente.js')

const getListarIngrediente = async function() {
    try {
        let ingredienteJSON = {};
        
        let dadosIngredientes = await ingredienteDAO.selectAllIngrediente()

        if (dadosIngredientes) {
            ingredienteJSON.ingrediente = dadosIngredientes;
            ingredienteJSON.quantidade = dadosIngredientes.length;
            ingredienteJSON.status_code = 200;
            return ingredienteJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getBuscarIngredienteId = async function (id){
    try{
    let idI = id;
    let ingredienteJSON = {};

    if(idI == '' || idI == undefined || isNaN(idI)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosIngrediente = await ingredienteDAO.selectIngredientebyID(idI)

        if(dadosIngrediente){
            
            if(dadosIngrediente.length > 0){
                ingredienteJSON.ingrediente = dadosIngrediente;
                ingredienteJSON.status_code = 200;
                return ingredienteJSON;
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

const setInserirNovoIngrediente = async function (dadosIngrediente, contentType ){
    try{
    if(String(contentType).toLowerCase() == 'application/json'){
    let ingredienteJSON = {};
    
    if
    (dadosIngrediente.nome == ''    || dadosIngrediente.nome == undefined                  ||  dadosIngrediente.nome == null                 || dadosIngrediente.nome.length > 100 ||
    dadosIngrediente.quantidade == '' || dadosIngrediente.quantidade == undefined  || dadosIngrediente.quantidade == null ||
    dadosIngrediente.tabela_nutricional == ''  || dadosIngrediente.tabela_nutricional == undefined || dadosIngrediente.tabela_nutricional == null  || dadosIngrediente.tabela_nutricional.length > 150
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let novoIngrediente = await ingredienteDAO.insertIngrediente(dadosIngrediente)
        if 
        (novoIngrediente){
            let lastId = await ingredienteDAO.lastIDIngrediente()
            let ingrediente = await ingredienteDAO.selectIngredientebyID(lastId[0].id_ingrediente)        

            ingredienteJSON.ingrediente  = ingrediente
            ingredienteJSON.status = message.SUCCESS_CREATED_ITEM.status
            ingredienteJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            ingredienteJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return ingredienteJSON;
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

const setExcluirIngrediente = async(id) => {
    try {
        let idI = id
        if(idI == '' || idI == undefined || isNaN(idI)){
            return message.ERROR_INVALID_ID
        }else{
            let existe = await ingredienteDAO.selectIngredientebyID(idI)
            if
            (existe){
                let deletado = await ingredienteDAO.deleteIngrediente(idI)
                return message.SUCCESS_DELETED_ITEM
                // if(deletado){
                //     return message.SUCCESS_DELETED_ITEM
                // }else{
                //     return message.ERROR_INTERNAL_SERVER_DB
                // }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

const setAtualizarIngrediente = async function(id, dados, contentType){
    try{
        let idI = id;
        if
        (idI == '' || idI == undefined || isNaN(idI)|| idI == null){
            return message.ERROR_INVALID_ID
        }else{
            if
            (String(contentType).toLowerCase() == 'application/json'){
                let attIJSON = {};
                if
                (dados.nome == ''               || dados.nome == undefined               ||  dados.nome == null               || dados.nome.length > 100 ||
                dados.quantidade == ''          || dados.quantidade == undefined         || dados.quantidade == null          ||
                dados.tabela_nutricional == ''  || dados.tabela_nutricional == undefined || dados.tabela_nutricional == null  || dados.tabela_nutricional.length > 150){
                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    let existe = await ingredienteDAO.selectIngredientebyID(idI)
                    if
                    (existe.length > 0){
                        let att = await ingredienteDAO.updateIngrediente(idI, dados)
                        if
                        (att){
                            let dadoAtt = await ingredienteDAO.selectIngredientebyID(idI)
                            attIJSON.ingrediente = dadoAtt
                            attIJSON.status = message.SUCCESS_UPDATED_ITEM.status
                            attIJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            attIJSON.message = message.SUCCESS_UPDATED_ITEM.message
                            return attIJSON;
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE
            }
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getListarIngrediente,
    getBuscarIngredienteId,
    setInserirNovoIngrediente,
    setExcluirIngrediente,
    setAtualizarIngrediente
};