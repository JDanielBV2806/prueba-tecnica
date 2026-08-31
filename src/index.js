import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { engine } from 'express-handlebars';
import personasRoutes from './routes/personas.routes.js';
import authRoutes from './routes/auth.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import productosRoutes from './routes/productos.routes.js';
import publicoRoutes from './routes/publico.routes.js';
import cors from 'cors';

//Initializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/publico', publicoRoutes);
app.use(personasRoutes);

//Public files
app.use(express.static(join(__dirname, 'public')));

//Run server
app.listen(app.get('port'), () =>
    console.log('Server listening on port', app.get('port')));