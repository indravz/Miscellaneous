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


////////////////////

import path from "path";
import * as OpenApiValidator from "express-openapi-validator";

const spec = path.join("assets", "openapi.json");

export const validateInputs = OpenApiValidator.middleware({
  apiSpec: spec,
  validateRequests: true,
  validateResponses: true,
});


///////////////////////

import express from "express";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();

const specUrl = "https://petstore.swagger.io/v2/swagger.json";

app.use(
  OpenApiValidator.middleware({
    apiSpec: specUrl,
    validateRequests: true,
    validateResponses: true,
  })
);

app.get("/pets/:petId", (req, res, next) => {
  const petId = req.params.petId;
  // do something with the petId
  res.send(`You requested pet with ID ${petId}`);
});

// Add error handling middleware to the application
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

/////////////////////////////////request builder////////////////////////////////////////////

const express = require('express');
const app = express();

// Middleware to save the headers and incoming body to req.savedData
app.use('/validate/:path(*)', (req, res, next) => {
  // Save the headers and incoming body to req.savedData
  req.savedData = {
    headers: req.headers,
    body: req.body
  };
  next();
});

// POST route to build a new request body with /path and saved headers and incoming body
app.post('/validate/:path(*)', (req, res) => {
  const endpointPath = req.params.path;
  const savedHeaders = req.savedData.headers;
  const savedBody = req.savedData.body;

  // Build the new request body with /path and saved headers and incoming body
  const newRequestBody = {
    path: endpointPath,
    headers: savedHeaders,
    body: savedBody
  };

  // Send the new request body as the response to the client
  res.json(newRequestBody);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

////////////////////////validate path/////////////////////////

const apiSpec = './path/to/openapi-spec.yaml'; // Replace with your OpenAPI spec file
const validator = new OpenApiValidator({ apiSpec });

validator.validateRequest(newRequestBody, { validateRequest: true, validateResponse: false })
  .then((result) => {
    // If the request is valid, send a success response
    console.log('Request is valid:', result);
  })
  .catch((error) => {
    // If the request is invalid, log the validation error to the console
    console.error('Error:', error);
  });

///////////////////////////////////////middleware in order//////////////
const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const app = express();

// Middleware function to modify request body
const modifyRequestBody = (req, res, next) => {
  const path = req.params.path;
  req.url = `/${path}`;
  req.path = `/${path}`;
  next();
};

// POST route with middleware functions
app.post(
  '/validate/:path',
  modifyRequestBody,
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: true,
  }),
  (req, res) => {
    // Add your business logic here to process the modified request body
    res.status(200).json({ message: 'Success' });
  }
);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

