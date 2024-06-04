
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllProdutos = async function(){
    try {
        let sql = 'select * from tbl_produto'
        // $queryRawUnsafe(sql)
        // $queryRawUnsafe('select * from tbl_filme')
        let rsProduto = await prisma.$queryRawUnsafe(sql)
        return rsProduto
    } catch (error) {
        console.log(error);
        return false  
    }
}

const selectProdutobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_produto where id_produto = ${id}`;

        // Executa no banco de dados o script sql
        let rsProduto = await prisma.$queryRawUnsafe(sql);

            return rsProduto;
    
    } catch (error) {
        console.log(error);
        return false;    
    }   
}

const insertProduto = async function(dadosProduto) {
    try {
        let sql;

        sql = ` INSERT INTO tbl_produto (
                nome,
                valor,
                foto,
                tabela_nutricional,
                quantidade,
                descricao) 
         VALUES 
           ('${dadosProduto.nome}',
           '${dadosProduto.valor}',
           '${dadosProduto.foto}',
           '${dadosProduto.tabela_nutricional}',
           '${dadosProduto.quantidade}', 
           '${dadosProduto.descricao}')`; 

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


const lastIDProduto = async function(){
    try {
        let sql = `SELECT id_produto FROM tbl_produto ORDER BY id_produto DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
}

const deleteProduto = async(id) =>{
    try{
        let sql = `delete from tbl_produto where id_produto = ${id}`
        //Executa o sql no banco de dados
        let rsdeletedProduto = await prisma.$executeRawUnsafe(sql)
       return rsdeletedProduto
    } catch(error){
        return false
    }
}

const updateProduto = async(id, dadosProduto) => {
    try {
        let sql;

        sql = ` UPDATE tbl_produto SET
                nome = '${dadosProduto.nome}',
                valor = '${dadosProduto.valor}',
                foto = '${dadosProduto.foto}',
                tabela_nutricional = '${dadosProduto.tabela_nutricional}',
                quantidade = '${dadosProduto.quantidade}',
                descricao = '${dadosProduto.descricao}'
                WHERE id_produto = ${id}; `;
                // console.log(sql);

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

module.exports ={
    selectAllProdutos,
    selectProdutobyID,
    insertProduto,
    lastIDProduto,
    deleteProduto,
    updateProduto
}