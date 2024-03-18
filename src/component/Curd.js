import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Edit from './Edit';
import Form from './Form';

const CURD = () => {
    const [products, setProducts] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [newImage, setNewImage] = useState(null);

    const handleImageChange = (e, index) => {
        setNewImage(e.target.files[0]);

    };
    let handleDelete = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleUpdateImage = async (productId, index, newImage) => {
        try {
            // Create FormData object to send image file
            const formData = new FormData();
            formData.append('image', newImage);
            console.log("object", newImage)
            // Make the API call to update the image
            await axios.put(`http://localhost:5000/api/products/${productId}/images/${index}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.reload();
            console.log('Image updated successfully');
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };
    const deleteProductImage = async (productId, index) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/products/${productId}/images/${index}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-space'>
                <div style={{ position: "relative", top: "23px", left: "30px" }}>
               <Form/>
                </div>
                <div className='d-flex mt-4'>
                    <ul>
                        {products.map(product => (
                            <li  className='list-unstyled' key={product._id}>
                                <div className='d-flex'>
                                   {product.name.length||product.color.length||product.price>0? <Edit product={product}/>:null}
                                    <div className='d-flex'>
                                        {
                                            product.images.map((img, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={`http://localhost:5000/${img.replace(/\\/g, '/')}`}
                                                        alt={`Product ${index + 1}`}
                                                        style={{ width: '200px', height: 'auto', marginRight: '10px', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setEditIndex(index);
                                                            document.getElementById(`fileInput-${index}`).click(); 
                                                        }}
                                                    />
                                                    <input
                                                        type="file"
                                                        id={`fileInput-${index}`}
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => handleImageChange(e)}
                                                    />
                                                    <div>
                                                    <button className='m-2 btn-primary' onClick={() => deleteProductImage(product._id, index)}>delete</button>
                                                        <button className='m-2 btn-primary' onClick={() => handleUpdateImage(product._id, index, newImage)}>Update</button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <button className='mt-4 m-2 btn-primary' onClick={() => handleDelete(product._id)}>delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default CURD;
