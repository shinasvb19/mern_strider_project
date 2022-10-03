const Category = require("../models/categorySchema");

const categorys = async (req, res) => {
    const categorys = await Category.find({});
    res.render('admin/categorys', { message: req.flash('exists'), categorys });
}

const categoryPost = async (req, res) => {
    const { category } = req.body;

    const newCategory = new Category({
        category
    })
    try {
        await newCategory.save()

    } catch (error) {
        req.flash('exists', 'category already exists');
    }
    res.redirect('/categorys');

}

const categoryDelete = async (req, res) => {
    const categoryId = req.params.uid;


    try {
        await Category.findByIdAndDelete(categoryId)
    } catch (error) {

    }

    res.redirect('/categorys');
}


exports.categoryDelete = categoryDelete;
exports.categorys = categorys;
exports.categoryPost = categoryPost;