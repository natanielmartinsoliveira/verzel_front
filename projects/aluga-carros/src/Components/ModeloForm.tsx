import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Loading from './Loading'; 

interface Modelo {
    id?: number;
    nome: string;
    marca_id: number;
}

interface Marca {
    id: number;
    nome: string;
}

const ModeloForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [modelo, setModelo] = useState<Modelo>({ nome: '', marca_id: 0 });
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchMarcas();
        if (id) {
            fetchModelo(id);
        }
    }, [id]);

    const fetchMarcas = async () => {
        try {
            const response = await axios.get(`/marcas`);
            setMarcas(response.data);
        } catch (error) {
            console.error('Erro ao buscar marcas', error);
        }
    };

    const fetchModelo = async (id: string) => {
        try {
            const response = await axios.get(`/modelos/${id}`);
            setModelo(response.data);
        } catch (error) {
            console.error('Erro ao buscar modelo', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setModelo({ ...modelo, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`/modelos/${id}`, modelo);
            } else {
                await axios.post(`/modelos`, modelo);
            }
            navigate('/modelos');
        } catch (error) {
            console.error('Erro ao salvar modelo', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Modelo' : 'Novo Modelo'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={modelo.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="marca_id">Marca</label>
                    <select
                        className="form-control"
                        id="marca_id"
                        name="marca_id"
                        value={modelo.marca_id}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma marca</option>
                        {marcas.map(marca => (
                            <option key={marca.id} value={marca.id}>
                                {marca.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Atualizar' : 'Salvar'}
                </button>
            </form>
        </div>
    );
};

export default ModeloForm;