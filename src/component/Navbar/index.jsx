import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './style.css'
import { useState } from 'react';

function NavBar() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'))

  function handleLogout(){
    if(token != null){
      localStorage.removeItem('accessToken');
      setToken(null)
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container fluid>
        <Link to={'/'}>
            <Navbar.Brand>Navbar</Navbar.Brand>
        </Link>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={'/'}>
                <Nav>Home</Nav>
            </Link>
          </Nav>

          <Link to={'/login'}>
            <Button variant={token == null ? "outline-success" : "outline-danger"} onClick={handleLogout}>
              {
                token == null ? "LOGIN" : "LOGOUT"
              }
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;