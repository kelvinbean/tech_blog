var mongoose = require('mongoose');

exports.index = function(req,res){
	res.render('index',{
		title:'前端技术首页'
	})
};