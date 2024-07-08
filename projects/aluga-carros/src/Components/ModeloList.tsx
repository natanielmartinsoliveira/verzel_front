import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import { Modelo } from '../types';
import Loading from './Loading'; 

const ModeloList: React.FC = () => {
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchModelos();
    }, []);

    const fetchModelos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/modelos`);
            setModelos(response.data);
        } catch (error) {
            console.error('Error fetching modelos', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/modelos/${id}`);
            setModelos(modelos.filter(modelo => modelo.id !== id));
        } catch (error) {
            console.error('Error deleting modelo', error);
        }
    };

    return (
        <div>
            {loading && <Loading />}
            <h2>Modelos</h2>
            <Link to="/modelosNovo" className="btn btn-success mb-3">Adicionar Modelo</Link>
            <ul className="list-group">
                {modelos.map(modelo => (
                    <li key={modelo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {modelo.nome}
                        <div>
                            <Link to={`/modelos/${modelo.id}`} className="btn btn-primary btn-sm mr-2">Editar</Link>
                            <button onClick={() => handleDelete(modelo.id)} className="btn btn-danger btn-sm">Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModeloList;