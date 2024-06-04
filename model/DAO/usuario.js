
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllUsuario = async function(){
    try {
        let sql = 'select * from tbl_usuario'
    
       
        let rsUsuario = await prisma.$queryRawUnsafe(sql)
        return rsUsuario
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectUsuariobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_usuario where id_usuario = ${id}`;

        // Executa no banco de dados o script sql
        let rsUsuario = await prisma.$queryRawUnsafe(sql);

            return rsUsuario;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertUsuario = async function(dadosUsario) {
    try {
        let sql;

         sql = ` INSERT INTO tbl_usuario (
                            cargo,
                            email,
                            senha
                        ) 
         VALUES 
           ('${dadosUsario.cargo}',
           '${dadosUsario.email}',
           '${dadosUsario.senha}'
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


const updateUsuario = async function(id,dadosUsario) {
    try {
        let sql;

         sql = `UPDATE tbl_usuario SET
                            cargo = "${dadosUsario.cargo}",
                            email = "${dadosUsario.email}",
                            senha = "${dadosUsario.senha}"
                            where tbl_usuario.id_usuario = ${id};` 
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


const lastIDUsuario = async function(){
    try {
        let sql = `SELECT id_usuario FROM tbl_usuario ORDER BY id_usuario DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteUsuario = async(id) =>{
    try{

        let sql = `delete from tbl_usuario where id_usuario = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteUsuario = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteUsuario
    
        } catch(error){
            return false
        }
}


module.exports ={
    selectAllUsuario,
    selectUsuariobyID,
    insertUsuario,
    lastIDUsuario,
    deleteUsuario,
    updateUsuario

}