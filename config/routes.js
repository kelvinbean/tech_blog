var Index = require('../app/controllers/index');
var Member = require('../app/controllers/member');
var Article = require('../app/controllers/article');

module.exports = function(app){	
	// pre handle user
	app.use(function(req, res, next) {
		console.log(req.session);
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});	

	// Index
	app.get('/', Index.index);
	app.get('/admin',Index.admin);

	// member
	app.get('/admin/member',Member.signinRequired,Member.add);
	app.post('/admin/member/add',Member.signinRequired,Member.saveImg,Member.save);
	app.get('/member/list',Member.signinRequired,Member.list);
	app.get('/admin/member/update/:id',Member.signinRequired,Member.edit);
	app.get('/admin/member/:id',Member.details);
	app.delete('/admin/member/list',Member.signinRequired,Member.del);

	app.post('/admin/member/signin',Member.signin);
	app.get('/logout',Member.logout);

	// article
	app.get('/admin/article',Member.signinRequired,Article.toadd);
	app.post('/admin/article/add',Member.signinRequired,Article.saveImg,Article.save);
	app.get('/admin/article/update/:id',Member.signinRequired,Article.toedit);
	app.get('/admin/article/list',Member.signinRequired,Article.list);
	app.delete('/admin/article/list/delete',Member.signinRequired,Article.del);
	app.get('/article/:id',Article.details);
};