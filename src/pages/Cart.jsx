import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Cart = () => {
    const {
        cart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        total,
        checkout,
        creatingOrder,
    } = useContext(AppContext);

    if (cart.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h2>Tu pedido está vacío 🛒</h2>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="mb-4">Tu Pedido</h1>

            {cart.map((item) => (
                <Row
                    key={item.id}
                    className="align-items-center mb-3 border-bottom pb-3"
                >
                    <Col md={2}>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                        />
                    </Col>

                    <Col md={3}>
                        <strong>{item.name}</strong>
                    </Col>

                    <Col md={2}>${item.price}</Col>

                    <Col md={3} className="d-flex align-items-center">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => decreaseQty(item.id)}
                        >
                            −
                        </Button>

                        <span className="mx-2">{item.quantity}</span>

                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => increaseQty(item.id)}
                        >
                            +
                        </Button>
                    </Col>

                    <Col md={2}>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Eliminar
                        </Button>
                    </Col>
                </Row>
            ))}

            <h3 className="text-end mt-4">
                Total: <strong>${total}</strong>
            </h3>

            <div className="d-flex justify-content-end mt-3">
                <Button
                    variant="success"
                    size="lg"
                    disabled={creatingOrder}
                    onClick={async () => {
                        try {
                            const res = await checkout();

                            Swal.fire({
                                icon: "success",
                                title: "Pedido creado",
                                text: "Tu pedido fue enviado correctamente",
                            });

                            console.log(res);
                        } catch (err) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: err.message,
                            });
                        }
                    }}
                >
                    {creatingOrder ? "Enviando..." : "Finalizar pedido"}
                </Button>
            </div>
        </Container>
    );
};

export default Cart;