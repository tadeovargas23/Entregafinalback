import express from 'express';
import { createCart, getCart, updateCartProduct, deleteCartProduct } from '../controllers/cartController.js';

const router = express.Router();

// Crear un carrito
router.post('/carts', createCart);

// Obtener un carrito con populate
router.get('/carts/:id', getCart);

// Actualizar o agregar un producto al carrito
router.put('/carts/:id/products/:productId', updateCartProduct);

// Eliminar un producto del carrito
router.delete('/carts/:id/products/:productId', deleteCartProduct);

export default router;
