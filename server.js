const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://savereelsonline.blogspot.com"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Reels Backend is running!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is working"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
