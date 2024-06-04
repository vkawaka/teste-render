
CREATE SCHEMA lanchonete_sabor_prazer ;
USE lanchonete_sabor_prazer ;
DROP DATABASE lanchonete_sabor_prazer;

select * from tbl_produto order by id_produto asc;

-- -----------------------------------------------------
-- Table tbl_produto
-- -----------------------------------------------------
CREATE TABLE tbl_produto (
  id_produto INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  valor FLOAT NOT NULL,
  foto VARCHAR(350) NOT NULL,
  tabela_nutricional VARCHAR(350) NOT NULL,
  quantidade INT NOT NULL,
  descricao TEXT NOT NULL,
  PRIMARY KEY (id_produto))
ENGINE = InnoDB;

#ALTER TABLE `lanchonete_sabor_prazer`.`tbl_produto` 
#CHANGE COLUMN `foto` `foto` VARCHAR(350) NOT NULL ,
#CHANGE COLUMN `tabela_nutricional` `tabela_nutricional` VARCHAR(350) NOT NULL ;

# ALTER TABLE `lanchonete_sabor_prazer`.`tbl_produto` 
#ADD COLUMN `descricao` TEXT NOT NULL AFTER `quantidade`;
-- -----------------------------------------------------
-- Table tbl_ingrediente`
-- -----------------------------------------------------
CREATE TABLE tbl_ingrediente (
  id_ingrediente INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  quantidade INT NOT NULL,
  tabela_nutricional VARCHAR(150) NOT NULL,
  PRIMARY KEY (id_ingrediente))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table tbl_categoria`
-- -----------------------------------------------------
CREATE TABLE  tbl_categoria (
  id_categoria INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_categoria))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table tbl_endereco`
-- -----------------------------------------------------
CREATE TABLE tbl_endereco (
  id_endereco INT NOT NULL AUTO_INCREMENT,
  cidade VARCHAR(80) NOT NULL,
  cep VARCHAR(8) NOT NULL,
  rua VARCHAR(100) NOT NULL,
  bairro VARCHAR(45) NOT NULL,
  numero INT NOT NULL,
  complemento VARCHAR(150) NULL,
  PRIMARY KEY (id_endereco))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_cliente`
-- -----------------------------------------------------
CREATE TABLE tbl_cliente (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  id_endereco INT NULL,
  PRIMARY KEY (id_cliente),
  INDEX fk_tbl_cliente_tbl_endereco_id (id_endereco ASC),
  CONSTRAINT fk_tbl_cliente_tbl_endereco
    FOREIGN KEY (id_endereco)
    REFERENCES tbl_endereco (id_endereco))
ENGINE = InnoDB;

  ALTER TABLE `lanchonete_sabor_prazer`.`tbl_cliente` 
DROP FOREIGN KEY `fk_tbl_cliente_tbl_endereco`;

ALTER TABLE `lanchonete_sabor_prazer`.`tbl_cliente` 
CHANGE COLUMN `id_endereco` `id_endereco` INT NULL;

ALTER TABLE `lanchonete_sabor_prazer`.`tbl_cliente` 
ADD CONSTRAINT `fk_tbl_cliente_tbl_endereco`
  FOREIGN KEY (`id_endereco`)
  REFERENCES `lanchonete_sabor_prazer`.`tbl_endereco` (`id_endereco`);


-- -----------------------------------------------------
-- Table `tbl_credito`
-- -----------------------------------------------------
CREATE TABLE tbl_credito (
  id_credito INT NOT NULL AUTO_INCREMENT,
  numero VARCHAR(30) NOT NULL,
  nome_titular VARCHAR(100) NOT NULL,
  validade DATE NOT NULL,
  cvv VARCHAR(3) NOT NULL,
  PRIMARY KEY (id_credito))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table  `tbl_debito`
-- -----------------------------------------------------
CREATE TABLE tbl_debito (
  id_debito INT NOT NULL AUTO_INCREMENT,
  numero VARCHAR(30) NOT NULL,
  nome_titular VARCHAR(100) NOT NULL,
  validade DATE NOT NULL,
  cvv VARCHAR(3) NOT NULL,
  PRIMARY KEY (id_debito))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_forma_pagamento`
-- -----------------------------------------------------
CREATE TABLE tbl_forma_pagamento (
  id_forma_pagamento INT NOT NULL AUTO_INCREMENT,
  pix VARCHAR(45) NOT NULL,
  id_credito INT NULL,
  id_debito INT NULL,
  PRIMARY KEY (id_forma_pagamento),
  INDEX fk_tbl_forma_pagamento_tbl_credito_id (id_credito ASC) ,
  INDEX fk_tbl_forma_pagamento_tbl_debito_id (id_debito ASC),
  CONSTRAINT fk_tbl_forma_pagamento_tbl_credito
    FOREIGN KEY (id_credito)
    REFERENCES tbl_credito (id_credito),
  CONSTRAINT fk_tbl_forma_pagamento_tbl_debito
    FOREIGN KEY (id_debito)
    REFERENCES tbl_debito (id_debito))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_pagamento (
  id_pagamento INT NOT NULL AUTO_INCREMENT,
  valor_total FLOAT NOT NULL,
  horario_pagamento TIME NOT NULL,
  id_forma_pagamento INT NOT NULL,
  PRIMARY KEY (id_pagamento),
  INDEX fk_tbl_pagamento_tbl_forma_pagamento_id (id_forma_pagamento ASC),
  CONSTRAINT fk_tbl_pagamento_tbl_forma_pagamento
    FOREIGN KEY (id_forma_pagamento)
    REFERENCES tbl_forma_pagamento (id_forma_pagamento))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_pedidos (
  id_pedido INT NOT NULL AUTO_INCREMENT,
  data_pedido DATE NOT NULL,
  tempo_entrega TIME NOT NULL,
  taxa_entrega FLOAT NOT NULL,
  desconto INT NULL,
  id_cliente INT NOT NULL,
  id_pagamento INT NOT NULL,
  PRIMARY KEY (id_pedido),
  INDEX fk_tbl_pedidos_tbl_cliente_id (id_cliente ASC),
  INDEX fk_tbl_pedidos_tbl_pagamento1_idx (id_pagamento ASC),
  CONSTRAINT fk_tbl_pedidos_tbl_cliente
    FOREIGN KEY (id_cliente)
    REFERENCES tbl_cliente (id_cliente),
  CONSTRAINT fk_tbl_pedidos_tbl_pagamento
    FOREIGN KEY (id_pagamento)
    REFERENCES tbl_pagamento (id_pagamento))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_usuario`
-- -----------------------------------------------------
CREATE TABLE tbl_usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  cargo VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_usuario))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tbl_perfil`
-- -----------------------------------------------------
CREATE TABLE tbl_perfil (
  id_perfil INT NOT NULL AUTO_INCREMENT,
  tbl_usuario_id_usuario INT NOT NULL,
  PRIMARY KEY (id_perfil),
  INDEX fk_tbl_perfil_tbl_usuario_id (tbl_usuario_id_usuario ASC),
  CONSTRAINT fk_tbl_perfil_tbl_usuario
    FOREIGN KEY (tbl_usuario_id_usuario)
    REFERENCES tbl_usuario (id_usuario))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table tbl_pedido_produto`
-- -----------------------------------------------------
CREATE TABLE tbl_pedido_produto (
  id_pedido_produto INT NOT NULL AUTO_INCREMENT,
  id_produto INT NOT NULL,
  id_pedido INT NOT NULL,
  status_view TINYINT NOT NULL,
  PRIMARY KEY (id_pedido_produto),
  INDEX fk_tbl_pedido_produto_tbl_produto_id (id_produto ASC),
  INDEX fk_tbl_pedido_produto_tbl_pedidos_id (id_pedido ASC),
  CONSTRAINT fk_tbl_pedido_produto_tbl_produto
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id_produto),
  CONSTRAINT fk_tbl_pedido_produto_tbl_pedidos
    FOREIGN KEY (id_pedido)
    REFERENCES tbl_pedidos (id_pedido))
ENGINE = InnoDB;

select tbl_produto.nome, tbl_produto.descricao, tbl_produto.valor, tbl_pedidos.desconto from tbl_produto 
join tbl_pedido_produto on tbl_pedido_produto.id_produto = tbl_produto.id_produto 
join tbl_pedidos on tbl_pedido_produto.id_pedido = tbl_pedidos.id_pedido
where tbl_pedidos.id_cliente = 3;

-- -----------------------------------------------------
-- Table tbl_categoria_produto`
-- -----------------------------------------------------
CREATE TABLE tbl_categoria_produto (
  id_categoria_produto INT NOT NULL AUTO_INCREMENT,
  id_categoria INT NOT NULL,
  id_produto INT NOT NULL,
  PRIMARY KEY (id_categoria_produto),
  INDEX fk_tbl_categoria_produto_tbl_categoria_id (id_categoria ASC),
  INDEX fk_tbl_categoria_produto_tbl_produto_id (id_produto ASC),
  CONSTRAINT fk_tbl_categoria_produto_tbl_categoria
    FOREIGN KEY (id_categoria)
    REFERENCES tbl_categoria (id_categoria),
  CONSTRAINT fk_tbl_categoria_produto_tbl_produto
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id_produto))
ENGINE = InnoDB;

SELECT tbl_categoria.id_categoria, nome FROM tbl_categoria JOIN tbl_categoria_produto ON tbl_categoria.id_categoria = tbl_categoria_produto.id_categoria WHERE id_produto = 12;


UPDATE tbl_produto SET
                nome = 'Super suco teste insert sla quaantos',
                valor = '10.5',
                foto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUtD_rxSU-UNbNWWcK8leZLdIl1UkX4WvclGEHOGixnYrfSmAj8D_DaGxnpa7OnhSNixY&usqp=CAU',
                tabela_nutricional = 'https://faladanutri.com.br/wp-content/uploads/2021/10/Tabela-das-informacoes-nutricionais-do-suco-verde.png',
                quantidade = '30',
                descricao = 'Para acompanhar sua refeição conheça nosso SS, este super suco de 500ml ajuda a desintoxicar o fígado'
                WHERE id_produto = 19;

INSERT INTO tbl_pedido_produto (id_produto, id_pedido) VALUES (19, 3);

SELECT tbl_pedidos.id_pedido, tbl_cliente.nome, tbl_pedidos.data_pedido FROM tbl_pedidos
JOIN tbl_pedido_produto ON tbl_pedidos.id_pedido = tbl_pedido_produto.id_pedido
JOIN tbl_cliente ON tbl_pedidos.id_cliente = tbl_cliente.id_cliente
WHERE id_produto = 19;
-- -----------------------------------------------------
-- Table `tbl_ingrediente_produto`
-- -----------------------------------------------------
CREATE TABLE tbl_ingrediente_produto (
  id_ingrediente_produto INT NOT NULL AUTO_INCREMENT,
  id_produto INT NOT NULL,
  id_ingrediente INT NOT NULL,
  PRIMARY KEY (id_ingrediente_produto),
  INDEX fk_tbl_ingrediente_produto_tbl_produto_id (id_produto ASC),
  INDEX fk_tbl_ingrediente_produto_tbl_ingrediente_id (id_ingrediente ASC),
  CONSTRAINT fk_tbl_ingrediente_produto_tbl_produto
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id_produto),
  CONSTRAINT fk_tbl_ingrediente_produto_tbl_ingrediente
    FOREIGN KEY (id_ingrediente)
    REFERENCES tbl_ingrediente (id_ingrediente))
ENGINE = InnoDB;

select * from tbl_produto;
-- Inserções de teste para tbl_produto
INSERT INTO tbl_produto (nome, valor, foto, tabela_nutricional, quantidade,descricao) 
VALUES 
  ('Super Lanche Natural', 35.99, 'https://ser.vitao.com.br/wp-content/uploads/2017/10/Sandu%C3%ADche-natural-saiba-como-comer-bem-e-saud%C3%A1vel-2.jpg', 'https://sanduichenaturaljoaopessoa.wordpress.com/wp-content/uploads/2013/07/tabela-nutricional-frango-180g.jpg', 50, 'Um SUPER sanduba para você se deliciar com sua família'),
  ('Chips de batata doce', 15.99, 'https://cknj.com.br/teste/wp-content/uploads/2020/04/P1220779-1200x901.jpg', 'https://www.dabananachips.com.br/wp-content/uploads/2020/07/Tabela-Nutricional-Chips-Batata-Doce.png', 10, 'Para você que gosta de uma boa alimentação, porém também ama uma batatinha'),
  ('Super suco ', 10.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUtD_rxSU-UNbNWWcK8leZLdIl1UkX4WvclGEHOGixnYrfSmAj8D_DaGxnpa7OnhSNixY&usqp=CAU', 'https://faladanutri.com.br/wp-content/uploads/2021/10/Tabela-das-informacoes-nutricionais-do-suco-verde.png', 30, 'Para acompanhar sua refeição conheça nosso SS, este super suco de 500ml ajuda a desintoxicar o fígado');
 
-- Inserções de teste para tbl_ingrediente
INSERT INTO tbl_ingrediente (nome, quantidade, tabela_nutricional) 
VALUES 
  ('Pão integral', 15, 'https://www.seminisemgluten.com.br/wp-content/uploads/2019/08/Tabela-Pao-Integral.jpg'),
  ('Batata doce', 10, 'https://levandoavidacomamo.files.wordpress.com/2016/04/tabela-batata-doce-e-inglesa.png'),
  ('Couve', 5, 'https://www.atigel.com.br/2020/wp-content/uploads/2020/05/tabela-couve-flor-img-03.jpg');

-- Inserções de teste para tbl_categoria
INSERT INTO tbl_categoria (nome) 
VALUES 
  ('Lanches'),
  ('Doces'),
  ('Bebidas');

-- Inserções de teste para tbl_endereco
INSERT INTO tbl_endereco (cidade, cep, rua, bairro, numero, complemento) 
VALUES 
  ('São Paulo', '01000000', 'Rua A', 'Centro', 123, NULL),
  ('Rio de Janeiro', '20000000', 'Rua B', 'Copacabana', 456, 'Apto 101'),
  ('Brasília', '70000000', 'Rua C', 'Asa Sul', 789, NULL);

-- Inserções de teste para tbl_cliente
INSERT INTO tbl_cliente (nome, email, telefone, senha, id_endereco) 
VALUES 
  ('João Silva', 'joao@example.com', '(11) 91234-5678', 'senha123', 1),
  ('Maria Souza', 'maria@example.com', '(21) 98765-4321', 'senha456', 2),
  ('Carlos Oliveira', 'carlos@example.com', '(61) 99876-5432', 'senha789', 3);

-- Inserções de teste para tbl_credito
INSERT INTO tbl_credito (numero, nome_titular, validade, cvv) 
VALUES 
  ('1111222233334444', 'João Silva', '2026-12-31', '123'),
  ('5555666677778888', 'Maria Souza', '2025-10-31', '456'),
  ('9999888877776666', 'Carlos Oliveira', '2027-05-31', '789');

-- Inserções de teste para tbl_debito
INSERT INTO tbl_debito (numero, nome_titular, validade, cvv) 
VALUES 
  ('1111222233334444', 'João Silva', '2026-12-31', '123'),
  ('5555666677778888', 'Maria Souza', '2025-10-31', '456'),
  ('9999888877776666', 'Carlos Oliveira', '2027-05-31', '789');

-- Inserções de teste para tbl_forma_pagamento
INSERT INTO tbl_forma_pagamento (pix, id_credito, id_debito) 
VALUES 
  ('joao.silva@exemplo.com', NULL, NULL),
  (NULL, 2, null),
  (null, NULL, 3);
  
  
  #--------------------Alter table para tirar o not null dos atributos-------------
  ALTER TABLE `lanchonete_sabor_prazer`.`tbl_forma_pagamento` 
DROP FOREIGN KEY `fk_tbl_forma_pagamento_tbl_credito`,
DROP FOREIGN KEY `fk_tbl_forma_pagamento_tbl_debito`;
ALTER TABLE `lanchonete_sabor_prazer`.`tbl_forma_pagamento` 
CHANGE COLUMN `pix` `pix` VARCHAR(45) NULL ,
CHANGE COLUMN `id_credito` `id_credito` INT NULL ,
CHANGE COLUMN `id_debito` `id_debito` INT NULL ;
ALTER TABLE `lanchonete_sabor_prazer`.`tbl_forma_pagamento` 
ADD CONSTRAINT `fk_tbl_forma_pagamento_tbl_credito`
  FOREIGN KEY (`id_credito`)
  REFERENCES `lanchonete_sabor_prazer`.`tbl_credito` (`id_credito`),
ADD CONSTRAINT `fk_tbl_forma_pagamento_tbl_debito`
  FOREIGN KEY (`id_debito`)
  REFERENCES `lanchonete_sabor_prazer`.`tbl_debito` (`id_debito`);

-- Inserções de teste para tbl_pagamento
INSERT INTO tbl_pagamento (valor_total, horario_pagamento, id_forma_pagamento) 
VALUES 
  (23.48, '14:30:00', 1),
  (15.99, '19:45:00', 2),
  (9.75, '12:15:00', 3);

-- Inserções de teste para tbl_pedidos
INSERT INTO tbl_pedidos (data_pedido, tempo_entrega, taxa_entrega, desconto, id_cliente, id_pagamento) 
VALUES 
  ('2024-05-16', '15:00:00', 5.00, NULL, 1, 1),
  ('2024-05-16', '20:00:00', 3.00, NULL, 2, 2),
  ('2024-05-16', '12:30:00', 2.50, 1, 3, 3);

-- Inserções de teste para tbl_usuario
INSERT INTO tbl_usuario (cargo, email, senha) 
VALUES 
  ('Gerente', 'gerente@example.com', 'senha123'),
  ('Atendente', 'atendente@example.com', 'senha456'),
  ('Entregador', 'entregador@example.com', 'senha789');

-- Inserções de teste para tbl_perfil
INSERT INTO tbl_perfil (tbl_usuario_id_usuario) 
VALUES 
  (1),
  (2),
  (3);

-- Inserções de teste para tbl_pedido_produto
INSERT INTO tbl_pedido_produto (id_produto, id_pedido) 
VALUES 
  (1, 1),
  (2, 2),
  (3, 3);

-- Inserções de teste para tbl_categoria_produto
INSERT INTO tbl_categoria_produto (id_categoria, id_produto) 
VALUES 
  (1, 1),
  (2, 2),
  (3, 3);

-- Inserções de teste para tbl_ingrediente_produto
INSERT INTO tbl_ingrediente_produto (id_produto, id_ingrediente) 
VALUES 
  (1, 1),
  (1, 2),
  (1, 3);
  ----------------------------------------- Selects das tabelas ------------------------------------------------- 
  
  -- Consulta para recuperar dados da tabela tbl_produto
SELECT * FROM tbl_produto;

-- Consulta para recuperar dados da tabela tbl_ingrediente
SELECT * FROM tbl_ingrediente;

-- Consulta para recuperar dados da tabela tbl_categoria
SELECT * FROM tbl_categoria;

INSERT INTO tbl_categoria_produto (id_categoria, id_produto) VALUES ('3', '8');

-- Consulta para recuperar dados da tabela tbl_endereco
SELECT * FROM tbl_endereco;

-- Consulta para recuperar dados da tabela tbl_cliente
SELECT * FROM tbl_cliente;

-- Consulta para recuperar dados da tabela tbl_credito
SELECT * FROM tbl_credito;

-- Consulta para recuperar dados da tabela tbl_debito
SELECT * FROM tbl_debito;

-- Consulta para recuperar dados da tabela tbl_forma_pagamento
SELECT * FROM tbl_forma_pagamento;

-- Consulta para recuperar dados da tabela tbl_pagamento
SELECT * FROM tbl_pagamento;

-- Consulta para recuperar dados da tabela tbl_pedidos
SELECT * FROM tbl_pedidos;

-- Consulta para recuperar dados da tabela tbl_usuario
SELECT * FROM tbl_usuario;

-- Consulta para recuperar dados da tabela tbl_perfil
SELECT * FROM tbl_perfil;

-- Consulta para recuperar dados da tabela tbl_pedido_produto
SELECT * FROM tbl_pedido_produto;

-- Consulta para recuperar dados da tabela tbl_categoria_produto
SELECT * FROM tbl_categoria_produto;

-- Consulta para recuperar dados da tabela tbl_ingrediente_produto
SELECT * FROM tbl_ingrediente_produto;

  ----------------------------------------- Inner JOIN´s ------------------------------------------------- 

#SLECT para listar todos os ingredientes em um produto x, pelo ID
SELECT 
    p.id_produto,
    p.nome AS nome_produto,
    ip.id_ingrediente,
    i.nome AS nome_ingrediente
FROM 
    tbl_produto p
INNER JOIN 
    tbl_ingrediente_produto ip ON p.id_produto = ip.id_produto
INNER JOIN 
    tbl_ingrediente i ON ip.id_ingrediente = i.id_ingrediente;
    
#SLECT para listar todos os ingredientes em um produto x, pelo nome
    SELECT 
    p.nome AS nome_produto,
    i.nome AS nome_ingrediente
FROM 
    tbl_produto p
INNER JOIN 
    tbl_ingrediente_produto ip ON p.id_produto = ip.id_produto
INNER JOIN 
    tbl_ingrediente i ON ip.id_ingrediente = i.id_ingrediente;

###############################################

# Buscar produtos de determindada categoria
SELECT 
    p.nome AS nome_produto,
    c.nome AS nome_categoria
FROM 
    tbl_produto p
INNER JOIN 
    tbl_categoria_produto cp ON p.id_produto = cp.id_produto
INNER JOIN 
    tbl_categoria c ON cp.id_categoria = c.id_categoria
WHERE 
    c.nome = 'lanches';
    
#  Bucar produtos pelo id do pedido
    SELECT 
    p.nome AS nome_produto,
    pp.id_pedido
FROM 
    tbl_produto p
INNER JOIN 
    tbl_pedido_produto pp ON p.id_produto = pp.id_produto
WHERE 
    pp.id_pedido = 1;
    
# Retorna os dados do endereço de todos os clientes
    SELECT 
    c.id_cliente,
    c.nome AS nome_cliente,
    c.email,
    c.telefone,
    e.cidade,
    e.cep,
    e.rua,
    e.bairro,
    e.numero,
    e.complemento
FROM 
    tbl_cliente c
INNER JOIN 
    tbl_endereco e ON c.id_endereco = e.id_endereco;
    
    # Retorna os dados do endereço de um cliente especifico
    SELECT 
    c.id_cliente,
    c.nome AS nome_cliente,
    c.email,
    c.telefone,
    e.cidade,
    e.cep,
    e.rua,
    e.bairro,
    e.numero,
    e.complemento
FROM 
    tbl_cliente c
INNER JOIN 
    tbl_endereco e ON c.id_endereco = e.id_endereco
WHERE 
    c.id_cliente = 1;