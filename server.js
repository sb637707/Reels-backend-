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

app.post("/api/check", (req, res) => {
  const { url } = req.body;

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") {
      return res.status(400).json({
        success: false,
        message: "Only HTTPS links are accepted"
      });
    }

    const host = parsed.hostname.toLowerCase();
    let platform = null;

    if (
      host === "instagram.com" ||
      host.endsWith(".instagram.com")
    ) {
      platform = "Instagram";
    } else if (
      host === "facebook.com" ||
      host.endsWith(".facebook.com") ||
      host === "fb.watch"
    ) {
      platform = "Facebook";
    } else if (
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtu.be"
    ) {
      platform = "YouTube";
    }

    if (!platform) {
      return res.status(400).json({
        success: false,
        message: "Unsupported platform"
      });
    }

    res.json({
      success: true,
      platform,
      message: "Platform detected successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid URL"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
