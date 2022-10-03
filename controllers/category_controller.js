const Category = require("../models/categorySchema");

const categorys = (req, res) => {
    res.render('admin/categorys');
}

const categoryPost = async (req, res) => {
    const { category } = req.body;

    const newCategory = new Category({
        category
    })
    try {
        await newCategory.save()

    } catch (error) {
        console.log(error)
    }
    res.redirect('/categorys');

}

exports.categorys = categorys;
exports.categoryPost = categoryPost;