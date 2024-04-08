//Button Status: filter Product
const buttonStatus = document.querySelectorAll("[button-status]")
buttonStatus.forEach((button) => {
    button.onclick = () => {
        const status = button.getAttribute("button-status")
        const newUrl = new URL(window.location.href)
        if(status) {
            newUrl.searchParams.set("status", status)
        }else {
            newUrl.searchParams.delete("status")
        }
        newUrl.searchParams.delete("page")
        window.location.href = newUrl.href
    }
})
//End---Button Status: filter Product

//Form Search 

const formSearch = document.querySelector("#form-search")
if(formSearch) {
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value.trim()
        const newUrl = new URL(window.location.href)
        if(keyword) {
            newUrl.searchParams.set("keyword", keyword)
        }else {
            newUrl.searchParams.delete("keyword")
        }
        window.location.href = newUrl.href
    })
}
//End form search

//Pagination
const buttonPage = document.querySelectorAll('[button-pagination]')
if(buttonPage) {
    buttonPage.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute('button-pagination')
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.set("page", page);
            window.location.href = newUrl.href
        })
    })
}

//End Pagination

//Change Multi Status

const btnCheckAll = document.querySelector("input[name=checkall]")
const btnCheckbox = document.querySelectorAll("input[name=id]")
if(btnCheckAll) {
    btnCheckAll.addEventListener('click', (e) => {
        if(btnCheckAll.checked) {
            btnCheckbox.forEach(btn => {
                btn.checked = true
            })
        }else {
            btnCheckbox.forEach(btn => {
                btn.checked = false
            })
        }
    })
}
if(btnCheckbox) {
    btnCheckbox.forEach(btn => {
        btn.addEventListener('click', () => {
            const countChecked = document.querySelectorAll('input[name=id]:checked').length
            const totalBtn = btnCheckbox.length
            if(countChecked === totalBtn) {
                btnCheckAll.checked = true
            }else {
                btnCheckAll.checked = false
            }
        })
    })
}


const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        const btnChecked = document.querySelectorAll('input[name=id]:checked')  
        const action = e.target.elements.type.value
    
        if(action === 'delete') {
            if(btnChecked.length > 0) {
                const isConfirm = confirm("Bạn có chắc là muốn xóa không?")
                if(!isConfirm) {
                    return
                }
            }
        }
        if(btnChecked.length > 0) {
            let ids = []
            btnChecked.forEach((buttonId) => {
                if(action === 'change-position') {
                    //Get position
                    const inputPosition = buttonId.closest("tr").querySelector("[input-position]")
                    ids.push(`${buttonId.value}-${inputPosition.value}`)
                }else
                    ids.push(buttonId.value);
            })
            const inputIds = formChangeMulti.querySelector("input[name=ids]")
            inputIds.value = ids.join(", ")
            formChangeMulti.submit();
        }
    })
}


//End Change Multi Status

//Alert Success
const alertSuccess = document.querySelector("[alert-success]")
if(alertSuccess) {
    const timeClose = parseInt(alertSuccess.getAttribute("time-close"))
    setTimeout(() => {
        alertSuccess.classList.remove("animate__bounceInRight")
        alertSuccess.classList.add("animate__bounceOutRight")
    }, timeClose)
    const buttonClose = alertSuccess.querySelector(".button-close")
    buttonClose.addEventListener('click', () => {
        alertSuccess.classList.remove("animate__bounceInRight")
        alertSuccess.classList.add("animate__bounceOutRight")
    })
}
//End Alert Success

