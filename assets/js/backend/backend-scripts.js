jQuery( function( $ ) {

    $(document).ready(function($) {
		// Setting page
		$( '.owcpv_wrap_settings .owcpv_g_set_tabs li a' ).on( 'click', function(e) {
			// e.preventDefault();
			$( '.owcpv_wrap_settings .owcpv_g_set_tabs li a' ).removeClass('active');
			$(this).addClass('active');
			$('.owcpv_tabcontent').hide();
			$($(this).attr('href')).show();
		})
		
		$('#owcpv_submit_settings').on('click', function(e) {
			e.preventDefault();
			$(this).addClass('loading');

			var data = {};
			data['action'] = 'owcpv_handle_settings_form';
			data['ajax_nonce_parameter'] = opaladmin.security_nonce;
			$('.owcpv_g_set_tabcontents .owcpv_setting_field').each(function() {
				if ($(this).attr('type') == 'checkbox' && !$(this).is(":checked")) {
					data[$(this).attr('name')] = 0;	
				}
				else {
					data[$(this).attr('name')] = $(this).val();
				}
			});

			$.ajax({ 
				url: opaladmin.ajaxurl,
				type: "post", 
				dataType: 'json', 
				data: data, 
				success: function(data) { 
					$.toast({
						heading: 'Success',
						text: data.data.message,
						showHideTransition: 'slide',
						icon: 'success',
						position: 'top-right',
						hideAfter: 6000
					})
					
				}, 
				error: function() { 
					alert("An error occured, please try again.");          
				} 
			});   
		})


        var overSidebar = $('.owcpv_overflow_sidebar');
        $("#owcpv-settings-form, .owcpv_overflow_sidebar").click(function(e) {
            e.preventDefault();
            overSidebar.toggleClass("show-sidebar");
        });

        // Toggle open meta sidebar
        $('.owcpv_overflow_sidebar + #side-sortables .handle-order-higher, .owcpv_overflow_sidebar + #side-sortables .handle-order-lower').remove();
        $('.owcpv_overflow_sidebar + #side-sortables .postbox:not(#submitdiv, #product_catdiv, #owcpv_display_settings)').addClass('closed');
        $('.owcpv_overflow_sidebar + #side-sortables .postbox .postbox-header').on('click', function(e) {
            e.preventDefault();
            $(this).parents('.postbox').toggleClass('closed');
        });

        // Load multiple select product with AJAX search
		if ($('#owcpv_form_product').length > 0) {
			$('#owcpv_form_product').select2({
				ajax: {
					url: opaladmin.ajaxurl,
					dataType: 'json',
					delay: 250,
					data: function (params) {
						return {
							q: params.term, // search query
							ajax_nonce_parameter: opaladmin.security_nonce,
							action: 'owcpv_load_product_meta_box'
						};
					},
					processResults: function( data ) {
						var options = [];
						if ( data ) {
							$.each( data, function( index, text ) {
								options.push( { id: text[0], text: text[1]  } );
							});
						}
						return {
							results: options
						};
					},
					cache: true
				},
				minimumInputLength: 1
			});

			$('#owcpv_form_product').on('select2:unselecting', function (e) {
				var productID = e.params.args.data.id,
					formID = $('#post_ID').val();

				$.ajax({
					type : "post",
					dataType : "json",
					url : opaladmin.ajaxurl,
					data : {
						'action': 'owcpv_remove_product_of_form',
						'ajax_nonce_parameter': opaladmin.security_nonce,
						'product_id': productID,
						'form_id': formID,
					},
					beforeSend: function(){
					},
					success: function(response) {
					},
				})
			});
		}

        // $( '#owcpv-open-import-form' ).on( 'click', function() {
		// 	$('#owcpv-form-import').slideToggle();
	  	// })

		if ($( '#owcpv-open-import-form' ).length) {
        	$( '#owcpv-open-import-form' ).magnificPopup();
		}

		$('.owcpv_setting_field').on('change', function() {
			var name = $(this).attr('name'),
				fieldCondition = $('.owcpv_group_settings_mt[data-condition="'+name+'"]');
			if (fieldCondition.length) {
				fieldCondition.each(function() {
					if ($(this).hasClass('toggle_hidden')) {
						$(this).toggleClass('owcpv_hidden');
					}
					else {
						$(this).toggleClass('setting_hidden');
					}
				})
			}
		});

		$('.toggle_active_form .owpcv_toggle_input').on('change', function() {
			var id = $(this).data('id'),
				checked = $(this).is(":checked");

			$.ajax({
				type : "post",
				dataType : "json",
				url : opaladmin.ajaxurl,
				data : {
					'action': 'owcpv_update_status_form',
					'ajax_nonce_parameter': opaladmin.security_nonce,
					'form_id': id,
					'checked': checked,
				},
				beforeSend: function(){
				},
				success: function(data) {
					var heading = (data.status == 'success') ? 'Success' : 'Warning',
						icon = (data.status == 'success') ? 'success' : 'warning';
					$.toast({
						heading: heading,
						text: data.message,
						showHideTransition: 'slide',
						icon: icon,
						position: 'top-right',
						hideAfter: 6000
					})
				},
			})
		});
		// toggle_active_form

		// Single Product Tab
		sortableSelectedForm();
		$('.owcpv_form_select').on('change', function() {
	        var names = [];
	        $('input.owcpv_form_select:checked').each(function() {
	            names.push($(this).val());
	        });
	        
	        var checked = $(this).is(':checked'),
	            form = $(this).val(),
	            label = $(this).closest('.owcpv_form').find('> label').text(),
	            listSelected = $('.opal-list-selected-form');
	        	
	        if(checked && listSelected.find('li[data-id="'+form+'"]').length < 1) {
	            listSelected.append('<li class="sort" data-id="'+form+'"><div class="handle_sort">'+label+'</div></li>');
	        }
	        if(!checked && listSelected.find('li[data-id="'+form+'"]').length) {
	            listSelected.find('li[data-id="'+form+'"]').remove();
	        }

	        sortableSelectedForm();
	    });

    });

	function sortableSelectedForm() {
		var listSelected = $( '.opal-list-selected-form' );
		if (listSelected.find( '> li.sort' ).length > 1) {
			if (listSelected.hasClass('ui-sortable')) {
				listSelected.sortable( "refresh" );
			}
			else {
				listSelected.sortable( {
					items: 'li.sort',
					cursor: 'move',
					axis: 'y',
					handle: '.handle_sort',
					scrollSensitivity: 40,
					forcePlaceholderSize: true,
					helper: 'clone',
					opacity: 0.65,
					start: function ( event, ui ) {
						// ui.item.css( 'background-color', '#f6f6f6' );
					},
					stop: function ( event, ui ) {
						// ui.item.removeAttr( 'style' );
					},
					update: function () {
						var form_ids = '';

						listSelected.find( '> li.sort' )
							.each( function (i) {
								var form = $( this ).attr( 'data-id' );
								form_ids = form_ids + form;
								if (i+1 < listSelected.find( '> li.sort' ).length) {
									form_ids += ',';
								}
							} );

						$('#opal-sort-form-value').val( form_ids );
					},
				} );
			}
		}
		else {
			if (listSelected.hasClass('ui-sortable')) {
				listSelected.sortable( "destroy" );
			}
		}

		if (listSelected.find( '> li.sort' ).length > 0) {
			listSelected.removeClass('owcpv_hidden');
			$('.opal-no-form').addClass('owcpv_hidden');
		}
		else {
			listSelected.addClass('owcpv_hidden');
			$('.opal-no-form').removeClass('owcpv_hidden');
		}
	}

});