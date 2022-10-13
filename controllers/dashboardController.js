const Product = require("../models/productSchema")


const dashboard = async (req, res) => {
    const product = await Product.find({})
    res.render('layouts/layout', { product })
}

exports.dashboard = dashboard;