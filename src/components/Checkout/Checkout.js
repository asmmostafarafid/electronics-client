import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import { UserContext } from '../../App';

const Checkout = () => {
    const { loggedInUser } = useContext(UserContext);
    const { cart } = useContext(UserContext);

    const handleCheckout = () => {
        const oderDetails = { ...loggedInUser, product: cart, OrdersTime: new Date() };

        axios.post('https://arcane-caverns-50893.herokuapp.com/addOrders', oderDetails)
            .then(response => {
                response.data && swal("Orders placed successfully", "Your Orders placed successfully!", "success");
            })
            .catch(error => console.log(error));
    }

    return (
        <Container>
            <h2>Checkout</h2>
            <div className="shadow px-4 pt-4 my-4" style={{ bOrdersRadius: "15px" }}>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{cart.productName}</td>
                            <td>1</td>
                            <td>${cart.price}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">Total</td>
                            <td>${cart.price}</td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
            <div className="text-right">
                <Button onClick={handleCheckout} className="checkout-btn shadow-none">Checkout</Button>
            </div>
        </Container>
    );
};

export default Checkout;