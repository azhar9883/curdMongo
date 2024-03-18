import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Edit = ({ product }) => {
    console.log("products",product)
    const [name, setName] = useState(product.name|| []);
    const [price, setPrice] = useState(product.price|| []);
    const [color, setColor] = useState(product.color || []);
    const [isEditing, setIsEditing] = useState(false);
    
    const handleUpdate = async () => {
        try {
            const data = {
                name: name,   
                color: color,
                price: price,
              
            };
            console.log(data)
            await axios.put(`http://localhost:5000/api/product/${product._id}`, data,{
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                window.location.reload();
            console.log('Product updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div style={{marginRight:"30px"}}>
            {!isEditing ? (
                <div>
                
                    <p>Brand Name: {product.name}</p>
                    <p>Price: {product.price}</p>
                    <p>Color: {product.color}</p>
                    <button onClick={() => setIsEditing(true)} className='btn-primary px-3'>Edit</button>
                </div>
            ) : (
                <div>
                <div className='m-2'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div className='m-2'>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                    <div className='m-3'>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    </div>
                    <button onClick={handleUpdate} className='btn-primary px-3'>Update</button>
                </div>
            )}
        </div>
    );
};

export default Edit
