const { find } = require("../models/couponSchema");
const Coupon = require("../models/couponSchema");
const  mongoose = require('mongoose')
const coupons = async (req, res) =>{
    const couponsFind = await Coupon.find({})
res.render('admin/coupons',{couponsFind});

}
const couponPost = async (req, res) => {
    const {couponName,dicount,maximumLimit}= req.body
   let {expiry} = req.body
   expiry= Number(expiry)
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiry);
    // let deliveryDate = new Date();
    //         deliveryDate.setDate(deliveryDate.getDate() + 7);
      const newCoupon = new Coupon({
        couponName,dicount,maximumLimit,expiryDate
        
    })
    try {
        await newCoupon.save()
        req.flash('success', 'added successfully');
    }
 catch (error) {
        req.flash('error', 'coupon already exists');
    }
    res.redirect('/coupon');

}
const deleteCoupon = async (req, res) => {
    let {id}= req.body;
   id= mongoose.Types.ObjectId(id);
   await Coupon.findByIdAndDelete(id)
   req.flash('success','created succesfully')
   res.send({deleted:'true'})
// console.log(posted);
}
exports.deleteCoupon = deleteCoupon;
const couponCompare = async (req, res) => {
   let dis = '' 
 const {couponName}=req.body;
 const couponFind = await Coupon.find({couponName})
if (couponFind && couponFind.length > 0) {
 console.log(couponFind);
  dis = couponFind[0].dicount
 const id = couponFind[0]._id
 const maximumLimit = couponFind[0].maximumLimit
//  console.log(dis)
 res.send({dis,id,maximumLimit})
}
else{
//   console.log('nooooooop');
  req.flash('error', 'coupon not found');
 
res.send({is:false})
}
}
exports.couponCompare = couponCompare;
exports.coupons = coupons;
exports.couponPost = couponPost;