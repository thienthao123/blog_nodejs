var mongoose = require('mongoose');
	autoIncrement = require('mongoose-auto-increment');
	var dbOpt = { 
    useMongoClient: true
} 
var  connection=  mongoose.connect('mongodb://localhost:27017/blog',dbOpt);

autoIncrement.initialize(connection);
var Schema = new mongoose.Schema ({
	username : String,
	email :String,
	email2 : String,
	password:String,
	facebook:String,
	firstname : String,//ten
	lastname : String,//ho
	sobaiviet : String,
	work :[String],
	root : Number,
	avt : String,
	sex : String,
});
Schema.plugin(autoIncrement.plugin, 'user');
var ghichu = connection.model('user', Schema);








module.exports = mongoose.model('user',Schema)