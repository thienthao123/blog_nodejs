var mongoose = require('mongoose');
	shortid = require('shortid')
	autoIncrement = require('mongoose-auto-increment');
	var dbOpt = { 
    useMongoClient: true
} 
var  connection=  mongoose.connect('mongodb://localhost:27017/blog',dbOpt);

autoIncrement.initialize(connection);
var Schema = new mongoose.Schema ({
	idz : shortid.generate(),
	title: String,
	content : String,
	content_mini : String,
	img : String,
	nguoidang:String,
	cmt :  Number,
	views : Number,
	idtype : Number,
});
Schema.plugin(autoIncrement.plugin, 'post');
var ghichu = connection.model('post', Schema);








module.exports = mongoose.model('post',Schema)