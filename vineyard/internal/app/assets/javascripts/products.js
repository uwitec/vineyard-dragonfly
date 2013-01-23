/**# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/*/

$(document).ready(function() {
	$('#product_form').validate();
	$('#product_form').ajaxForm();
	$('#product_edit_form').validate();
	$('.jqzoom').jqzoom({
		zoomType: 'reverse',
		lens:true,
		preloadImages: false,
		alwaysOn:false,
		zoomWidth: 220,
		zoomHeight: 360
	});	
	$(".lazy").lazyload({
		effect: "fadeIn"
	});
});

$("#check_all_products").bind("click", function() {
	checkAllProdects();
});

function checkAllProdects() {
	if ( $("#check_all_products").attr("checked") ) {
		$(":input[name=product_check_box]").attr("checked",true);
	} else {
		$(":input[name=product_check_box]").attr("checked",false);
	}
}

$(":input[name=product_check_box]").bind("click",function() {
	checkProducts(this);
});

function checkProducts(product) {
	if ( product.checked ) {
		var all_checked = true ;
		$(":input[name=product_check_box]").each(function() {
			if ( ! this.checked ) {
				$("#check_all_products").attr("checked",false)
				all_checked = false;
			}
		});
		if ( all_checked ) {
			$("#check_all_products").attr("checked",true)
		}
	} else {
		$("#check_all_products").attr("checked",false)
	}
}

$("#delete_checked_products").bind("click",function() {
	var checkedProducts = $(":input[name=product_check_box]:checked");
	if ( checkedProducts.length == 0 ) {
		return false ;
	} else {
		var doubleConfirm = confirm("亲，您确定要删除所选记录吗？");
		if ( doubleConfirm ) {
			var i = 0 ;
			var ids = '';
			checkedProducts.each(function() {
				if ( i ++ < checkedProducts.length - 1 ) {
					ids += this.value + ",";
				} else {
					ids += this.value ;
				}
			});
			$(":input#ids").attr("value", ids);
			$("#delete_checked_products_form").submit();
		} else {
			return false ;
		}
	}
});

$(".delete_product_link").bind("click",function() {
	if ( confirm("亲，你确定要彻底删除此产品吗？")) {
		var id = $(this).attr("name");
		$("#delete_product_form").attr("action","/products/" + id);
		$("#delete_product_form").submit();
	}
});

/*
$(".product_dialog_button").bind("click",function() {
	var url = $("#product_form").attr("action") + "/new" ;
	var rid = $(this).attr("name");
	$("#rid").val(rid);
	$.getJSON(url,{'rid' : rid},function(json) { openProductDialog(json,rid) });
	return false;
});

function openProductDialog(json,rid) {
	if ( json[0].id == null ) {
		$("#name").val($("#resource_name_" + rid).text());
		$("#price").val('');
		$("#expiration").val('');
		$("#product_dialog").dialog({
			modal:true,
			resizable:false, 
			width:'420px'
		});	
	} else {
		$("#product_eidt_form").attr("action", "/products/" + json[0].id );
		$("#edit_name").val(json[0].name);
		$("#edit_price").val(json[0].price);
		$("#edit_expiration").val(json[1]);
		$("#product_edit_dialog").dialog({
			modal:true,
			resizable:false, 
			width:'420px'
		});	
	}
}*/

$("#product_form").submit(function() {
	if ( $("#product_form").valid() ) {
		var options = {
			dataType: "json",
			success: createProductSuccess,
			async: false
		}
		$('#product_form').ajaxSubmit(options);
	}
	return false;
});

function createProductSuccess(json) {
	if ( json != null ) {
		var url = "/products/" + json.id + "/images";
		$("#upload_images_link").attr("href",url);
		$("#next_action").dialog({
			modal:true,
			resizable:false, 
			width:'420px'
		});
	}
}

/*
$("#product_eidt_form").submit(function() {
	if ( $("#product_eidt_form").valid() ) {
		var options = {
			type: "put",
			dataType: "json",
			success: updateProductSuccess
		}
		$("#product_eidt_form").ajaxSubmit(options);
	}
	return false;
});

function updateProductSuccess(json) {
	if ( json != null ) {
		$("#product_edit_dialog").dialog("destroy");
	}
}
*/

/*
$("#destroy_product_button").bind("click",function() {
	if ( confirm("亲，你确定要彻底删除此产品吗？")) {
		$("#product_destroy_form").attr("action",$("#product_eidt_form").attr("action"))
		var options = {
			type: "delete",
			dataType: "json",
			success: destroyProductSuccess
		};
		$("#product_destroy_form").ajaxSubmit(options);
	}
	return false;
});

function destroyProductSuccess(json) {
	if ( json == 0 ) {
		$("#product_edit_dialog").dialog("destroy");
	}
}*/

//merger from original resource.js
$(".category").bind("click",function() {	
	var id = $(this).attr("id");
	clearContext(id);
	$(this).toggleClass("tb-selected");
	setUpContext(id);	
	$("#product_category").attr("value",$(this).find("a").text());	
});

function clearContext(id) {
	$("#product_category").val("");	
	$("#product_sub_category").val("");
	$("li[class='sub_category tb-selected']").each(function() {
		$(this).removeClass("tb-selected");
	});
	$("li[class='category tb-selected']").each(function() {
		$(this).removeClass("tb-selected");
	});
}

function setUpContext(id) {
	selector = ".sub-wine-items[id!='" + id + "_sub_items']";
	$(selector).each(function() {
		$(this).hide();
	});
	selector = "#" + id + "_sub_items";
	$(selector).show();
}

$(".sub_category").bind("click",function() {
	$("li[class='sub_category tb-selected']").each(function() {
		$(this).removeClass("tb-selected");
	});
	$(this).toggleClass("tb-selected");
	$("#product_sub_category").val($(this).find("a").text());
});

$(".contry").bind("click", function() {
	$("li[class='contry tb-selected']").each(function() {
		$(this).removeClass("tb-selected");
	});
	$(this).toggleClass("tb-selected");
	$("#product_orign_country").val($(this).find("a").text());
});
