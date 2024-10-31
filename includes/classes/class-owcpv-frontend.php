<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;
if ( ! class_exists( 'OWCPV_Frontend' ) ) :

	/**
	 * Main OWCPV_Frontend Class.
	 *
	 * @package		OWCPV
	 * @subpackage	Classes/OWCPV_Frontend
	 * @since		1.0.0
	 * @author		Opal
	 */
	final class OWCPV_Frontend {

        /**
         * List Custom Field Of Product
         *
         * @var array
         */
        private static $list_fields;

        public function __construct() {

            $render_hook = (owcpv_get_option('catalog_mode')) ? owcpv_get_option('render_position_catalog') : owcpv_get_option('render_position');
            if (!$render_hook) {
                $render_hook = 'woocommerce_before_add_to_cart_button-100';
            }
            $options = explode( '-', $render_hook ) ;

            $hook_action = isset($options[0]) ? $options[0] : 'woocommerce_before_add_to_cart_button';
            $prioty = isset($options[1]) ? $options[1] : 100;

            $render_prioty = owcpv_get_option('render_position_prioty');
            if ($render_prioty && $render_prioty != '') {
                $prioty = $render_prioty;
            }

            add_action( $hook_action, [$this, 'owcpv_add_frontend_field'], absint($prioty) ); 

            add_filter('woocommerce_get_cart_item_from_session', array($this, 'owcpv_cart_item_from_session'), 10, 1);
            add_action('woocommerce_before_calculate_totals', [$this, 'owcpv_calculate_custom_field_price']);
            add_action('woocommerce_after_cart_item_name', [$this, 'owcpv_add_edit_form_in_cart'], 10, 2);
            add_filter('woocommerce_add_to_cart_validation', [$this, 'owcpv_custom_validate_field'], 10, 5);
            add_filter('woocommerce_add_cart_item_data', [$this, 'owcpv_custom_add_to_cart'], 10, 3);
            add_filter('woocommerce_get_item_data', [$this, 'owcpv_custom_display_cart_item_data'], 10, 2);
            add_filter('woocommerce_cart_item_price', [$this, 'owcpv_custom_price_cart_item_minicart'], 10, 3);

            add_action('woocommerce_new_order_item', [$this, 'owcpv_custom_display_order_item_meta'], 10, 3);
            add_action('woocommerce_checkout_create_order_line_item', [$this, 'owcpv_create_order_line_item_meta'], 10, 4);
            add_filter('woocommerce_display_item_meta', [$this, 'owcpv_custom_display_meta_field_order'], 10, 3);
            add_filter('woocommerce_order_item_get_formatted_meta_data', [$this, 'owcpv_custom_order_item_get_meta_data'], 10, 2);

            add_filter('wc_price', [$this, 'wrap_price'], 10, 5);

            add_action( 'wp_ajax_nopriv_owcpv_handler_fineuploader', [$this, 'owcpv_handler_fineuploader'], 20 );
            add_action( 'wp_ajax_owcpv_handler_fineuploader', [$this, 'owcpv_handler_fineuploader'], 20 );

            add_action( 'wp_ajax_nopriv_owcpv_delete_fineuploader', [$this, 'owcpv_delete_fineuploader'], 20 );
            add_action( 'wp_ajax_owcpv_delete_fineuploader', [$this, 'owcpv_delete_fineuploader'], 20 );

            add_action( 'wp_ajax_nopriv_owcpv_load_cart_item_field', [$this, 'owcpv_load_cart_item_field'], 20 );
            add_action( 'wp_ajax_owcpv_load_cart_item_field', [$this, 'owcpv_load_cart_item_field'], 20 );
     
            add_action( 'wp_ajax_nopriv_owcpv_update_cart_item_field', [$this, 'owcpv_update_cart_item_field'], 20 );
            add_action( 'wp_ajax_owcpv_update_cart_item_field', [$this, 'owcpv_update_cart_item_field'], 20 );

            add_filter( 'the_content', [$this, 'owcpv_replace_page_content'], 20 );
            add_filter( 'woocommerce_product_price_class', [$this, 'owcpv_add_custom_class_single_price'] );

        }
        
        public function owcpv_add_custom_class_single_price($class) {
            if (is_product() && owcpv_get_option('change_price_box')) {
                $class .= ' owcpv_change_price';
            }

            return $class;
        }

        public function owcpv_replace_page_content( $content ) {
            if (is_cart() && owcpv_get_option('using_classic_cart_page', 0)) {
                $content = do_shortcode('[woocommerce_cart]');
            }
        
            return $content;
        }

        public function owcpv_cart_item_from_session($session_data) {
            if (isset($session_data['owcpv_options_price'])) {
                unset($session_data['owcpv_options_price']);
            }
            return $session_data;
        }

        /**
         *  Custom Wrap Price
         */
        public function wrap_price($return, $price, $args, $unformatted_price, $original_price) {
            if (isset($args['wrap_price']) && $args['wrap_price']) {
                $price = $unformatted_price;

                // Convert to float to avoid issues on PHP 8.
                $price = (float) $price;

                $negative          = $price < 0;

                /**
                 * Filter raw price.
                 *
                 * @param float        $raw_price      Raw price.
                 * @param float|string $original_price Original price as float, or empty string. Since 5.0.0.
                 */
                $price = apply_filters( 'raw_woocommerce_price', $negative ? $price * -1 : $price, $original_price );

                $price = '<span class="wrap_price">'.number_format( $price, $args['decimals'], $args['decimal_separator'], $args['thousand_separator'] ).'</span>';

                if ( apply_filters( 'woocommerce_price_trim_zeros', false ) && $args['decimals'] > 0 ) {
                    $price = wc_trim_zeros( $price );
                }

                $formatted_price = ( $negative ? '-' : '' ) . sprintf( $args['price_format'], '<span class="woocommerce-Price-currencySymbol">' . get_woocommerce_currency_symbol( $args['currency'] ) . '</span>', $price );
                $return          = '<span class="woocommerce-Price-amount amount"><bdi>' . $formatted_price . '</bdi></span>';

                if ( $args['ex_tax_label'] && wc_tax_enabled() ) {
                    $return .= ' <small class="woocommerce-Price-taxLabel tax_label">' . WC()->countries->ex_tax_or_vat() . '</small>';
                }
            }

            
            return $return;
        }

        /**
         *  Call View Frondend Template
         */
        public static function view($view, $data = array()) {
            extract($data);
            $path_view = apply_filters('owcpv_path_view_frontend', OWCPV_PLUGIN_DIR . 'view/frontend/' . $view . '.php', $data);
            include($path_view);
        }

        /**
         *  View Default
         */
        public static function owcpv_add_frontend_field($product_id = ''){
            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            if(wp_doing_ajax() && isset($_REQUEST['action']) && wc_clean($_REQUEST['action']) != 'owcpv_load_cart_item_field') {
                return;
            }

            $product_id = (!empty($product_id)) ? $product_id : get_the_ID();
            $forms = owcpv_get_form_of_product($product_id);

            if(!$forms || empty($forms)) return;

            do_action('owcpv_before_wrapper_form');

            ?>
            <div class="owcpv_wrapper" style="width: 100%">
            <?php
            foreach ($forms as $form) {
                $field_form = owcpv_get_field_of_form($form);
                if (!$field_form || empty($field_form)) continue;
                $field_form = json_decode($field_form, true);
                if (!is_array($field_form)) continue;

                ?>
                <div class="owcpv_item_form">
                <?php
                    if ($allow_toggle_button = owcpv_get_option_form('allow_toggle_button', $form)) {
                        $checked = (owcpv_get_option_form('show_as_default', $form)) ? 'checked' : '';
                        ?>
                        <div class="owcpv_box_toggle_button">
                            <div class="owcpv_flex_row_reverse owcpv_flex_align_items_center owcpv_toggle">
                                <label for="toggle_show_form_<?php echo esc_html($form) ?>"><?php echo esc_html(owcpv_get_option_form('button_toggle_label', $form)) ?></label>
                                <input id="toggle_show_form_<?php echo esc_html($form) ?>" class="owpcv_toggle_input" name="toggle_show_form_<?php echo esc_html($form) ?>" type="checkbox" <?php echo esc_html($checked) ?>>
                                <label class="owcpv_toggle_switch" for="toggle_show_form_<?php echo esc_html($form) ?>"></label>
                            </div>
                        </div>
                        <?php
                    }

                    $hidden_form = ($allow_toggle_button && !owcpv_get_option_form('show_as_default', $form)) ? 'display: none' : '';
                    $class_hidden_form = ($allow_toggle_button && !owcpv_get_option_form('show_as_default', $form)) ? 'toggle_hidden' : '';
                    ?>
                    <div class="owcpv_inner_form <?php echo esc_html($class_hidden_form) ?>" style="<?php echo esc_attr($hidden_form) ?>">
                    <?php
                    foreach ($field_form as $field) {
                        $form_handle = new OWCPV_Form_Handler($field, $product_id);
                        $data = $form_handle->owcpv_handle_raw_form_data($form);
                        if ($data) {
                            $data_conditions = $form_handle->owcpv_handle_raw_form_data_condition();
        
                            self::view('default', [
                                'data' => $data, 
                                'data_conditions' => $data_conditions, 
                                'product_id' => $product_id,
                                'form_id' => $form
                            ]);
                        }
                    }
                    ?>
                    </div>
                </div>
                <?php
            }

            ?>
            </div>
            <?php
            do_action('owcpv_after_wrapper_form');

            self::owcpv_add_calculator_price_box($product_id);
        }

        /**
         *  View Form Edit Cart
         */
        public static function owcpv_form_edit_cart($product_id, $variation_id, $cart_item){
            $fields = owcpv_get_all_fields_of_product($product_id);
            ?>
            <div class="owcpv_header_form"><h4><?php echo esc_html(get_the_title($variation_id)) ?></h4></div>
            <div class="owcpv_body_form">
                <?php
                if($fields && !empty($fields)) {
                    ?>
                    <div class="owcpv_wrapper" style="width: 100%">
                    <?php
                    foreach ($fields as $field_name => $field) {
                        if (!isset($cart_item[$field_name])) continue;

                        $form_handle = new OWCPV_Form_Handler($field, $product_id);
                        $data = $form_handle->owcpv_check_selected_form_data($cart_item[$field_name], $variation_id);
                        $data_conditions = $form_handle->owcpv_handle_raw_form_data_condition();
                        
                        self::view('default', [
                            'data' => $data, 
                            'data_conditions' => $data_conditions, 
                            'product_id' => $variation_id
                        ]);
                    }
                    ?>
                    </div>
                    <?php
                }
                
                self::owcpv_add_calculator_price_box($variation_id);
                ?>
            </div>
            <div class="owcpv_footer_form">
                <a class="footer_form_btn" id="close-btn" href="#"><?php esc_html_e('Cancel', 'opal-woo-custom-product-variation') ?></a>
                <a class="footer_form_btn" id="update-cart-btn" href="#"><?php esc_html_e('Update', 'opal-woo-custom-product-variation') ?></a>
            </div>
            <?php
        }

        /**
         *  View Price Calculator Box
         */
        private static function owcpv_add_calculator_price_box($product_id = '') {
            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            if(wp_doing_ajax() && isset($_REQUEST['action']) && wc_clean($_REQUEST['action']) != 'owcpv_load_cart_item_field') {
                return;
            }

            $product_id = (!empty($product_id)) ? $product_id : get_the_ID();
            self::view('price-calculator', [
                'product_id' => $product_id
            ]);
        }

        /**
         *  
         */
        public function owcpv_add_edit_form_in_cart($cart_item, $cart_item_key) {
            if(!owcpv_get_option('edit_field_cart')) return $cart_item;
            if(!owcpv_get_option('using_classic_cart_page')) return $cart_item;
            if(!isset($cart_item['has_owcpv_field']) || !$cart_item['has_owcpv_field']) return $cart_item;
            
            $attrs = [
                'class' => 'owcpv_edit_cartitem',
                'href' => 'javascript:void(0)',
                'data-cart-item-key' => esc_attr($cart_item_key),
            ];

            ob_start();
            ?>
            <a <?php owcpv_parse_attr_html($attrs, true) ?>>
                <?php echo esc_html(owcpv_get_option('edit_field_cart_button', esc_html__('Edit field', 'opal-woo-custom-product-variation'))) ?>
            </a>
            <?php
            $edit_button = ob_get_clean();

            $html_allow = array( 
                'a' => array(
                    'class' => array(),
                    'href' => array(),
                    'data-cart-item-key' => array(),
                    'style' => array(),
                ), 
            );
            // print escape $html;
            echo wp_kses(apply_filters('owcpv_edit_button_cart_field', $edit_button, $cart_item), $html_allow);
        }

        /**
         *  Validate Field
         */
        public function owcpv_custom_validate_field($passed, $product_id, $quantity, $variation_id = '', $variations = array()) {

            $fields = owcpv_get_all_fields_of_product($product_id);

            /**
             * This $_POST variable's data has been validate, escaped and can be used for almost everything
             * inside `owcpv_sanitize_deep()` function.
             */
            $post_data = $_POST; // WPCS: input var okay, CSRF ok.
            $post_data = owcpv_sanitize_deep( $post_data ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		    $post_data = stripslashes_deep( $post_data );


            if($fields && !empty($fields)) {
                foreach ($fields as $fields_name => $field) {
                    if(!isset($post_data[$fields_name])) continue;

                    $form_id = $field['form'];
                    if(owcpv_get_option_form('allow_toggle_button', $form_id) && !isset($post_data['toggle_show_form_'.$form_id])) continue;

                    $form_handle = new OWCPV_Form_Handler($field, $product_id, $fields);
                    
                    $check_condition_field = $form_handle->owcpv_get_condition_field($post_data);
                    // var_dump($check_condition_field);
                    if(!$check_condition_field) continue;
                    
                    if (isset($field['required']) && $field['required'] && $post_data[$fields_name] == '') {
                        $passed = false;
                        /* translators: %s: Field label. */
                        $notice = sprintf( esc_html__( 'Field "%s" is required', 'opal-woo-custom-product-variation' ), wp_strip_all_tags($field['label']) );
                        $this->add_cart_error($notice);        
                    }
                }
            }

            return $passed;
        }

        private function add_cart_error($notice) {
            wc_add_notice($notice, 'error');
        }


        /**
         *  Calculating Price Total When Add To Cart
         */
        public function owcpv_calculate_custom_field_price($cart_object) {
            $cart_contents = $cart_object->cart_contents;
            // echo '<pre>'; print_r($cart_contents); echo '</pre>'; die();
            foreach ($cart_object->cart_contents as $key => $value) {
                if (isset($cart_contents[$key]['owcpv_options_price'])) {
                    continue;
                }

                if (isset($value['product_id'])) {
                    $price = 0;
                    $product_id = $value['product_id'];
                    
                    $fields_name = owcpv_get_all_fields_of_product($product_id, 'name');
                    if(!$fields_name || empty($fields_name)) continue;

                    foreach ($fields_name as $field_name) {
                        if (!isset($value[$field_name])) continue;

                        $price_adjustment = 0;
                        $cart_fields = $value[$field_name];
                        foreach ($cart_fields as $key_field => $field_data) {
                            if(!empty($field_data['priceValue'])) {
                                $price_adjustment += floatval($field_data['priceValue']);
                            }
                        }

                        $price += $price_adjustment;
                    }

                    $cart_contents[$key]['owcpv_options_price'] = $price;
                    if (method_exists($cart_object, 'set_cart_contents')) {
                        $cart_object->set_cart_contents($cart_contents);
                    } else {
                        $cart_object->cart_contents = $cart_contents; // for add to quote plugin
                    }
                    
                    $value['data']->set_price($value['data']->get_price() + $price);
                }
            }
        }
        
        /**
         *  Add Custom Field To Cart
         */
        public function owcpv_custom_add_to_cart($cart_item_data, $product_id, $variation_id) {

            $fields = owcpv_get_all_fields_of_product($product_id);

            /**
             * This $_POST variable's data has been validate, escaped and can be used for almost everything
             * inside `owcpv_sanitize_deep()` function.
             */
            $post_data = $_POST; // WPCS: input var okay, CSRF ok.
            $post_data = owcpv_sanitize_deep( $post_data ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		    $post_data = stripslashes_deep( $post_data );

            $has_owcpv_field = false;
            if($fields && !empty($fields)) {
                foreach ($fields as $fields_name => $field) {
                    
                    $form_id = $field['form'];
                    if(owcpv_get_option_form('allow_toggle_button', $form_id) && !isset($post_data['toggle_show_form_'.$form_id])) continue;
                    
                    $form_handle = new OWCPV_Form_Handler($field, $product_id);
                    
                    // $check_condition_field = $form_handle->owcpv_get_condition_field($post_data);
                    
                    // if (!$check_condition_field) continue;
                    if (!isset($post_data[$fields_name])) continue;
                    
                    $value_post = wc_clean(wp_unslash($post_data[$fields_name]));
                    
                    if (isset($field['values'])) {
                        $values_field = $field['values'];
                        $value_post = (is_array($value_post)) ? $value_post : [$value_post];

                        $cart_item_data[$fields_name] = [];
                        foreach ($value_post as $index => $value) {
                            $price_value = $values_field[$value]['priceValue'];
                            if ($field['priceCheckbox'] && $field['priceOptions'] == 'percent') {
                                $price_value = owcpv_calculate_price_by_percent($product_id, $price_value, $variation_id);
                            }
                            
                            $cart_item_data[$fields_name][$index] = [];
                            $cart_item_data[$fields_name][$index]['field_label'] = $field['label'];
                            $cart_item_data[$fields_name][$index]['label'] = $values_field[$value]['label'];
                            $cart_item_data[$fields_name][$index]['value'] = $values_field[$value]['value'];
                            $cart_item_data[$fields_name][$index]['owcpvValue'] = $values_field[$value]['owcpvValue'];

                            $cart_item_data[$fields_name][$index]['priceValue'] = $price_value;
                            $cart_item_data[$fields_name][$index]['hide_in_cart'] = $field['hideFieldCart'];
                            $cart_item_data[$fields_name][$index]['hide_in_order'] = $field['hideFieldOrder'];
                            $cart_item_data[$fields_name][$index]['form_id'] = $form_id;
                            
                            if (isset($field['radiosubtype']) && !empty($field['radiosubtype'])) {
                                $cart_item_data[$fields_name][$index]['type'] = $field['radiosubtype'];
                            }
                        }
                    }
                    else {
                        if(!$value_post || empty(trim($value_post))) continue;

                        $price_value = isset($field['priceValue']) ? $field['priceValue'] : 0;
                        if ($field['priceCheckbox'] && $field['priceOptions'] == 'percent') {
                            $price_value = owcpv_calculate_price_by_percent($product_id, $price_value, $variation_id);
                        }

                        $cart_item_data[$fields_name] = [];
                        $cart_item_data[$fields_name][0]['field_label'] = $field['label'];
                        $cart_item_data[$fields_name][0]['label'] = $value_post;
                        $cart_item_data[$fields_name][0]['value'] = $value_post;
                        $cart_item_data[$fields_name][0]['priceValue'] = $price_value;
                        $cart_item_data[$fields_name][0]['hide_in_cart'] = $field['hideFieldCart'];
                        $cart_item_data[$fields_name][0]['hide_in_order'] = $field['hideFieldOrder'];
                        $cart_item_data[$fields_name][0]['form_id'] = $form_id;

                        if($field['type'] == 'file') {
                            $final_file = $form_handle->move_file($value_post);
                            if (is_array($final_file) && isset($final_file['url'])) {
                                $cart_item_data[$fields_name][0]['label'] = $final_file['file_name'];
                                $cart_item_data[$fields_name][0]['value'] = $final_file['url'];
                                $cart_item_data[$fields_name][0]['type'] = 'file';
                            }
                            else {
                                // add_filter( 'show_admin_bar', '__return_false' );
                                /* translators: %s: Uploaded file name. */
                                $this->add_cart_error(sprintf(__('File %s could not be uploaded.', 'opal-woo-custom-product-variation'), basename($value_post)));
                                return false;
                            }
                        }
                    }
                    $has_owcpv_field = true;
                }
            }

            if ($has_owcpv_field) {
                $cart_item_data['has_owcpv_field'] = $has_owcpv_field;
            }

            // echo '<pre>'; print_r($cart_item_data); echo '</pre>'; die();

            return $cart_item_data;
        }

        /**
         *  Custom Display Field In Cart
         */
        public function owcpv_custom_display_cart_item_data($cart_data, $cart_item) {
            $show_in_cart_glob = owcpv_get_option('show_in_cart');
            $show_price_in_cart_glob = owcpv_get_option('show_price_in_cart');
        
            $product_id = $cart_item['product_id'];

            $fields = owcpv_get_all_fields_of_product($product_id);
            if(!$fields || empty($fields)) return $cart_data;

            foreach ($fields as $field_name => $field) {
                if (isset($form_id)) unset($form_id);
                
                if (!isset($cart_item[$field_name])) continue;
                if (isset($field['hideFieldCart']) && $field['hideFieldCart']) continue;

                $cart_fields = $cart_item[$field_name];
                $value = '';
                foreach ($cart_fields as $key_field => $field_data) {
                    if (!isset($form_id) && isset($field_data['form_id'])) {
                        $form_id = $field_data['form_id'];
                    }

                    $price_wc = (!empty($field_data['priceValue'])) ? '<span> ('.wc_price($field_data['priceValue']).')</span>' : '';

                    $show_price_in_cart = $show_price_in_cart_glob;
                    if (isset($form_id) && !owcpv_get_option_form('use_global_settings', $form_id)) {
                        $show_price_in_cart = owcpv_get_option_form('show_price_in_cart', $form_id);
                    }
                    if (!$show_price_in_cart) {
                        $price_wc = '';
                    }

                    if (isset($field_data['type'])) {
                        switch ($field_data['type']) {
                            case 'image-option':
                                $value .= '<figure class="owcpv_field_option"><img src="'.$field_data['owcpvValue'].'" alt="" width="70" height="70"><span class="owcpv_field_label">'.$field_data['label'].'</span>'.$price_wc.'</figure>';
                                break;
                            case 'color-option':
                                $value .= '<div class="owcpv_field_option"><span class="owcpv_field_label">'.$field_data['owcpvValue'].'</span>'.$price_wc.'</div>';
                                break;
                            case 'file':
                                $label = owcpv_str_short($field_data['label'], 15, 5);
                                $label = sprintf('<a href="%1s" target="_blank">%2s</a>', $field_data['value'], $label);
                                $value .= '<div class="owcpv_field_option"><span class="owcpv_field_label">'.$label.'</span>'.$price_wc.'</div>';
                                break;
                            default:
                                $value .= '<div class="owcpv_field_option"><span class="owcpv_field_label">'.$field_data['label'].'</span>'.$price_wc.'</div>';
                                break;
                        }
                        
                    }
                    else {
                        $value .= '<div class="owcpv_field_option"><span class="owcpv_field_label">'.$field_data['label'].'</span>'.$price_wc.'</div>';
                    }

                    
                }

                $show_in_cart = $show_in_cart_glob;
                if (isset($form_id) && !owcpv_get_option_form('use_global_settings', $form_id)) {
                    $show_in_cart = owcpv_get_option_form('show_in_cart', $form_id);
                }
                if ($show_in_cart) {
                    $cart_data[$field_name] = [
                        'name' => wp_strip_all_tags($fields[$field_name]['label']),
                        'value' => $value,
                    ];
                }
                // echo '<pre>'; print_r($cart_data); echo '</pre>';
            }

            return $cart_data;
        }

        /**
         *  Calculatin Price Item In Cart
         */
        public function owcpv_custom_price_cart_item_minicart ($price, $cart_item, $cart_item_key) {
            $product_id = $cart_item['product_id'];
            $cart_product   = $cart_item['data'];
            $_product = wc_get_product($cart_product->get_id());
            
            $fields_name = owcpv_get_all_fields_of_product($product_id, 'name');
            if(!$fields_name || empty($fields_name)) return $price;
            
            $price_raw = floatval($_product->get_price());

            foreach ($fields_name as $field_name) {
                if (!isset($cart_item[$field_name])) continue;

                $cart_fields = $cart_item[$field_name];
                foreach ($cart_fields as $key_field => $field_data) {
                    $price_raw += floatval($field_data['priceValue']);
                }

            }

            return wc_price($price_raw);
        }

        /**
         *  Add Value of Custom Field to Order Item Meta
         */
        public function owcpv_create_order_line_item_meta( $item, $cart_item_key, $values, $order ) {
            
            if (isset($values['product_id'])) {
                $product_id = $values['product_id'];
                
                $fields = owcpv_get_all_fields_of_product($product_id);
                if($fields && !empty($fields)) {
                    $values_field = [];
                    foreach ($fields as $fields_name => $field) {
                        if (!isset($values[$fields_name])) continue;
                        $values_field[$fields_name] = $values[$fields_name];
                    }
                    $item->add_meta_data('owcpv_value', $values_field, true);
                }
            }
        }
        
        /**
         *  Get Value of Custom Field From Order Item Meta
         */
        public function owcpv_custom_display_order_item_meta($item_id, $item, $order_id) {
            if($item instanceof WC_Order_Item_Product) {
                $product_id = $item->get_product_id();
                $owcpv_values = $item->get_meta('owcpv_value');
    
                $fields = owcpv_get_all_fields_of_product($product_id);
                if($fields && !empty($fields) && !empty($owcpv_values)) {
                    foreach ($fields as $fields_name => $field) {
                        if (!isset($owcpv_values[$fields_name])) continue;
    
                        $meta_data = wp_json_encode($owcpv_values[$fields_name]);
    
                        wc_update_order_item_meta($item_id, $field['label'], $meta_data);
                    }
                }
            }
        }

        /**
         *  Display Value of Custom Field On Order Page
         */
        public function owcpv_custom_display_meta_field_order($html, $item, $args) {
            $strings = [];
            $show_price_in_order_glob = owcpv_get_option('show_price_in_order');
            $show_in_order_glob = owcpv_get_option('show_in_order');

            foreach ( $item->get_all_formatted_meta_data() as $meta_id => $meta ) {
                $owcpv_value = json_decode($meta->value, true);
                $key = 'form_id';
                $is_owcpv_meta = strpos(json_encode($owcpv_value), "\"" . $key . "\":") !== false;

                if (!$is_owcpv_meta || !is_array($owcpv_value)) {
                    $value     = $args['autop'] ? wp_kses_post( $meta->display_value ) : wp_kses_post( make_clickable( trim( $meta->display_value ) ) );
                }
                else {
                    if (isset($form_id)) unset($form_id);
                    $value = '<div class="owcpv_meta_data">';
                    foreach ($owcpv_value as $field_value) { 
                        if (!isset($form_id) && isset($field_value['form_id'])) {
                            $form_id = $field_value['form_id'];
                        }
                        if (isset($field_value['hide_in_order']) && $field_value['hide_in_order']) continue;

                        $price_wc = (!empty($field_value['priceValue'])) ? '<span> ('.wc_price($field_value['priceValue']).')</span>' : '';

                        $show_price_in_order = $show_price_in_order_glob;
                        if (isset($form_id) && !owcpv_get_option_form('use_global_settings', $form_id)) {
                            $show_price_in_order = owcpv_get_option_form('show_price_in_order', $form_id);
                        }
                        if (!$show_price_in_order) {
                            $price_wc = '';
                        }

                        $value .= '<div class="owcpv_field_option">';
                        if (isset($field_value['type'])) {
                            if ($field_value['type'] == 'image-option') {
                                $value .= '<img src="'.$field_value['owcpvValue'].'" width="70" height="70" />';
                            }
                            elseif ($field_value['type'] == 'color-option') {
                                $value .= '<span>'.$field_value['owcpvValue'].'</span>';
                            }
                            else {
                                $value .= '<span>'.$field_value['value'].'</span>';
                            }
                        }
                        else {
                            $value .= '<span>'.$field_value['label'].'</span>';
                        }
                        $value .= $price_wc;
                        $value .= '</div>';
                    }
                    $value .= '</div>';
                }
                $strings[] = $args['label_before'] . wp_strip_all_tags( $meta->display_key ) . $args['label_after'] . $value;
            }
    
            if ( $strings ) {
                $show_in_order = $show_in_order_glob;
                if (isset($form_id) && !owcpv_get_option_form('use_global_settings', $form_id)) {
                    $show_in_order = owcpv_get_option_form('show_in_order', $form_id);
                }
                if ($show_in_order) {
                    $html = $args['before'] . implode( $args['separator'], $strings ) . $args['after'];
                }
                else {
                    $html = '';
                }
            }

            return $html;
        }

        public function owcpv_custom_order_item_get_meta_data($formatted_meta, $order_item) {

            $owcpv_meta_key = [];
            foreach ($formatted_meta as $meta_id => $meta) {
                $owcpv_value = json_decode($meta->value, true);
                if ($owcpv_value && is_array($owcpv_value)) {
                    $meta_key = sanitize_title($meta->key);
                    $owcpv_meta_key[] = $meta_key;
                    $formatted_meta[$meta_id]->key = $meta_key;
                }
            }
            
            return $formatted_meta;
        }

        /**
         * The callback function for handler FineUploader
         *
         * @access  public
         * @since   1.0.0
         *
         * @return  void
         */
        public function owcpv_handler_fineuploader() {
            if ( ! isset( $_POST['ajax_nonce_parameter'] ) || ! wp_verify_nonce( sanitize_key( $_POST['ajax_nonce_parameter'] ), 'owcpv-nonce-ajax' ) ) {
                die( 'Permissions check failed!' );
            }

            $response = ['success' => false, 'message' => ''];
            if (isset($_POST['field_id']) && isset($_FILES['owcpv_file'])) {

                $product_id = absint($_POST['product_id']);
                $field_id = wc_clean($_POST['field_id']);
                $field = owcpv_get_field_of_product_by_field_id($product_id, $field_id);
                
                if ($field) {
                    $form = new OWCPV_Form_Handler($field, $product_id);
                    /**
                     * This $_FILES variable's data has been validate, escaped and can be used for almost everything
                     * inside `owcpv_ajax_upload()` function.
                     */
                    add_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
                    $file_data = esc_html($_FILES['owcpv_file']);
                    remove_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);

                    $response = $form->owcpv_ajax_upload($file_data);
                }
                else {
                    $response['message'] = esc_html__('Wrong field id. Please try again!', 'opal-woo-custom-product-variation');
                }
            }

            wp_send_json($response);
            exit();
        }
        
        /**
         * The callback function for delete FineUploader
         *
         * @access  public
         * @since   1.0.0
         *
         * @return  void
         */
        public function owcpv_delete_fineuploader() {
            if ( ! isset( $_POST['ajax_nonce_parameter'] ) || ! wp_verify_nonce( sanitize_key( $_POST['ajax_nonce_parameter'] ), 'owcpv-nonce-ajax' ) ) {
                die( 'Permissions check failed!' );
            }

            $response['success'] = false;
            if (isset($_POST['temp_file']) && !empty($_POST['temp_file'])) {
                $temp_file = wc_clean($_POST['temp_file']);
                if ($temp_file == 'none') {
                    $response['success'] = true;        
                }
                else {
                    $upload_dir = wp_upload_dir();
                    $file_path = $upload_dir['basedir'] . '/' . OWCPV_UPLOAD_DIR . '/' . $temp_file;
                    $real_file_path = realpath($file_path);
                    $valid_temp = realpath($upload_dir['basedir'] . '/' . OWCPV_UPLOAD_DIR . '/owcpv_temp');
                    
                    if (strpos($real_file_path, $valid_temp) === 0) {
                        if (file_exists($file_path)) {
                            wp_delete_file($file_path);
                            $response['success'] = true;        
                        }
                        else {
                            $response['error'] = esc_html__('This file is no longer exists','opal-woo-custom-product-variation');
                        }
                    }
                    else {
                        $response['error'] = esc_html__('Hey! What are you looking for?','opal-woo-custom-product-variation');
                    }
                }
            }
            else {
                $response['error'] = esc_html__('Please sending a file','opal-woo-custom-product-variation');
            }

            wp_send_json($response);
            exit();
        }

        /**
         * The callback function for eidt cart item
         *
         * @access  public
         * @since   1.0.0
         *
         * @return  void
         */
        public function owcpv_load_cart_item_field() {
            if ( ! isset( $_POST['ajax_nonce_parameter'] ) || ! wp_verify_nonce( sanitize_key( $_POST['ajax_nonce_parameter'] ), 'owcpv-nonce-ajax' ) ) {
                die( 'Permissions check failed!' );
            }

            if (!isset($_POST['cart_item_key']) || empty($_POST['cart_item_key'])) exit();

            $cart_item = WC()->cart->get_cart_item( sanitize_key($_POST['cart_item_key']) );
            $product_id = $cart_item['product_id'];
            $variation_id = $cart_item['data']->get_id();

            $result = [];

            ob_start();
            ?>
            <form class="owcpv_cart_edit" style="background-color: #fff">
                <?php
                //Call View Edit
                self::owcpv_form_edit_cart($product_id, $variation_id, $cart_item);
                ?>
            </form>
            <?php
            $content = ob_get_clean();

            $result['content'] = $content;
            $result['owcpv_product'] = [
                'stock_status'=> 'instock',
                'stock_quantity'=> null,
                'product_id'=> $product_id,
            ];
            
            // echo ;
            die(wp_json_encode( $result ));
        }
        
        /**
         * The callback function for update cart item
         *
         * @access  public
         * @since   1.0.0
         *
         * @return  void
         */
        public function owcpv_update_cart_item_field() {
            if ( ! isset( $_POST['ajax_nonce_parameter'] ) || ! wp_verify_nonce( sanitize_key( $_POST['ajax_nonce_parameter'] ), 'owcpv-nonce-ajax' ) ) {
                die( 'Permissions check failed!' );
            }
            
            if (!isset($_POST['cart_item_key']) || empty($_POST['cart_item_key'])) exit();
            if ( ! WC()->cart->is_empty() ) {
                $new_cart_item_data = [];

                $cart_item_key = (isset($_POST['cart_item_key'])) ? sanitize_key($_POST['cart_item_key']) : '';
                $cart_item = WC()->cart->cart_contents[ $cart_item_key ];
                $cart_updated = false;

                /**
                 * This $_POST variable's data has been validate, escaped and can be used for almost everything
                 * inside `owcpv_sanitize_deep()` function.
                 */
                $new_cart_item_data = $_POST;
                $new_cart_item_data = owcpv_sanitize_deep( $new_cart_item_data );
                $new_cart_item_data = stripslashes_deep( $new_cart_item_data );

                if (isset($new_cart_item_data['action'])) unset($new_cart_item_data['action']);
                if (isset($new_cart_item_data['cart_item_key'])) unset($new_cart_item_data['cart_item_key']);
                
                // $found = WC()->cart->find_product_in_cart( $cart_item_key_new );
                
                WC()->cart->remove_cart_item($cart_item_key);
                $cart_item_key_new = WC()->cart->add_to_cart($cart_item['product_id'], $cart_item['quantity'], $cart_item['variation_id'], $cart_item['variation'], $new_cart_item_data);
                
                wp_send_json_success([
                    'key_old' => $cart_item_key,
                    'key_new' => $cart_item_key_new,
                ]);
            }
            wp_die();
        }
        
    }
endif;