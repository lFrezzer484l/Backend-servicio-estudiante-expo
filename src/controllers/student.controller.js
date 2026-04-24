const studentService = require('../services/student.service');

async function getStudents(req, res) {
  try {
    const { nombre, cedula } = req.query;

    const students = await studentService.getStudents({ nombre, cedula });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  }
}


async function createStudents(req, res) {
    try {
        const { cedula, nombre, correo, celular, materia } = req.body;

        const newStudent = await studentService.createStudents({
            cedula,
            nombre,
            correo,
            celular,
            materia
        });

        res.status(201).json(newStudent); // estudiante creado
    } catch(error) {
        res.status(500).json({error: "Error al crear el estudiante"});
    }
    
}

module.exports = { getStudents, createStudents };
