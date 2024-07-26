import { Router } from "express";
import { vehiculo } from "../controllers/vehiculo.controllers.js";

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehiculo:
 *       type: object
 *       required:
 *         - placa
 *         - tipo
 *       properties:
 *         placa:
 *           type: string
 *           description: La placa del vehículo (Clave Primaria)
 *         tipo:
 *           type: string
 *           description: El tipo de vehículo
 *       example:
 *         placa: ABC123
 *         tipo: Carro
 */


/**
 * @swagger
 * tags:
 *   name: Vehiculos
 *   description: La API para gestionar vehículos
 */

/**
 * @swagger
 * /vehiculos:
 *   get:
 *     summary: Devuelve una lista de todos los vehículos
 *     tags: [Vehiculos]
 *     responses:
 *       200:
 *         description: La lista de los vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehiculo'
 */

router.get('/vehiculos', vehiculo.getVehiculos)


/**
 * @swagger
 * /vehiculos/{placa}:
 *   get:
 *     summary: Obtiene un vehículo por la placa
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: placa
 *         schema:
 *           type: string
 *         required: true
 *         description: La placa del vehículo
 *     responses:
 *       200:
 *         description: Detalles del vehículo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehiculo'
 *       404:
 *         description: Vehículo no encontrado
 */


router.get('/vehiculos/:placa', vehiculo.getVehiculo)


/**
 * @swagger
 * /vehiculos:
 *   post:
 *     summary: Crea un nuevo vehículo
 *     tags: [Vehiculos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       201:
 *         description: El vehículo fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehiculo'
 *       500:
 *         description: Error del servidor
 */


router.post('/vehiculos', vehiculo.postVehiculos)


/**
 * @swagger
 * /vehiculos/{placa}:
 *   patch:
 *     summary: Actualiza un vehículo por la placa
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: placa
 *         schema:
 *           type: string
 *         required: true
 *         description: La placa del vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       200:
 *         description: El vehículo fue actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehiculo'
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error del servidor
 */


router.patch('/vehiculos/:placa', vehiculo.patchVehiculos)


/**
 * @swagger
 * /vehiculos/{placa}:
 *   delete:
 *     summary: Elimina un vehículo por la placa
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: placa
 *         schema:
 *           type: string
 *         required: true
 *         description: La placa del vehículo
 *     responses:
 *       200:
 *         description: El vehículo fue eliminado exitosamente
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error del servidor
 */


router.delete('/vehiculos/:placa', vehiculo.deleteVehiculos)



export default router;