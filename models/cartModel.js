import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
        },
    ],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
