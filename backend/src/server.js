const express = require("express");
const cors = require("cors");

const githubRoutes = require("./routes/github");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GitHub Profile API is running"
  });
});

app.use("/api/github", githubRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});