const {Company,Investment,User,Wallet}=require('../models')
class Controller{
    static home(req,res){
        res.render('home')
    }
    static investmentList(req,res){
        Investment.findAll({
            include:[User,Company]
        })
        .then((invest)=>{
            res.render('investmentList',{invest})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
}
module.exports=Controller