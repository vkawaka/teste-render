/****************************************************************
 * Objetivo: Arquivo responsavel pelos endpoints
 * Data: 16/05/2024
 * Autor: Cauã, Ricardo, Gabrielle e Nathalia
 * Versão: 1.0
 ****************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) =>{

    // Permite especificar quem podera acessar a API ('*' = Liberar acesso público, 'IP' = Liberar acesso apenas para aquela maquina);
    response.header('Access-Control-Allow-Origin', '*')

    // Permite especificar como a API, sera requisitada ('GET', 'POST', 'PUT' e 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa as confgurações de cors
    app.use(cors())


    next()
})

/*********************** Import dos arquivos de controller do projeto ***********************************/
const controllerProduto = require('./controller/controller_produto.js')
const controllerCategoria = require('./controller/controller_categoria.js')
const controllerCliente = require('./controller/controller_cliente.js')
const controllerEndereco = require('./controller/controller_endereco.js')
const controllerUsuario = require('./controller/controlller_usuario.js')
const controllerIngrediente = require('./controller/controller_ingrediente.js')
const controllerPedidos = require('./controller/controller_pedidos.js')

/*******************************************************************************************************/

// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()


//       --------------------   CRUD PRODUTOS  ---------------------        //


    // -> EndPoint: Versão 2.0 - Retorna os dados de produtos do Banco de Dados
    app.get('/v1/lanchonete/produtos', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosProduto = await controllerProduto.getListarProdutos()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosProduto.status_code)
        response.json(dadosProduto)
    })


    // // EndPoint: ele retorna os dados pelo id
    app.get('/v1/lanchonete/produto/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idProduto = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosProduto = await controllerProduto.getBuscarProdutoId(idProduto)

        
        response.status(dadosProduto.status_code)
        response.json(dadosProduto)
    })

    // //EndPoint: Ele insere dados sobre o filme
    app.post('/v1/lanchonete/produto', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoProduto = await controllerProduto.setInserirNovoProduto(dadosBody, contentType)
        
        response.status(resultDadosNovoProduto.status_code)
        response.json(resultDadosNovoProduto)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v1/lanchonete/produto/:id', cors(), async function(request, response, next){
        let idProduto = request.params.id

        let dadosProduto = await controllerProduto.setExcluirProduto(idProduto)

        response.status(dadosProduto.status_code)
        response.json(dadosProduto)
    })

    app.put('/v1/lanchonete/produto/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idProduto = request.params.id

        let dadosProduto = await controllerProduto.setAtualizarProduto(idProduto, dadosBody, contentType)
        
        response.status(dadosProduto.status_code)
        response.json(dadosProduto)
    })


    //       --------------------   CRUD CATEGORIA  ---------------------        //

    app.get('/v1/lanchonete/categoria', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosCategoria = await controllerCategoria.getListarCategoria()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosCategoria.status_code)
        response.json(dadosCategoria)
    })


    app.get('/v1/lanchonete/categoria/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idCategoria = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosCategoria = await controllerCategoria.getBuscarCategoriaId(idCategoria)

        
        response.status(dadosCategoria.status_code)
        response.json(dadosCategoria)
    })


    app.post('/v1/lanchonete/categoria', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovaCategoria = await controllerCategoria.setInserirNovaCategoria(dadosBody, contentType)
        
        response.status(resultDadosNovaCategoria.status_code)
        response.json(resultDadosNovaCategoria)
    })


    app.delete('/v1/lanchonete/categoria/:id', cors(), async function(request, response, next){
        let idCategoria = request.params.id

        let dadosCategoria = await controllerCategoria.setExcluirCategoria(idCategoria)

        response.status(dadosCategoria.status_code)
        response.json(dadosCategoria)
    })



     //       --------------------   CRUD CLIENTES  ---------------------        //


     app.get('/v1/lanchonete/cliente', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosCliente = await controllerCliente.getListarCLiente()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })


    app.get('/v1/lanchonete/cliente/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idCliente = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosCliente = await controllerCliente.getBuscarClienteId(idCliente)

        
        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })


    app.post('/v1/lanchonete/cliente', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoCliente = await controllerCliente.setInserirNovoCliente(dadosBody, contentType)
        
        response.status(resultDadosNovoCliente.status_code)
        response.json(resultDadosNovoCliente)
    })


    app.delete('/v1/lanchonete/cliente/:id', cors(), async function(request, response, next){
        let idCliente = request.params.id

        let dadosCliente = await controllerCliente.setExcluirCliente(idCliente)

        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })

     app.put('/v2/lanchonete/cliente/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idCliente = request.params.id

        let dadosCliente = await controllerCliente.setAtualizarCliente(idCliente, dadosBody, contentType)

        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })



        //       --------------------   CRUD ENDERECO  ---------------------        //


        app.get('/v1/lanchonete/endereco', cors(), async function(request, response){

            // -> Chama a função da controller para retornar todos os filmes
            let dadosEndereco = await controllerEndereco.getListarEndereco()
    
            // -> validação para verificar se existem dados a serem retornados
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })
    
    
        app.get('/v1/lanchonete/endereco/:id', cors(), async function(request, response, next){
    
            // Recebe o id da requisição
            let idEndereco = request.params.id
            // Encaminha o ID para a controller buscar o Filme
            let dadosEndereco = await controllerEndereco.getBuscarEnderecoId(idEndereco)
    
            
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })
    
    
        app.post('/v1/lanchonete/endereco', cors(), bodyParserJSON, async function(request, response){
    
            // Recebe o content-type da requisição
            let contentType = request.headers['content-type']
    
            //Recebe todos os dados encaminhados na requisição pelo Body
            let dadosBody = request.body
    
            //Encaminha os dados para a controller enviar para o DAO
            let resultDadosNovoEndereco = await controllerEndereco.setInserirNovoEndereco(dadosBody, contentType)
            
            response.status(resultDadosNovoEndereco.status_code)
            response.json(resultDadosNovoEndereco)
        })
    
    
        app.delete('/v1/lanchonete/endereco/:id', cors(), async function(request, response, next){
            let idEndereco = request.params.id
    
            let dadosEndereco = await controllerEndereco.setExcluirEndereco(idEndereco)
    
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })
    
         app.put('/v1/lanchonete/endereco/:id', cors(), bodyParserJSON, async function(request, response){
            let contentType = request.headers['content-type']
            let dadosBody = request.body
            let idEndereco = request.params.id
    
            let dadosEndereco = await controllerEndereco.setAtualizaEndereco(idEndereco, dadosBody, contentType)
    
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })




            //       --------------------   CRUD USUARIO  ---------------------        //
    


            
        app.get('/v1/lanchonete/usuario', cors(), async function(request, response){

            // -> Chama a função da controller para retornar todos os filmes
            let dadosUsario = await controllerUsuario.getListarUsuario()
    
            // -> validação para verificar se existem dados a serem retornados
            response.status(dadosUsario.status_code)
            response.json(dadosUsario)
        })
    
    
        app.get('/v1/lanchonete/usuario/:id', cors(), async function(request, response, next){
    
            // Recebe o id da requisição
            let idUsuario = request.params.id
            // Encaminha o ID para a controller buscar o Filme
            let dadosUsario = await controllerUsuario.getBuscarUsuarioId(idUsuario)
    
            
            response.status(dadosUsario.status_code)
            response.json(dadosUsario)
        })
    
    
        app.post('/v1/lanchonete/usuario', cors(), bodyParserJSON, async function(request, response){
    
            // Recebe o content-type da requisição
            let contentType = request.headers['content-type']
    
            //Recebe todos os dados encaminhados na requisição pelo Body
            let dadosBody = request.body
    
            //Encaminha os dados para a controller enviar para o DAO
            let resultDadosNovoUsuario = await controllerUsuario.setInserirNovoUsuario(dadosBody, contentType)
            
            response.status(resultDadosNovoUsuario.status_code)
            response.json(resultDadosNovoUsuario)
        })
    
    
        app.delete('/v1/lanchonete/usuario/:id', cors(), async function(request, response, next){
            let idUsuario = request.params.id
    
            let dadosUsario = await controllerUsuario.setExcluirUsuario(idUsuario)
    
            response.status(dadosUsario.status_code)
            response.json(dadosUsario)
        })
    
         app.put('/v1/lanchonete/usuario/:id', cors(), bodyParserJSON, async function(request, response){
            let contentType = request.headers['content-type']
            let dadosBody = request.body
            let idUsuario = request.params.id
    
            let dadosUsario = await controllerUsuario.setAtualizarUsuario(idUsuario, dadosBody, contentType)
    
            response.status(dadosUsario.status_code)
            response.json(dadosUsario)
        })

        //       --------------------   CRUD CREDITO  ---------------------        //

    app.get('/v1/lanchonete/credito', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosCredito= await controllerCredito.getListarCredito()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosCredito.status_code)
        response.json(dadosCredito)
    })


    app.get('/v1/lanchonete/credito/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idCredito = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosCredito = await controllerCredito.getBuscarCreditoId(idCredito)

        
        response.status(dadosCredito.status_code)
        response.json(dadosCredito)
    })


    app.post('/v1/lanchonete/credito', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoCredito = await controllerCredito.setInserirNovoCredito(dadosBody, contentType)
        
        response.status(resultDadosNovoCredito.status_code)
        response.json(resultDadosNovoCredito)
    })


    app.delete('/v1/lanchonete/credito/:id', cors(), async function(request, response, next){
        let idCredito = request.params.id

        let dadosCredito = await controllerCredito.setExcluirCredito(idCredito)

        response.status(dadosCredito.status_code)
        response.json(dadosCredito)
    })

     app.put('/v1/lanchonete/credito/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idCredito = request.params.id

        let dadosCredito = await controllerCredito.setAtualizaCredito(idCredito, dadosBody, contentType)

        response.status(dadosCredito.status_code)
        response.json(dadosCredito)
    })


    
    //       --------------------   CRUD DEBITO  ---------------------        //

    app.get('/v1/lanchonete/debito', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosDebito = await controllerDebito.getListarDebito()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosDebito.status_code)
        response.json(dadosDebito)
    })


    app.get('/v1/lanchonete/debito/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idDebito = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosDebito = await controllerDebito.getBuscarDebitoId(idDebito)

        
        response.status(dadosDebito.status_code)
        response.json(dadosDebito)
    })


    app.post('/v1/lanchonete/debito', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoDebito = await controllerDebito.setInserirNovoDebito(dadosBody, contentType)
        
        response.status(resultDadosNovoDebito.status_code)
        response.json(resultDadosNovoDebito)
    })


    app.delete('/v1/lanchonete/debito/:id', cors(), async function(request, response, next){
        let idDebito = request.params.id

        let dadosDebito = await controllerDebito.setExcluirDebito(idDebito)

        response.status(dadosDebito.status_code)
        response.json(dadosDebito)
    })

     app.put('/v1/lanchonete/debito/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idDebito = request.params.id

        let dadosDebito = await controllerDebito.setAtualizaDebito(idDebito, dadosBody, contentType)

        response.status(dadosDebito.status_code)
        response.json(dadosDebito)
    })


    //       --------------------   CRUD PAGAMENTO  ---------------------        //

    app.get('/v1/lanchonete/pagamento', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosPagamento = await controllerPagamento.getListarPagamento()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosPagamento.status_code)
        response.json(dadosPagamento)
    })


    app.get('/v1/lanchonete/pagamento/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idPagamento = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosPagamento = await controllerPagamento.getBuscarPagamentoId(idPagamento)

        
        response.status(dadosPagamento.status_code)
        response.json(dadosPagamento)
    })


    app.post('/v1/lanchonete/pagamento', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoPagamento = await controllerPagamento.setInserirNovoPagamento(dadosBody, contentType)
        
        response.status(resultDadosNovoPagamento.status_code)
        response.json(resultDadosNovoPagamento)
    })


    app.delete('/v1/lanchonete/pagamento/:id', cors(), async function(request, response, next){
        let idPagamento = request.params.id

        let dadosPagamento = await controllerPagamento.setExcluirPagamento(idPagamento)

        response.status(dadosPagamento.status_code)
        response.json(dadosPagamento)
    })

     app.put('/v1/lanchonete/pagamento/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idPagamento = request.params.id

        let dadosPagamento = await controllerPagamento.setAtualizarPagamento(idPagamento, dadosBody, contentType)

        response.status(dadosPagamento.status_code)
        response.json(dadosPagamento)
    })

    //       --------------------   CRUD INGREDIENTE  ---------------------        //

    app.get('/v1/lanchonete/ingrediente', cors(), async function(request, response){
        let dadosPagamento = await controllerIngrediente.getListarIngrediente()

        response.status(dadosPagamento.status_code)
        response.json(dadosPagamento)
    })


    app.get('/v1/lanchonete/ingrediente/:id', cors(), async function(request, response, next){
        let idI = request.params.id
        let dados = await controllerIngrediente.getBuscarIngredienteId(idI)
        response.status(dados.status_code)
        response.json(dados)
    })


    app.post('/v1/lanchonete/ingrediente', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let resultDadosIngrediente = await controllerIngrediente.setInserirNovoIngrediente(dadosBody, contentType)
        
        response.status(resultDadosIngrediente.status_code)
        response.json(resultDadosIngrediente)
    })


    app.delete('/v1/lanchonete/ingrediente/:id', cors(), async function(request, response, next){
        let idI = request.params.id

        let dados = await controllerIngrediente.setExcluirIngrediente(idI)

        response.status(dados.status_code)
        response.json(dados)
    })

     app.put('/v1/lanchonete/ingrediente/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let id = request.params.id

        let dados = await controllerIngrediente.setAtualizarIngrediente(id, dadosBody, contentType)

        response.status(dados.status_code)
        response.json(dados)
    })

    //       --------------------   CRUD PEDIDOS  ---------------------        //

    app.get('/v1/lanchonete/pedidos', cors(), async function(request, response){
        let dados = await controllerPedidos.getListarPedidos()

        response.status(dados.status_code)
        response.json(dados)
    })


    app.get('/v1/lanchonete/pedidos/:id', cors(), async function(request, response, next){
        let idP = request.params.id
        let dados = await controllerPedidos.getBuscarPedidoId(idP)
        response.status(dados.status_code)
        response.json(dados)
    })


    app.post('/v1/lanchonete/pedidos/:id_c/:id_p', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idC = request.params.id_c
        let idP = request.params.id_p
        let result = await controllerPedidos.setInserirNovoPedido(idC, idP, dadosBody, contentType)
        
        response.status(result.status_code)
        response.json(result)
    })


    app.delete('/v1/lanchonete/pedidos/:id', cors(), async function(request, response, next){
        let idI = request.params.id

        let dados = await controllerPedidos.setExcluirPedido(idI)

        response.status(dados.status_code)
        response.json(dados)
    })

     app.put('/v1/lanchonete/pedidos/:idPedido/:id_c/:id_p', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let id = request.params.idPedido
        let idC = request.params.id_c
        let idP = request.params.id_p

        let dados = await controllerPedidos.setAtualizarPedido(id, idC, idP, dadosBody, contentType)
        response.status(dados.status_code)
        response.json(dados)
    })

        console.log('lol')

    app.listen('8080', function(){
        console.log('API funcionando!!')
    })