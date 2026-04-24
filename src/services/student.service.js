const pool = require('../db/connection');

async function getStudents({ nombre, cedula }) {
  let query = 'SELECT * FROM alumnos WHERE 1=1';
  const values = [];

  if (cedula) {
    values.push(cedula);
    query += ` AND cedula = $${values.length}`;
  }

  if (nombre) {
    values.push(`%${nombre}%`);
    query += ` AND nombre ILIKE $${values.length}`;
  }

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

async function createStudents({ cedula, nombre, correo, celular, materia }) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const studentQuery = `
      INSERT INTO alumnos (cedula, nombre, correo, celular)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const studentValues = [cedula, nombre, correo, celular];

    const studentResult = await client.query(studentQuery, studentValues);

    const alumno_id = studentResult.rows[0].id;

    const gradeQuery = `
      INSERT INTO notas (alumno_id, materia, nota1, nota2, nota3, nota4)
      VALUES ($1, $2, 0, 0, 0, 0)
      RETURNING *
    `;

    const gradeValues = [alumno_id, materia];

    const gradeResult = await client.query(gradeQuery, gradeValues);

    await client.query('COMMIT');

    return {
      student: studentResult.rows[0],
      grade: gradeResult.rows[0]
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { getStudents, createStudents };