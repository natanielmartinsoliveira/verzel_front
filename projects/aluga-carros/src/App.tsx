import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './Components/CarList';
import CarDetail from './Components/CarDetail';
import CarForm from './Components/CarForm';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import MarcaList from './Components/MarcaList';
import ModeloList from './Components/ModeloList';
import MarcaForm from './Components/MarcaForm';
import ModeloForm from './Components/ModeloForm';
import FilterSidebar from './Components/FilterSidebar';
import Loading from './Components/Loading'; 
import { Car, Filters } from './types';
import axios from './axiosConfig';
import './App.css';

const App: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [filters, setFilters] = useState<Filters>({
        marca: '',
        modelo: '',
        ano: '',
        quilometragem_min: '',
        quilometragem_max: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const validFilters = removeEmptyFilters(filters);
        fetchCars(currentPage, validFilters);
    }, [filters, currentPage]);

    const fetchCars = async (page: number = 1, validFilters: Filters = filters) => {
        setLoading(true);
        try {
            const response = await axios.get('/carros', { params: { ...validFilters, page } });
            setCars(response.data.data);
            setCurrentPage(response.data.current_page);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching cars', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters: Filters) => {
        const validFilters = removeEmptyFilters(newFilters);
        setFilters(validFilters);
        setCurrentPage(1);  // Reset to page 1 whenever filters change
    };

    const isValidFilters = (filters: Filters): boolean => {
        if (filters.ano && (isNaN(Number(filters.ano)) || Number(filters.ano) < 1900)) {
            console.error('Invalid year');
            return false;
        }
        if (filters.quilometragem_min !== '' && isNaN(Number(filters.quilometragem_min))) {
            console.error('Invalid minimum mileage');
            return false;
        }
        if (filters.quilometragem_max !== '' && isNaN(Number(filters.quilometragem_max))) {
            console.error('Invalid maximum mileage');
            return false;
        }
        if (filters.quilometragem_min !== '' && filters.quilometragem_max !== '' && Number(filters.quilometragem_min) > Number(filters.quilometragem_max)) {
            console.error('Minimum mileage cannot be greater than maximum mileage');
            return false;
        }
        return true;
    };

    const removeEmptyFilters = (filters: Filters): Filters => {
        const validFilters: Filters = {
            marca: '',
            modelo: '',
            ano: '',
            quilometragem_min: '',
            quilometragem_max: ''
        };

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                validFilters[key as keyof Filters] = value;
            }
        });

        return validFilters;
    };

    return (
        <Router>
            <AuthProvider>
                <div className="container-fluid">
                    <Header />
                    <div className="main-content">
                        <div className="row" style={{ flex: 1 }}>
                            <div className="col-md-3">
                                <FilterSidebar onFilterChange={handleFilterChange} />
                            </div>
                            <div className="col-md-9">

                                {loading && <Loading />}

                                <Routes>
                                    <Route path="/" element={<CarList cars={cars} edit={false} fetchCars={fetchCars} currentPage={currentPage} totalPages={totalPages} />} />
                                    <Route path="/carros/:id" element={<CarDetail />} />
                                    <Route path="/editarCarros" element={<CarList cars={cars} edit={true} fetchCars={fetchCars} currentPage={currentPage} totalPages={totalPages} />} />
                                    <Route path="/novo" element={<CarForm fetchCars={fetchCars} />} />
                                    <Route path="/editar/:id" element={<CarForm fetchCars={fetchCars} />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/marcas" element={<MarcaList />} />
                                    <Route path="/marcasNovo" element={<MarcaForm />} />
                                    <Route path="/marcas/:id" element={<MarcaForm />} />
                                    <Route path="/modelos" element={<ModeloList />} />
                                    <Route path="/modelosNovo" element={<ModeloForm />} />
                                    <Route path="/modelos/:id" element={<ModeloForm />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
