
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllCliente = async function(){
    try {
        let sql = 'select * from tbl_cliente'
    
       
        let rsCliente = await prisma.$queryRawUnsafe(sql)
        return rsCliente
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectClientebyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_cliente where id_cliente = ${id}`;

        // Executa no banco de dados o script sql
        let rsCliente = await prisma.$queryRawUnsafe(sql);

            return rsCliente;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertCliente = async function(dadosCliente) {
    try {
        let sql;

         sql = ` INSERT INTO tbl_cliente (
                            nome,
                            email,
                            telefone,
                            senha,
                            id_endereco
                        ) 
         VALUES 
           ('${dadosCliente.nome}',
           '${dadosCliente.email}',
           '${dadosCliente.telefone}',
           '${dadosCliente.senha}',
           '${dadosCliente.id_endereco}'
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


const updateCliente = async function(id,dadosCliente) {
    try {
        let sql;

         sql = `UPDATE tbl_cliente SET
                            nome = "${dadosCliente.nome}",
                            email = "${dadosCliente.email}",
                            telefone = "${dadosCliente.telefone}",
                            senha = "${dadosCliente.senha}",
                            id_endereco = ${dadosCliente.id_endereco}
                            where tbl_cliente.id_cliente = ${id};` 
                            ; 
                            console.log(sql);
                            

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


const lastIDCliente = async function(){
    try {
        let sql = `SELECT id_cliente FROM tbl_cliente ORDER BY id_cliente DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteCliente = async(id) =>{
    try{

        let sql = `delete from tbl_cliente where id_cliente = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteCliente = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteCliente
    
        } catch(error){
            return false
        }
}


module.exports ={
    selectAllCliente,
    selectClientebyID,
    insertCliente,
    lastIDCliente,
    deleteCliente,
    updateCliente

}