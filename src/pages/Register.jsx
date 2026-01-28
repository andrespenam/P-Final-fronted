import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideMedia from "../components/SideMedia";
import Swal from "sweetalert2";
import { useState } from "react";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("user", JSON.stringify(form));

        Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "Ahora podés iniciar sesión",
        });

        setForm({ name: "", email: "", password: "" });
    };

    return (
        <Container className="py-5 page-fade">
            <Row className="align-items-center">
                <Col md={6}>
                    <h1 className="mb-4">Crear cuenta</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Tu email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Tu contraseña"
                            />
                        </Form.Group>

                        <Button type="submit" className="w-100">
                            Registrarse
                        </Button>
                    </Form>
                    <p className="text-muted mt-3 text-center">
                        ¿Ya tenés cuenta? <a href="/login">Ingresar</a>
                    </p>
                </Col>
                

                <Col md={6}>
                    <SideMedia video="/videos/panaderia.mp4" />
                </Col>
            </Row>
        </Container>
    );
};

export default Register;

