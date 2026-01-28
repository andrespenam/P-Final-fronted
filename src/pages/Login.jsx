/* import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideMedia from "../components/SideMedia";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (
            storedUser &&
            storedUser.email === form.email &&
            storedUser.password === form.password
        ) {
            
            localStorage.setItem("loggedUser", JSON.stringify(storedUser));
            Swal.fire({
                icon: "success",
                title: `Bienvenido ${storedUser.name} 👋`,
                showConfirmButton: false,
                timer: 2500,
            });
            navigate("/", { replace: true });
        } else {
            Swal.fire({
                icon: "error",
                title: "Datos incorrectos",
                
            });
        }
    };

    return (
        <Container className="py-5 page-fade">
            <Row className="align-items-center">
                <Col md={6}>
                    <h1 className="mb-4">Ingresar</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                onChange={handleChange}
                                placeholder="tu email"
                                value={form.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Tu contraseña"
                                value={form.password}
                            />
                        </Form.Group>

                        <Button type="submit" className="w-100">
                            Ingresar
                        </Button>
                    </Form>
                    <p className="text-muted mt-3 text-center">
                        ¿No tenés cuenta? <a href="/registro">Registrate</a>
                    </p>
                </Col>

                <Col md={6}>
                    <SideMedia video="/videos/cafe.mp4" />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
 */

import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideMedia from "../components/SideMedia";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // <-- IMPORTA TU CONTEXT

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext); // <-- usamos login del Context
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user")); // tus usuarios "registrados"

        if (storedUser && storedUser.email === form.email && storedUser.password === form.password) {
            // Usa la función login del context
            login(storedUser);

            Swal.fire({
                icon: "success",
                title: `Bienvenido ${storedUser.name} 👋`,
                showConfirmButton: false,
                timer: 1500,
            });

            navigate("/", { replace: true }); // redirige automáticamente al inicio
        } else {
            Swal.fire({
                icon: "error",
                title: "Datos incorrectos",
            });
        }
    };

    return (
        <Container className="py-5 page-fade">
            <Row className="align-items-center">
                <Col md={6}>
                    <h1 className="mb-4">Ingresar</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                                placeholder="Tu email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={form.password}
                                placeholder="Tu contraseña"
                            />
                        </Form.Group>
                        <Button type="submit" className="w-100">Ingresar</Button>
                    </Form>
                    <p className="text-muted mt-3 text-center">
                        ¿No tenés cuenta? <a href="/registro">Registrate</a>
                    </p>
                </Col>
                <Col md={6}>
                    <SideMedia video="/videos/cafe.mp4" />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
