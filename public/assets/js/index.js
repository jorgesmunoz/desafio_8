const socket = io();

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const codeInput = document.getElementById("code");
const pictureInput = document.getElementById("picture");
const stockInput = document.getElementById("stock");

const prodList = document.getElementById("products-list");
const userEmail = document.getElementById("user-email");
const userMensaje = document.getElementById("user-mensaje");

document.getElementById("postButton").addEventListener("click", () => {
  if (!titleInput.value) {
    return alert("Debe ingresar un producto");
  }

  if (!priceInput.value) {
    return alert("Debe ingresar el precio");
  }

  let currentDate = new Date().toJSON().slice(0, 19).replace("T", " ");

  const product = {
    title: titleInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    created_at: currentDate,
    code: codeInput.value,
    picture: pictureInput.value,
    stock: stockInput.value,
  };

  console.log(product);

  socket.emit("incomingProduct", product);
  titleInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  codeInput.value = "";
  pictureInput.value = "";
  stockInput.value = "";
  titleInput.focus();
});

document.getElementById("enviar-mensaje").addEventListener("click", () => {
  if (!userEmail.value) {
    return alert("Debe ingresar un email");
  }

  if (!userMensaje.value) {
    return alert("Debe ingresar un mensaje");
  }

  let currentDate = new Date().toJSON().slice(0, 19).replace("T", " ");
  console.log(currentDate);

  const userMessage = {
    email: userEmail.value,
    message: userMensaje.value,
    created_at: currentDate,
  };

  console.log(userMessage);

  socket.emit("newUserMessage", userMessage);
  userEmail.value = "";
  userMensaje.value = "";
  userEmail.focus();
});

socket.on("productList", (products) => {
  console.log(products);

  const listProducts = Object.values(products)
    .map((product) => {
      return `
      <tr align="center">
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>${product.created_at}</td>
      <td>${product.code}</td>
      <td>${product.picture}</td>
      <td>${product.stock}</td>
      </tr>
      `;
    })
    .join(" ");

  console.log(listProducts);

  document.getElementById("products-list").innerHTML = listProducts;
});

socket.on("messages", (param) => {
  console.log(param);
  let text = "";

  param.forEach((element) => {
    text += `${element.email} <font color=red>[${element.created_at}] </font><font color=green>${element.message}</font> <br />`;
  });
  document.getElementById("message-email").innerHTML = text;
});
