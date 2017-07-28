var express = require('express')
var fs = require('fs');
var app = express()
var shortid = require('shortid')
var multer  = require('multer')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var os = require('os')
var bodyParser = require('body-parser')

const domain = "http://"+os.hostname()+":3000"

app.use(bodyParser.urlencoded({ extended: false }))



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + file.fieldname)
  }
})

var upload = multer({ storage: storage })

/* Auth */


app.get('/login', (req,res) => {
	res.render('admin/login')
})

app.post('/login', (req,res) => {
	res.redirect('/admin/')
})

app.get('/password/reset',(req,res) => {
	res.render('admin/reset')
})
app.post('/password/reset',(req,res) => {
	res.render('admin/reset')
})


app.get('/', (req,res) => {
	res.render('admin/index',{ avt : 1,avtp:0})
})

app.get('/post', (req,res) => {
	res.render('admin/postList',{avt : 2,avtp:2.1})
})


app.get('/post/add',(req,res) => {
	res.render('admin/post',{avt : 2,avtp:2.2})
})

app.post('/post/add',upload.single('file'),(req,res) => {
    console.log(req.file.filename)
	//var namefile = shortid.generate() + req.files.upload.name;
/*
    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/../public/uploads/' + namefile
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {
                
            }
        });
    });*/
})

app.get('/post/edit/:id',(req,res) => {

})

app.post('/post/:id',(req,res) => {

})

app.delete('/post/:id',(req,res) => {

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