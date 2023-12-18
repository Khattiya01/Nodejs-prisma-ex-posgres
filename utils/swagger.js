import express, { request, response} from "express"
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from "../package.json";


const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      component: {
        securitySchemas: {
            bearerAuth: {
                type: "http",
                schema: "bearer",
                bearerFormat: "JWT"
            }
        }
      },
      security: [
        {
            bearerAuth: [],
        }
      ],
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
    },
    // apis: ["./routes/*.js"],
    apis: ["../routes/*.js"],
  };
  
 export const swaggerSpec = swaggerJsdoc(options);

 function swaggerDocs(app, port) {
    // swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

 }
 export default swaggerDocs;