import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngresoAutosPage from './pages/IngresoAutosPage';
import ModificarCupoPage from './pages/ModificarCupoPage';
import ModificarVehiculoPage from './pages/ModificarVehiculoPage'; // Asegúrate de crear este componente
import IngresarCupoPage from './pages/IngresarCupoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IngresoAutosPage />} />
        <Route path="/modificar-cupo/:id" element={<ModificarCupoPage />} />
        <Route path="/modificar-vehiculo/:id" element={<ModificarVehiculoPage />} /> 
        <Route path='/ingresar-cupo' element={<IngresarCupoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
