import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";

const Home = () => {
    const { featuredProducts, loadingFeatured, featuredError } =
        useContext(AppContext);

    return (
        <>
            <div className="bg-light py-5 border-bottom">
                <Container fluid className="px-lg-5">
                    <Row className="align-items-center fade-in">
                        <Col md={6}>
                            <h1 className="display-4 fw-bold">
                                Bienvenido a Panadería y Market D´Pieri
                            </h1>
                            <p className="lead mb-4">
                                Productos frescos todos los días. Panadería artesanal y alimentos
                                seleccionados para tu hogar.
                            </p>
                            <Button variant="primary" size="lg" href="/productos">
                                Ver productos
                            </Button>
                        </Col>

                        <Col md={6} className="text-center mt-4 mt-md-0">
                            <img
                                src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
                                alt="Panadería"
                                className="img-fluid rounded shadow"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                <h2 className="text-center fw-bold mb-4">Productos destacados</h2>

                {loadingFeatured && <p className="text-center">Cargando...</p>}
                {featuredError && (
                    <p className="text-center text-danger">Error: {featuredError}</p>
                )}

                <Row>
                    {!loadingFeatured &&
                        !featuredError &&
                        featuredProducts.map((product) => (
                            <Col md={4} key={product.id} className="mb-4">
                                <ProductCard product={product} />
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    );
};

export default Home;