//Change Quantity
const inputQuantity = document.querySelectorAll("input[name='quantity']")
if(inputQuantity.length > 0) {
    inputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const quantity = input.value
            const idProduct = input.getAttribute("product-id");
            window.location.href = `/cart/update/${idProduct}/${quantity}`
        })
    })
}
//End Change Quantity