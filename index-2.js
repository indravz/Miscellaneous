












const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

// Recursive function to remove null keys from an object
function removeNullKeys(obj) {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      removeNullKeys(obj[key]);
    }
  }
}

// Middleware to check and remove null values from request body parameters
app.use((req, res, next) => {
  const deletedParams = {};

  // Iterate over each parameter in the request body
  for (const param in req.body) {
    if (req.body[param] === null) {
      // Delete the null parameter from the request body
      deletedParams[param] = req.body[param];
      delete req.body[param];
    } else if (typeof req.body[param] === 'object') {
      // Recursively remove null keys from objects
      removeNullKeys(req.body[param]);
    }
  }

  // Print deleted params to the logs
  console.log('Deleted params:', deletedParams);

  next();
});

// Route handler
app.post('/', (req, res) => {
  // Process the modified request body
  console.log('Modified request body:', req.body);

  // Serve the response
  res.send('Request processed successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

// Middleware to check and remove null values from request body parameters
app.use((req, res, next) => {
  const deletedParams = {};

  // Iterate over each parameter in the request body
  for (const param in req.body) {
    if (req.body[param] === null) {
      // Delete the null parameter from the request body
      deletedParams[param] = req.body[param];
      delete req.body[param];
    }
  }

  // Print deleted params to the logs
  console.log('Deleted params:', deletedParams);

  next();
});

// Route handler
app.post('/', (req, res) => {
  // Process the modified request body
  console.log('Modified request body:', req.body);
  
  // Serve the response
  res.send('Request processed successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/////////////////////////////////////////////////



const stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

//////////////logger///////////////////////////////
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const winston = require('winston');

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

const pingFederateUrl = 'https://your-ping-federate-url.com/authenticate'; // Replace with your Ping Federate URL
const specEndpointUrl = 'https://your-spec-endpoint-url.com/spec'; // Replace with your spec endpoint URL
const clientId = 'your-client-id'; // Replace with your client ID
const clientSecret = 'your-client-secret'; // Replace with your client secret
const username = 'your-username'; // Replace with your username
const password = 'your-password'; // Replace with your password

app.get('/spec', async (req, res) => {
  try {
    const jwtPayload = await getJwt();
    logger.info('JWT retrieved:', jwtPayload);
    const responseData = await callSpecEndpoint(jwtPayload);
    logger.info('Response from spec endpoint:', responseData);
    res.send(responseData);
  } catch (err) {
    logger.error('Error:', err);
    res.status(500).send('Internal server error');
  }
});

// Function to authenticate and get JWT from Ping Federate
async function getJwt() {
  const postData = {
    grant_type: 'password',
    scope: 'openid',
    client_id: clientId,
    client_secret: clientSecret,
    username: username,
    password: password
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const response = await axios.post(pingFederateUrl, postData, config);

  if (response.status === 200) {
    const accessToken = response.data.access_token;
    const decodedJwt = jwt.decode(accessToken, { complete: true });
    const jwtPayload = decodedJwt.payload;
    return jwtPayload;
  } else {
    throw new Error(`Failed to authenticate with Ping Federate. Status code: ${response.status}`);
  }
}

// Function to make calls to spec endpoint with JWT
async function callSpecEndpoint(jwtPayload) {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtPayload}`,
    }
  };

  const response = await axios.get(specEndpointUrl, config);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Failed to get data from spec endpoint. Status code: ${response.status}`);
  }
}

const port = 3000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

///////////////////////////logger//////////////////////////////////

/////////////////cache-2/////////////////////////////////////
const express = require('express');
const axios = require('axios');
const cache = require('memory-cache');
const app = express();
const port = 3000;

const cacheDuration = 60 * 60 * 1000; // Cache duration: 1 hour

// Function to fetch the spec file data from example.api
async function fetchSpecFileData() {
  try {
    const response = await axios.get('https://example.api/getspecfile');
    return response.data;
  } catch (error) {
    console.error('Error retrieving spec file:', error);
    return null;
  }
}

// GET endpoint
app.get('/', async (req, res) => {
  let specFileData = cache.get('specFileData'); // Attempt to retrieve the data from cache

  if (!specFileData) {
    try {
      specFileData = await fetchSpecFileData(); // Make the API call to fetch the data

      if (specFileData) {
        cache.put('specFileData', specFileData, cacheDuration); // Store the data in cache
      }

      res.send(specFileData); // Send the data as the response
    } catch (error) {
      res.status(500).send('Error retrieving spec file');
    }
  } else {
    res.send(specFileData); // Serve the cached data
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

////////////////////////////////////cache-2/////////////////////////////////////






/////////////////////////////////////////////////////////////////////cache////////////////////////////////

const express = require('express');
const axios = require('axios');
const cache = require('memory-cache');
const app = express();
const port = 3000;

const cacheDuration = 60 * 60 * 1000; // Cache duration: 1 hour

// Function to fetch the spec file data from example.api
function fetchSpecFileData() {
  return axios.get('https://example.api/getspecfile')
    .then(response => response.data)
    .catch(error => {
      console.error('Error retrieving spec file:', error);
      return null;
    });
}

// GET endpoint
app.get('/', (req, res) => {
  let specFileData = cache.get('specFileData'); // Attempt to retrieve the data from cache

  if (!specFileData) {
    fetchSpecFileData() // Make the API call to fetch the data
      .then(data => {
        specFileData = data;
        if (specFileData) {
          cache.put('specFileData', specFileData, cacheDuration); // Store the data in cache
        }
        res.send(specFileData); // Send the data as the response
      })
      .catch(() => {
        res.status(500).send('Error retrieving spec file');
      });
  } else {
    res.send(specFileData); // Serve the cached data
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////

const https = require('https');
const fs = require('fs');

const caCert = fs.readFileSync('./certs/root.crt');

const agent = new https.Agent({
  ca: caCert
});

// Use the 'agent' when making requests with Axios or the 'https' module



const agent = new https.Agent({
  rejectUnauthorized: false,
  secureOptions: constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION
});

const agent = new https.Agent({
  rejectUnauthorized: false // Ignore SSL verification (not recommended in production)
});

////////////////////////////////with spec endpoint////////////////////

const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();

const pingFederateUrl = 'https://your-ping-federate-url.com/authenticate'; // Replace with your Ping Federate URL
const specEndpointUrl = 'https://your-spec-endpoint-url.com/spec'; // Replace with your spec endpoint URL
const clientId = 'your-client-id'; // Replace with your client ID
const clientSecret = 'your-client-secret'; // Replace with your client secret
const username = 'your-username'; // Replace with your username
const password = 'your-password'; // Replace with your password

app.get('/spec', async (req, res) => {
  try {
    const jwtPayload = await getJwt();
    const responseData = await callSpecEndpoint(jwtPayload);
    res.send(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Function to authenticate and get JWT from Ping Federate
async function getJwt() {
  const postData = {
    grant_type: 'password',
    scope: 'openid',
    client_id: clientId,
    client_secret: clientSecret,
    username: username,
    password: password
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const response = await axios.post(pingFederateUrl, postData, config);

  if (response.status === 200) {
    const accessToken = response.data.access_token;
    const decodedJwt = jwt.decode(accessToken, { complete: true });
    const jwtPayload = decodedJwt.payload;
    return jwtPayload;
  } else {
    throw new Error(`Failed to authenticate with Ping Federate. Status code: ${response.status}`);
  }
}

// Function to make calls to spec endpoint with JWT
async function callSpecEndpoint(jwtPayload) {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtPayload}`,
    }
  };

  const response = await axios.get(specEndpointUrl, config);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Failed to get data from spec endpoint. Status code: ${response.status}`);
  }
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//////////////////////////////////////////////////////specend///////////////////////////











const validateNewRequestBody = (req, res, next) => {
  OpenApiValidator({
    validateRequests: true,
    apiSpec: spec,
    validateResponses: false,
  })(req.newRequest, res, next);
};


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
/////////////////////////////////////////

import SwaggerParser from 'swagger-parser';

const openapiFile = 'path/to/openapi/spec.json';

SwaggerParser.validate(openapiFile, (err, api) => {
  if (err) {
    console.error(err);
  } else {
    console.log('OpenAPI specification is valid');
  }
});
