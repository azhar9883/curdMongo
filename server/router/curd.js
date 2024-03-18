const express = require('express')
const multer = require('multer');
const Product = require('../module/curdbase')
const fs = require('fs');
const path = require('path');
let route = express.Router()

route.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads';
        fs.mkdirSync(uploadDir, { recursive: true }); 
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage, limits: 3 });

route.post('/api/products',upload.array('image', 3),async (req, res) => {
    try {
    
        const imagePaths = req.files.map(file => file.path);
        const product = new Product({
            name: req.body.name,
            color: req.body.color,
            price: req.body.price,
            images: imagePaths
        });

        // Save the product to MongoDB
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'Error saving product' });
    }
})
route.delete('/api/products/:id',async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
})
route.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().then((data)=>{
            res.send({status:200,data:data})
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});
route.put('/api/products/:productId/images/:index', upload.single('image'), async (req, res) => 
{
try {
    const productId = req.params.productId;
    const index = req.params.index;
    const imagePath = req.file.path; // New image path
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    if (Array.isArray(product.images) && index >= 0 && index < product.images.length) {
        product.images[index] = imagePath;
    } else {
        console.error('Invalid index or product.images is not an array.');
    }

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Image updated successfully' });
} catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ error: 'Error updating image' });
}
});
route.delete('/api/products/:productId/images/:index', async (req, res) => {
    try {
        const productId = req.params.productId;
        const index = req.params.index;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (Array.isArray(product.images) && index >= 0 && index < product.images.length) {
            // Remove the image at the specified index
            product.images.splice(index, 1);
        } else {
            return res.status(400).json({ error: 'Invalid index or product.images is not an array.' });
        }

        // Save the updated product
        await product.save();

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Error deleting image' });
    }
});
route.put('/api/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.name = req.body.name;
        product.color = req.body.color;
        product.price = req.body.price;
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
})

module.exports = route