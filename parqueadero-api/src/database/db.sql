CREATE DATABASE parqueadero;

USE parqueadero;

-- Tabla para los Vehículos
CREATE TABLE Vehiculo (
    placa VARCHAR(10) PRIMARY KEY NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    tiempo_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para los Cupos
CREATE TABLE Cupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(10) unique NOT NULL,
    total_cupos INT NOT NULL,
    cupos_ocupados INT NOT NULL
);

-- Insertar vehiculos 
INSERT INTO Vehiculo (placa, tipo) VALUES ('ABC123', 'carro');
INSERT INTO Vehiculo (placa, tipo) VALUES ('XYZ789', 'moto');


-- Insertar los cupos iniciales
INSERT INTO Cupo (tipo, total_cupos, cupos_ocupados) VALUES ('carro', 5, 0);
INSERT INTO Cupo (tipo, total_cupos, cupos_ocupados) VALUES ('moto', 10, 0);

