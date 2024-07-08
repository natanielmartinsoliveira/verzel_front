import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import Logout from './Logout';

function Header() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem('token');

  return ( 

    
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Aluguel de carros</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {token ? (
              <>
                <Nav.Link as={Link} to="/novo">Adicionar Carro</Nav.Link>
                <Nav.Link as={Link} to="/editarCarros">Editar carros</Nav.Link>
                <Nav.Link as={Link} to="/marcas">Marcas</Nav.Link>
                <Nav.Link as={Link} to="/modelos">Modelos</Nav.Link>
                <Logout />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
