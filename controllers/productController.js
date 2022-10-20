const { findByIdAndUpdate } = require("../models/adminSchema");
const Brand = require("../models/brandSchema");
const Category = require("../models/categorySchema");
const { aggregate } = require("../models/productSchema");
const Product = require("../models/productSchema");
const Subcategory = require("../models/subCategorySchema");
const mongoose = require('mongoose');

const productPage = async (req, res) => {
    const brand = await Brand.find({});
    const category = await Category.find({});
    // const subcategory = await Subcategory.aggregate([{
    //     $lookup: {
    //         from: 'categories',
    //         localField: 'category_id', foreignField: '_id', as: 'category'
    //     }
    // }])
    res.render('admin/addProduct', { brand, category, message: req.flash('exists') });
    // res.json(subcategory)
}
const productPost = async (req, res) => {

    const { description, small_stock, medium_stock, large_stock, price, mrp, category_id, brand_id, subcategory_id, details } = req.body
    let { product_name } = req.body
    product_name = product_name.toLowerCase();
    const product = new Product({ product_name, description, price, mrp, category_id, brand_id, subcategory_id, details })

    product.product_size.small_stock = small_stock;
    product.product_size.medium_stock = medium_stock;
    product.product_size.large_stock = large_stock;
    product.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    try {
        await product.save();
    }
    catch (error) {
        console.log(error)
    }
    console.log(req.body)
    res.redirect('/products');
}
const productLookup = async (req, res) => {
    // console.log(req.body);
    let id = req.body.categoryId;

    const subcategory = await Subcategory.find({
        category_id: id
    }
    )
    // console.log(subcategory)
    res.send({ subcategory });
}
const showProducts = async (req, res) => {
    const categoryFind = await Product.aggregate([{
        $lookup: {
            from: 'categories',
            localField: 'category_id', foreignField: '_id', as: 'category'
        }
    },
    {
        $lookup: {
            from: 'subcategories',
            localField: 'subcategory_id', foreignField: '_id', as: 'subcategory'
        }

    }])
    // const subcategoryFind = await Product.aggregate([{
    //     $lookup: {
    //         from: 'subcategories',
    //         localField: 'subcategory_id', foreignField: '_id', as: 'subcategory'
    //     }

    // }])
    console.log(categoryFind)
    res.render('admin/showProducts', { categoryFind });
}
const showEdit = async (req, res) => {

    res.render('admin/editProducts')
}
const postUpdate = async (req, res) => {
    const id = await Product.findById(req.body)
    const uid = id._id


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
    // console.log(brandLookup)
    const brandFind = await Brand.find({})
    const categoryPost = await Category.find({})
    res.render('admin/editProducts', { id, subcategoryFind, subcategoryLookup, categoryPost, brandLookup, brandFind })
}
const findUpdate = async (req, res) => {
    const { uid } = req.params
    console.log(uid)
    const { product_name, description, details, small_stock, medium_stock, large_stock, price, mrp, category_id, brand_id, subcategory_id } = req.body
    const product = await Product.findByIdAndUpdate(uid, { product_name, description, details, price, mrp, category_id, brand_id, subcategory_id })

    product.product_size.small_stock = small_stock;
    product.product_size.medium_stock = medium_stock;
    product.product_size.large_stock = large_stock;

    product.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    // product.image.push(...imgs);
    await product.save();
    res.redirect('/products/show')
}
// const editProductForm = (req, res) => {
//     res.render('admin/editProduct')
// }
// // const updateId = await User.findById()
// // res.render('edit', { updateId });
// exports.editProductForm = editProductForm;
exports.findUpdate = findUpdate;
exports.postUpdate = postUpdate;
exports.showEdit = showEdit;
exports.showProducts = showProducts;
exports.productLookup = productLookup;
exports.productPage = productPage;
exports.productPost = productPost;