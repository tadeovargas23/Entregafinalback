import express from 'express';
import Product from '../models/productModel.js';

const router = express.Router();

// Ruta para mostrar la vista de productos
router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query ? { categoria: query } : {};
    try {
        const products = await Product.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sort ? { precio: sort } : {});

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('products', {
            products,
            totalPages,
            currentPage: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? parseInt(page) - 1 : null,
            nextPage: page < totalPages ? parseInt(page) + 1 : null
        });
    } catch (error) {
        res.status(500).send('Error al obtener productos');
    }
});

export default router;
