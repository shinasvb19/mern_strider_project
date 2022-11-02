const mongoose = require('mongoose');
const Banner = require('../models/bannerSchema');

const getBanner = async (req, res) => {
    res.render('admin/banner')
}

const bannerPost = async (req, res, next) => {
const obj = JSON.parse(JSON.stringify(req.body));
// const bannerOne = obj;

const banner = new Banner(obj); 
banner.imageOne = req.files.map(f => ({ url: f.path, filename: f.filename }))
try{
    await banner.save();
    req.flash('success','new banner successfully added')
}
catch(error){
    req.flash('error','something went wrong')
}

res.redirect('/banner')
}
exports.bannerPost = bannerPost;


exports.getBanner = getBanner;
