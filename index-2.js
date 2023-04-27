import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { middleware as OpenApiValidator } from 'express-openapi-validator';

const app = express();

app.use(bodyParser.json());
app.use(express.json()); // middleware to parse request body

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const spec = path.join(__dirname, 'openapi.json');

const modifyRequestBody = (req, res, next) => {
  console.log("inside mid1");
  req.body = {
    "id": 10,
    "id2": 10,
    "name": false,
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  };
  next();
};

const validatespec = OpenApiValidator({
  apiSpec: './openapi.json',
});

app.post('/api/v3/pet', modifyRequestBody, validatespec, (req, res) => {
  console.log("inside handler");
  res.send(req.body);
});

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

const server = app.listen(3000, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
