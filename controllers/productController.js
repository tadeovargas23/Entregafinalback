// controllers/productController.js
import Product from '../models/productModel.js';

// Obtener productos
export const getProducts = async (req, res) => {
    const { page = 1, limit = 2, category, sort } = req.query;

    const query = {};
    if (category) {
        query.categoria = category; // Filtramos por la categoría especificada
    }

    try {
        const products = await Product.find(query)
            .limit(Number(limit))
            .skip((page - 1) * limit)
            .sort(sort ? { precio: sort === 'asc' ? 1 : -1 } : {});

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        // Devuelve los productos en formato JSON si la URL empieza con /api
        if (req.originalUrl.startsWith('/api')) {
            return res.json({
                products,
                totalPages,
                currentPage: page,
                totalProducts,
            });
        }

        // Renderiza la vista de productos para la página normal
        res.render('products', {
            products,
            totalPages,
            currentPage: page,
            limit,
            sort,
            category,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? parseInt(page) - 1 : null,
            nextPage: page < totalPages ? parseInt(page) + 1 : null,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(204).send(); // No hay contenido que devolver
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};
