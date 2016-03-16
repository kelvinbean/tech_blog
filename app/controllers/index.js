var mongoose = require('mongoose');
var Article = require('../models/article');

exports.index = function(req,res){
	Article.find({'display':'1'},function(err,articles){
		if(err){
			console.log(err);
		}
		res.render('index',{
			articles:articles
		});

	})
};

exports.admin = function(req,res){
	res.render('admin');
}