const Brand = require("../models/brandSchema")
const Category = require("../models/categorySchema")
const Product = require("../models/productSchema")
const mongoose = require('mongoose')
const Banner = require("../models/bannerSchema")

const dashboard = async (req, res) => {
    const product = await Product.find({})

    const session = req.session.username
    const banner = await Banner.find().sort({ 
        createdAt:-1})
// console.log(banner);
    res.render('user/layout', { product, session,banner })

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
const showAllProducts = async (req, res) => {
 session = req.session.username;
 const category = await Category.find()
 const product = await Product.find({})

    res.render('user/totalProduct',{session,product,category})
}
const categoryProduct = async (req, res) => {
    id = req.query
    
    const result = await Product.findById({id})
}
const women = async (req, res) => {
    let id = '633d1bdf4043aa24c09dcdfd'
    session = req.session.username;
    id = mongoose.Types.ObjectId(id);
   const product = await Product.find({category_id:id})
// console.log(womenData)
 res.render('user/totalProduct',{product,session})
}
const men = async (req, res) => {
    let id = '633e7fc23bf2ed6740bff737'
    session = req.session.username;
    id = mongoose.Types.ObjectId(id);
   const product = await Product.find({category_id:id})
// console.log(womenData)
 res.render('user/totalProduct',{product,session})
}
exports.men = men;
exports.women =women;
exports.categoryProduct = categoryProduct;
exports.showAllProducts = showAllProducts;
exports.productFetch = productFetch;
exports.showProduct = showProduct;
exports.dashboard = dashboard;