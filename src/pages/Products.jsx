import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";

const Products = () => {
    const { products, loadingProducts, productsError } = useContext(AppContext);

    return (
        <Container className="py-5">
            <h1 className="mb-4 text-center">Nuestros Productos</h1>

            {loadingProducts && <p className="text-center">Cargando...</p>}
            {productsError && (
                <p className="text-center text-danger">Error: {productsError}</p>
            )}

            <Row>
                {!loadingProducts &&
                    !productsError &&
                    products.map((product) => (
                        <Col md={6} lg={3} key={product.id} className="mb-4">
                            <ProductCard product={product} />
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default Products;