import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
//Upload Image //list_img
const upload = new FileUploadWithPreview.FileUploadWithPreview("list_img", {
  multiple: true,
  maxFileCount: 10,
  accept: "image/*",
});

//CLIENT_SEND_MESSAGE
const formInputMessage = document.querySelector(".form-input-message");
if (formInputMessage) {
  formInputMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    const images = upload.cachedFileArray || [];
    if (message || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        message: message,
        images: images,
      });
      e.target.elements.message.value = "";
      upload.resetPreviewPanel();
    }
  });
}

//SERVER_RETURN_DATA
socket.on("SERVER_RETURN_DATA", (data) => {
  const containerChat = document.querySelector(".chat-container");
  const myId = containerChat.getAttribute("my_id");
  if (containerChat) {
    const li = document.createElement("li");
    let ul = containerChat.querySelector(".chat-box.chatContainerScroll");
    let htmlContent = "";
    let htmlImg = "";
    let boxImage = "";
    if (myId === data.userId) {
      // console.log(myId, data.userId);
      // console.log(data);
      li.classList.add("chat-right");
      if (data.content) {
        htmlContent = `<div class="chat-text">${data.content}</div>`;
      }
      if (data.images.length > 0) {
        htmlImg = data.images.map((item) => {
          return `
              <img src=${item} alt=${data.fullName} class="chat-image-right"/>
            `;
        });
        htmlImg = htmlImg.join("");
        boxImage = `<div class="box-chat-image-right chat-image">${htmlImg}</div>`;
      }

      li.innerHTML = `
          <div class="chat-infor-right"> 
            <div class="chat-hour">
              08:56 
              <span class="fa fa-check-circle"> </span>
            </div>
            ${htmlContent}
            <div> 
              <img src='https://www.bootdey.com/img/Content/avatar/avatar3.png' class="chat-avatar" alt='Retail Admin'/>
              <div class="chat-name">${data.fullName}</div>
            </div>
          </div>
          ${boxImage}
        `;
      ul.appendChild(li);
    } else {
      li.classList.add("chat-left");
      if (data.content) {
        htmlContent = `<div class="chat-text">${data.content}</div>`;
      }
      if (data.images.length > 0) {
        htmlImg = data.images.map((item) => {
          return `
              <img src=${item} alt=${data.fullName} class="chat-image-left"/>
            `;
        });
        htmlImg = htmlImg.join("");
        boxImage = `<div class="box-chat-image-left chat-image">${htmlImg}</div>`;
      }

      li.innerHTML = `
          <div class="chat-infor-left"> 
            <div> 
              <img src='https://www.bootdey.com/img/Content/avatar/avatar3.png' class="chat-avatar" alt='Retail Admin'/>
              <div class="chat-name">${data.fullName}</div>
            </div>
            ${htmlContent}
            <div class="chat-hour">
              08:56 
              <span class="fa fa-check-circle"> </span>
            </div>
          </div>
          ${boxImage}
          `;
      const boxTyping = document.querySelector(".show-typing");
      if (boxTyping) {
        ul.insertBefore(li, boxTyping);
      }else {
        ul.appendChild(li);
      }
    }
    ul.scrollTop = ul.scrollHeight;
    const chatImage = li.querySelector(".chat-image");
    if (chatImage) {
      const gallery = new Viewer(chatImage);
    }
  }
});

//Scroll To Bottom
const chatContainer = document.querySelector(".chat-box.chatContainerScroll");
if (chatContainer) {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

//CLIENT_SHOWN_TYPING
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const input = document.querySelector("input[name='message']");
  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    input.value += icon;
    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus();
    // socket.emit("CLIENT_SHOWN_TYPING", "shown");
  });
  input.addEventListener("keyup", (e) => {
    socket.emit("CLIENT_SHOWN_TYPING", "shown");
  });
}

//Show Emoji
const buttonIcon = document.querySelector(".buttonIcon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}

//SERVER_SHOWN_TYPING
socket.on("SERVER_SHOWN_TYPING", (data) => {
  const containerChat = document.querySelector(".chat-box.chatContainerScroll");
  const existElement = document.querySelector("#typing-indicator");
  if (!existElement) {
    const li = document.createElement("li");
    li.classList.add("show");
    li.classList.add("show-typing");
    li.innerHTML = `
        <div>${data.fullName}</div>
        <div id="typing-indicator" class="show">...</div>
      `;
    containerChat.appendChild(li);
    containerChat.scrollTop = containerChat.scrollHeight;
  }
});

// CLIENT_HIDDEN_TYPING
const inputData = document.querySelector("input[name='message']");
if (inputData) {
  inputData.addEventListener("blur", (e) => {
    socket.emit("CLIENT_HIDDEN_TYPING", "hidden");
  });
}

//SERVER_HIDDEN_TYPING
socket.on("SERVER_HIDDEN_TYPING", (data) => {
  const containerChat = document.querySelector(".chat-container");
  const myId = containerChat.getAttribute("my_id");
  if (myId !== data.userId) {
    const showTyping = document.querySelector(".show.show-typing");
    if (showTyping) {
      showTyping.remove();
    }
  }
});
const gallery = new Viewer(
  document.querySelector(".chat-box.chatContainerScroll")
);


$('select').selectpicker();

const inputUploadImage = document.querySelector('[input-upload-image]');
if(inputUploadImage) {
    inputUploadImage.addEventListener("change", (event) => {
        const output = document.querySelector('[img-preview]')
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
    })
}