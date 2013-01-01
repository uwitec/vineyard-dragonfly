/**# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/*/

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

$("#photo").bind("change",function() {
	$.each(this.files,function(i) {
		var type = this.type ;
		var li = $("#ui-uploader-inProgress-hidden").html();
		$("#uploader_images_list").append(li);
		var options = {
			dataType: 'json',
			url: $("#images_form").attr("action"),
			success: uploadImageSuccess,
			xhr: function() {
				var imageXhr = $.ajaxSettings.xhr();
				if ( imageXhr.upload ) {
					imageXhr.upload.addEventListener("progress",function(e) {
						var done = e.position || e.loaded;
						var total = e.totalSize || e.total ;
						var progressStatus = Math.floor(done/total*1000)/10;
						$("#uploader_images_list span[class='ui-uploader-progress']").last().text(progressStatus + '%');
					});	
				}
				return imageXhr;
			}
		}
		$("#images_form").ajaxSubmit(options);
	});
});

function uploadImageSuccess(json) {
	$("#uploader_images_list li[class='ui-uploader-inProgress']").last().attr("id","uploader_image_li_" + json.id);
	$("#uploader_images_list a[class='ui-uploader-close']").last().bind("click",function() {
		if (confirm("亲，你确定要删除这个图片吗？（不可恢复）")) {
			$("#uploader_image_li_" + json.id).remove();
			var url =  $("#images_form").attr("action") + "/" + json.id ;
			$("#image_destroy_form").attr("action",url);
			var options = {
				dataType: "json",
				success: destroyImageSuccess,
			};
			$("#image_destroy_form").ajaxSubmit(options);
		}
		return false ;
	});
	$("#uploader_images_list span[class='ui-uploader-progress']").last().hide();
	$("#uploader_images_list img").last().attr("src","/system/images/photos/" + json.id + "/original.jpg");
}

function destroyImage(id) {
	if (confirm("亲，你确定要删除这个图片吗？（不可恢复）")) {
		$("#image_destroy_form").attr("action", $("#images_form").attr("action") + "/" + id);
		$("#image_item_li_" + id).remove();
		var options = {
			dataType: "json",
			success: destroyImageSuccess,
		};
		$("#image_destroy_form").ajaxSubmit(options);
	}
	return false ;
}

function destroyImageSuccess(json) {
}
