import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function IngresoAutosPage() {
    const [placa, setPlaca] = useState('');
    const [tipos, setTipos] = useState([]);
    const [selectedTipo, setSelectedTipo] = useState('');
    const [cupos, setCupos] = useState([]);
    const [vehiculoEncontrado, setVehiculoEncontrado] = useState(null);

    const [newCupoTipo, setNewCupoTipo] = useState('');
    const [newCupoTotal, setNewCupoTotal] = useState('');

    useEffect(() => {
        // Fetch vehicle types from the backend
        const fetchTipos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cupo/tipo');
                setTipos(response.data);
            } catch (error) {
                console.error('Error fetching tipos:', error);
            }
        };

        // Fetch cupos from the backend
        const fetchCupos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cupo');
                setCupos(response.data);
            } catch (error) {
                console.error('Error fetching cupos:', error);
            }
        };

        fetchTipos();
        fetchCupos();
    }, []);

    const handleSubmitVehiculo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/vehiculos', { placa, tipo: selectedTipo });
            console.log('Vehículo agregado:', response.data);
            alert(response.data.message)
            // Reset form fields after successful submission
            setPlaca('');
            setSelectedTipo('');
        } catch (error) {
            console.error('Error adding vehículo:', error);
        }
    };

    const handleSubmitCupo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/cupo', { tipo: newCupoTipo, total_cupos: newCupoTotal });
            console.log('Cupo agregado:', response.data);
            // Reset form fields after successful submission
            setNewCupoTipo('');
            setNewCupoTotal('');
        } catch (error) {
            console.error('Error adding cupo:', error);
        }
    };

    const buscarVehiculo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/vehiculos/${placa}`);
            setVehiculoEncontrado(response.data);
        } catch (error) {
            console.error('Error buscando vehículo:', error);
            setVehiculoEncontrado(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-5xl">
                {/* Formulario de ingreso de vehículos */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mr-4">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Ingreso de Vehículos</h1>
                    <form onSubmit={handleSubmitVehiculo}>
                        <div className="mb-4">
                            <label htmlFor="placa" className="block text-gray-700 font-medium mb-2">Placa:</label>
                            <input
                                type="text"
                                id="placa"
                                value={placa}
                                onChange={(e) => setPlaca(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="tipo" className="block text-gray-700 font-medium mb-2">Tipo:</label>
                            <select
                                id="tipo"
                                value={selectedTipo}
                                onChange={(e) => setSelectedTipo(e.target.value)}
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
                            Ingresar Vehículo
                        </button>
                    </form>
                </div>

                {/* Lista de cupos */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full ">
                    <h2 className="text-xl font-semibold mb-6 text-center">Estado de Cupos</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Tipo</th>
                                <th className="py-2 px-4 border-b">Total Cupos</th>
                                <th className="py-2 px-4 border-b">Cupos Ocupados</th>
                                <th className="py-2 px-4 border-b">Cupos Disponibles</th>
                                <th className="py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cupos.map((cupo) => (
                                <tr key={cupo.id}>
                                    <td className="py-2 px-4 border-b">{cupo.tipo}</td>
                                    <td className="py-2 px-4 border-b">{cupo.total_cupos}</td>
                                    <td className="py-2 px-4 border-b">{cupo.cupos_ocupados}</td>
                                    <td className="py-2 px-4 border-b">{cupo.total_cupos - cupo.cupos_ocupados}</td>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={`/modificar-cupo/${cupo.id}`}>
                                            <button className="bg-green-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-green-600 transition duration-300">
                                                Modificar Cupo
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Botón para ingresar nuevo cupo */}
                    <div className="mt-4 text-center">
                        <Link to="/ingresar-cupo">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                Ingresar Cupo
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Buscar vehículo por placa */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mt-6">
                <h2 className="text-xl font-semibold mb-6 text-center">Buscar Vehículo por Placa</h2>
                <div className="mb-4 flex">
                    <input
                        type="text"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        placeholder="Ingrese la placa"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={buscarVehiculo}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Buscar
                    </button>
                </div>
                {vehiculoEncontrado && (
                    <div>
                        <h3 className="text-lg font-semibold">Vehículo Encontrado:</h3>
                        <p>Placa: {vehiculoEncontrado.placa}</p>
                        <p>Tipo: {vehiculoEncontrado.tipo}</p>
                        <div className="mt-4">
                            <Link to={`/modificar-vehiculo/${vehiculoEncontrado.placa}`}>
                                <button className="bg-green-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-green-600 transition duration-300">
                                    Modificar Vehículo
                                </button>
                            </Link>

                            <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300">
                                Registrar Salida
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Formulario para ingresar nuevo cupo */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-6" style={{ display: 'none' }}>
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

export default IngresoAutosPage;

