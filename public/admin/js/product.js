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