const {Company,Investment,User,Wallet}=require('../models')
const bcrypt=require('bcryptjs')
class Controller{
    static home(req,res){
        res.render('home')
    }
    static investmentList(req,res){
        const userId =req.session.userId
        let user;
        User.findByPk(userId, {
            include: Wallet
        })
        // Investment.findAll({
        //     include:[User,Company]
        // })
        .then((users)=>{
            user=users
            return Investment.findAll({
                    include:[User,Company]
            })
        })
        .then((invest)=>{
            console.log(user)
            res.render('investmentList',{invest,user})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static register(req,res){
        res.render('registerForm')
    }
    static registerPost(req,res){
        const{name,email,password,role}=req.body
        User.create({name,email,password,role})
        .then((newUser)=>{
            res.redirect('/login')
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    static login(req,res){
        const{error}=req.query
        res.render('login',{error})
    }
    static loginPost(req,res){
        const{email,password}=req.body

        User.findOne({where:{email}})
        .then((user)=>{
            if(user){
                const isValidPassword= bcrypt.compareSync(password,user.password)
                if(isValidPassword){
                    req.session.userId=user.id
                    req.session.email=user.email
                    req.session.role=user.role
                    res.redirect(`/investments`)
                }else{
                    let error="Invalid password/email"
                    res.redirect(`/login?error=${error}`)
                }
            }else{
                let error="Invalid password/email"
                res.redirect(`/login?error=${error}`)
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    }
}
module.exports=Controller