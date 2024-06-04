const message = require('./modulo/config.js');
const pedidoDAO = require('../model/DAO/pedidos.js')

const getListarPedidos = async function() {
    try {
        let pedidosJSON = {};
        
        let dadosPedidos = await pedidoDAO.selectAllPedidos()

        if (dadosPedidos) {
            pedidosJSON.pedidos = dadosPedidos;
            pedidosJSON.quantidade = dadosPedidos.length;
            pedidosJSON.status_code = 200;
            return pedidosJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getBuscarPedidoId = async function (id){
    try{
    let idP = id;
    let pedidoJSON = {};

    if(idP == '' || idP == undefined || isNaN(idP)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosPedido = await pedidoDAO.selectPedidobyID(idP)

        if(dadosPedido){
            
            if(dadosPedido.length > 0){
                pedidoJSON.pedido = dadosPedido;
                pedidoJSON.status_code = 200;
                return pedidoJSON;
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

const setInserirNovoPedido = async function (id_c, id_p, dadosPedido, contentType ){
    try{
    if(String(contentType).toLowerCase() == 'application/json'){
    let pedidoJSON = {};
    let id_cliente = id_c
    let id_pagamento = id_p
    
    if
    (dadosPedido.data_pedido == ''    || dadosPedido.data_pedido == undefined                  ||  dadosPedido.data_pedido == null                 || dadosPedido.data_pedido.length > 10 ||
    dadosPedido.tempo_entrega == '' || dadosPedido.tempo_entrega == undefined  || dadosPedido.tempo_entrega == null || dadosPedido.tempo_entrega.length > 8 ||
    dadosPedido.taxa_entrega == ''  || dadosPedido.taxa_entrega == undefined || dadosPedido.taxa_entrega == null  || dadosPedido.taxa_entrega.length > 10 ||
    id_cliente == ''  || id_cliente == undefined || id_cliente == null  || isNaN(id_cliente) ||
    id_pagamento == ''  || id_pagamento == undefined || id_pagamento == null  || isNaN(id_pagamento) 
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let validate = false
        if
        (dadosPedido.desconto != ''  && dadosPedido.desconto != undefined && dadosPedido.desconto != null){
            if
            (dadosPedido.desconto.length > 2){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                validate = true
            }
        }else{
            validate = true
        }
        if
        (validate){
            dadosPedido.id_cliente = id_cliente
            dadosPedido.id_pagamento = id_pagamento
            let novoPedido = await pedidoDAO.insertPedido(dadosPedido)
            if 
            (novoPedido){
                let lastId = await pedidoDAO.lastIDPedido(dadosPedido)
                let pedido = await pedidoDAO.selectPedidobyID(lastId[0].id_pedido)      

                pedidoJSON.pedido  = pedido
                pedidoJSON.status = message.SUCCESS_CREATED_ITEM.status
                pedidoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                pedidoJSON.message = message.SUCCESS_CREATED_ITEM.message 

                return pedidoJSON;
        }
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

const setExcluirPedido = async(id) => {
    try {
        let idP = id
        if(idP == '' || idP == undefined || isNaN(idP)){
            return message.ERROR_INVALID_ID
        }else{
            let existe = await pedidoDAO.selectPedidobyID(idP)
            if
            (existe){
                let deletado = await pedidoDAO.deletePedido(idP)
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

const setAtualizarPedido = async function(idPedido, id_c, id_p, dadosPedido, contentType){
    try{
        let idI = idPedido;
        let id_cliente = id_c
        let id_pagamento = id_p
        if
        (idI == '' || idI == undefined || isNaN(idI)|| idI == null){
            return message.ERROR_INVALID_ID
        }else{
            if
            (String(contentType).toLowerCase() == 'application/json'){
                let attPJSON = {};
                if
                (dadosPedido.data_pedido == ''    || dadosPedido.data_pedido == undefined                  ||  dadosPedido.data_pedido == null                 || dadosPedido.data_pedido.length > 10 ||
                dadosPedido.tempo_entrega == '' || dadosPedido.tempo_entrega == undefined  || dadosPedido.tempo_entrega == null || dadosPedido.tempo_entrega.length > 8 ||
                dadosPedido.taxa_entrega == ''  || dadosPedido.taxa_entrega == undefined || dadosPedido.taxa_entrega == null  || dadosPedido.taxa_entrega.length > 10 ||
                id_cliente == ''  || id_cliente == undefined || id_cliente == null  || isNaN(id_cliente) ||
                id_pagamento == ''  || id_pagamento == undefined || id_pagamento == null  || isNaN(id_pagamento)){
                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    let validate = false
                    if
                        (dadosPedido.desconto != '' && dadosPedido.desconto != undefined && dadosPedido.desconto != null) {
                        if
                            (dadosPedido.desconto.length > 2) {
                            return message.ERROR_REQUIRED_FIELDS
                        } else {
                            validate = true
                        }
                    } else {
                        validate = true
                    }
                    if
                    (validate){
                        let existe = await pedidoDAO.selectPedidobyID(idI)
                        if
                            (existe.length > 0) {
                            dadosPedido.id_cliente = id_cliente
                            dadosPedido.id_pagamento = id_pagamento
                            let att = await pedidoDAO.updatePedido(idI, dadosPedido)
                            if
                                (att) {
                                let dadoAtt = await pedidoDAO.selectPedidobyID(idI)
                                attPJSON.pedido = dadoAtt
                                attPJSON.status = message.SUCCESS_UPDATED_ITEM.status
                                attPJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                                attPJSON.message = message.SUCCESS_UPDATED_ITEM.message
                                return attPJSON;
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        } else {
                            return message.ERROR_NOT_FOUND
                        }
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
    getListarPedidos,
    getBuscarPedidoId,
    setInserirNovoPedido,
    setExcluirPedido,
    setAtualizarPedido
};