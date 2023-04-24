import { OpenApiValidator } from 'openapi-validator';
import express from 'express';
import bodyParser from 'body-parser';

const apiSpecUrl = 'https://example.com/path/to/your/oas3/spec.yaml';
const validator = new OpenApiValidator({ url: apiSpecUrl });

const app = express();

app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    await validator.validate('post', req.path, req.body);
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Invalid request body',
      details: err.errors,
    });
  }
});

app.post('/example', (req, res) => {
  res.json({ message: 'Success!' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
