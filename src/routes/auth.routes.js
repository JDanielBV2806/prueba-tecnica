import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../database.js';

const router = Router();

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'nombre, email y password son obligatorios' });
        }

        const [existentes] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existentes.length > 0) {
            return res.status(409).json({ message: 'Ya existe un usuario con ese email' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHasheado = await bcrypt.hash(password, salt);

        const nuevoUsuario = { nombre, email, password: passwordHasheado };
        await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);

        res.status(201).json({ message: 'Usuario creado correctamente', usuario: { nombre, email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'email y password son obligatorios' });
        }

        const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const usuario = usuarios[0];

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;