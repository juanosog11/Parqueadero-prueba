import { pool } from "../db.js";

const getCupos = async (req, res) => {
    try {
        const  [rows] = await pool.query("SELECT * FROM Cupo");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los Cupo:", error);
        res.status(500).json({ message: "Fallo al obtener los cupos de la base de datos" });
    }

}

const getCuposTipo = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT tipo FROM Cupo");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los Cupo:", error);
        res.status(500).json({ message: "Fallo al obtener los cupos de la base de datos" });
    }

}

const getCupo = async (req, res) => {
    try {
        const  [rows] = await pool.query("SELECT * FROM Cupo WHERE id = ?", [req.params.id]);
        console.log(req.params.id)
        console.log(rows.length)
        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' })

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener los Cupo:", error);
        res.status(500).json({ message: "Fallo al obtener el Cupo de la base de datos" });
    }

}

const getCupoTipo = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Cupo WHERE tipo = ?", [req.params.tipo]);
        console.log(req.params.tipo);
        console.log(rows.length);

        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' });

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el Cupo por tipo:", error);
        res.status(500).json({ message: "Fallo al obtener el Cupo de la base de datos" });
    }
}


const postCupos = async (req, res) => {
    const { tipo, total_cupos, cupos_ocupados } = req.body;

    // Validación de datos requeridos
    if (!tipo || total_cupos === undefined || cupos_ocupados === undefined) {
        return res.status(400).json({ message: "El tipo, total_cupos y cupos_ocupados son requeridos." });
    }

    // Validación de límites de cupos ocupados
    if (tipo === 'carro' && cupos_ocupados > 5) {
        return res.status(400).json({ message: "El número de cupos ocupados no puede exceder 5 para carros." });
    }

    if (tipo === 'moto' && cupos_ocupados > 10) {
        return res.status(400).json({ message: "El número de cupos ocupados no puede exceder 10 para motos." });
    }

    try {
        // Verificar si ya existe un registro con el mismo tipo
        const [existingCupo] = await pool.query('SELECT * FROM Cupo WHERE tipo = ?', [tipo]);

        if (existingCupo.length > 0) {
            return res.status(400).json({ message: `Ya existe un registro de cupo para el tipo ${tipo}.` });
        }

        // Insertar un nuevo registro en la tabla Cupo
        const [result] = await pool.query('INSERT INTO Cupo (tipo, total_cupos, cupos_ocupados) VALUES (?, ?, ?)',
            [tipo, total_cupos, cupos_ocupados]);

        res.status(201).json({ message: "Cupo agregado exitosamente", id: result.insertId, tipo, total_cupos, cupos_ocupados });
    } catch (error) {
        console.error("Error al agregar el Cupo:", error);
        res.status(500).json({ message: "Fallo al agregar el Cupo a la base de datos" });
    }
};




const patchCupos = async (req, res) => {
    const { id } = req.params;
    const { tipo, total_cupos, cupos_ocupados } = req.body;

    try {

        if (tipo === 'carro' && cupos_ocupados > 5) {
            return res.status(400).json({ message: "El número de cupos ocupados no puede exceder 5 para carros." });
        }

        if (tipo === 'moto' && cupos_ocupados > 10) {
            return res.status(400).json({ message: "El número de cupos ocupados no puede exceder 10 para motos." });
        }

        const [existingType] = await pool.query('SELECT * FROM Cupo WHERE tipo = ?', [tipo]);
        if (existingType.length > 0 && existingType[0].id !== parseInt(id)) {
            return res.status(400).json({ message: `El tipo ${tipo} ya existe en otro registro, el id es de ese registo, por favor digitar el correcto` });
        }

        
        const [rows] = await pool.query('update Cupo SET tipo = IFNULL(?,tipo) , Total_cupos = IFNULL(?,Total_cupos) , cupos_ocupados = IFNULL(?,cupos_ocupados) where id = ? ', [tipo, total_cupos, cupos_ocupados,id]);

        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' })

        // Obtener el cupo actualizado
        const [updatedCupo] = await pool.query('SELECT * FROM Cupo WHERE id = ?', [id]);
        return res.json({ message: 'Cupo actualizado exitosamente', cupo: updatedCupo[0] });
    } catch (error) {
        console.error("Error al actualizar el Cupo:", error);
        res.status(500).json({ message: "Fallo al actualizar el Cupo en la base de datos" });
    }
};

const patchCuposTipo = async (req, res) => {
    const { tipo } = req.params;
    const { total_cupos, cupos_ocupados } = req.body;

    console.log(tipo, total_cupos, cupos_ocupados);

    try {
        if (tipo === 'carro' && cupos_ocupados > 5) {
            return res.status(400).json({ message: "El número de cupos ocupados no puede exceder 5 para carros." });
        }

        if (tipo === 'moto' && cupos_ocupados > 10) {
            return res.status(400).json({ message: "El número de cupos ocupados no puede exceder 10 para motos." });
        }

        const [rows] = await pool.query(
            'UPDATE Cupo SET total_cupos = IFNULL(?, total_cupos), cupos_ocupados = IFNULL(?, cupos_ocupados) WHERE tipo = ?',
            [total_cupos, cupos_ocupados, tipo]
        );

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Datos no encontrados' });
        }

        // Obtener el cupo actualizado por tipo
        const [updatedCupo] = await pool.query('SELECT * FROM Cupo WHERE tipo = ?', [tipo]);
        return res.json({ message: 'Cupo actualizado exitosamente', cupo: updatedCupo[0] });
    } catch (error) {
        console.error("Error al actualizar el Cupo:", error);
        res.status(500).json({ message: "Fallo al actualizar el Cupo en la base de datos" });
    }
};


const deleteCupos = async (req, res) => {
    try {
        const  [rows] = await pool.query('DELETE FROM Cupo WHERE id = ? ', [req.params.id]);

        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' })

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener los Cupo:", error);
        res.status(500).json({ message: "Fallo al obtener el Cupo de la base de datos" });
    }
}

const deleteCuposTipo = async (req, res) => {
    try {
        const { tipo } = req.params;

        const [rows] = await pool.query('DELETE FROM Cupo WHERE tipo = ?', [tipo]);

        if (rows.length === 0) return res.status(404).json({ message: 'Datos no encontrados' })

        res.json({ message: 'Cupo eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar el Cupo:", error);
        res.status(500).json({ message: "Fallo al eliminar el Cupo de la base de datos" });
    }
};


export const Cupo = { getCupos, getCupo, patchCupos, postCupos, deleteCupos, patchCuposTipo,deleteCuposTipo,getCuposTipo,getCupoTipo }

