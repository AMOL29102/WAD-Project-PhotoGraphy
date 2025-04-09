// const app = require('./src/app'); // this is your actual Express app
// const PORT = process.env.PORT || 3000;
// const path = require('path');
// const express = require('express');

// // ✅ Add this line to serve uploads through the actual app
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const app = require('./src/app');
const serverless = require('serverless-http');
const path = require('path');
const express = require('express');



// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://hiraiphotostudio.vercel.app"],
//     credentials: true, // only if using cookies/auth headers
//   })
// );

// app.use(cors()); // Not recommended for production


// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Export app as serverless handler
module.exports = app;
module.exports.handler = serverless(app);
