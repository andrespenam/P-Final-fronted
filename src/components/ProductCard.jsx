import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

const cleanText = (text) => {
    if (!text) return "";
    return String(text).normalize("NFC");
};

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(AppContext);

    return (
        <Card className="product-card h-100">
            <Card.Img
                src={product.image}
                alt={cleanText(product.name)}
                style={{ height: "200px", objectFit: "cover" }}
            />

            <Card.Body className="d-flex flex-column">
                <Card.Title>{cleanText(product.name)}</Card.Title>

                <Card.Text className="fw-bold">
                    {Number(product.price).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                    })}
                </Card.Text>

                <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => {
                        addToCart(product);
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Producto agregado al pedido",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }}
                >
                    Agregar al pedido
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;