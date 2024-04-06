module.exports = (objectPagination, countProducts, query) => {
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page)
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    }
    const totalPages = Math.ceil(countProducts / objectPagination.limitItem)
    objectPagination.totalPages = totalPages
    return objectPagination
}