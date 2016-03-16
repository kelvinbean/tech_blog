var mongoose = require('mongoose');
var Article =	require('../models/article');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

//进入添加页面
exports.toadd = function(req,res){
	res.render('article',{article:{}});
}

// 进入编辑页面
exports.toedit = function(req,res){
	var id = req.params.id;
	Article.findById(id,function(err,article){
		if(err){
			console.log(err);
		}
		res.render('article',{
			article:article
		});
	})
}

//保存缩略图
exports.saveImg = function(req,res,next){
	var image = req.files.article.image;
	var filePath = image.path;
	var originalFilename = image.originalFilename;

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			if(err){
				console.log(err);
			}

			var timestamp =	Date.now();
			var type = image.type.split('/')[1];
			var head = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','/public/upload/'+head);

			fs.writeFile(newPath,data,function(err){
				if(err){
					console.log(err);
				}
				req.body.article.image = head;
				next();
			});
		});
	}else{
		next();
	}	
}

// 保存
exports.save = function(req,res){
	var id = req.body.article._id;
	var articleObj = req.body.article;
	var _article;

	if(id){
		// 编辑
		Article.findById(id,function(err,article){
			if(err){
				console.log(err);
			}

			_article = _.extend(article,articleObj);
			_article.save(function(err,article){
				if(err){
					console.log(err);
				}
				res.redirect('/admin/article/list');
			});
		});
	}else{
		articleObj.author = req.session.user.name;
		_article = new Article(articleObj);
		// 新建
		_article.save(function(err,article){
			if(err){
				console.log(err);
			}
			res.redirect('/admin/article/list');
		});

	}
}

// 详情
exports.details = function(req,res){
	var id = req.params.id;
	Article.findById(id,function(err,article){
		if(err){
			console.log(err);
		}

		res.render('articledetail',{
			article:article
		});
	})
}

// 列表
exports.list = function(req,res){
	var articles = Article.fetch(function(err,_articles){
		if(err){
			console.log(err);
		}
		res.render('articlelist',{articles:_articles});
	});
}

// 删除
exports.del = function(req,res){
	var id = req.query.id;
	if(id){
		Article.remove({_id:id},function(err,member){
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		})
	}
}
