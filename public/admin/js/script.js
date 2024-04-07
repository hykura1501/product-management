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

const formChangeMulti = document.querySelector("[form-change-multi]")
const btnSubmit = formChangeMulti.querySelector("button[type=submit]")
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const btnChecked = document.querySelectorAll('input[name=id]:checked')    
    if(btnChecked.length > 0) {
        let ids = []
        btnChecked.forEach((id) => {
            ids.push(id.value);
        })
        const inputIds = formChangeMulti.querySelector("input[name=ids]")
        inputIds.value = ids.join(", ")
        formChangeMulti.submit();
    }
    
})

//End Change Multi Status