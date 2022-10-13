const Brand = require("../models/brandSchema");
const Category = require("../models/categorySchema");
const { aggregate } = require("../models/productSchema");
const Product = require("../models/productSchema");
const Subcategory = require("../models/subCategorySchema");


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

    const { description, small_stock, medium_stock, large_stock, price, mrp, category_id, brand_id, subcategory_id } = req.body
    let { product_name } = req.body
    product_name = product_name.toLowerCase();
    const product = new Product({ product_name, description, price, mrp, category_id, brand_id, subcategory_id })

    product.product_size = [{
        small: {
            small_stock
        },
        medium: {
            medium_stock
        },
        large: {
            large_stock
        }

    }]

    product.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    try {
        await product.save();
    }
    catch (error) {
        console.log(error)
    }

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
    }])
    const subcategoryFind = await Product.aggregate([{
        $lookup: {
            from: 'subcategories',
            localField: 'subcategory_id', foreignField: '_id', as: 'subcategory'
        }
    }])
    // res.json(productFind)
    res.render('admin/showProducts', { categoryFind, subcategoryFind });
}
const showEdit = async (req, res) => {
    res.render('admin/editProducts')
}
exports.showEdit = showEdit;
exports.showProducts = showProducts;
exports.productLookup = productLookup;
exports.productPage = productPage;
exports.productPost = productPost;