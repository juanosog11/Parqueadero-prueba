// ModificarVehiculoPage.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ModificarVehiculoPage() {
    const { id } = useParams(); // Obtener el ID de los parámetros de la URL
    const navigate = useNavigate(); // Para navegar de vuelta a la página anterior
    const [vehiculo, setVehiculo] = useState({ placa: '', tipo: '' });
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        const fetchVehiculo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/vehiculos/${id}`);
                setVehiculo(response.data);
            } catch (error) {
                console.error('Error fetching vehiculo:', error);
            }
        };

        const fetchTipos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cupo/tipo');
                setTipos(response.data);
            } catch (error) {
                console.error('Error fetching tipos:', error);
            }
        };

        fetchVehiculo();
        fetchTipos();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/api/vehiculos/${id}`, vehiculo);
            navigate('/'); // Redirigir a la página anterior después de la actualización
        } catch (error) {
            console.error('Error updating vehiculo:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehiculo((prevVehiculo) => ({
            ...prevVehiculo,
            [name]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Modificar Vehículo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="placa" className="block text-gray-700 font-medium mb-2">Placa:</label>
                        <input
                            type="text"
                            id="placa"
                            name="placa"
                            value={vehiculo.placa}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="tipo" className="block text-gray-700 font-medium mb-2">Tipo:</label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={vehiculo.tipo}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione un tipo</option>
                            {tipos.map((tipo) => (
                                <option key={tipo.id} value={tipo.tipo}>
                                    {tipo.tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Actualizar Vehículo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModificarVehiculoPage;
