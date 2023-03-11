create table produtos(
	id serial primary key,
  	titulo text,
  	descricao text,
  	preco integer,
  	estoque integer,
  	foto text,
	categoria text,
	usuario_id integer references usuarios(id)
);