const mongoose = require('mongoose');
	autoIncrement = require('mongoose-auto-increment');
	var dbOpt = { 
    useMongoClient: true
} 
var textSearch = require('mongoose-text-search');
var  connection=  mongoose.connect('mongodb://localhost:27017/blog',dbOpt);

autoIncrement.initialize(connection);
var Schema = new mongoose.Schema ({
	title: String,
	content : String,
	content_mini : String,
	url : String,
	img : String,
	nguoidang:String,
	cmt :  Number,
	views : Number,
	idtype : Number,
	noibat : Boolean
});
Schema.plugin(autoIncrement.plugin, 'post');
Schema.plugin(textSearch);

var ghichu = connection.model('post', Schema);








module.exports = mongoose.model('post',Schema)