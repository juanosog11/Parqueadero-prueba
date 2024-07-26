import { pool } from "../db.js";




const getVehiculos = async (req, res) => {
    try {
        const  [rows]  = await pool.query("SELECT * FROM vehiculo");
        console.log(rows[0])
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los Vehiculo:", error);
        res.status(500).json({ message: "Fallo al obtener los Vehiculos de la base de datos" });
    }

}


const getVehiculo = async (req, res) => {
    try {
        const  [rows] = await pool.query("SELECT * FROM Vehiculo WHERE placa = ?", [req.params.placa]);
        
        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' })

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener los Vehiculo:", error);
        res.status(500).json({ message: "Fallo al obtener el Vehiculo de la base de datos" });
    }

}


const postVehiculos = async (req, res) => {
    const { placa, tipo } = req.body;

    if (!placa || !tipo) {
        return res.status(400).json({ message: "La placa y el tipo son requeridos." });
    }

    try {
        // Verificar si hay cupos disponibles para el tipo de vehículo
        const [cupos] = await pool.query('SELECT cupos_ocupados, total_cupos FROM Cupo WHERE tipo = ?', [tipo]);

        if (cupos.length === 0) {
            return res.status(400).json({ message: "Tipo de vehículo no válido." });
        }

        const { cupos_ocupados, total_cupos } = cupos[0];

        if (cupos_ocupados >= total_cupos) {
            return res.status(400).json({ message: "No hay cupos disponibles para este tipo de vehículo." });
        }

        // Agregar el vehículo
        const [result] = await pool.query('INSERT INTO Vehiculo (placa, tipo) VALUES (?, ?)', [placa, tipo]);

        // Actualizar la tabla de cupos
        await pool.query('UPDATE Cupo SET cupos_ocupados = cupos_ocupados + 1 WHERE tipo = ?', [tipo]);

        res.status(201).json({ message: "Vehículo agregado exitosamente", placa: result.insertId });
    } catch (error) {
        console.error("Error al agregar el vehículo:", error);
        res.status(500).json({ message: "Fallo al agregar el vehículo a la base de datos" });
    }
};


const patchVehiculos = async (req, res) => {
    const { placa } = req.params;
    const { nuevaplaca, tipo } = req.body;

    console.log(placa,tipo,nuevaplaca)

    try {
        // Si la nueva placa es igual a la placa actual, mantén la placa actual
        if (nuevaplaca === placa) {
            // Actualiza solo el tipo si la placa no cambia
            const [rows] = await pool.query('UPDATE Vehiculo SET IFNULL(?,tipo) WHERE placa = ?', [tipo, placa]);

            if (rows.affectedRows === 0) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }

            const [updatedVehicle] = await pool.query('SELECT * FROM Vehiculo WHERE placa = ?', [placa]);
            return res.json({ message: 'Tipo de vehículo actualizado exitosamente', vehicle: updatedVehicle[0] });
        }

        // Si la nueva placa es diferente, aplica la actualización
        const [rows] = await pool.query('UPDATE Vehiculo SET placa = IFNULL(?,placa), tipo = IFNULL(?,tipo) WHERE placa = ?', [nuevaplaca, tipo, placa]);

        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' })

        const [updatedVehicle] = await pool.query('SELECT * FROM Vehiculo WHERE placa = ?', [nuevaplaca]);
        res.json({ message: 'Vehículo actualizado exitosamente', vehicle: updatedVehicle[0] });
    } catch (error) {
        console.error("Error al actualizar el vehículo:", error);
        res.status(500).json({ message: "Fallo al actualizar el vehículo en la base de datos" });
    }
};


const deleteVehiculos = async (req, res) => {    
    try {
        const  [rows] = await pool.query('DELETE FROM Vehiculo WHERE placa = ? ', [req.params.placa]);

        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' })

        
        res.status(200).json({ message: "El vehiculo "+ req.params.placa + " se elimino correctamente" });
    } catch (error) {
        console.error("Error al obtener los Vehiculo:", error);
        res.status(500).json({ message: "Fallo al obtener el Vehiculo de la base de datos" });
    }
}

export const vehiculo = {getVehiculos,getVehiculo,patchVehiculos,postVehiculos,deleteVehiculos}

