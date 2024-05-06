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

//Show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert) {
    const timeClose = parseInt(showAlert.getAttribute("time-close"))
    setTimeout(() => {
        showAlert.classList.remove("animate__bounceInRight")
        showAlert.classList.add("animate__bounceOutRight")
    }, timeClose)
    const buttonClose = showAlert.querySelector(".button-close")
    buttonClose.addEventListener('click', () => {
        showAlert.classList.remove("animate__bounceInRight")
        showAlert.classList.add("animate__bounceOutRight")
    })
}
//End show alert

//preview image When create product
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
//End preview image When create product


//Sort
const sort = document.querySelector("div[sort]")
if(sort) {
    const sortSelect = sort.querySelector("[sort-select]")
    const sortClear = sort.querySelector("[sort-clear]")
    let url = new URL(window.location.href)
    sortSelect.addEventListener("change", () => {
        const sortQuery = sortSelect.value.split("-");
        const [sortKey, sortValue] = sortQuery
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)

        window.location.href = url.href

    }) 
    
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    
    if(sortKey && sortValue) {
        const selected = sortKey + "-" + sortValue
        const isSelected = sort.querySelector(`option[value=${selected}]`)
        isSelected.selected = true;

        sortClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
            window.location.href = url.href
        })
    }

}
//End Sort