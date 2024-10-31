import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from 'handlebars';

// Configura el servidor
const app = express();
const PORT = process.env.PORT || 8080;

// Configura Handlebars
app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/finalBack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rutas
app.use('/', productsRouter);
app.use('/api', cartsRouter); // Asegúrate de que las rutas de carrito estén en el prefijo /api

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Escucha en el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
