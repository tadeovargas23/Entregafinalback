import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
