import { Router } from 'express';
import pool from '../../database.js';
import verificarToken from '../middleware/auth.js';

const router = Router();

router.use(verificarToken);

// POST /api/productos
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria_id } = req.body;
        if (!nombre || precio === undefined || !categoria_id) {
            return res.status(400).json({ message: 'nombre, precio y categoria_id son obligatorios' });
        }
        const [categorias] = await pool.query('SELECT id FROM categorias WHERE id = ?', [categoria_id]);
        if (categorias.length === 0) {
            return res.status(400).json({ message: 'La categoría indicada no existe' });
        }
        const nuevoProducto = { nombre, descripcion: descripcion || null, precio, stock: stock || 0, categoria_id };
        const [result] = await pool.query('INSERT INTO productos SET ?', [nuevoProducto]);
        res.status(201).json({ id: result.insertId, ...nuevoProducto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// GET /api/productos (incluye el nombre de la categoría)
router.get('/', async (req, res) => {
    try {
        const [productos] = await pool.query(
            `SELECT p.*, c.nombre AS categoria_nombre
             FROM productos p
             JOIN categorias c ON p.categoria_id = c.id`
        );
        res.json(productos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/productos/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, categoria_id } = req.body;

        if (categoria_id) {
            const [categorias] = await pool.query('SELECT id FROM categorias WHERE id = ?', [categoria_id]);
            if (categorias.length === 0) {
                return res.status(400).json({ message: 'La categoría indicada no existe' });
            }
        }

        await pool.query('UPDATE productos SET ? WHERE id = ?', [{ nombre, descripcion, precio, stock, categoria_id }, id]);
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/productos/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;