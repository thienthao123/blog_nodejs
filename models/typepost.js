var mongoose = require('mongoose');
	autoIncrement = require('mongoose-auto-increment');
	var dbOpt = { 
    useMongoClient: true
} 
var  connection=  mongoose.connect('mongodb://root:123@ds029476.mlab.com:29476/videov2',dbOpt);

autoIncrement.initialize(connection);
var Schema = new mongoose.Schema ({
		name : String,
		url : String,
		content : String,
});
Schema.plugin(autoIncrement.plugin, 'typepost');
var ghichu = connection.model('typepost', Schema);








module.exports = mongoose.model('typepost',Schema)