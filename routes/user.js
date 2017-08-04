var express = require('express')
var app = express()
var csrf = require('../models/csrf')
var sha512 = require('sha512')
var md5 = require('md5');

var User = require('../models/user')

var checkLogin = (req,res,next) => {
    if(req.session.username){
        res.redirect('/admin')
    }else{
        next()
    }
}

var anti = (req,res,next) => {
    if(req.session.anti){
        next()
    }else{
        res.redirect('/')
    }
}
app.use(anti)

app.use(checkLogin)

app.get('/admin/login',csrf, (req,res) => {
	res.render('admin/login',{ csrf : req.session.csrf,msgErr:0})
})

app.post('/admin/login', (req,res) => {
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
    if(req.session.msgErr ){
        var msg = req.session.msgErr 
        req.session.msgErr = ""
        res.render('admin/login',{ csrf : req.session.csrf,ip : ip,msgErr:msg})
    }else{
    	var email = req.body.email 
    	var password = md5(sha512(req.body.password))

    	User.findOne({email : email,password : password})
    	.then((doc) => {
    		if(doc){
                req.session.username = doc.username
                res.redirect('/admin/')
            }
            if(!doc){
                var msg = "Email hoặc mật khẩu sai"
                res.render('admin/login',{ csrf : req.session.csrf,ip : ip,msgErr:msg})
            }
    		
    	})
    	.catch((err) => {
    		console.log(err)
            res.status(500).send()
    	})
    }
	
})

app.get('/admin/password/reset' ,csrf,(req,res) => {
	res.render('admin/reset',{ csrf : req.session.csrf,msgErr:req.session.msgErr,msg : 0})
})
app.post('/admin/password/reset',csrf ,(req,res) => {
    var msgErr = req.session.msgErr || 0
    if(req.body.email){
        var msg = "nếu "+req.body.email+" tồn tài tại thì vui lòng kiểm tra email"
        res.render('admin/reset',{ csrf : req.session.csrf,msgErr:msgErr,msg : msg})
    }else{
        var msgErr = "Không tìm thấy dữ liệu"
        res.render('admin/reset',{ csrf : req.session.csrf,msgErr:msgErr,msg : msg})
    }
	
})




module.exports = app