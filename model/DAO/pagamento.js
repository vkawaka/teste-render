const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllPagamento = async function(){
    try {
        let sql = 'select * from tbl_pagamento'
    
       
        let rsPagamento = await prisma.$queryRawUnsafe(sql)
        return rsPagamento
    } catch (error) {
        console.log(error);
        return false
    }
}


const selectPagamentobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_pagamento where id_pagamento = ${id}`;

        // Executa no banco de dados o script sql
        let rsPagamento = await prisma.$queryRawUnsafe(sql);

            return rsPagamento;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertPagamento = async function(dadosPagamento) {
    try {
        let sql;

        sql = `INSERT INTO tbl_pagamento(
            valor_total,
            horario_pagamento,
            id_forma_pagamento
        ) 
VALUES 
('${dadosPagamento.valor_total}',
'${dadosPagamento.horario_pagamento}',
'${dadosPagamento.id_forma_pagamento}'
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

const lastIDPagamento = async function(){
    try {
        let sql = `SELECT id_pagamento FROM tbl_pagamento ORDER BY id_pagamento DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deletePagamento = async(id) =>{
    try{

        let sql = `delete from tbl_pagamento where id_pagamento = ${id}`

        console.log(sql);
        //Executa o sql no banco de dados
        let rsdeletePagamento = await prisma.$executeRawUnsafe(sql)

    
       return rsdeletePagamento
    
        } catch(error){
            return false
        }
}

const updatePagamento = async function(id,dadosPagamento) {
    try {
        let sql;

         sql = `UPDATE tbl_pagamento SET
                            valor_total = "${dadosPagamento.valor_total}",
                            horario_pagamento = "${dadosPagamento.horario_pagamento}",
                            id_forma_pagamento = ${dadosPagamento.id_forma_pagamento}
                            where tbl_pagamento.id_pagamento = ${id};` 
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
    selectAllPagamento,
    selectPagamentobyID,
    insertPagamento,
    lastIDPagamento,
    deletePagamento,
    updatePagamento

}