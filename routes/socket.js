var TypePost = require('../models/typepost')
var Post = require('../models/post')
var textSearch = require('mongoose-text-search');
var ouo= require("ouo.io")("KuTtudEU")
var urlSlugMatch = require('url-slug-match');
var shortid = require('shortid')
module.exports = (socket) => {
	
	if(socket.handshake.session.username){

	if(socket.handshake.session.done){
		socket.emit('done',socket.handshake.session.done)
		socket.handshake.session.done = ""
	}


	if(socket.handshake.session.msgErr){
			socket.emit('err',socket.handshake.session.msgErr)
			socket.handshake.session.msgErr = ""
	}

	socket.on('ouo',(url) => {
		ouo.short(url,function(urlz){
				socket.emit('outputOUO',urlz)
		});
	})

	socket.on('typeAdd',(type) => {
		if(type){
			if(type.content && type.name){
					var type = new TypePost({
						name : type.name,
						content : type.content,
						url : urlSlugMatch(type.name + "-" +shortid.generate())
					})
					type.save((err,result) => {
						if(err){
							socket.emit('err',err)
						}
						if(result){
							socket.emit('done',"Them thanh cong " + type.name)
							Typelist()
						}
					})
			}else{
				socket.emit('err','Thieu du lieu')
			}
		}else{
			socket.emit('err','Thieu du lieu')
		}
	})
	socket.on('typeDel',(id) => {
		TypePost.remove({_id : id})
		.then((result) => {
			socket.emit('done','Xoá thành công')
			Typelist()
		})
		.catch((err) => {
			socket.emit('err',err)
			
		})
	})

	socket.on('typeEdit',(type) => {
		TypePost.findById(type._id)
		.then((doc) => {
			doc.name = type.name
			doc.content = type.content
			doc.url = urlSlugMatch(type.url + "-" +shortid.generate())
			doc.save()
			.then((result) => {
				socket.emit('done','Cập nhập thành công ' + type.name)
				Typelist()
			})
			.catch((err) => {
				socket.emit('err',err)
			})
		})
		.catch((err) => {
			socket.emit('err',err)
		})
	})

	socket.on('Typelist',() => {
			Typelist()
	})

	socket.on('postDel', (id) => {
		Post.remove({_id : id})
		.then((result) => {
			socket.emit('done','Xoá thành công')
			Typelist()
		})
		.catch((err) => {
			socket.emit('err',err)
			
		})
	})

	socket.on('postList',() => {
		Postlist()
	})

	socket.on('postSearch',(key) => {
		if(key){

		Post.textSearch('ios',(err,docs) => {
			console.log(docs)
		})
	}
	})

	Typelist()
	Postlist()

	function Typelist() {
		TypePost.find({})
			.then((docs) => {
				socket.emit('Typelist',docs)
			})
			.catch((err) => {
				socket.emit('err',err)
			})
	}

	function 
	Postlist(){
		Post.find({})
		.sort({'_id' : 'desc'})
		.then((docs) => {
			socket.emit('postList',docs)
		})
		.catch((err) => {
			socket.emit('err',err)
		})
	}
}	
}