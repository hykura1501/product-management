//Change status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]')
if(buttonsChangeStatus) {
    buttonsChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const formChangeStatus = document.querySelector("#form-change-status")
            const dataPath = formChangeStatus.getAttribute('data-path')
            const status = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            const changeStatus = status === 'active' ? "inactive" : "active"
            const action = dataPath + `/${changeStatus}/${id}?_method=PATCH`
            formChangeStatus.action = action
            formChangeStatus.submit();
        })
    })
}
//End Change status

// Delete product item
const buttonDelete = document.querySelectorAll('[button-delete-item]')
buttonDelete.forEach(button => {
    button.addEventListener("click", (e) => {
        const yes = confirm("Bạn có chắc chắn muốn xóa không?")
        if(yes) {
            const id = button.getAttribute("data-id")
            const formDeleteItem = document.querySelector('#form-delete-item')
            const path = formDeleteItem.getAttribute('data-path')
            const action = `${path}/${id}/?_method=DELETE`
            formDeleteItem.action = action
            formDeleteItem.submit()
        }
    })
})
// End Delete product item
