var Index = require('../app/controllers/index');
var Member = require('../app/controllers/member');

module.exports = function(app){	
	// Index
	app.get('/', Index.index);

	// member
	app.get('/admin/member/add',Member.add);
	app.post('/admin/member',Member.saveImg,Member.save);
	app.get('/member/list',Member.list);
	app.get('/admin/member/update/:id',Member.edit);
	app.get('/admin/member/:id',Member.details);
	app.delete('/admin/member/list',Member.del);

	// article
	
};