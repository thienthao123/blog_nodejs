var express = require('express')
var fs = require('fs');
var app = express()
var shortid = require('shortid')
var multer  = require('multer')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var os = require('os')
var urlSlugMatch = require('url-slug-match');
var sha512 = require('sha512')
var md5 = require('md5');
var url = require('url');
var nodemailer = require('nodemailer');
var Post = require('../models/post')
var TypePost = require('../models/typepost')
var User = require('../models/user')

const domain = "http://"+os.hostname()+":3000"

var checkLogin = (req,res,next) => {
    if(req.session.username){
        next()
    }else{
        res.redirect('/')
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

// var user = new User({
//     username : "thaotrau",
//     password : md5(sha512('123123')),
//     email : "dthienthao0@gmail.com",
//     email2 : "root@thaotrau.tech",
//     firstname : "Thiện Thảo",
//     lastname : "Dương",
//     word : ["Administration","Developer"],
//     root : 1,
//     avt : "/images/avatars/thaotrau.jpg",
//     sobaiviet : 0,
//     facebook : "https:/facebook.com/thaotrau"
// })
// user.save()



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + file.originalname)
  }
})

var upload = multer({ storage: storage })


app.get('/logout', (req,res) => {
    req.session.anti = ""
    req.session.username = ""
    res.redirect('/')
})


app.get('/profile', (req,res) => {
    var username = "thaotrau"

    User.findOne({username : username})
    .then((doc) => {
        res.render('admin/profile',{ avt : 0,avtp:0,user : doc})
    })
    .catch((err) => {
        console.log(err)
    })
    
})

app.get('/profile/edit', (req,res) => {
    var username = "thaotrau"

    User.findOne({username : username})
    .then((doc) => {
        res.render('admin/profileEdit',{ avt : 0,avtp:0,user : doc})
    })
    .catch((err) => {
        console.log(err)
    })
    
})

app.get('/', (req,res) => {
	res.render('admin/index',{ avt : 1,avtp:0})
})

app.get('/post', (req,res) => {
	res.render('admin/postList',{avt : 2,avtp:2.1})
})


app.get('/post/add',(req,res) => {
    req.session.username = "thaotrau"
    TypePost.find({})
    .then((docs) => {
            res.render('admin/post',{avt : 2,avtp:2.2,types : docs,csrf : req.session.csrf })
    })
    .catch((err) => {
        req.session.msgErr = err
    })
	
})

app.post('/post/add'  , upload.single('file')  ,(req,res) => {
    
	if(req.file && req.body.title && req.body.content && req.body.content_mini && req.body.type && req.body.tags){
        var tags = req.body.tags.split(",");
            var post = new Post({
                title : req.body.title,
                content : req.body.content,
                content_mini: req.body.content_mini,
                url : urlSlugMatch(req.body.title+ "-" +shortid.generate()) ,
                views : 0,
                cmt : 0,
                img : "/uploads/" + req.file.filename,
                noibat : req.body.noibat,
                idtype : req.body.type,
                nguoidang : req.session.username,
                tags : tags
            })
            post.save((err,result) => {
                if(err){
                    console.log(err)
                    res.status(500).send()
                }
                if(result){
                    req.session.done = "Đã đăng bài viết thành công"
                    res.redirect('/admin/post')
                }
            })
            
    }else{
            req.session.msgErr = "Thiếu dữ liệu"
            TypePost.find({})
            .then((docs) => {
                 res.render('admin/post',{avt : 2,avtp:2.2,types : docs})
             })
            .catch((err) => {
                req.session.msgErr = err
             })
    }
})

app.get('/post/edit/:id',(req,res) => {

})

app.post('/post/:id',(req,res) => {

})


app.get('/post/type', (req,res) => {
	res.render('admin/postType',{avt : 2,avtp:2.3})
})

app.post('/uploader', multipartMiddleware, function(req, res) {
	var namefile = shortid.generate() + req.files.upload.name;

    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/../public/uploads/' + namefile
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {
            	var html = ""
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     = \"/uploads/" + namefile + "\";";
                html += "";
                html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url);";
                html += "</script>";
				res.send(html);
            }
        });
    });
});



module.exports = app