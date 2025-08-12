0create database bd_skyora

use bd_skyora


create table ubicacion
(
	id int NOT NULL,
	ciudad varchar NOT NULL,
	pais varchar NOT NULL,
	constraint pk_ubicacion primary key (id)
)



create table usuario
(
	id int identity (1,1) NOT NULL,
	nombre varchar (100) NOT NULL,
	email varchar (150) NOT NULL, 
	contraseña varchar (255) NOT NULL,
	rol varchar (50) NOT NULL,
	ubicacion_id int NOT NULL,

	constraint pk_usuario primary key (id),
	constraint fk_ubicacion foreign key (ubicacion_id)
	references ubicacion (id)
)


create table orden
(
	id int identity (1,1) NOT NULL,
	usuario_id int,
	fecha datetime,
	estado varchar (50) NOT NULL,

	constraint pk_orden primary key (id),
	constraint fk_usuario foreign key (usuario_id)
	references usuario (id)
)

create table servicio
(
	id int identity (1,1) NOT NULL,
	nombre varchar (100) NOT NULL,
	descripcion text,

	constraint pk_servicio primary key (id)
)

create table producto
(
	id int NOT NULL,
	nombre varchar(100) NOT NULL,
	descripcion text,
	precio int NOT NULL,
	origen_id int,
	destino_id int,
	servicio_id int,

	constraint pk_producto primary key (id),
	constraint fk_origen foreign key (origen_id)
	references ubicacion (id),
	constraint fk_destino foreign key (destino_id)
	references ubicacion (id),
	constraint fk_servicio foreign key (servicio_id)
	references servicio (id),
)

create table detalle_orden
(
	id int identity (1,1) NOT NULL,
	orden_id int,
	producto_id int,
	cantidad int NOT NULL,
	precio int NOT NULL,

	constraint pk_detalle_orden primary key (id),

	constraint fk_orden foreign key (orden_id)
	references orden (id),

	constraint fk_producto foreign key (producto_id)
	references producto (id),
)

create table Administrador
(
	id int NOT NULL,
	nombre_admin varchar NOT NULL,
	id_detalle_orden int,
	id_orden int,
	id_producto int,
	id_servicio int,
	id_ubicacion int,
	id_usuario int,

	constraint pk_admin primary key (id),
	constraint fk_detalle_orden_admin foreign key (id_detalle_orden)
	references detalle_orden (id),

	constraint fk_orden_admin foreign key (id_orden)
	references orden (id),

	constraint fk_producto_admin foreign key (id_producto)
	references producto (id),

	constraint fk_servicio_admin foreign key (id_servicio)
	references servicio (id),

	constraint fk_ubicacion_admin foreign key (id_ubicacion)
	references ubicacion (id),
	
	constraint fk_usuario_admin foreign key (id_usuario)
	references usuario (id),
)
