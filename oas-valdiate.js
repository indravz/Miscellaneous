const express = require('express');
const app = express();

app.use((req, res, next) => {
  const forwardedPath = req.query['X-forwarded-path'];
  if (forwardedPath) {
    req.url = forwardedPath;
  }
  next();
});

app.post('/validate', (req, res) => {
  res.send('Validated successfully!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
