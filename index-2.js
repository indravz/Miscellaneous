

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
