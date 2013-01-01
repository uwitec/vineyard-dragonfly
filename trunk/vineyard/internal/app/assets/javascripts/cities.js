/**
# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
*/
function checkAllCities() {
	if ($("#check_all_cities").attr("checked")) {
		$(":input[name=city_check_box]").attr("checked",true);
	} else {
		$(":input[name=city_check_box]").attr("checked",false);
	}
}

$('#check_all_cities').bind('click',function() {
	checkAllCities();
});

function checkCities(city) {
	if ( city.checked ) {
		var all_checked = true ;
		$(":input[name=city_check_box]").each(function() {
			if ( ! this.checked ) {
				$("#check_all_cities").attr("checked",false);
				all_checked = false ;
			}
		});
		if ( all_checked ) {
			$("#check_all_cities").attr("checked",true);
		}
	} else {
		$("#check_all_cities").attr("checked",false);
	}
}

$(":input[name=city_check_box]").bind('click',function() {
	checkCities(this);
});

$('#open_checked_cities').bind('click',function() {
	var closedCities = $(":input[name=city_check_box][class=close]:checked");
	if ( closedCities.length == 0 ) {
		return false ;
	} else {
		var i = 0 ;
		var ids = '';
		closedCities.each(function() {
			if ( i ++ < closedCities.length - 1 ) {
				ids += this.value + ",";	
			} else {
				ids += this.value;	
			}
		});
		$(":input#open_ids").attr("value",ids);
		$("#open_checked_cities_form").submit();
	}
});

$('#close_checked_cities').bind('click',function() {
	var openCities = $(":input[name=city_check_box][class=open]:checked");
	if ( openCities.length == 0 ) {
		return false ;
	} else {
		var i = 0 ;
		var ids = '';
		openCities.each(function() {
			if ( i ++ < openCities.length - 1 ) {
				ids += this.value + ",";	
			} else {
				ids += this.value;	
			}
		});
		$(":input#close_ids").attr("value",ids);
		$("#close_checked_cities_form").submit();
	}
});

$('#delete_checked_cities').bind('click',function() {
	var checkedCities = $(":input[name=city_check_box]:checked");
	if ( checkedCities.length == 0 ) {
		return false ;
	} else {
		var doubleConfirm = confirm("确定要删除所选记录吗？");
		if ( doubleConfirm ) {
			var i = 0 ;
			var ids = '';
			checkedCities.each(function() {
				if ( i ++ < checkedCities.length - 1 ) {
					ids += this.value + ",";	
				} else {
					ids += this.value;	
				}
			});
			$(":input#ids").attr("value",ids);
			$("#delete_checked_cities_form").submit();
		} else {
			return false ;
		}
	}
});

$(".delete_city_link").bind("click",function() {
	if ( confirm("亲，你确定要彻底删除此该城市业务吗？")) {
		var id = "#delete_city_form_" + this.name ;
		$(id).submit();
	}
});
