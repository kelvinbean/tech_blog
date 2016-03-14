var mongoose = require('mongoose');
var Member =  require('../models/member');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');


//添加编辑成员页
exports.add = function(req,res){
	res.render('member',{member:{}});
}

exports.edit = function(req,res){
	var id = req.params.id;
	Member.findById(id,function(err,member){
		if(err){
			console.log(err);
		}
		res.render('member',{
			member:member
		});
	})
}

exports.details = function(req,res){
	var id = req.params.id;
	Member.findById(id,function(err,member){
		if(err){
			console.log(err);
		}

		res.render('memberdetail',{
			member:member
		});
	})
}


// 上传头像
exports.saveImg = function(req,res,next){
	var image = req.files.member.image;
	var filePath = image.path;
	var originalFilename = image.originalFilename;

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			if(err){
				console.log(err);
			}

			var timestamp =  Date.now();
			var type = image.type.split('/')[1];
			var head = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','/public/upload/'+head);

			fs.writeFile(newPath,data,function(err){
				if(err){
					console.log(err);
				}
				req.body.member.image = head;
				next();
			});
		});
	}else{
		next();
	}
};

// 保存
exports.save = function(req,res){
	var id = req.body.member._id;
	var memberObj = req.body.member;
	var _member;

	if(id){
		// 编辑
		Member.findById(id,function(err,member){
			if(err){
				console.log(err);
			}

			_member = _.extend(member,memberObj);
			_member.save(function(err,member){
				if(err){
					console.log(err);
				}
				res.redirect('/member/list');
			});
		});
	}else{
		_member = new Member(memberObj);
		// 新建
		_member.save(function(err,member){
			if(err){
				console.log(err);
			}
			res.redirect('/member/list');
		});

	}
};

// 列表
exports.list = function(req,res){
	Member.fetch(function(err,members){
		if(err){
			console.log(err);
		}
		res.render('memberlist',{
			members : members
		});
	});
}

// 删除
exports.del = function(req,res){
	var id = req.query.id;
	if(id){
		Member.remove({_id:id},function(err,member){
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		})
	}
}