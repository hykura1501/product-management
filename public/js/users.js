const btnAddFriends = document.querySelectorAll("[btn-add-friend]");
if (btnAddFriends.length > 0) {
  btnAddFriends.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = btn.getAttribute("btn-add-friend");
      btn.closest(".box-user").classList.add("add");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}

const btnCancelFriends = document.querySelectorAll("[btn-cancel-friend]");
if (btnCancelFriends.length > 0) {
  btnCancelFriends.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.classList.contains("requests")) {
        btn.closest(".box-user").remove();
      }
      const userId = btn.getAttribute("btn-cancel-friend");
      btn.closest(".box-user").classList.remove("add");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}

socket.on("SERVER_REQUEST_ADD", (data) => {
  const inforUser = document.querySelector(".infor-user");
  const myId = inforUser.getAttribute("myId");
  if (data.myId === myId) {
    const btnAdd = document.querySelector(`[btn-add-friend='${data.userId}']`);
    const groupBtnAction = btnAdd.closest(".group-btn-action");
    groupBtnAction.innerHTML = `
      <button class="btn btn-success" btn-accept-friend=${data.userId}>Chấp nhận</button>
      <button class="btn btn-danger" btn-disagree-friend=${data.userId}>Từ chối</button>
    `;
    const btnAcceptFriend = document.querySelector("[btn-accept-friend]")
    btnAcceptFriend.addEventListener("click", () => {
      console.log(1);
    })
  }
});

socket.on("SERVER_REQUEST_CANCEL", (data) => {
  const inforUser = document.querySelector(".infor-user");
  const myId = inforUser.getAttribute("myId");
  if (data.myId === myId) {
    const btnCancel = document.querySelector(
      `[btn-accpet-friend='${data.userId}']`
    );
    const groupBtnAction = btnCancel.closest(".group-btn-action");
    groupBtnAction.innerHTML = `
      <button class="btn btn-warning" btn-add-friend=${data.userId}>Kết bạn</button>
    `;
  }
});

const btnAcceptsFriend = document.querySelectorAll("[btn-accept-friend]");
if (btnAcceptsFriend.length > 0) {
  btnAcceptsFriend.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = btn.getAttribute("btn-accept-friend");
      btn.closest(".box-user").classList.add("accepted");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
const btnDisagreeFriend = document.querySelectorAll("[btn-disagree-friend]");
if (btnDisagreeFriend.length > 0) {
  btnDisagreeFriend.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = btn.getAttribute("btn-disagree-friend");
      btn.closest(".box-user").classList.add("disagreed");
      socket.emit("CLIENT_DISAGREE_FRIEND", userId);
    });
  });
}
