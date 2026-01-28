import { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const NavbarComponent = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "¿Cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Salir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                logout(); 
                navigate("/");
            }
        });
    };

    return (
        <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to="/">🥖 Panadería D´Pieri</Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={NavLink} to="/acerca">Nosotros</Nav.Link>

                        {user && <Nav.Link as={NavLink} to="/pedido">🛒 Pedido</Nav.Link>}

                        {user ? (
                            <>
                                <span className="ms-3 me-2 fw-semibold">
                                    👋 {user.name}
                                </span>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                                    Salir
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login">Ingresar</Nav.Link>
                                <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
