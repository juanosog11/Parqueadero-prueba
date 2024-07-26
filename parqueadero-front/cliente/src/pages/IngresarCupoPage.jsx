import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function IngresarCupoPage() {
    const [newCupoTipo, setNewCupoTipo] = useState('');
    const [newCupoTotal, setNewCupoTotal] = useState('');
    const navigate = useNavigate();

    const handleSubmitCupo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/cupo', {
                tipo: newCupoTipo,
                total_cupos: newCupoTotal,
                cupos_ocupados: 0
            });
            console.log('Cupo agregado:', response.data);
            // Redirigir a la página de ingreso de autos o donde desees después de agregar el cupo
            navigate('/');
        } catch (error) {
            console.error('Error adding cupo:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Ingresar Nuevo Cupo</h1>
                <form onSubmit={handleSubmitCupo}>
                    <div className="mb-4">
                        <label htmlFor="cupoTipo" className="block text-gray-700 font-medium mb-2">Tipo:</label>
                        <input
                            type="text"
                            id="cupoTipo"
                            value={newCupoTipo}
                            onChange={(e) => setNewCupoTipo(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cupoTotal" className="block text-gray-700 font-medium mb-2">Total de Cupos:</label>
                        <input
                            type="number"
                            id="cupoTotal"
                            value={newCupoTotal}
                            onChange={(e) => setNewCupoTotal(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Ingresar Cupo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default IngresarCupoPage;
