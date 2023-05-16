const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { OpenApiValidator } = require('express-openapi-validator');

const app = express();

const pingFederateUrl = 'https://your-ping-federate-url.com/authenticate'; // Replace with your Ping Federate URL
const specEndpointUrl = 'https://your-spec-endpoint-url.com/spec'; // Replace with your spec endpoint URL
const clientId = 'your-client-id'; // Replace with your client ID
const clientSecret = 'your-client-secret'; // Replace with your client secret
const username = 'your-username'; // Replace with your username
const password = 'your-password'; // Replace with your password
const openApiSpecFile = './open-api-spec-file.json';

// Express middleware to validate incoming requests against the OpenAPI spec file
app.use(
  OpenApiValidator.middleware({
    apiSpec: openApiSpecFile,
    validateRequests: true, // Enable request validation
    validateResponses: false, // Disable response validation
  })
);

app.get('/spec', async (req, res) => {
  try {
    const jwtPayload = await getJwt();
    const responseData = await callSpecEndpoint(jwtPayload);
    fs.writeFileSync(openApiSpecFile, responseData); // Save the response data to the file
    res.send(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Function to authenticate and get JWT from Ping Federate
async function getJwt() {
  const postData = {
    content: 'grant_type=client_cred',
  };

  const encodedClientIdSecret = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedClientIdSecret}`,
    },
  };

  const response = await axios.post(pingFederateUrl, querystring.stringify(postData), config);

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
      Authorization: `Bearer ${jwtPayload}`,
    },
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
