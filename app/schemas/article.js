var mongoose = require('mongoose');

var ArticleSchema =  new mongoose.Schema({
});


ArticleSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.exec(cb);
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb);
	}
}

module.exports = ArticleSchema;