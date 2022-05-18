jQuery(document).ready(function($) {
	function generate_booking_info_text(from, to, cost){
		if( from !== to ){
			date_html = "<b>"+phive_booking_ajax.booking_date+":</b>&nbsp;"+from+"&nbsp;to&nbsp;"+to;
		}else{
			date_html = "<b>"+phive_booking_ajax.booking_date+":</b>&nbsp;"+from;
		}
		$('.booking-info-wraper').html('<p id="booking_info_text">'+date_html+'</p> <p id="booking_price_text"> '+phive_booking_ajax.booking_cost+':&nbsp;'+cost+'</p>');
	}

	/*function formate_date( input_date ){
		var date = new Date( input_date.replace(/-/g, "/") ); //Safari bowser will accept only with seprator '/'

		var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
		var strDate = date.getDate() + '-' + month + '-' + date.getFullYear();
		return strDate;
	}*/

	$( ".ph-date-to " ).on('change', function(){
			calculate_booking_price();
	});
	$(".addon").on('change',function(){
		from 	= jQuery( ".ph-date-from" ).val();
		if(from != '' ){
			calculate_booking_price();
		}
	});
	function calculate_booking_price(){
		from = jQuery( ".ph-date-from" ).val();
		to = jQuery( ".ph-date-to" ).val();
		
		loding_ico_url = $("#plugin_dir_url").val()+ "includes/booking-callender/icons/loading.gif";
		$(".booking-info-wraper").html('<img class="loading-ico" align="middle" src="'+loding_ico_url+'">');
		$(".single_add_to_cart_button").addClass("disabled");
		
		product_id = jQuery( "#phive_product_id" ).val();

		if( from.length === 0 || to.length === 0){
			return;
		}
		addon_data = jQuery('.addon').serialize();
		var data = {
			action: 'phive_get_booked_price',
			// security : phive_booking_ajax.security,
			product_id: product_id,
			book_from: from,
			book_to: to,
			addon_data:addon_data,
		};

		$.post( phive_booking_ajax.ajaxurl, data, function(res) {
			result = jQuery.parseJSON(res);
			// $(".price").html( result.price_html ); //to change the main product price

			$("#phive_booked_price").val(result.price);
			$(".single_add_to_cart_button").removeClass("disabled");
			$(".callender-error-msg").html('');

			/*//in the case of monthpicker, take last date of 'TO' month
			if( (to.match(new RegExp("-", "g")) || []).length < 2 ){
				var date = new Date( to.replace(/-/g, "/") ); //Safari bowser will accept only with seprator '/'
				var LastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				to = to+"-"+LastDay.getDate();
			}*/
			generate_booking_info_text( result.from_date, result.to_date, result.price_html );
			// generate_booking_info_text( from, to, result.price_html );
		});
	};

	$('.time-picker-wraper #ph-calendar-days').on("click", ".ph-calendar-date", function(){
		loding_ico_url = $("#plugin_dir_url").val()+ "includes/booking-callender/icons/loading.gif";
		$("#ph-calendar-time").html('<img class="loading-ico" align="middle" src="'+loding_ico_url+'">');
		product_id = jQuery( "#phive_product_id" ).val();
		
		var data = {
			action: 'phive_get_booked_datas_of_date',
			product_id: product_id,
			date: $('.timepicker-selected-date .callender-full-date').val(),
			type: 'time-picker',
		};
		$.post( phive_booking_ajax.ajaxurl, data, function(res) {
			$("#ph-calendar-time").html(res);
			$(this).addClass("timepicker-selected-date");
		});
	})
	

});