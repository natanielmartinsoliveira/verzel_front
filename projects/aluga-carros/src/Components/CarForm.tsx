import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { Marca, Modelo } from '../types'; 

interface CarFormProps {
  fetchCars: () => void; 
}

function CarForm({ fetchCars }: CarFormProps) {
  const { id } = useParams<{ id: string }>();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [marca, setMarca] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [ano, setAno] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [quilometragem, setQuilometragem] = useState<string>('');
  const { user } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const marcasResponse = await axios.get(`/marcas`);
      setMarcas(marcasResponse.data);

      if (id) {
        const carroResponse = await axios.get(`/carros/${id}`);
        const carro = carroResponse.data;
        setMarca(carro.marca_id.toString());
        setModelo(carro.modelo_id.toString());
        setAno(carro.ano.toString());
        setPreco(carro.preco.toString());
        setQuilometragem(carro.quilometragem.toString());
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (marca) {
      const fetchModelos = async () => {
        const response = await axios.get(`/modelos/marcas/${marca}/`);
        setModelos(response.data);
      };

      fetchModelos();
    }
  }, [marca]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      marca_id: parseInt(marca),
      modelo_id: parseInt(modelo),
      ano: parseInt(ano),
      preco: parseFloat(preco),
      quilometragem: parseInt(quilometragem),
      user_id: user!.id
    };

    try {
      if (id) {
        await axios.put(`/carros/${id}`, data);
      } else {
        await axios.post(`/carros`, data);
      }
      fetchCars();
      history('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const anos = Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>{id ? 'Editar Carro' : 'Adicionar Carro'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control as="select" value={marca} onChange={(e) => setMarca(e.target.value)}>
                <option value="">Selecione a Marca</option>
                {marcas.map(m => (
                  <option key={m.id} value={m.id.toString()}>{m.nome}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control as="select" value={modelo} onChange={(e) => setModelo(e.target.value)}>
                <option value="">Selecione o Modelo</option>
                {modelos.map(m => (
                  <option key={m.id} value={m.id.toString()}>{m.nome}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAno">
              <Form.Label>Ano</Form.Label>
              <Form.Control as="select" value={ano} onChange={(e) => setAno(e.target.value)}>
                <option value="">Todos</option>
                {anos.map((ano) => (
                    <option key={ano} value={ano}>{ano}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPreco">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Preço"
              />
            </Form.Group>
            <Form.Group controlId="formQuilometragem">
              <Form.Label>Quilometragem</Form.Label>
              <Form.Control
                type="number"
                value={quilometragem}
                onChange={(e) => setQuilometragem(e.target.value)}
                placeholder="Quilometragem"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {id ? 'Atualizar' : 'Adicionar'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CarForm;
