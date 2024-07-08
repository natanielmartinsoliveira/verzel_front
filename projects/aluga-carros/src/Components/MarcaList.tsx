import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import { Marca } from '../types';
import Loading from './Loading'; 

const MarcaList: React.FC = () => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMarcas();
    }, []);

    const fetchMarcas = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/marcas`);
            setMarcas(response.data);
        } catch (error) {
            console.error('Error fetching marcas', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/marcas/${id}`);
            setMarcas(marcas.filter(marca => marca.id !== id));
        } catch (error) {
            console.error('Error deleting marca', error);
        }
    };

    return (
        <div>
            {loading && <Loading />}
            <h2>Marcas</h2>
            <Link to="/marcasNovo" className="btn btn-success mb-3">Adicionar Marca</Link>
            <ul className="list-group">
                {marcas.map(marca => (
                    <li key={marca.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {marca.nome}
                        <div>
                            <Link to={`/marcas/${marca.id}`} className="btn btn-primary btn-sm mr-2">Editar</Link>
                            <button onClick={() => handleDelete(marca.id)} className="btn btn-danger btn-sm">Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MarcaList;
