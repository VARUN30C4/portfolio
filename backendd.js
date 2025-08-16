const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, "public"))); 

// Routes

// Hello route
app.get("/hello", (req, res) => {
  res.send("Hello from Railway!");
});

// Projects API
app.get("/projects", (req, res) => {
  res.json([
    { name: "Portfolio Website", description: "My personal website" },
    { name: "Data Analysis Project", description: "Analyzing datasets with Python" }
  ]);
});

// Contact form API
app.post("/api/contact", (req, res) => {
  const { email, message } = req.body;
  console.log(`📩 New contact form submission:\nEmail: ${email}\nMessage: ${message}`);
  res.json({ success: true, message: "Thank you for contacting me!" });
});

// Fallback route: serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
