import express from 'express'
import cors from 'cors';
import indexroutes from "./routes/index.routes.js"
import vehiculos from "./routes/vehiculo.routes.js"
import cupo from "./routes/cupo.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
 
app.use("/api", vehiculos)
app.use("/api", cupo)
app.use(indexroutes)



app.use((req, res, next) => {
    res.status(404).json({ message: "endpoint not found " })
})