import express, { response } from "express";
const app = express(); // Detta skapar en express applikation
const PORT = 8000;

app.use(express.json()); // Tolka allt i body som JSON

const insults = [
  {
    insult: "Neber hung posion on a fouler toad",
    play: "Rickard III",
  },
  {
    insults: "He thinks too much: such men are dangerous.",
    play: "Julius Ceasar",
  },
];

app.get("/api/insults", (request, response) => {
  // response.send(JSON.stringify(insults));
  response.json(insults); // Kör JSON.stringyfy automatiskt så det blir samma som ovan kod
});

app.post("/api/insults", (request, response) => {
  const insultObj = request.body;

  if (insults.hasOwnProperty("insult") && insultObj.hasOwnProperty("play")) {
    const { insult, play } = insultObj;

    insult.push({ insult: insult, play: play });

    const result = {
      sucess: true,
      insults: insults,
    };

    response.json(result);
  } else {
    const result = {
      sucess: false,
      insults: "Wrong data in body",
    };

    response.status(400).json(result);
  }
});

app.get("/api/login", (request, response) => {
  response.send("<h1>Välkommen!</h1>");
});

app.get("/api/singup", (request, response) => {
  response.send("<h1>Om</h1>");
});

app.listen(PORT, () => {
  console.log("Servern startad");
});
