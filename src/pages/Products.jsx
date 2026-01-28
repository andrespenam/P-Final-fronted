import { Container, Row, Col } from "react-bootstrap";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Products = () => {
    return (
        <Container className="py-5">
            <h1 className="mb-4 text-center">Nuestros Productos</h1>

            <Row>
                {products.map((product) => (
                    <Col md={6} lg={3} key={product.id} className="mb-4">
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Products;
