import { Router } from 'express';
import pool from '../../database.js';

const router = Router();

// GET /api/publico/productos — SIN verificarToken, es público
router.get('/productos', async (req, res) => {
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

export default router;