const Brand = require("../models/brandSchema")
const Category = require("../models/categorySchema")
const Product = require("../models/productSchema")


const dashboard = async (req, res) => {
    const product = await Product.find({})
    res.render('user/layout', { product })
}
const showProduct = async (req, res) => {
    const { uid } = req.params;

    const product = await Product.findById(uid)

    const categoryId = product.category_id;
    const subcategoryId = product.subcategory_id;
    const brandId = product.brand_id;
    const subcategoryFind = await Product.aggregate([{
        $match: {
            category_id: categoryId
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
            subcategory_id: subcategoryId
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
            brand_id: brandId
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
    // console.log(brandLookup)

    res.render('user/productDetails', { product, subcategoryFind, subcategoryLookup, brandLookup })
}
exports.showProduct = showProduct;
exports.dashboard = dashboard;