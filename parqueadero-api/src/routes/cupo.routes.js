import { Router } from "express";
import { Cupo } from "../controllers/cupo.controllers.js";


const router = Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Cupo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del cupo
 *         tipo:
 *           type: string
 *           description: El tipo de cupo (por ejemplo, 'carro', 'moto')
 *         total_cupos:
 *           type: integer
 *           description: El número total de cupos disponibles
 *         cupos_ocupados:
 *           type: integer
 *           description: El número de cupos ocupados
 *       required:
 *         - tipo
 *         - total_cupos
 *         - cupos_ocupados
 */


/**
 * @swagger
 * /cupos:
 *   get:
 *     summary: Obtiene todos los cupos
 *     tags: [Cupos]
 *     responses:
 *       200:
 *         description: Lista de todos los cupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cupo'
 *       500:
 *         description: Error al obtener los cupos de la base de datos
 */


router.get('/cupo', Cupo.getCupos)


/**
 * @swagger
 * /cupos/tipo:
 *   get:
 *     summary: Obtiene todos los tipos de cupos
 *     tags: [Cupos]
 *     responses:
 *       200:
 *         description: Lista de todos los tipos de cupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Error al obtener los tipos de cupos de la base de datos
 */

router.get('/cupo/tipo', Cupo.getCuposTipo)


/**
 * @swagger
 * /cupos/{id}:
 *   get:
 *     summary: Obtiene un cupo por ID
 *     tags: [Cupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cupo
 *     responses:
 *       200:
 *         description: Cupo obtenido por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupo'
 *       404:
 *         description: Cupo no encontrado
 *       500:
 *         description: Error al obtener el cupo de la base de datos
 */


router.get('/cupo/:id', Cupo.getCupo)


/**
 * @swagger
 * /cupos/tipo/{tipo}:
 *   get:
 *     summary: Obtiene un cupo por tipo
 *     tags: [Cupos]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         schema:
 *           type: string
 *         required: true
 *         description: El tipo de cupo
 *     responses:
 *       200:
 *         description: Cupo obtenido por tipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupo'
 *       404:
 *         description: Cupo no encontrado
 *       500:
 *         description: Error al obtener el cupo de la base de datos
 */

router.get('/cupo/tipo/:tipo', Cupo.getCupoTipo);


/**
 * @swagger
 * /cupos:
 *   post:
 *     summary: Crea un nuevo cupo
 *     tags: [Cupos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cupo'
 *     responses:
 *       201:
 *         description: Cupo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupo'
 *       400:
 *         description: Datos de entrada inválidos o cupo ya existente
 *       500:
 *         description: Error al crear el cupo en la base de datos
 */

router.post('/cupo', Cupo.postCupos)


/**
 * @swagger
 * /cupos/{id}:
 *   patch:
 *     summary: Actualiza un cupo por ID
 *     tags: [Cupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cupo'
 *     responses:
 *       200:
 *         description: Cupo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupo'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Cupo no encontrado
 *       500:
 *         description: Error al actualizar el cupo en la base de datos
 */


router.patch('/cupo/:id', Cupo.patchCupos)


/**
 * @swagger
 * /cupos/tipo/{tipo}:
 *   patch:
 *     summary: Actualiza un cupo por tipo
 *     tags: [Cupos]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         schema:
 *           type: string
 *         required: true
 *         description: El tipo de cupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cupo'
 *     responses:
 *       200:
 *         description: Cupo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupo'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Cupo no encontrado
 *       500:
 *         description: Error al actualizar el cupo en la base de datos
 */


router.patch('/cupo/tipo/:tipo', Cupo.patchCuposTipo)


/**
 * @swagger
 * /cupos/{id}:
 *   delete:
 *     summary: Elimina un cupo por ID
 *     tags: [Cupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cupo
 *     responses:
 *       200:
 *         description: Cupo eliminado exitosamente
 *       404:
 *         description: Cupo no encontrado
 *       500:
 *         description: Error al eliminar el cupo de la base de datos
 */


router.delete('/cupo/:id', Cupo.deleteCupos)


/**
 * @swagger
 * /cupos/tipo/{tipo}:
 *   delete:
 *     summary: Elimina un cupo por tipo
 *     tags: [Cupos]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         schema:
 *           type: string
 *         required: true
 *         description: El tipo de cupo
 *     responses:
 *       200:
 *         description: Cupo eliminado exitosamente
 *       404:
 *         description: Cupo no encontrado
 *       500:
 *         description: Error al eliminar el cupo de la base de datos
 */


router.delete('/cupo/tipo/:tipo', Cupo.deleteCuposTipo)



export default router;