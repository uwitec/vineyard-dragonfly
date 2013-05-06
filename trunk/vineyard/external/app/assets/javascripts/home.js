$("a.more_login").bind('mouseover',function(){
	$("a.more_login").addClass("more_login_active");
	$("#show_more_login").show();
});

$("a.more_login").bind('mouseout',function(){
	$("a.more_login").removeClass("more_login_active");
	$("#show_more_login").hide();
});

$("ul#show_more_login").bind('mouseover',function() {
	$("#show_more_login").show();
});

$("ul#show_more_login").bind('mouseout',function() {
	$("#show_more_login").hide();
});


$(".top_slide .top_slide_desc li:nth-child(1)").bind('mouseover',function() {
	$(".top_slide .top_slide_img li").hide();
	$(".top_slide .top_slide_img li:nth-child(1)").show();
	$(".top_slide .top_slide_desc li").removeClass("light");
	$(".top_slide .top_slide_desc li:nth-child(1)").addClass("light");
});

$(".top_slide .top_slide_desc li:nth-child(2)").bind('mouseover',function() {
	$(".top_slide .top_slide_img li").hide();
	$(".top_slide .top_slide_img li:nth-child(2)").show();
	$(".top_slide .top_slide_desc li").removeClass("light");
	$(".top_slide .top_slide_desc li:nth-child(2)").addClass("light");
});

$(".top_slide .top_slide_desc li:nth-child(3)").bind('mouseover',function() {
	$(".top_slide .top_slide_img li").hide();
	$(".top_slide .top_slide_img li:nth-child(3)").show();
	$(".top_slide .top_slide_desc li").removeClass("light");
	$(".top_slide .top_slide_desc li:nth-child(3)").addClass("light");
});

$(".top_slide .top_slide_desc li:nth-child(4)").bind('mouseover',function() {
	$(".top_slide .top_slide_img li").hide();
	$(".top_slide .top_slide_img li:nth-child(4)").show();
	$(".top_slide .top_slide_desc li").removeClass("light");
	$(".top_slide .top_slide_desc li:nth-child(4)").addClass("light");
});

