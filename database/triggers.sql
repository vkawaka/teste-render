#triggers

DELIMITER $

create trigger tgrDeleteIngredienteProduto
	before delete on tbl_ingrediente
		for each row 
			BEGIN
				delete from tbl_ingrediente_produto where id_ingrediente = old.id_ingrediente;
            END$

#apagar uma categoria
DELIMITER $$

create trigger tgrDeleteCategoriaProduto
	before delete on tbl_categoria
		for each row 
			BEGIN
				delete from tbl_categoria_produto where id_ingrediente = old.id_categoria;
            END$$


#apagar um pedido do banco de dados
DELIMITER $

create trigger tgrApagarPedido
	before delete on tbl_pedidos
		for each row 
			BEGIN
				delete from tbl_pedido_produto where id_pedido = old.id_pedido;
            END$

DELIMITER $

create trigger tgrApagarProduto
	before delete on tbl_produto
		for each row 
			BEGIN
				delete from tbl_pedido_produto where id_produto = old.id_produto;				
                delete from tbl_ingrediente_produto where id_produto= old.id_produto;				
                delete from tbl_categoria_produto where id_produto = old.id_produto;
            END$
            
show triggers;

drop trigger tgrDeleteIngredienteProduto;