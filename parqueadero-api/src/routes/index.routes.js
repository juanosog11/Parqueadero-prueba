import { Router } from "express";
import { ping } from "../controllers/index.controller.js";

const router = Router()


/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Verifica la disponibilidad del servidor
 *     tags: [Ping]
 *     responses:
 *       200:
 *         description: El servidor está disponible y responde con "pong"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: pong
 *       500:
 *         description: Error al ejecutar la consulta o al obtener el resultado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message
 */


router.get('/ping', ping) 


export default router