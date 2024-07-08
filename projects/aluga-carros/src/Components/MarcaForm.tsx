import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Loading from './Loading'; 

interface Marca {
    id?: number;
    nome: string;
}

const MarcaForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [marca, setMarca] = useState<Marca>({ nome: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchMarca(id);
        }
    }, [id]);

    const fetchMarca = async (id: string) => {
        try {
            const response = await axios.get(`/marcas/${id}`);
            setMarca(response.data);
        } catch (error) {
            console.error('Erro ao buscar marca', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMarca({ ...marca, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`/carros/marcas/${id}`, marca);
            } else {
                await axios.post(`/marcas`, marca, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    }
                  });
            }
            navigate('/marcas');
        } catch (error) {
            console.error('Erro ao salvar marca', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Marca' : 'Nova Marca'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={marca.nome}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Atualizar' : 'Salvar'}
                </button>
            </form>
        </div>
    );
};

export default MarcaForm;
