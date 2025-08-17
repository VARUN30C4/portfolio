import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes

// Sample test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working fine 🚀" });
});

// Projects API
app.get("/api/projects", (req, res) => {
  res.json([
    { id: 1, title: "Portfolio Website", tech: "React, Node.js" },
    { id: 2, title: "AI Chatbot", tech: "Python, Flask" },
  ]);
});

// Contact form API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 New contact form:", { name, email, message });
  res.json({ success: true, message: "Thank you for contacting me!" });
});

// Fallback route: serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
