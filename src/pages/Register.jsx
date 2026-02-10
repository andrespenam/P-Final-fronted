import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideMedia from "../components/SideMedia";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await register(form.name, form.email, form.password);

            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: data?.token ? "Ya estás logueado" : "Ahora podés iniciar sesión",
                showConfirmButton: false,
                timer: 1500,
            });

            setForm({ name: "", email: "", password: "" });
            navigate(data?.token ? "/dashboard" : "/login", { replace: true });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: err?.message || "Error registrando",
            });
        } finally {
            setLoading(false);
        }
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
                                autoComplete="name"
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
                                autoComplete="email"
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
                                autoComplete="new-password"
                            />
                        </Form.Group>

                        <Button type="submit" className="w-100" disabled={loading}>
                            {loading ? "Registrando..." : "Registrarse"}
                        </Button>
                    </Form>

                    <p className="text-muted mt-3 text-center">
                        ¿Ya tenés cuenta? <Link to="/login">Ingresar</Link>
                    </p>
                </Col>

                <Col md={6}>
                    <SideMedia video="/videos/panaderia.mp4" />
                </Col>
            </Row>
        </Container>
    );
}