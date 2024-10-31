import express from 'express';
import { getProducts, deleteProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

// Ruta para obtener productos en formato de vista
router.get('/products', getProducts);

// Ruta para la API que obtiene productos en formato JSON
router.get('/api/products', getProducts);

// Otras rutas para eliminar y actualizar productos
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

export default router;
