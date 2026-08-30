import {Router} from 'express';
import pool from '../../database.js';

const router = Router();

router.get('/add', (req, res) => {
    res.render('personas/add');
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