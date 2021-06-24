import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const OrdersList = ({ Orders }) => {
    const { productName, price, productImage, category } = Orders.product

    return (
        <Col md={6}>
            <Card className="mb-3" style={{ maxWidth: '540px' }}>
                <Row>
                    <Col md={4} className="my-auto">
                        <Card.Img src={productImage} />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title>{productName}</Card.Title>
                            <Card.Text>
                                <ul type="none">
                                    <li>{category}</li>
                                    <li>{(new Date(Orders.OrdersTime).toDateString('dd/MM/yyyy'))}</li>
                                    <li>${price}</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default OrdersList;