// server.js

const express = require('express');
const app = express();

// Set the port to listen on
app.set('port', 3000);

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

// Export the app
module.exports = app;
