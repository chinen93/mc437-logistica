CREATE TABLE transportadora(
    id_transportadora integer NOT NULL AUTO_INCREMENT,
    contato_responsavel_transportadora TEXT NOT NULL,
    nome_transportadora TEXT NOT NULL,
    preco_embalagem_cm_quadrado double NOT NULL,
    taxa_entrega double NOT NULL,
    PRIMARY KEY (id_transportadora)
);

CREATE TABLE site(
    id_site integer NOT NULL AUTO_INCREMENT,
    contato_responsavel_site TEXT NOT NULL,
    nome TEXT NOT NULL,
    endereco_site TEXT NOT NULL,
    PRIMARY KEY(id_site)
);

CREATE TABLE entregador(
    CPFentregador BIGINT NOT NULL,
    id_transportadora integer NOT NULL,
    nome_entregador TEXT NOT NULL,
    placa_veiculo TEXT NOT NULL,
    modelo_veiculo TEXT NOT NULL,
    PRIMARY KEY(CPFentregador),
    FOREIGN KEY(id_transportadora) REFERENCES transportadora(id_transportadora)
);

CREATE TABLE envio(
    id_envio integer NOT NULL AUTO_INCREMENT,
    cliente TEXT NOT NULL,
    contato_cliente TEXT NOT NULL,
    endereco_cliente TEXT NOT NULL,
    id_site integer NOT NULL,
    CPFentregador BIGINT NOT NULL,
    data_envio DATE,
    prazo_previsto DATE,
    localizacao TEXT NOT NULL,
    pontos_de_parada TEXT DEFAULT NULL,
    PRIMARY KEY(id_envio),
    FOREIGN KEY(id_site) REFERENCES site(id_site),
    FOREIGN KEY(CPFentregador) REFERENCES entregador(CPFentregador)
);

CREATE TABLE entregue_por(
    id_envio integer references envio(id_envio),
    CPFentregador BIGINT references entregador(CPFentregador),
    PRIMARY KEY(id_envio, CPFentregador)
);

CREATE TABLE contratado_por(
    CPFentregador BIGINT REFERENCES entregador(CPFentregador),
    id_transportadora integer REFERENCES transportadora(id_transportadora),
    PRIMARY KEY(CPFentregador, id_transportadora)
);

CREATE TABLE solicita(
    id_site integer references site(id_site),
    id_envio integer references envio(id_envio),
    PRIMARY KEY(id_site, id_envio)
);
