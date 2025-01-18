const app = require("./app"); // Import the app
const connectDB = require("./database/db");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});
