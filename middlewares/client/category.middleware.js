const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");
module.exports.categoty = async (req, res, next) => {
  const productsCategory = await ProductCategory.find({
    deleted: false,
    status: "active",
  });
  const newProductsCategory = createTree.tree(productsCategory);
  res.locals.productsCategory = newProductsCategory;
  next();
};
