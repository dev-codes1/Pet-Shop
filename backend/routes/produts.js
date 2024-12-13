const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Crear un nuevo producto
router.post('/add', async (req, res) => {
    try {
    const { name, type, stock, price } = req.body;
    const newProduct = new Product({ name, type, stock, price });
    await newProduct.save();
    res.status(201).json(newProduct);
    } catch (err) {
    res.status(500).json({ message: 'Error al agregar producto', error: err.message });
    }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
    const products = await Product.find();
    res.status(200).json(products);
    } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
    }
});

// Comprar un producto
router.post('/purchase', async (req, res) => {
    try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (product.stock < quantity) {
        return res.status(400).json({ message: 'Stock insuficiente' });
    }

    product.stock -= quantity;
    await product.save();

    res.status(200).json({ message: 'Compra exitosa', product });
    } catch (err) {
    res.status(500).json({ message: 'Error al procesar la compra', error: err.message });
    }
});

module.exports = router;
