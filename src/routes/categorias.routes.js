import { Router } from 'express';
import pool from '../../database.js';
import verificarToken from '../middleware/auth.js';

const router = Router();

router.use(verificarToken); // protege TODAS las rutas de este archivo

// POST /api/categorias
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: 'El campo nombre es obligatorio' });
        }
        const nuevaCategoria = { nombre, descripcion: descripcion || null };
        const [result] = await pool.query('INSERT INTO categorias SET ?', [nuevaCategoria]);
        res.status(201).json({ id: result.insertId, ...nuevaCategoria });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// GET /api/categorias
router.get('/', async (req, res) => {
    try {
        const [categorias] = await pool.query('SELECT * FROM categorias');
        res.json(categorias);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/categorias/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const [existentes] = await pool.query('SELECT id FROM categorias WHERE id = ?', [id]);
        if (existentes.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        await pool.query('UPDATE categorias SET ? WHERE id = ?', [{ nombre, descripcion }, id]);
        res.json({ message: 'Categoría actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/categorias/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;