

const checkoutPage = async (req,res)=>{
   const session = req.session.username
    res.render('user/checkout',{session})
}







exports.checkoutPage = checkoutPage