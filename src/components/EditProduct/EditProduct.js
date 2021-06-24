import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";
import swal from 'sweetalert';
import ActionItem from '../ActionItem/ActionItem';
import AddProduct from '../AddProduct/AddProduct';

const loaderStyle = `
  display: block;
  margin: 50px auto;
  color: #7386D5;
`;

const EditProduct = ({ editProduct, setEditProduct }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://arcane-caverns-50893.herokuapp.com/products')
            .then(response => {
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const updateProduct = product => {
        axios.patch(`https://arcane-caverns-50893.herokuapp.com/update/${editProduct?._id}`, product)
            .then(response => response.data && swal("Successfully updated", "Your product is successfully updated!", "success"))
            .catch(error => console.log(error));
    }

    return (
        <>
            {editProduct?._id ? <AddProduct editProduct={editProduct} updateProduct={updateProduct} /> :
                <div className="px-5 pt-4 mx-md-4 mt-5 bg-white" style={{ bOrdersRadius: "15px" }}>
                    <Table hover bOrdersless responsive>
                        <thead className="bg-light">
                            <tr>
                                <th>Product</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <ClipLoader loading={loading} css={loaderStyle} />
                        {
                            items.map(item => <ActionItem item={item} key={item._id} setEditProduct={setEditProduct} />)
                        }
                    </Table>
                </div>}
        </>
    );
};

export default EditProduct;