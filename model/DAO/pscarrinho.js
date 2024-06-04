
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectCarrinhoByCliente = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select tbl_produto.nome, tbl_produto.descricao, tbl_produto.valor, tbl_pedidos.desconto from tbl_produto 
        join tbl_pedido_produto on tbl_pedido_produto.id_produto = tbl_produto.id_produto 
        join tbl_pedidos on tbl_pedido_produto.id_pedido = tbl_pedidos.id_pedido
        where tbl_pedidos.id_cliente = ${id};`;

        // Executa no banco de dados o script sql
        let rs = await prisma.$queryRawUnsafe(sql);

            return rs;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertCarrinho = async function(id_categoria, id_produto) {
    try {
        let sql = `INSERT INTO tbl_categoria_produto (id_categoria, id_produto) VALUES ('${id_categoria}', '${id_produto}')`

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result)
            return true;
        else
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }

}


const updateCarrinho = async function(id, id_produto, bool) {
    try {
        let sql;

         sql = `UPDATE tbl_pedido_produto set id_pedido = ${id}, id_produto = ${id_produto}, status_view = ${bool} where id_pedido = ${id};`; 
                            

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result)
            return true;
        else
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }

}


const deleteCarrinho = async(id) =>{
    try{

        let sql = `delete from tbl_pedido where id_produto = ${id}`
       
        let rsdelete = await prisma.$executeRawUnsafe(sql)
       return rsdelete
    
        } catch(error){
            return false
        }
}

module.exports ={
    selectCarrinhoByCliente,
    insertCarrinho,
    updateCarrinho,
    updateCarrinho
}