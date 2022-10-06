const Product = require("../models/productSchema");
const productPage = async (req, res) => {

    res.render('admin/addProduct');
}

exports.productPage = productPage;