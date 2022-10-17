// 1.- Importaciones
require("dotenv").config(); //Variables de entorno para poder dar confidencialidad
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000; //corre el puerto de variables de entorno, si no lo encuentras corre el 4000

//Generar ID
const { v4: uuid } = require("uuid");

//2.- Middlewares
app.use(cors()); //Para que pueda usarse con varias bases de datos
app.use(express.json()); //Para poder utilizar express en json

//3.- Rutas
const usuarios = [
  {
    id: 1,
    nombre: "Francisco",
    apellido: "Arriaga",
    username: "arrrriaga",
  },
  {
    id: 2,
    nombre: "Wendy",
    apellido: "Cervantes",
    username: "WenSantana",
  },
];

app.get("/", (req, res) => {
  return res.json({
    msj: "Lista de usuarios obtenida",
    autor: process.env.AUTOR,
    data: usuarios,
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.id == id;
  });

  return res.json({
    msj: "Usuario encontrado",
    data: usuarioEncontrado,
  });
});

app.post("/", (req, res) => {
  const { nombre, apellido, username } = req.body;

  const usuario = {
    id: uuid(),
    nombre,
    apellido,
    username,
  };

  usuarios.push(usuario);

  return res.json({
    msj: "Usuario creado",
    data: usuario,
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, username } = req.body;

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.id == id;
  });

  (usuarioEncontrado.nombre = nombre),
    (usuarioEncontrado.apellido = apellido),
    (usuarioEncontrado.username = username);

  return res.json({
    msj: "usuario actualizado",
    data: usuarioEncontrado,
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.id == id;
  });

  const usuarioEliminado = usuarios.splice(
    usuarios.indexOf(usuarioEncontrado),
    1
  );

  return res.json({
    msg: `Se ha eliminado el ID: ${id}`,
    data: usuarioEliminado,
  });
});

//4.- Ejecutar Servidor
app.listen(port, () => {
  console.log(`El servidor funciona correctamente en el puerto ${port}`);
});
