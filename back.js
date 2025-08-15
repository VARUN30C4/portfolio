const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// HTML, CSS & JS served directly from here
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Varun Kumar | Portfolio</title>
<style>
  body { font-family: Arial, sans-serif; margin:0; padding:0; background:#f5f5f5; color:#333; }
  header { background:#222; color:#fff; padding:1rem; text-align:center; }
  section { padding:2rem; max-width:900px; margin:auto; }
  .portfolio-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:1rem; }
  .portfolio-item { background:white; padding:1rem; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.1); }
  form input, form textarea { width:100%; padding:8px; margin:5px 0; border-radius:4px; border:1px solid #ccc; }
  form button { padding:10px 20px; background:#222; color:white; border:none; border-radius:5px; cursor:pointer; }
</style>
</head>
<body>
  <header>
    <h1>Varun Kumar</h1>
    <p>Frontend, Backend, AI & Data Science Enthusiast</p>
  </header>

  <section id="about">
    <h2>About Me</h2>
    <p>I am Varun Kumar, a B.Tech 3rd year student aspiring to pursue my MS in Germany in AI/Data Science. 
    Skilled in Frontend and Backend development, Data Science, and AI. Passionate about building scalable, innovative, and user-friendly applications.</p>
  </section>

  <section id="portfolio">
    <h2>Portfolio</h2>
    <div class="portfolio-grid" id="portfolioGrid"></div>
  </section>

  <section id="contact">
    <h2>Contact Me</h2>
    <form id="contactForm">
      <input name="name" placeholder="Your Name" required>
      <input name="email" type="email" placeholder="Your Email" required>
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send</button>
    </form>
  </section>

  <script>
    // Fetch projects
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        document.getElementById("portfolioGrid").innerHTML = data
          .map(p => \`<div class="portfolio-item"><h3>\${p.title}</h3><p>\${p.description}</p></div>\`)
          .join("");
      });

    // Contact form submission
    document.getElementById("contactForm").addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(msg => {
        alert(msg.message);
        e.target.reset();
      });
    });
  </script>
</body>
</html>
`;

// Serve HTML
app.get("/", (req, res) => {
  res.send(htmlContent);
});

// Backend API - Projects
app.get("/api/projects", (req, res) => {
  res.json([
    { title: "Data Analysis Dashboard", description: "Interactive data dashboard built with Python and Plotly" },
    { title: "Machine Learning Model", description: "Predictive model using scikit-learn" },
    { title: "Web Scraper Tool", description: "Automated scraper built in Python" }
  ]);
});

// Backend API - Contact
app.post("/api/contact", (req, res) => {
  console.log("📩 New contact form submission:", req.body);
  res.json({ message: "Thank you for contacting me, I'll reply soon!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`✅ Portfolio running at http://localhost:\${PORT}\`));
