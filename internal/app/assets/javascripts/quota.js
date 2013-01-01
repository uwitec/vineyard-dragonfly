/*
 *# Place all the behaviors and hooks related to the matching controller here.
 *# All this logic will automatically be available in application.js.
 *# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
*/

$(document).ready(function() {
	$("#quota_form").validate();
	$("#quota_edit_form").validate();
	$("#quota_form").ajaxForm();
	$("#quota_edit_form").ajaxForm();
});

$("#all_unquota_cities_go").bind("click",function() {
	$("#open_cities_select option[class='yellow']").appendTo("#quota_cities_select");
	return false ;
});

$("#selected_unquota_cities_go").bind("click",function() {
	$("#open_cities_select option[class='yellow']:selected").appendTo("#quota_cities_select");
	return false ;
});

$("#all_unquota_cities_back").bind("click",function() {
	$("#quota_cities_select option[class='yellow']").appendTo("#open_cities_select");
	return false ;
});

$("#selected_unquota_cities_back").bind("click",function() {
	$("#quota_cities_select option[class='yellow']:selected").appendTo("#open_cities_select");
	return false ;
});

$('.quota_dialog_button').bind("click",function() {
	var url = "/resources/" + $(this).attr("name") + "/quota";
	$("#quota_form").attr("action",url);
	$.getJSON(url,function(json) { openQuotaDialog(json)});
	return false;
});

function openQuotaDialog(json) {
	if ( null != json ) {
		updateOpenCitiesSelect(json);
		$("#quota_dialog").dialog({
			modal:true, 
			resizable:false, 
			width:'530px'
		}); 
	} 
}

$("#quota_form").submit(function() {
	if ( !validateSelectedCities()) {
		$("#open_cities_select").focus();
		return false;
	}
	var options = {
		dataType: "json",
		success: createQuotaSuccess
	};
	if ( $("#quota_form").valid()) {
		$("#quota_form").ajaxSubmit(options);
	}
	return false;
});

function validateSelectedCities() {
	$("#quota_cities_select option").attr("selected",true);
	if ( $("#quota_cities_select option").length > 0 ) {
		return true ;
	}
	return false ;
}

function createQuotaSuccess(json) {
	updateOpenCitiesSelect(json);
	$("#quantity").attr("value",null);
}

$("#quota_edit_form").submit(function() {
	if ( $("#quota_edit_form").valid() ) {
		var options = {
			dataType: 'json',
			success: editQuotaSuccess
		};
		$("#quota_edit_form").ajaxSubmit(options);
	}	
	return false;
});


function editQuotaSuccess(json) {
	updateOpenCitiesSelect(json);
	$("#quota_edit_dialog").dialog("destroy");
}

$("#destroy_quota_button").bind("click",function() {
	if (confirm("亲，你确定要删除此配额属性吗？（不可恢复）")) {
		$("#quota_destroy_form").attr("action",$("#quota_edit_form").attr("action"));
		var options = {
			dataType: "json",
			success: destroyQuotaSuccess,
		};
		$("#quota_destroy_form").ajaxSubmit(options);
	}
	return false;
});

function destroyQuotaSuccess(json) {
	updateOpenCitiesSelect(json);
	$("#quota_edit_dialog").dialog("destroy");
}

function updateOpenCitiesSelect(json) {
	$("#quota_cities_select option").remove();
	$("#open_cities_select option").remove();
	$.each(json,function() {
		var option ;
		if ( null != this.quantity ) {
			option = "<option class='green' value='" + this.id + "'>" + this.name + " (" + this.quantity + ")</option>";
		} else {
			option = "<option class='yellow' value='" + this.id + "'>" + this.name + "</option>";
		}
		$("#open_cities_select").append(option);
	});
	$("#open_cities_select option[class='green']").bind("dblclick", function() {
		var quota =  $("#quota_form").attr("action");
		//Note: this.value == city.id
		var url = quota + "/" + this.value + "/edit";
		$.getJSON(url,function(json) {
			editQuotaDialog(json);
		});
		return false ;
	});
}

function editQuotaDialog(json) {
	if ( null != json ) {
		$.each(json,function() {
			setupQuotaProperties(this)
		});
		$("#quota_edit_dialog").dialog({
			modal:true, 
			resizable:false, 
			width:'300px'
		}); 
	} 
}

function setupQuotaProperties(json) {
	var quota =  $("#quota_form").attr("action");
	$("#quota_edit_form").attr("action", quota + "/" + json.id);
	$("#city_name").html(json.name);
	$("#edit_quantity").attr("value",json.quantity);
}


