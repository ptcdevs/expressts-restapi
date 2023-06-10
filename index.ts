import express, { Express, Request, Response } from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import swaggerUi = require('swagger-ui-express');
import swaggerJsdoc = require('swagger-jsdoc');

const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Demo Express API with Swagger",
      version: process.env.npm_package_version,
      description:
          "This is a simple CRUD API application made with Express and documented with Swagger. Original example from <https://blog.logrocket.com/documenting-express-js-api-swagger/>",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "David Gallmeier",
        url: "https://ptcdevs.xounges.net",
        email: "ptcdevs@xounges.net",
      },
    },
  },
  apis: ["./index.ts"],
};

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});