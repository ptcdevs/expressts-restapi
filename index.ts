import express, {Express, Request, Response} from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import swaggerUi = require('swagger-ui-express');
import swaggerJsdoc = require('swagger-jsdoc');
import swaggerJSDoc, {OAS3Options, SwaggerDefinition} from "swagger-jsdoc";

const app: Express = express();
dotenv.config();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const options: OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Demo Express API with Swagger",
      version: process.env.npm_package_version || "0.1.0",
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
const swaggerSpec: any | object = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /hello:
 *   get:
 *     description: Basic get method
 *     parameters:
 *      - name: name
 *        in: query
 *        description: your name
 *        required: true
 *        example: David G.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/hello', async function (req: Request, res: Response) {
  let name = req.query.name || "anonymous";
  res.send(`Hello, ${name}!`)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
