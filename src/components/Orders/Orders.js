import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MoonLoader from "react-spinners/MoonLoader";
import { UserContext } from '../../App';
import OrdersList from '../OrdersList/OrdersList';

const loaderStyle = `
  display: block;
  margin: auto;
`;

const Orderss = () => {
    const { loggedInUser } = useContext(UserContext);
    const [OrdersDetails, setOrdersDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://arcane-caverns-50893.herokuapp.com/Orderss?email=${loggedInUser.email}`)
            .then(response => {
                setOrdersDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [loggedInUser.email])

    const { _id, OrdersTime } = OrdersDetails.length && OrdersDetails[0];
    const totalPrice = OrdersDetails.length && OrdersDetails.reduce((total, Orders) => total + Number(Orders.product?.price), 0);

    return (
        <Container>
            {loading ? <MoonLoader loading={loading} css={loaderStyle} size={60} /> : (
                OrdersDetails.length ?
                    <>
                        <h1 className="text-center" style={{ fontSize: '2rem' }}>Thanks for your Orders</h1>
                        <h6 className="text-center mb-5">Your Orders is being processed</h6>
                        <h5>Orders List</h5>
                        <Row>
                            {
                                OrdersDetails.map(Orders => <OrdersList key={Orders._Id} Orders={Orders} />)
                            }
                        </Row>
                        <hr />
                        <h5>Orders Details</h5>
                        <Row>
                            <Col xs={6}>
                                <ul type="none" style={{ fontWeight: "600" }}>
                                    <li>Orders number:</li>
                                    <li>Orders date:</li>
                                    <li>Price:</li>
                                    <li>Shipping:</li>
                                    <li>Total Price:</li>
                                </ul>
                            </Col>
                            <Col xs={6}>
                                <ul type="none">
                                    <li>#{_id?.slice(0, 8)}</li>
                                    <li>{(new Date(OrdersTime).toDateString('dd/MM/yyyy'))}</li>
                                    <li>${totalPrice}</li>
                                    <li>$30</li>
                                    <li>${30 + totalPrice}</li>
                                </ul>
                            </Col>
                        </Row>
                        <hr />
                    </> : (
                        <>
                            <h1 className="text-center" style={{ fontSize: '2rem' }}>You haven't Ordersed anything yet!</h1>
                        </>
                    )
            )}
        </Container>
    );
};

export default Orderss;