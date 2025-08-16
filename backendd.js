// backendd.js
import express from "express";
import cors from "cors";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Sample test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working fine 🚀" });
});

// ✅ Example: Projects API (you can connect DB later)
app.get("/api/projects", (req, res) => {
  res.json([
    { id: 1, title: "Portfolio Website", tech: "React, Node.js" },
    { id: 2, title: "AI Chatbot", tech: "Python, Flask" },
  ]);
});

// ✅ Example: Contact form API (for Netlify frontend to send data)
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 New contact form:", { name, email, message });

  // (Later you can send email via Nodemailer)
  res.json({ success: true, msg: "Message received ✅" });
});

// ✅ Start server
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
