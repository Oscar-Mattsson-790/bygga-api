import express from "express";
const app = express(); // Detta skapar en express applikation
const PORT = 8000;

app.use(express.json()); // This parses all incoming requests as JSON'

app.get("/", (request, response) => {
  response.send('"Hello World!');
});

// We'll keep track of user accounts in this array
const users = [];

// Login endpoint
app.post("/api/login", (request, response) => {
  const { username, password } = request.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return response.json({ sucess: false });
  }

  if (user.password !== password) {
    return response.json({ sucess: false });
  }

  return response.json({ sucess: true });
});

// Sugnup endpoint
app.post("/api/signup", (request, response) => {
  const { username, password, email } = request.body;

  // Check if username or email already exists
  const usernameExists = users.some((u) => u.username === username);
  const emailExists = users.some((u) => u.email === email);

  if (usernameExists || emailExists) {
    return response.json({ sucess: false, usernameExists, emailExists });
  }

  // Add new user to array
  users.push({ username, password, email });

  return response.json({ sucess: true, usernameExists, emailExists });
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
