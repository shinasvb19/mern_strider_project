const Product = require("../models/productSchema");


const productPage = async (req, res) => {

    res.render('admin/addProduct');
}
const productPost = async (req, res) => {
    const product = new Product(req.body.product)
    console.log(product)
    product.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await product.save();

    res.redirect('/products');
}
exports.productPage = productPage;
exports.productPost = productPost;