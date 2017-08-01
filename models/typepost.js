var mongoose = require('mongoose');
	autoIncrement = require('mongoose-auto-increment');
	var dbOpt = { 
    useMongoClient: true
} 
var  connection=  mongoose.connect('mongodb://localhost:27017/blog',dbOpt);

autoIncrement.initialize(connection);
var Schema = new mongoose.Schema ({
		name : String,
		url : String,
		content : String,
});
Schema.plugin(autoIncrement.plugin, 'typepost');
var ghichu = connection.model('typepost', Schema);








module.exports = mongoose.model('typepost',Schema)