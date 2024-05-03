const buttonRestoreItem = document.querySelectorAll("[button-restore-item]");
if(buttonRestoreItem.length > 0) {
    const formRestoreItem = document.querySelector("#form-restore-item");
    buttonRestoreItem.forEach(button => {
        button.addEventListener("click", () => {
            const dataPath = formRestoreItem.getAttribute("data-path")
            const type = button.getAttribute("data-type");
            const id = button.getAttribute("data-id");
            const action = `${dataPath}/${type}/${id}?_method=PATCH`;
            formRestoreItem.action = action
            formRestoreItem.submit()
        })
    })
}

const buttonRemoveItem = document.querySelectorAll("[button-remove-item]");
if(buttonRemoveItem.length > 0) {
    const formRemoveItem = document.querySelector("#form-remove-item");
    buttonRemoveItem.forEach(button => {
        button.addEventListener("click", () => {
            const dataPath = formRemoveItem.getAttribute("data-path")
            const type = button.getAttribute("data-type");
            const id = button.getAttribute("data-id");
            const action = `${dataPath}/${type}/${id}?_method=DELETE`;
            formRemoveItem.action = action
            formRemoveItem.submit()
        })
    })
}