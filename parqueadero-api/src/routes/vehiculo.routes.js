import { Router } from "express";
import { vehiculo } from "../controllers/vehiculo.controllers.js";

const router = Router()

router.get('/vehiculos', vehiculo.getVehiculos)

router.get('/vehiculos/:placa', vehiculo.getVehiculo)

router.post('/vehiculos', vehiculo.postVehiculos)

router.patch('/vehiculos/:placa', vehiculo.patchVehiculos)

router.delete('/vehiculos/:placa', vehiculo.deleteVehiculos)



export default router;