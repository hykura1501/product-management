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