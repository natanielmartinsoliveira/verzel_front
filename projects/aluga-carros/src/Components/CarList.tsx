import React, { useEffect, useState, useContext} from 'react';
import axios from '../axiosConfig';
import { Car } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Container, Row, Col, Card, Button, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface CarListProps {
    cars: Car[];
    edit: boolean;
    fetchCars: (page: number) => void;
    currentPage: number;
    totalPages: number;
  }

const CarList: React.FC<CarListProps> = ({ cars, edit, fetchCars, currentPage, totalPages }) => {
    const [carros, setCars] = useState<Car[]>([]);
    const { isAuthenticated, user, logout } = useAuth();
    const token = localStorage.getItem('token');
    const [pagina, setPagina] = useState<number>(1);
   // const [totalPaginas, setTotalPaginas] = useState<number>(1);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/carros/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //fetchCars();
        } catch (error) {
            console.error('Error deleting car', error);
        }
    };

    const handleEdit = (id: number) => {
        // Implementar a lógica de edição, talvez redirecionando para um formulário de edição
    };

    const handlePageChange = (pageNumber: number) => {
        fetchCars(pageNumber);
      };

      
    return (
        <Container className="car-list">
            
            <h2>Lista de Carros</h2>
            <Row>
                {cars.map((car) => (
                <Col key={car.id} sm={6} md={4} lg={3} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>{car.marca.nome} {car.modelo.nome}</Card.Title>
                            <Card.Text>
                            Ano: {car.ano}<br />
                            Preço: R$ {car.preco}<br />
                            Quilometragem: {car.quilometragem} km
                            </Card.Text>
                            { !edit && (
                                <div className="text-center">
                                    <Link to={`/carros/${car.id}`} className="btn btn-info">Detalhes</Link>
                                </div>
                            
                            )}
                            {isAuthenticated && edit && (
                            <div className="mt-2 text-center">
                                <Link to={`/editar/${car.id}`} className="btn btn-warning">Editar</Link>
                                <Button variant="danger" className="ms-3" onClick={() => handleDelete(car.id)}>Excluir</Button>
                            </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            <Row>
                <Col>
                <Pagination>
                    {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item key={number+1} active={number+1 === pagina} onClick={() => handlePageChange(number+1)} disabled={currentPage === number + 1}>
                        {number+1}
                    </Pagination.Item>
                    ))}
                </Pagination>
                </Col>
            </Row>
          
        </Container>
        
    );
};

export default CarList;
