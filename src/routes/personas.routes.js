import {Router} from 'express';
import pool from '../../database.js';

const router = Router();

router.get('/add', (req, res) => {
    res.render('personas/add');
});
//ruta para enviar los datos
router.post('/add', async(req, res) => {
   try{
        const {nombre, apellido, edad} = req.body;
        const newPersona = {
            nombre,
            apellido,
            edad
        };
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        //redireccione a la ruta /list para mostrar el listado de personas
        res.redirect('/list');

    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});


router.get('/list', async (req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM personas');
        res.render('personas/list', {personas: result});

    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});
export default router;