var mongoose = require('mongoose');

var MemberSchema =  new mongoose.Schema({
	name:String,//名字
	content:String,//简介
	job:String,//职位
	age:Number,//年龄
	sex:String,//性别
	image:String,//头像
	website:String, //个人网站
	del:Number//是否删除
});


MemberSchema.statics = {
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

module.exports = MemberSchema;