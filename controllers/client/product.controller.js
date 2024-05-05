const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
//[GET] /products
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
  };
  const products = await Product.find(find).sort({ position: "desc" });
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};
//[GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const product = await Product.findOne({
      deleted: false,
      status: "active",
      slug: req.params.slug,
    });
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    // res.redirect("back");
  }
};
//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const slug = req.params.slugCategory;
  try {
    const category = await ProductCategory.findOne({
      deleted: false,
      status: "active",
      slug: slug,
    }).select("id title");

    const getCategoryChildren = async (parent_id) => {
      let result = [];
      const categoryChildren = await ProductCategory.find({
        deleted: false,
        status: "active",
        parent_id: parent_id,
      }).select("id");
      result = [...result, ...categoryChildren];
      for (const item of categoryChildren) {
        const res = await getCategoryChildren(item.id, result);
        result = [...result, ...res];
      }
      return result;
    };
    const allCategory = await getCategoryChildren(category.id);
    const idCategory = allCategory.map((item) => {
      return item.id;
    });
    const products = await Product.find({
      deleted: false,
      status: "active",
      product_category_id: { $in: [category.id, ...idCategory] },
    }).sort({ position: "desc" });
    res.render("client/pages/products/index", {
      pageTitle: category.title,
      products: products,
    });
  } catch (error) {
    // res.redirect("back");
  }
};
