/*------------------------- 
Cart javascript
-------------------------*/

(function( $ ) {

	"use strict";

    function owcpvPopup() {
        $('.owcpv_edit_cartitem').magnificPopup({
            type: 'ajax',
            ajax: {
                settings: {
                    url: opalwoocu.ajaxurl,
                    method: "POST",
                    // dataType : 'json'
                }
            },
            callbacks: {
                elementParse: function() {
                    this.st.ajax.settings.data = {
                        action : 'owcpv_load_cart_item_field',
                        cart_item_key : this.st.el.attr('data-cart-item-key'),
                        ajax_nonce_parameter : opalwoocu.security_nonce,
                    };
                },
                parseAjax: function (ajaxResponse) { 
                    var data = JSON.parse(ajaxResponse.data);
                    ajaxResponse.data = data.content;

                    this.st.el.attr('data-owcpv_product', JSON.stringify(data.owcpv_product));
                },
                ajaxContentAdded: function(e) {
                    var productData = this.st.el.attr('data-owcpv_product'),
                        cartItemKey = this.st.el.attr('data-cart-item-key');
                    
                    //Init Form Render
                    $.fn.owcpv.init(productData);

                    $('#close-btn').on('click',function(event){
                        event.preventDefault();
                        $.magnificPopup.close();
                    }); 
                    $('#update-cart-btn').on('click',function(event){
                        event.preventDefault();
                        var formEdit = $(this).parents('.owcpv_cart_edit'),
                            formData = formEdit.serialize();
                        formData += "&action=owcpv_update_cart_item_field&cart_item_key="+cartItemKey+"&ajax_nonce_parameter="+opalwoocu.security_nonce;

                        $.ajax({
                            url: opalwoocu.ajaxurl,
                            data: formData,
                            method: "POST",
                            success: function (a) {
                                $("[name='update_cart']").removeAttr('disabled');
                                $("[name='update_cart']").trigger("click");
                                $( document.body ).trigger( 'cart_page_refreshed' );
                                $( document.body ).trigger( 'cart_totals_refreshed' );
                                $( document.body ).trigger( 'wc_fragments_loaded' );
                                $.magnificPopup.close();
                            },
                        });
                    }); 
                },
                open: function() { 
                    
                }
            },

        });
    }; 

    $(document).ready( function() {
        owcpvPopup()
    })
    $(document).on( 'updated_cart_totals', function() {
        owcpvPopup();
    })

})( jQuery );
