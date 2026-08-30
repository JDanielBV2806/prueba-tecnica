import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { engine } from 'express-handlebars';

//Initializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
//motor de plantillas
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    //nombre del motor de plantillas
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middlewares
app.use(morgan('dev'));
//muestra el tiempo de respuesta del servidor
app.use(express.urlencoded({extended: false}));
//para trabajar con interfaces y formularios
app.use(express.json());
//para trabajar con rchivos json




//routes
app.get ('/', (req, res)=> {
    res.json({"message": 'Hola'});
});

//Public files
app.use(express.static(join(__dirname, 'public')));

//Run server
app.listen(app.get('port'), () => 
    console.log('Server listening on port', app.get('port'))); 

