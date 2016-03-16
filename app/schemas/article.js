var mongoose = require('mongoose');

var ArticleSchema =	new mongoose.Schema({
		//标题
		title: String,
		//作者
		author: String,
		meta: {
			//创建时间
			createdtime: {
				type: Date,
				default: Date.now()
			},
			//更新时间
			refreshtime: {
				type: Date,
				default: Date.now()
			}
		},
		//内容
		content: String,
		//简介
		des: String,
		//缩略图
		image: String,
		//点击量
		hits:{
			type:Number,
			default : 0
		},
		//显示
		display:Number
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