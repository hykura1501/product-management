const inforUser = document.querySelector(".infor-user");
const myId = inforUser.getAttribute("myId");
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
      const userId = btn.getAttribute("btn-cancel-friend");
      btn.closest(".box-user").classList.remove("add");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}

// // socket.on("SERVER_REQUEST_ADD", (data) => {
//   const inforUser = document.querySelector(".infor-user");
//   const myId = inforUser.getAttribute("myId");
//   if (data.myId === myId) {
//     const btnAdd = document.querySelector(`[btn-add-friend='${data.userId}']`);
//     if(btnAdd) {
//       const groupBtnAction = btnAdd.closest(".group-btn-action");
//       groupBtnAction.innerHTML = `
//         <button class="btn btn-success" btn-accept-friend=${data.userId}>Chấp nhận</button>
//         <button class="btn btn-danger" btn-disagree-friend=${data.userId}>Từ chối</button>
//       `;
//       const btnAcceptFriend = document.querySelector("[btn-accept-friend]")
//       btnAcceptFriend.addEventListener("click", () => {
//         socket.emit("CLIENT_ACCEPT_FRIEND", data.userId);
//         btnAcceptFriend.closest(".box-user").classList.add("accepted")
//       })
//     }
//   }
// });

// socket.on("SERVER_REQUEST_CANCEL", (data) => {
//   const inforUser = document.querySelector(".infor-user");
//   const myId = inforUser.getAttribute("myId");
//   if (data.myId === myId) {
//     const btnAccept = document.querySelector(
//       `[btn-accept-friend='${data.userId}']`
//     );
//     if(btnAccept) {
//       const groupBtnAction = btnAccept.closest(".group-btn-action");
//       groupBtnAction.innerHTML = `
//         <button class="btn btn-warning" btn-add-friend=${data.userId}>Kết bạn</button>
//       `;
//     }
//   }
// });

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

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  const badgeAcceptsFriend = document.querySelector("[badge-accepts-friend]");
  if (myId === data.myId) {
    badgeAcceptsFriend.innerText = data.lengthAccept
  }
});
// END SERVER_RETURN_LENGTH_ACCEPT_FRIEND



// SERVER_RETURN_INFOR_REQUESTED
socket.on("SERVER_RETURN_INFOR_REQUESTED", (inforUser) => {
  if(myId === inforUser.myId) {
    const boxAccepted = document.querySelector(".card.border.border-success.accepted");
    if(boxAccepted) {
      const boxItemAccept = document.createElement("div");
      boxItemAccept.setAttribute("class", "d-flex align-items-center mb-4 gap-3 box-user");
      boxItemAccept.setAttribute("user-requested", inforUser.userId)
      boxItemAccept.innerHTML = `
        <img class="avatar-user" src=${inforUser.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewI4tonTOU-MiDbFkpGQ2MN_lMsLZCxSaBg&s"} alt="1" />
        <div class="d-flex flex-column">
            <p>${inforUser.fullName}</p>
            <div class="d-flex gap-3">
              <button class="btn btn-success" btn-accept-friend=${inforUser.userId}>Chấp nhận</button>
              <button class="btn btn-danger" btn-disagree-friend==${inforUser.userId}>Từ chối</button>
              <i class="message-accepted">Đã trở thành bạn bè</i>
              <i class="message-disagreed">Đã hủy yêu cầu kết bạn</i>
            </div>
        </div>
      `
      const userRequested = document.querySelector(".card-body.list-user-requested");
      if(userRequested) {
        userRequested.appendChild(boxItemAccept)
        const userId = inforUser.userId
        const btnAcceptFriend = boxAccepted.querySelector("[btn-accept-friend]")
        const btnDisagreeFriend = boxAccepted.querySelector("[btn-disagree-friend]")
        btnAcceptFriend.addEventListener("click", () => {
          btnAcceptFriend.closest(".box-user").classList.add("accepted");
          socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })
        btnDisagreeFriend.addEventListener("click", () => {
          btnAcceptFriend.closest(".box-user").classList.add("disagreed");
          socket.emit("CLIENT_DISAGREE_FRIEND", userId);
        })
      }
    }
    const listUsers = document.querySelector(".card-body.list-users");
    if(listUsers) {
      const user = document.querySelector(`[box-item-add-friend="${inforUser.userId}"]`)
      if(user) {
        user.remove();
      }
    }
  }
 
})
// END SERVER_RETURN_INFOR_REQUESTED


// // SERVER_RETURN_INFOR_CANCEL_REQUESTED
// socket.on("SERVER_RETURN_INFOR_CANCEL_REQUESTED", (data) => {
//   if(data.myId === myId) {
//     const boxIteamAddFr = document.querySelector(`[box-item-add-friend="${data.userId}"`)
//     boxIteamAddFr.classList.remove("add");
//   }
// })
// // END SERVER_RETURN_INFOR_CANCEL_REQUESTED


// SERVER_RETURN_INFOR_CANCEL_REQUESTED
socket.on("SERVER_RETURN_INFOR_CANCEL_REQUESTED", (data) => {
  if(data.myId === myId) {
    const boxAccepted = document.querySelector(".card.border.border-success.accepted");
    if(boxAccepted) {
      const userRequested = document.querySelector(`[user-requested="${data.userId}"]`)
      userRequested.remove();
    }
    const listUsers = document.querySelector(".card-body.list-users");
    if(listUsers) {
      const user = document.createElement("div");
      user.setAttribute("class", "d-flex align-items-center mb-4 gap-3 box-user")
      user.setAttribute("box-item-add-friend", data.userId)
      user.innerHTML = 
      `
        <img class="avatar-user" src=${data.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewI4tonTOU-MiDbFkpGQ2MN_lMsLZCxSaBg&amp;s"}>
        <div class="d-flex flex-column">
          <p>${data.fullName}</p>
          <div class="d-flex gap-3 group-btn-action">
          <button class="btn btn-warning" btn-add-friend=${data.userId}>Kết bạn</button>
          <button class="btn btn-danger" btn-cancel-friend=${data.userId}>Hủy</button>
        </div>
      `
      listUsers.insertBefore(user, listUsers.children[0]);
      const buttonAddFr = user.querySelector("[btn-add-friend]");
      if(buttonAddFr) {
        buttonAddFr.addEventListener("click", () => {
          const userId = buttonAddFr.getAttribute("btn-add-friend");
          buttonAddFr.closest(".box-user").classList.add("add");
          socket.emit("CLIENT_ADD_FRIEND", userId);
        })
      }
      const buttonCancelFr = user.querySelector("[btn-cancel-friend]");
      if(buttonCancelFr) {
        buttonCancelFr.addEventListener("click", () => {
          const userId = buttonCancelFr.getAttribute("btn-cancel-friend");
          buttonCancelFr.closest(".box-user").classList.remove("add");
          socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
      }
    }
  }
})
// END SERVER_RETURN_INFOR_CANCEL_REQUESTED

//Remove Friend CLIENT_SEND_REMOVE_FRIEND
const buttonRemoveFriend = document.querySelectorAll("[btn-remove-friend]");
if(buttonRemoveFriend.length > 0) {
  buttonRemoveFriend.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = window.confirm("Bạn có chắc là muốn hủy kết bạn không?")
      if(isConfirm) {
        const userId = button.getAttribute("btn-remove-friend");
        socket.emit("CLIENT_SEND_REMOVE_FRIEND", userId)
        button.closest("[box-friend]").remove();
      }
    })
  })
}

//End Remove Friend CLIENT_SEND_REMOVE_FRIEND
// .card-body.friends

// SERVER_RETURN_REMOVE_FRIEND
socket.on("SERVER_RETURN_REMOVE_FRIEND", (data) => {
  const listFriends = document.querySelector(".card-body.friends")
  if(listFriends) {
    if(myId === data.myId) {
      const boxRemoveFr = document.querySelector(`[box-friend="${data.userId}"]`)
      if(boxRemoveFr) {
        boxRemoveFr.remove();
      }
    }
  }
})
// END SERVER_RETURN_REMOVE_FRIEND

//SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", userId => {
  const listFriends = document.querySelector(".card-body.friends");
  if(listFriends) {
    const friend = listFriends.querySelector(`[box-friend="${userId}"]`);
    friend.querySelector("[status]").setAttribute("status", "online")
  }
})
//END SERVER_RETURN_USER_ONLINE


//SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", userId => {
  const listFriends = document.querySelector(".card-body.friends");
  if(listFriends) {
    const friend = listFriends.querySelector(`[box-friend="${userId}"]`);
    friend.querySelector("[status]").setAttribute("status", "offline")
  }
})
//END SERVER_RETURN_USER_OFFLINE