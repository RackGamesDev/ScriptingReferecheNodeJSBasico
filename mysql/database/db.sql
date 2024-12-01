CREATE DATABASE IF NOT EXISTS usuarios;

USE usuarios;

CREATE TABLE IF NOT EXISTS usuarios(
	idUsuario INT UNSIGNED AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(16) NOT NULL,
    contrasegna VARCHAR(16) NOT NULL,
    edad DATE,
    tipoUsuario ENUM('REGISTRADO', 'NUEVO'),
    descripcion VARCHAR(128),
    PRIMARY KEY(idUsuario)
);

CREATE TABLE IF NOT EXISTS mensajes(
	idMensaje INT UNSIGNED AUTO_INCREMENT NOT NULL,
    texto VARCHAR(512) NOT NULL,
    cuando DATE,
    PRIMARY KEY(idMensaje),
    usuariosIdUsuario INT NOT NULL, CONSTRAINT fkmensaje_usuarios FOREIGN KEY(usuariosIdUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE IF NOT EXISTS chats(
	idChat INT UNSIGNED AUTO_INCREMENT NOT NULL,
    nombreChat VARCHAR(16) NOT NULL,
    tipoChat ENUM('PRIVADO', 'PUBLICO'),
    usuariosIdUsuario INT NOT NULL, CONSTRAINT fkmensaje_usuarios FOREIGN KEY(usuariosIdUsuario) REFERENCES usuarios(idUsuario)
);
-- Este script crea todas las tablas necesarias para este ejemplo, ejecutarlo en mysql workbench
