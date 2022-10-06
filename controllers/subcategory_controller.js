const Subcategory = require("../models/subCategorySchema");
const Category = require("../models/categorySchema");

const subcategory = async (req, res) => {
    const subcategorys = await Subcategory.aggregate([{
        $lookup: {
            from: 'categories',
            localField: 'category_id', foreignField: '_id', as: 'category'
        }

    }]
    );
    console.log(subcategorys);
    const categorys = await Category.find({});
    res.render('admin/subCategory', { message: req.flash('exists'), subcategorys, categorys });
}
const subcategoryPost = async (req, res) => {
    let { subcategory, category_id } = req.body;
    category_id = category_id.trim();
    const newSubcategory = new Subcategory({
        subcategory, category_id
    })
    try {
        await newSubcategory.save()

    } catch (error) {
        req.flash('exists', 'Subcategory already exists');

    }
    res.redirect('/subcategorys');


}
const subcategoryDelete = async (req, res) => {
    const subcategoryId = req.params.uid;


    try {
        await Subcategory.findByIdAndDelete(subcategoryId)
    } catch (error) {

    }

    res.redirect('/subcategorys');
}
const sessionCheckDashboard = (req, res, next) => {
    if (req.session.username) {
        next();
    }
    else {
        res.redirect('/admin/signin')
    }

}
exports.sessionCheckDashboard = sessionCheckDashboard;
exports.subcategoryDelete = subcategoryDelete;
exports.subcategory = subcategory;
exports.subcategoryPost = subcategoryPost;