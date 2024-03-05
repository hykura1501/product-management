//Button Status: filter Product
const buttonStatus = document.querySelectorAll("[button-status]")
buttonStatus.forEach((button) => {
    button.onclick = (event) => {
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