import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Loading from './Loading'; 

interface Marca {
  id: number;
  nome: string;
}

interface Modelo {
  id: number;
  nome: string;
}

interface Carro {
  id: number;
  marca: Marca;
  modelo: Modelo;
  ano: number;
  preco: number;
  quilometragem: number;
}

function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const [carro, setCarro] = useState<Carro>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchCarro = async () => {
        const response = await axios.get(`/carros/${id}`);
        setCarro(response.data);
      };
      fetchCarro();
    } catch (error) {
        console.error('Error fetching marcas', error);
    } finally {
        setLoading(false);
    }
  }, [id]);


  return (
    <Container className="mt-5">
      {loading && <Loading />}
      {!loading && carro && 
        <Row className="justify-content-md-center ">
          <Col md={6} >
            <Card>
              <Card.Body>
                <Card.Title>{carro?.marca?.nome} {carro?.modelo?.nome}</Card.Title>
                <Card.Text>
                  Ano: {carro?.ano}<br />
                  Preço: R$ {carro?.preco}<br />
                  Quilometragem: {carro?.quilometragem} km
                </Card.Text>
                <Link to="/" className="btn btn-secondary">Voltar</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      }
      
    </Container>
  );
}

export default CarDetail;
