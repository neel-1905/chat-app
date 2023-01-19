const socket = io("http://localhost:4000");

const form = document.getElementById(`send-container`);
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(`.container`);
var audio = new Audio("./handgun-click.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

const name = prompt("Enter Your Name");

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(` ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

socket.on("receive", (data) => {
  append(`${data.name} : ${data.message} `, "left");
});

socket.on("left", (data) => {
  append(`${data.name} has left the chat`, "left");
});
