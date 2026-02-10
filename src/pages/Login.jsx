import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideMedia from "../components/SideMedia";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(form.email, form.password);

      Swal.fire({
        icon: "success",
        title: `Bienvenido${data?.user?.name ? ` ${data.user.name}` : ""} 👋`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err?.message || "Datos incorrectos",
      });
    } finally {
      setLoading(false);
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
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </Form.Group>

            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </Form>

          <p className="text-muted mt-3 text-center">
            ¿No tenés cuenta? <Link to="/register">Registrate</Link>
          </p>
        </Col>

        <Col md={6}>
          <SideMedia video="/videos/cafe.mp4" />
        </Col>
      </Row>
    </Container>
  );
}