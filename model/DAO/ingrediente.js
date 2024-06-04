
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllIngrediente = async function(){
    try {
        let sql = 'select * from tbl_ingrediente'
    
       
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectIngredientebyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_ingrediente where id_ingrediente = ${id}`;

        // Executa no banco de dados o script sql
        let rs = await prisma.$queryRawUnsafe(sql);

            return rs;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertIngrediente = async function(dadosIngrediente) {
    try {
        let sql;

         sql = ` INSERT INTO tbl_ingrediente (
                            nome,
                            quantidade,
                            tabela_nutricional
                        ) 
         VALUES 
           ('${dadosIngrediente.nome}',
           '${dadosIngrediente.quantidade}',
           '${dadosIngrediente.tabela_nutricional}'
           )`; 
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


const updateIngrediente = async function(id,dadosIngrediente) {
    try {
        let sql;

         sql = `UPDATE tbl_ingrediente SET
                            nome = "${dadosIngrediente.nome}",
                            quantidade = "${dadosIngrediente.quantidade}",
                            tabela_nutricional = "${dadosIngrediente.tabela_nutricional}"
                            where tbl_ingrediente.id_ingrediente = ${id};` 
                            ; 
                            

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


const lastIDIngrediente = async function(){
    try {
        let sql = `SELECT id_ingrediente FROM tbl_ingrediente ORDER BY id_ingrediente DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteIngrediente = async(id) =>{
    try{

        let sql = `delete from tbl_ingrediente where id_ingrediente = ${id}`
       
        let rsdelete = await prisma.$executeRawUnsafe(sql)
       return rsdelete
    
        } catch(error){
            return false
        }
}

const insertIngredienteProduto = async(id_produto, id_ingrediente) => {
    try {
        let sql = `INSERT INTO tbl_ingrediente_produto (id_produto, id_ingrediente) VALUES ('${id_produto}', '${id_ingrediente}')`
        // console.log(sql);

        let rs = await prisma.$executeRawUnsafe(sql)

        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}
const selectIngredienteByProduto = async(id) => {
    try {
        let sql = `SELECT tbl_ingrediente.id_ingrediente, nome FROM tbl_ingrediente JOIN tbl_ingrediente_produto ON tbl_ingrediente.id_ingrediente = tbl_ingrediente_produto.id_ingrediente WHERE id_produto = ${id}`

        // console.log(sql);
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
        
    } catch (error) {
        return false
    }
}

const deleteIngredienteProduto = async(id) => {
    try {
        let sql = `DELETE FROM tbl_ingrediente_produto WHERE id_produto = ${id}`
        console.log("teste " + sql);


        let rs = await prisma.$queryRawUnsafe(sql)
        // console.log(sql);


        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports ={
    selectAllIngrediente,
    selectIngredientebyID,
    insertIngrediente,
    lastIDIngrediente,
    deleteIngrediente,
    updateIngrediente,
    insertIngredienteProduto,
    selectIngredienteByProduto,
    deleteIngredienteProduto
}