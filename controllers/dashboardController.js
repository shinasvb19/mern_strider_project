const Brand = require("../models/brandSchema")
const Category = require("../models/categorySchema")
const Product = require("../models/productSchema")
const mongoose = require('mongoose')

const dashboard = async (req, res) => {
    const product = await Product.find({})

    const session = req.session.username

    res.render('user/layout', { product, session })

}
const showProduct = async (req, res) => {
    let { uid } = req.params;
    uid = mongoose.Types.ObjectId(uid);
    const session = req.session.username
    // console.log(uid)
    const product = await Product.findById(uid)



    const subcategoryFind = await Product.aggregate([{
        $match: {
            _id: uid
        }

    },
    {
        $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category"
        }

    }])
    const subcategoryLookup = await Product.aggregate([{
        $match: {
            _id: uid
        }

    },
    {
        $lookup: {
            from: "subcategories",
            localField: "subcategory_id",
            foreignField: "_id",
            as: "subcategory"
        }

    }])
    const brandLookup = await Product.aggregate([{
        $match: {
            _id: uid
        }

    },
    {
        $lookup: {
            from: "brands",
            localField: "brand_id",
            foreignField: "_id",
            as: "brand"
        }

    }])
    let cat_id = product.category_id;
    cat_id = mongoose.Types.ObjectId(cat_id);
    // let subCat_id = product.category_id;
    // subCat_id = mongoose.Types.ObjectId(subCat_id);
    const relatedProducts = await Product.find({
        category_id: cat_id
    }).limit(8)
    // console.log(relatedProducts)
    res.render('user/productDetails', { product, subcategoryFind, subcategoryLookup, brandLookup, relatedProducts, session })
}
const productFetch = async (req, res) => {
    // console.log(req.body);


    const id = req.body.productId
    const product = await Product.findById({
        _id: id
    }
    )
    // console.log(subcategory)
    res.send({ product });
}
exports.productFetch = productFetch;
exports.showProduct = showProduct;
exports.dashboard = dashboard;