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

router.get('/edit/:id', async (req, res) => {
    try{
        const {id} = req.params;     //requerimientoi de parametros            
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ?', [id]);
        const personaEdit = persona[0]; 
        res.render('personas/edit', {persona: persona[0]}); //objeto personaEdit para renderizar la vista edit.hbs

    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});
 //ruta para editar los datos de una persona
router.post('/edit/:id', async (req, res) => {
    try{
     
        const {nombre, apellido, edad} = req.body;
        const {id} = req.params;
        const editPersona = {
            nombre,
            apellido,
            edad
        };
        await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);//permite pasar un objeto con los datos a actualizar y el id de la persona a actualizar
        res.redirect('/list');
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

router.get('/delete/:id', async (req, res) => {
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});
export default router;