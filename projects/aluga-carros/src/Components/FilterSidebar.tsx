import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { Filters, Marca, Modelo } from '../types';

interface FilterSidebarProps {
    onFilterChange: (filters: Filters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [filters, setFilters] = useState<Filters>({
        marca: '',
        modelo: '',
        ano: '',
        quilometragem_min: '',
        quilometragem_max: ''
    });

    useEffect(() => {
        fetchMarcas();
    }, []);

    useEffect(() => {
        if (filters.marca) {
            fetchModelos();
        } else {
            setModelos([]); 
            setFilters(prevFilters => ({
                ...prevFilters,
                modelo: '' 
            }));
        }
    }, [filters.marca]);

    const fetchMarcas = async () => {
        try {
            const response = await axios.get<Marca[]>('/marcas');
            setMarcas(response.data);
        } catch (error) {
            console.error('Error fetching brands', error);
        }
    };

    const fetchModelos = async () => {
        try {
            const response = await axios.get<Modelo[]>(`/modelos/marcas/${filters.marca}/`);
            setModelos(response.data);
        } catch (error) {
            console.error('Error fetching models', error);
            setModelos([]); // Limpa os modelos em caso de erro
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'marca') {
            const newFilters = { ...filters, [name]: value, modelo: '' };
            setFilters(newFilters);
            onFilterChange(newFilters);
        } else {
            const newValue = (name === 'quilometragem_min' || name === 'quilometragem_max') ? parseInt(value, 10) || '' : value;
            const newFilters = { ...filters, [name]: newValue };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const anos = Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => (new Date().getFullYear() - i).toString());

    return (
        <div className="filter-sidebar">
            <h4>Filtros</h4>
            <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <select className="form-control" id="marca" name="marca" value={filters.marca} onChange={handleInputChange}>
                    <option value="">Todas</option>
                    {marcas.map((marca) => (
                        <option key={marca.id} value={marca.id}>{marca.nome}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <select className="form-control" id="modelo" name="modelo" value={filters.modelo} onChange={handleInputChange}>
                    <option value="">Todos</option>
                    {modelos.map((modelo) => (
                        <option key={modelo.id} value={modelo.id}>{modelo.nome}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="ano">Ano</label>
                <select className="form-control" id="ano" name="ano" value={filters.ano} onChange={handleInputChange}>
                    <option value="">Todos</option>
                    {anos.map((ano) => (
                        <option key={ano} value={ano}>{ano}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="quilometragem_min">Quilometragem Mínima</label>
                <input
                    type="number"
                    className="form-control"
                    id="quilometragem_min"
                    name="quilometragem_min"
                    value={filters.quilometragem_min}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="quilometragem_max">Quilometragem Máxima</label>
                <input
                    type="number"
                    className="form-control"
                    id="quilometragem_max"
                    name="quilometragem_max"
                    value={filters.quilometragem_max}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default FilterSidebar;
