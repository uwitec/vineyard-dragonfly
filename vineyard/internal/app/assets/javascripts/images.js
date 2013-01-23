/**# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/*/
/*
$(".images_dialog_button").bind("click",function() {
	var url = "/resources/" + $(this).attr("name") + "/images";
	$("#images_form").attr("action",url);
	$.getJSON(url,function(json) { openImagesDialog(json) });
	return false;
});

function openImagesDialog(json) {
	if ( null != json ) {
		$("#images_dialog").dialog({
			modal: true,
			resizable: false,
			width: '610px'
		});
	}
}
*/
$(document).ready(function() {
	$("#image_destroy_form").ajaxForm();
});

$("#image_upload").bind("change",function() {
	$.each(this.files,function(i) {
		var type = this.type ;
		var li = $("#ui-uploader-inProgress-hidden").html();
		$("#uploader_images_list").append(li);
		var options = {
			dataType: 'json',
			success: uploadImageSuccess,
			xhr: function() {
				var imageXhr = $.ajaxSettings.xhr();
				if ( imageXhr.upload ) {
					imageXhr.upload.addEventListener("progress",function(e) {
						var done = e.position || e.loaded;
						var total = e.totalSize || e.total ;
						var progressStatus = Math.floor(done/total*1000)/10;
						$("#uploader_images_list span").last().text(progressStatus + '%');
					});	
				}
				return imageXhr;
			}
		}
		$("#images_form").ajaxSubmit(options);
	});
});

function uploadImageSuccess(json) {
	$("#uploader_images_list span").last().hide();
	var image = $("#uploader_images_list img").last();
	image.attr("src",json.url);
	image.show();
	var link = $("#uploader_images_list a").last();
	link.attr("name",json.product_id + "::" + json.id);
	link.bind("click",function() {
		var array = $(this).attr("name").split("::");
		var url = "/products/" + array[0] + "/images/" + array[1];
		$("#image_destroy_form").attr("action",url);
		$(this).parent().parent().remove();
		var options = {
			dataType: 'json',
			success: destroyImageSuccess
		}
		$("#image_destroy_form").ajaxSubmit(options);
		return false;
	});
	link.show();
}

$(".image_destroy_link").bind("click",function() {
	var array = $(this).attr("name").split("::");
	var url = "/products/" + array[0] + "/images/" + array[1];
	$("#image_destroy_form").attr("action",url);
	$(this).parent().parent().remove();
	var options = {
		dataType: 'json',
		success: destroyImageSuccess
	}
	$("#image_destroy_form").ajaxSubmit(options);
	return false;
});

function destroyImageSuccess(json) {
	if ( json.result == 0 ) {
		// destroy image succeed
	}
}
