const express = require("express");
const app = express();
const port = 3000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.get("/explorers", async (req, res) => {
  const allExplorers = await prisma.explorer.findMany({});
  res.json(allExplorers);
});

app.get("/explorers2", async (req, res) => {
  const allExplorers = await prisma.explorer2.findMany({});
  res.json(allExplorers);
});

app.get("/explorers/:id", async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(explorer);
});

app.get("/explorers2/:id", async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer2.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(explorer);
});

app.post("/explorers", async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission,
  };
  const message = "Explorer creado.";
  await prisma.explorer.create({ data: explorer });
  return res.json({ message });
});

app.post("/explorers2", async (req, res) => {
  const explorer = {
    name: req.body.name,
    lang: req.body.lang,
    missionComander: req.body.missionComander,
    enrollments: req.body.enrollments,
  };
  const message = "Explorer creado.";
  await prisma.explorer2.create({ data: explorer });
  return res.json({ message });
});

app.post("/explorers", async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission,
  };
  const message = "Explorer creado.";
  await prisma.explorer.create({ data: explorer });
  return res.json({ message });
});

app.put("/explorers/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.explorer.update({
    where: {
      id: id,
    },
    data: {
      mission: req.body.mission,
    },
  });

  return res.json({ message: "Actualizado correctamente" });
});

app.delete("/explorers/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.explorer.delete({ where: { id: id } });
  return res.json({ message: "Eliminado correctamente" });
});

app.listen(port, () => {
  console.log(`app running in port ${port}`);
});
