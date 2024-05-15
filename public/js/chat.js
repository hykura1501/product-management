//CLIENT_SEND_MESSAGE
const formInputMessage = document.querySelector(".form-input-message");
if (formInputMessage) {
  formInputMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value
    socket.emit("CLIENT_SEND_MESSAGE", message)
    e.target.elements.message.value = "";
  });
}
