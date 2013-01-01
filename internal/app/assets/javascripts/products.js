/**# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/*/

$(document).ready(function() {
	$('#product_form').validate();
	$("#product_eidt_form").validate();
	$('#product_form').ajaxForm();
	$("#product_eidt_form").ajaxForm();
	$("#expiration").datepicker({
		showOn: "button",
		buttonImage: "/assets/calendar.gif",
		buttonImageOnly: true,
		minDate: 0,
		maxDate: "+5Y",
		changeMonth: true,
		changeYear: true,
		dateFormat: "mm/dd/yy"
	});
	$("#edit_expiration").datepicker({
		showOn: "button",
		buttonImage: "/assets/calendar.gif",
		buttonImageOnly: true,
		minDate: 0,
		maxDate: "+5Y",
		changeMonth: true,
		changeYear: true,
		dateFormat: "mm/dd/yy"
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
		var id = "#delete_product_form_" + this.name ;
		$(id).submit();
	}
});

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
}

$("#product_form").submit(function() {
	if ( $("#product_form").valid() ) {
		var options = {
			dataType: "json",
			success: createProductSuccess
		}
		$('#product_form').ajaxSubmit(options);
	}
	return false;
});

function createProductSuccess(json) {
	if ( json != null ) {
		$("#product_dialog").dialog("destroy");
	}
}

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
}

