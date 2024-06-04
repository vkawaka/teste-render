const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllDebito = async function(){
    try {
        let sql = 'select * from tbl_debito'
    
       
        let rsDebito = await prisma.$queryRawUnsafe(sql)
        return rsDebito
    } catch (error) {
        console.log(error);
        return false
    }
}


const selectDebitobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_debito where id_debito = ${id}`;

        // Executa no banco de dados o script sql
        let rsDebito = await prisma.$queryRawUnsafe(sql);

            return rsDebito;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertDebito = async function(dadosDebito) {
    try {
        let sql;

        sql = `INSERT INTO tbl_debito(
            numero,
            nome_titular,
            validade,
            cvv
        ) 
VALUES 
('${dadosDebito.numero}',
'${dadosDebito.nome_titular}',
'${dadosDebito.validade}',
'${dadosDebito.cvv}'
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

const lastIDDebito = async function(){
    try {
        let sql = `SELECT id_debito FROM tbl_debito ORDER BY id_debito DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteDebito = async(id) =>{
    try{

        let sql = `delete from tbl_debito where id_debito = ${id}`

        console.log(sql);
        //Executa o sql no banco de dados
        let rsdeleteDebito = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteDebito
    
        } catch(error){
            return false
        }
}

const updateDebito = async function(id,dadosDebito) {
    try {
        let sql;

         sql = `UPDATE tbl_debito SET
                            numero = "${dadosDebito.numero}",
                            nome_titular = "${dadosDebito.nome_titular}",
                            validade = "${dadosDebito.validade}",
                            cvv = "${dadosDebito.cvv}"
                            where tbl_debito.id_debito = ${id};` 
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
    selectAllDebito,
    selectDebitobyID,
    insertDebito,
    lastIDDebito,
    deleteDebito,
    updateDebito

}