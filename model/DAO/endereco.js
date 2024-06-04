const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllEndereco = async function(){
    try {
        let sql = 'select * from tbl_endereco'
    
       
        let rsEndereco = await prisma.$queryRawUnsafe(sql)
        return rsEndereco
    } catch (error) {
        console.log(error);
        return false
    }
}


const selectEnderecobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_endereco where id_endereco = ${id}`;

        // Executa no banco de dados o script sql
        let rsEndereco = await prisma.$queryRawUnsafe(sql);

            return rsEndereco;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertEndereco = async function(dadosEndereco) {
    try {
        let sql;

         sql = `INSERT INTO tbl_endereco(
                            cidade,
                            cep,
                            rua,
                            bairro,
                            numero
                        ) 
         VALUES 
           ('${dadosEndereco.cidade}',
           '${dadosEndereco.cep}',
           '${dadosEndereco.rua}',
           '${dadosEndereco.bairro}',
           ${dadosEndereco.numero}
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

const lastIDEndereco = async function(){
    try {
        let sql = `SELECT id_endereco FROM tbl_endereco ORDER BY id_endereco DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteEndereco = async(id) =>{
    try{

        let sql = `delete from tbl_endereco where id_endereco = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteEndereco = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteEndereco
    
        } catch(error){
            return false
        }
}

const updateEndereco = async function(id,dadosEndereco) {
    try {
        let sql;

         sql = `UPDATE tbl_endereco SET
                            cidade = "${dadosEndereco.cidade}",
                            cep = "${dadosEndereco.cep}",
                            rua = "${dadosEndereco.rua}",
                            bairro = "${dadosEndereco.bairro}",
                            numero = ${dadosEndereco.numero}
                            where tbl_endereco.id_endereco = ${id};` 
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
    selectAllEndereco,
    selectEnderecobyID,
    insertEndereco,
    lastIDEndereco,
    deleteEndereco,
    updateEndereco

}