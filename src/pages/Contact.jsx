import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideMedia from "../components/SideMedia";

const Contact = () => {
    return (
        <Container className="py-5 page-fade">

            <Row className="align-items-center">
                <Col md={6}>
                    <h1 className="mb-4">Contacto</h1>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control placeholder="Nombre" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control as="textarea" rows={4} placeholder="Mensaje" />
                        </Form.Group>

                        <Button variant="primary">Enviar</Button>
                    </Form>
                </Col>

                <Col md={6}>
                    <SideMedia video="/videos/contacto.mp4" />
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
