$(function(){
	$('.del').click(function(e){
		var target = $(e.target),
			id  = target.data('id'),
			tr = $('.item-id-'+id),
			type = target.data('type'),
			url;

		switch(type){
			case 'member': url = '/admin/member/list?id='+id;break;
			case 'article': url = '/admin/article/list/delete?id='+id;break;
		}

		$.ajax({
			type:'DELETE',
			url:url
		})
		.done(function(results){
			if(results.success === 1){
				if(tr.length > 0){
					tr.remove();
				}
			}
		})
	});
});