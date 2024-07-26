import { Router } from "express";
import { Cupo } from "../controllers/cupo.controllers.js";


const router = Router()

router.get('/cupo', Cupo.getCupos)

router.get('/cupo/tipo', Cupo.getCuposTipo)

router.get('/cupo/:id', Cupo.getCupo)

router.post('/cupo', Cupo.postCupos)

router.patch('/cupo/:id', Cupo.patchCupos)

router.patch('/cupo/tipo/:tipo', Cupo.patchCuposTipo)

router.delete('/cupo/:id', Cupo.deleteCupos)

router.delete('/cupo/tipo/:tipo', Cupo.deleteCuposTipo)



export default router;