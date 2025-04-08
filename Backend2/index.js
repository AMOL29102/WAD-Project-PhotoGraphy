const app = require('./src/app'); // this is your actual Express app
const PORT = process.env.PORT || 3000;
const path = require('path');
const express = require('express');

// ✅ Add this line to serve uploads through the actual app
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
