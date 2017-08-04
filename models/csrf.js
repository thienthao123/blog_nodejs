var sha512 = require('sha512')
var md5 = require('md5')
var shortid = require('shortid')
var csrf = function(req,res,next){ // set csrf method get
    if(req.method == 'GET'){
    req.session.urlBack = req.protocol + "://" + req.get('host') + req.originalUrl
    if(req.session.csrf){
        next()
    }else{
        var key  = sha512( shortid.generate() + Date.now() ).toString('hex')
        req.session.csrf = '<input type="hidden" name="_csrf" value="'+key+'">'
        next()
    }
}
    if(req.method == 'POST'){
        if('<input type="hidden" name="_csrf" value="'+req.body._csrf+'">' == req.session.csrf){
                next()
             }else{ 
                req.body = ""
                var key  = sha512( shortid.generate() + Date.now() ).toString('hex')
                req.session.csrf = '<input type="hidden" name="_csrf" value="'+key+'">'
                req.session.msgErr = "Lỗi không thể gữi dữ liệu"
                res.redirect(req.session.urlBack || "404"); 
            }
    }
    
    
}



module.exports = csrf