const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllCredito = async function(){
    try {
        let sql = 'select * from tbl_credito'
    
       
        let rsCredito = await prisma.$queryRawUnsafe(sql)
        return rsCredito
    } catch (error) {
        console.log(error);
        return false
    }
}


const selectCreditobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_credito where id_credito = ${id}`;

        // Executa no banco de dados o script sql
        let rsCredito = await prisma.$queryRawUnsafe(sql);

            return rsCredito;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertCredito = async function(dadosCredito) {
    try {
        let sql;

        sql = `INSERT INTO tbl_credito(
            numero,
            nome_titular,
            validade,
            cvv
        ) 
VALUES 
('${dadosCredito.numero}',
'${dadosCredito.nome_titular}',
'${dadosCredito.validade}',
'${dadosCredito.cvv}'
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

const lastIDCredito = async function(){
    try {
        let sql = `SELECT id_credito FROM tbl_credito ORDER BY id_credito DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteCredito = async(id) =>{
    try{

        let sql = `delete from tbl_credito where id_credito = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteCredito = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteCredito
    
        } catch(error){
            return false
        }
}

const updateCredito = async function(id,dadosCredito) {
    try {
        let sql;

         sql = `UPDATE tbl_credito SET
                            numero = "${dadosCredito.numero}",
                            nome_titular = "${dadosCredito.nome_titular}",
                            validade = "${dadosCredito.validade}",
                            cvv = "${dadosCredito.cvv}"
                            where tbl_credito.id_credito = ${id};` 
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


module.exports ={
    selectAllCredito,
    selectCreditobyID,
    insertCredito,
    lastIDCredito,
    deleteCredito,
    updateCredito

}