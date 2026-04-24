const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student.route');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(cors());
app.use(express.json());


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Notas",
      version: "1.0.0",
      description: "Microservicio de Estudiantes"
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:4000"
      }
    ]
  },
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(studentRoutes);

module.exports = app;