import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Form = () => {
    const [price, setPrice] = useState();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [images, setImages] = useState([]);
    const inputRef = useRef(null);

    const handleImageUpload = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    const uploadImages = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append('image', image);
            });
            formData.append('name', name);
            formData.append('color', color);
            formData.append('price', price);
            const response = await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.reload();
            console.log('Images uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };
    const handleChange = (e) => {
        const value = parseFloat(e.target.value);
        setPrice(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className='m-2'>
                    Color:
                    <input type="text" name="color" ref={inputRef} value={color} onChange={(e) => setColor(e.target.value)}
                    />
                </label>

                <br />
                <label className='m-2'>
                    Price: <input type="number" ref={inputRef} name="price" value={price} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" name="name" ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
            </form>
            <div className='m-2'>  <input type="file" style={{ width: "143px" }} multiple onChange={handleImageUpload} /></div>
            <div> <button onClick={uploadImages} className='btn-primary'>upload</button></div>

        </>
    );
}

export default Form;
