/**# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/**/

$(document).ready(function() {
	$('#resource_form').validate();
});

$('#resource_create_button').bind('click',function() {
	if ( validateProductInputs() ) {
		$('#resource_form').submit();
	} else {
		return false;
	}
});

$('#resource_update_button').bind('click',function() {
	if ( validateProductInputs() ) {
		$("#exception_message").empty();
		$("#progress_dialog").dialog({
			height: 180,
			modal: true
		});
		var options = {
			success: updateResourceSucceed,
			dataType: 'json',
			timeout: 3000
		};
		$('#resource_form').ajaxSubmit(options);
	}
	return false ;
});

function validateProductInputs() {
	if ( $("#release_as_product").attr("checked") ) {
		if (! /^[1-9]\d*$/.test($("#product_price").val())) {
			$("#product_price").val('');
			$("#product_price").focus();
			return false;
		}
		if ( $("#experation_datepicker").val() == null || 
				$("#experation_datepicker").val().trim() == "" ) {
			$("#experation_datepicker").attr("readonly",true);
			$("#experation_datepicker").focus();
			return false;
		}
	}
	return true ;
}

function updateResourceSucceed(json,status,XMLHttpRequest) {
	if (status == 'success') {
		var pids = json[1];
		if ( pids.length > 0 ) {
			var label = "<label style='color: red; font-weight: bold;'>已经做为产品发布了，如需更新产品，请点击<a href=/products/" + pids[0] + "/edit>这里</a></label>";
			$("#release_as_product").attr("checked",false);
			$("#release_as_product_div").html(label);
			$("#product_inputs").hide();
		}
		$("#progress_dialog").dialog("destroy");
	} else {
		$("#exception_message").html("非常抱歉，服务正忙，请稍后再试！");
	}
}

$("#release_as_product").bind("click", function() {
	if ( this.checked ) {
		$("#product_inputs").show();
	} else {
		$("#product_inputs").hide();
	}
});

$("#check_all_resources").bind("click",function() {
	checkAllResources();
});

function checkAllResources() {
	if ( $("#check_all_resources").attr("checked") ) {
		$(":input[name=resource_check_box]").attr("checked",true);
	} else {
		$(":input[name=resource_check_box]").attr("checked",false);
	}
}

$(":input[name=resource_check_box]").bind("click",function() {
	checkResources(this);
});

function checkResources(product) {
	if ( product.checked ) {
		var all_checked = true ;
		if ( $(":input[name=resource_check_box]").length - $(":input[name=resource_check_box]:checked").length > 0 ) {
			all_checked = false;
		}
		if ( all_checked ) {
			$("#check_all_resources").attr("checked",true);
		} else {
			$("#check_all_resources").attr("checked",false);
		}
	} else {
		$("#check_all_resources").attr("checked",false);
	}
}

$("#delete_checked_resources").bind("click",function() {
	var checkedResources = $(":input[name=resource_check_box]:checked");
	if ( checkedResources.length == 0 ) {
		return false;
	} else {
		var doubleConfirm = confirm("亲，您确定要删除所选记录吗？");
		if ( doubleConfirm ) {
			var i = 0 ;
			var ids = '';
			checkedResources.each(function() {
				if ( i ++ < checkedResources.length - 1 ) {
					ids += this.value + ",";
				} else {
					ids += this.value ;
				}
			});
			$(":input#ids").attr("value",ids);
			$("#delete_checked_resources_form").submit();
		} else {
			return false;
		}
	}

});

$(".delete_resource_link").bind("click",function() {
	if ( confirm("亲，你确定要彻底删除此宝贝吗？")) {
		var id = "#delete_resource_form_" + this.name ;
		$(id).submit();
	}
});



$("#white_wine").bind("click",function() {
	clearWineContext();
	$("#white_wine").toggleClass("tb-selected");	
	if ( $("li[id='white_wine'][class='wine-type tb-selected']").length > 0 ) {
		setUpWhiteWineContext();
	} else {
		tearDownWhiteWineContext();
	}
});

function setUpWhiteWineContext() {
	$("li[class='wine-type tb-selected'][id!='white_wine']").each(function() {
		$(this).removeClass("tb-selected");
	});
	$(".sub-wine-items[id!='sub-white-wine-items']").each(function() {
		$(this).hide();
	});
	$(".grape-breed-ul[id!='white-wine-grape-breed']").each(function() {
		$(this).hide();
	});
	$("#sub-white-wine-items").show();
	$("#white-wine-grape-breed").show();
}

function tearDownWhiteWineContext() {
	$("#sub-white-wine-items").hide();
	$("#white-wine-grape-breed").hide();
	$("#no-wine-type-selected").show();
}

$(".sub-red-wine-item").bind("click",function() {
	$("li[class='sub-red-wine-item tb-selected']").each(function() {
		$(this).removeClass("tb-selected");
	});
	$(this).toggleClass("tb-selected");
	var type = $(this).find("a").text() + " " + $("li[id='red_wine'][class='wine-type tb-selected']").find("a").text();
	$("#resource_category").val(type);
});

$(".sub-white-wine-item").bind("click",function() {
	$(".sub-white-wine-item").each(function() {
		$(this).removeClass("tb-selected");
	});
	$(this).toggleClass("tb-selected");
	var type = $(this).find("a").text() + " " + $("li[id='white_wine'][class='wine-type tb-selected']").find("a").text();
	$("#resource_category").val(type);
});

$(".grape-breed").bind("mouseover",function() {
	$("#" + $(this).attr('name') + "-desc").show();
});

$(".grape-breed").bind("mouseout",function() {
	$("#" + $(this).attr('name') + "-desc").hide();
});

$(".grape-breed").bind("click",function() {
	$(this).toggleClass("tb-selected");
	var breed = '';
	$("li[class='grape-breed tb-selected']").each(function() {
		breed += $(this).find("a").text() + " ";
	}); 
	$("#resource_breed").val(breed);
});


