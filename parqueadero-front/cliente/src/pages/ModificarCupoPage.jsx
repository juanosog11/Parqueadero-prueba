import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ModificarCupoPage() {
    const { id } = useParams(); // Get the ID from the URL parameters
    const navigate = useNavigate(); // For navigating back to the previous page
    const [cupo, setCupo] = useState({ tipo: '', total_cupos: 0, cupos_ocupados: 0 });

    useEffect(() => {
        const fetchCupo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/cupo/${id}`);
                setCupo(response.data);
            } catch (error) {
                console.error('Error fetching cupo:', error);
            }
        };

        fetchCupo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/api/cupo/${id}`, {
                tipo: cupo.tipo,
                total_cupos: cupo.total_cupos,
                // No need to include cupos_ocupados since it won't be modified
            });
            navigate('/'); // Redirect to the previous page after successful update
        } catch (error) {
            console.error('Error updating cupo:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCupo((prevCupo) => ({
            ...prevCupo,
            [name]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Modificar Cupo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="tipo" className="block text-gray-700 font-medium mb-2">Tipo:</label>
                        <input
                            type="text"
                            id="tipo"
                            name="tipo"
                            value={cupo.tipo}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="total_cupos" className="block text-gray-700 font-medium mb-2">Total Cupos:</label>
                        <input
                            type="number"
                            id="total_cupos"
                            name="total_cupos"
                            value={cupo.total_cupos}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cupos_ocupados" className="block text-gray-700 font-medium mb-2">Cupos Ocupados:</label>
                        <input
                            type="text" // Change to text to make it readOnly
                            id="cupos_ocupados"
                            name="cupos_ocupados"
                            value={cupo.cupos_ocupados}
                            readOnly // Make the field readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200" // Optional: Add background color for readOnly field
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Actualizar Cupo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModificarCupoPage;
