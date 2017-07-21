 /////////////////////////////////////////////
$(document).ready(function () {
	
	//初始化左侧导航栏
	$('#main-menu').metisMenu();
	
	/*添加click 事件 点击汉堡按钮 收起侧边栏*/
	$("#sideNav").click(function(){
		if($(this).hasClass('closed')){
			$('.navbar-side').animate({left: '0px'});
			$(this).removeClass('closed');
			$('.page-wrapper').animate({'margin-left' : '260px'});
			
		}
		else{
			$(this).addClass('closed');
			$('.navbar-side').animate({left: '-260px'});
			$('.page-wrapper').animate({'margin-left' : '0px'}); 
		}
	});
	
	
});