// controllers/cartController.js
import Cart from '../models/cartModel.js'; // Asegúrate de que este modelo exista
import Product from '../models/productModel.js'; // Asegúrate de que este modelo exista

// Crear un carrito
export const createCart = async (req, res) => {
    try {
        const newCart = new Cart();
        await newCart.save();
        res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
};

// Obtener un carrito por ID con populate
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
};

// Actualizar o agregar un producto al carrito
export const updateCartProduct = async (req, res) => {
    const { quantity } = req.body; // La cantidad se envía en el cuerpo
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Busca el producto en el carrito
        const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.productId);
        if (productIndex > -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no está, agrégalo
            cart.products.push({ productId: req.params.productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error al actualizar el producto en el carrito:', error);
        res.status(500).json({ error: 'Error al actualizar el producto en el carrito' });
    }
};

// Eliminar un producto del carrito
export const deleteCartProduct = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
};
