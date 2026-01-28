/* import { Container, Row, Col } from "react-bootstrap";

const About = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="fw-bold mb-4 text-center">Acerca de Nosotros</h2>

                    <p className="text-muted">
                        
                    </p>

                    <p className="text-muted">
                        Este proyecto corresponde a un e-commerce desarrollado como parte
                        del proceso de aprendizaje en tecnologías frontend, utilizando
                        React, React Router y Bootstrap.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
 */

import { Container, Row, Col } from "react-bootstrap";
import SideMedia from "../components/SideMedia";

const About = () => {
    return (
        <Container className="py-5 page-fade">
            <Row className="align-items-center">
                {/* TEXTO */}
                <Col md={6}>
                    <h1 className="mb-4">Sobre Nosotros</h1>

                    <p className="text-muted">
                        En <strong>Panadería y Market D´Pieri</strong> trabajamos día a día
                        para ofrecer productos frescos, artesanales y de calidad.
                    </p>

                    <p className="text-muted">
                        Nuestro compromiso es combinar tradición, buenos ingredientes y
                        atención cercana, acompañando a nuestros clientes en cada momento
                        del día.
                    </p>

                    <p className="text-muted">
                        Panadería y Market D´Pieri Es un emprendimiento familiar dedicado a
                        ofrecer productos frescos y de calidad todos los días. Nuestro
                        objetivo es llevar a cada hogar panadería artesanal y alimentos
                        seleccionados con el mejor estándar.
                    </p>
                </Col>

                {/* VIDEO */}
                <Col md={6}>
                    <SideMedia video="/videos/nosotros.mp4" />
                </Col>
            </Row>
        </Container>
    );
};

export default About;
