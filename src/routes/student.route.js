const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');

router.get('/students', controller.getStudents);
router.post('/students', controller.createStudents);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener estudiante por nombre o cédula
 *     description: Retorna un estudiante filtrado por nombre o cédula
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del estudiante
 *       - in: query
 *         name: cedula
 *         schema:
 *           type: string
 *         required: false
 *         description: Cédula del estudiante
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nombre: "Santiago Perez"
 *               cedula: "1001"
 *               correo: "santiago@gmail.com"
 *               celular: "3001234567"
 *       404:
 *         description: No encontrado
 */
router.get('/students', controller.getStudents);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Crear un nuevo estudiante con sus notas iniciales
 *     description: Crea un estudiante en la tabla alumnos y automáticamente genera sus notas en 0
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cedula
 *               - nombre
 *               - correo
 *               - celular
 *               - materia
 *             properties:
 *               cedula:
 *                 type: string
 *                 example: "1001"
 *               nombre:
 *                 type: string
 *                 example: "Santiago Perez"
 *               correo:
 *                 type: string
 *                 example: "santiago@gmail.com"
 *               celular:
 *                 type: string
 *                 example: "3001234567"
 *               materia:
 *                 type: string
 *                 example: "Matematicas"
 *     responses:
 *       201:
 *         description: Estudiante creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               student:
 *                 id: 1
 *                 cedula: "1001"
 *                 nombre: "Santiago Perez"
 *                 correo: "santiago@gmail.com"
 *                 celular: "3001234567"
 *               grade:
 *                 id: 1
 *                 alumno_id: 1
 *                 materia: "Matematicas"
 *                 nota1: 0
 *                 nota2: 0
 *                 nota3: 0
 *                 nota4: 0
 *       500:
 *         description: Error al crear el estudiante
 */
router.post('/students', controller.createStudents);

module.exports = router;


