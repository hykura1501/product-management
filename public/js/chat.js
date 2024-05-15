//CLIENT_SEND_MESSAGE
const formInputMessage = document.querySelector(".form-input-message");
if (formInputMessage) {
  formInputMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit("CLIENT_SEND_MESSAGE", message);
    e.target.elements.message.value = "";
  });
}

//SERVER_RETURN_DATA
socket.on("SERVER_RETURN_DATA", (data) => {
  console.log(data);
  const containerChat = document.querySelector(".chat-container");
  if (containerChat) {
    const myId = containerChat.getAttribute("my_id");
    const li = document.createElement("li");
    const ul = containerChat.querySelector(".chat-box.chatContainerScroll");
    if (myId === data.userId) {
      li.classList.add("chat-right");
      li.innerHTML = `
      <div class="chat-hour">08:55 <span class="fa fa-check-circle"></span></div>
      <div class="chat-text">${data.content}</div>
      <div class="chat-avatar"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"><div class="chat-name">${data.fullName}</div></div>
      `;
    } else {
      li.classList.add("chat-left");
      li.innerHTML = `
        <div class="chat-avatar"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"><div class="chat-name">${data.fullName}</div></div>
        <div class="chat-text">${data.content}</div>
        <div class="chat-hour">08:55 <span class="fa fa-check-circle"></span></div>
      `;
    }
    ul.appendChild(li);
  }
});
