var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10

var MemberSchema =  new mongoose.Schema({
	name:String,//名字
	content:String,//简介
	job:String,//职位
	age:Number,//年龄
	sex:String,//性别
	image:String,//头像
	website:String, //个人网站
	username:String,//用户名
	password:String//密码
});

MemberSchema.pre('save', function(next) {
	var member = this;

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {return next(err)};

		bcrypt.hash(member.password, salt, function(err, hash) {
			if (err) {return next(err)};

			member.password = hash;
			next();
		})
	})
})

MemberSchema.methods = {
	comparePassword:function(_password,cb){
		bcrypt.compare(_password, this.password, function(err, isMatch) {

			if (err){return cb(err);}

			cb(null, isMatch);
		});
	}
}

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
