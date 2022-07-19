const express = require("express");
const { engine } = require("express-handlebars");
const Contenedor = require("./models/dbHelpers");
const knex = require("knex");
const config = require("./knexfile");
const db = knex(config.development);
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const PORT = 8000;

const tableProducts = "products";
const tableMessages = "messages";

let products = new Contenedor(db, tableProducts);
let messages = new Contenedor(db, tableMessages);

let cont = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("datos");
});

io.on("connection", async (channel) => {
  cont++;
  channel.on("incomingProduct", async (product) => {
    console.log("Entro a channel on");
    await products.save(product);
    const ans = await products.getAll();
    io.sockets.emit("productList", ans);
  });

  channel.on("newUserMessage", async (newMessage) => {
    await messages.save(newMessage);
    const ans = await messages.getAll();
    io.sockets.emit("messages", ans);
  });

  const listProducts = await products.getAll();
  if (listProducts !== 0) {
    channel.emit("productList", listProducts);
  }

  const listMessages = await messages.getAll();
  if (listMessages !== 0) {
    channel.emit("messages", listMessages);
  }

  console.log(`Connection N°: ${cont}`);
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
