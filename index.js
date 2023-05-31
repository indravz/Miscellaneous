//////////////
(path) => {
  const validPaths = [
    /^\/api\/v1\/$/,
    /^\/api\/v2\/$/,
    /^\/api\/test\/functiom\/$/,
     /^\/api\/v1\/test1\/test2\/$/,
  ];

  return validPaths.some(validPath => validPath.test(path));
};
///////////////////



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

//////////////////2nd version///////////////////////////

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

// Middleware function to validate request against OpenAPI spec
app.use(
  '/validate/:path',
  modifyRequestBody,
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: true,
  })
);

// POST route to handle validated requests
app.post('/validate/:path', (req, res) => {
  // Add your business logic here to process the modified request body
  res.status(200).json({ message: 'Success' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

./////////////////////////////////////////////////////////////////////////////

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

// Custom logger function
const logger = (errors, req, res, next) => {
  if (!errors || errors.length === 0) {
    console.log('Request validated successfully');
  } else {
    console.log('Request validation failed');
  }
  next(errors);
};

// Middleware function to validate request against OpenAPI spec
app.use('/validate/:path', modifyRequestBody);

app.use(
  '/validate/:path',
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: true,
    errorTransformer: logger,
  })
);

// POST route to handle validated requests
app.post('/validate/:path', (req, res) => {
  // Add your business logic here to process the modified request body
  res.status(200).json({ message: 'Success' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
////////////////////////////schema validator ///////////////////////////
const { validate } = require('openapi-schema-validator');
const fs = require('fs');

// Define the path to your OpenAPI spec file and request body
const openapiSpecFile = 'openapi.json';
const requestBodyFile = 'request.json';

// Load the OpenAPI spec file and request body into memory
const openapiSpec = JSON.parse(fs.readFileSync(openapiSpecFile, 'utf8'));
const requestBody = JSON.parse(fs.readFileSync(requestBodyFile, 'utf8'));

// Validate the request body against the OpenAPI spec
const validationErrors = validate(openapiSpec, requestBody);

// If there are any validation errors, log them to the console
if (validationErrors.length > 0) {
  console.error('Request body validation failed:');
  console.error(validationErrors);
} else {
  console.log('Request body is valid!');
}

////////////////////////////openapi validator

const express = require('express');
const { validate } = require('openapi-schema-validator');
const app = express();

// Middleware function to modify the request path
const modifyRequestPath = (req, res, next) => {
  req.url = `/${req.params.path}`;
  next();
};

// Middleware function to validate request body against OpenAPI spec
const validateRequestBody = (req, res, next) => {
  const openApiSpec = require('./openapi.json');
  const validationResult = validate(openApiSpec, req.body, { throwError: false });
  if (validationResult.errors.length > 0) {
    return res.status(400).json({ errors: validationResult.errors });
  }
  next();
};

// Route to handle POST /validate/:path
app.post('/validate/:path', modifyRequestPath, express.json(), validateRequestBody, (req, res) => {
  // Respond with 200 OK if request body is valid against OpenAPI spec
  res.sendStatus(200);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

////////////////////////////////////////working //////////////////////////////////

const express = require('express');
const { validate } = require('openapi-schema-validator');
const fs = require('fs');

const app = express();

// Define the path to your OpenAPI spec file
const openapiSpecFile = 'openapi.json';
const openapiSpec = JSON.parse(fs.readFileSync(openapiSpecFile, 'utf8'));

// Middleware function to modify the request path
function modifyRequestPath(req, res, next) {
  req.url = req.url.replace(/^\/validate\//, '/');
  next();
}

// Middleware function to validate the request body against the OpenAPI spec
function validateRequestBody(req, res, next) {
  const validationErrors = validate(openapiSpec, req.body);
  if (validationErrors.length > 0) {
    res.status(400).json({
      status: 'error',
      message: 'Request body validation failed',
      errors: validationErrors,
    });
  } else {
    next();
  }
}

// Route to handle POST requests to /validate/:path
app.post('/validate/:path', modifyRequestPath, express.json(), validateRequestBody, (req, res) => {
  // Process the request as needed
  res.status(200).json({
    status: 'success',
    message: 'Request body is valid',
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/////////////////////

const OpenAPISchemaValidator = require("openapi-schema-validator").default;
const openAPIValidator = new OpenAPISchemaValidator({ version: 3 });
const fs = require("fs");
const path = require("path");

const main = async () => {
  // Read the OpenAPI schema
  const openApiJsonFilepath = path.join(__dirname, "openapi.json");
  const openApiSchema = JSON.parse(
    fs.readFileSync(openApiJsonFilepath, "utf-8")
  );

  // Define the request body
  const requestBody = {
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  };

  // Define the path and HTTP method for the request
  const path = "/books";
  const method = "post";

  // Validate the request body against the OpenAPI schema
  const res = openAPIValidator.validate(
    {
      requestBody,
      path,
      method,
    },
    openApiSchema
  );

  if (res.errors.length) {
    console.error(res.errors);
    process.exit(1);
  } else {
    console.log("Request body is valid according to the OpenAPI schema!");
  }
};

main();
