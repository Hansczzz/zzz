import express from "express";
import { RepositorioLibros } from "./RepositorioLibros";
import { RepositorioUsuarios } from "./RepositorioUsuarios";

const app = express();
app.use(express.json());

const repoLibros = new RepositorioLibros();
const repoUsuarios = new RepositorioUsuarios();

app.get("/", (req, res) => {
  res.send("API de libros");
});

app.get("/libros", (req, res) => {
  res.json(repoLibros.listar());
});

app.get("/libros/:id", (req, res) => {
  const id = Number(req.params.id);
  const libro = repoLibros.buscarPorId(id);

  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  res.json(libro);
});

app.post("/libros", (req, res) => {
  const { titulo, autor, precio } = req.body;

  if (!titulo || !autor || precio === undefined) {
    return res.status(400).json({ error: "Faltan titulo, autor o precio" });
  }

  const libro = repoLibros.agregar(titulo, autor, Number(precio));
  res.status(201).json(libro);
});

app.put("/libros/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, precio } = req.body;

  if (!titulo || !autor || precio === undefined) {
    return res.status(400).json({ error: "Faltan titulo, autor o precio" });
  }

  const libro = repoLibros.actualizar(id, titulo, autor, Number(precio));

  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  res.json(libro);
});

app.delete("/libros/:id", (req, res) => {
  const id = Number(req.params.id);
  const eliminado = repoLibros.eliminar(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  res.status(204).send();
});

app.get("/usuarios", (req, res) => {
  res.json(repoUsuarios.listar());
});

app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = repoUsuarios.buscarPorId(id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario);
});

app.post("/usuarios", (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Faltan nombre o email" });
  }

  const usuario = repoUsuarios.agregar(nombre, email);
  res.status(201).json(usuario);
});

app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Faltan nombre o email" });
  }

  const usuario = repoUsuarios.actualizar(id, nombre, email);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const eliminado = repoUsuarios.eliminar(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(204).send();
});

export default app;
