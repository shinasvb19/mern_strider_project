const Brand = require("../models/brandSchema");
const brandPage = async (req, res) => {
    const brand = await Brand.find({});
    res.render('admin/brand', { message: req.flash('exists'), brand });
}

const brandPost = async (req, res) => {

    const { brand } = req.body;
    const newBrand = new Brand({
        brand
    })
    try {
        await newBrand.save()

    } catch (error) {
        req.flash('exists', 'brand already exists');
    }
    res.redirect('/brand');

}
const brandDelete = async (req, res) => {
    const brandId = req.params.uid;
    try {
        await Brand.findByIdAndDelete(brandId)
    } catch (error) {
        console.log(error);
    }

    res.redirect('/brand');
}
exports.brandDelete = brandDelete;
exports.brandPost = brandPost;
exports.brandPage = brandPage;