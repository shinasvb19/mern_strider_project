const mongoose = require('mongoose');
const Banner = require('../models/bannerSchema');
const Discount = require('../models/discountBannerSechema');

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


const couponBanner= async (req, res) => {
    console.log(req.body)
    const obj = JSON.parse(JSON.stringify(req.body));
// const bannerOne = obj;

const couponBanner = new Discount(obj); 
couponBanner.imageOne = req.files.map(f => ({ url: f.path, filename: f.filename }))
try{
    await couponBanner.save();
    req.flash('success','new banner successfully added')
}
catch(error){
    req.flash('error','something went wrong')
}

res.redirect('/banner')
}

exports.couponBanner = couponBanner;
exports.bannerPost = bannerPost;


exports.getBanner = getBanner;
