<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

if (!function_exists('owcpv_check_woocommerce_active')) {
    function owcpv_check_woocommerce_active() {
        if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            return true;
        }
        if (is_multisite()) {
            $plugins = get_site_option('active_sitewide_plugins');
            if (isset($plugins['woocommerce/woocommerce.php']))
                return true;
        }
        return false;
    }
}

if (!function_exists('owcpv_sanitize_deep')) {
    /**
     * Strips all HTML tags from all values in a mixed variable, then trims the result.
     *
     * @access public
     * @param mixed $value
     *
     * @return mixed
     */
    function owcpv_sanitize_deep( $value ) {
        if ( is_scalar( $value ) ) {
            // strip all HTML tags & whitespace
            $value = trim( wp_strip_all_tags( $value ) );
    
            // convert &amp; back to &
            $value = html_entity_decode( $value, ENT_NOQUOTES );
        } elseif ( is_array( $value ) ) {
            $value = array_map( 'owcpv_sanitize_deep', $value );
        } elseif ( is_object( $value ) ) {
            $vars = get_object_vars( $value );
            foreach ( $vars as $key => $data ) {
                $value->{$key} = owcpv_sanitize_deep( $data );
            }
        }
    
        return $value;
    }
}


if (!function_exists('owcpv_get_form_of_product')) {
    /**
     * Get all form of product
     *
     * @since  1.0.0
     */
    function owcpv_get_form_of_product($product_id) {
        $forms_include = get_post_meta($product_id, 'owcpv_form', true);

        $forms = (!$forms_include || empty($forms_include)) ? [] : $forms_include;

        $forms = array_filter($forms, function($e) {
            return (get_post_status( $e ) == 'publish');
        });
        
        $args = array(
            'post_type' => 'opal-product',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'tax_query' => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
                array(
                    'taxonomy' => 'product_cat',
                    'field' => 'id',
                    'terms' => wp_get_post_terms($product_id, 'product_cat', array("fields" => "ids")),
                ),
            ),
        );
        $forms_by_tax = new WP_Query($args);

        if ($forms_by_tax->have_posts()) {
            while ($forms_by_tax->have_posts()) {
                $forms_by_tax->the_post();

                if (!in_array(get_the_ID(), $forms)) {
                    $forms[] = get_the_ID();
                }

            }
        }
        wp_reset_postdata();

        return $forms;
    }
}

if (!function_exists('owcpv_get_field_of_form')) {
    /**
     * Get all field of form
     *
     * @since  1.0.0
     */
    function owcpv_get_field_of_form($form_id) {
        return get_post_meta($form_id, 'owcpv_json_value', true);
    }
}

if (!function_exists('owcpv_get_all_fields_of_product')) {
    /**
     * Get all field of product
     *
     * @since  1.0.0
     */
    function owcpv_get_all_fields_of_product($product_id, $attr = '') {
        $data = owcpv_get_form_of_product($product_id);
        if(!$data || empty($data)) return false;

        $fields = [];
        foreach ($data as $form) {
            $field_form = owcpv_get_field_of_form($form);

            if (!$field_form || empty($field_form)) continue;
            $field_form = json_decode($field_form, true);

            foreach ($field_form as $field) {
                if ($attr == '') {
                    if (isset($field['values']) && array_column($field['values'], 'image')) {
                        $field['is_image_option'] = true;
                    }
                    $field['form'] = $form;
                    $fields[$field['name']] = $field;
                } 
                else {
                    if (isset($field[$attr])) $fields[] = $field[$attr];
                }
            }
        }

        return $fields;
    }
}

if (!function_exists('owcpv_check_field_exist')) {
    /**
     * Using for import form or get form id by field name
     *
     * @since  1.0.0
     */
    function owcpv_check_field_exist($field_name, $i = 0, $get = false) {
        global $wpdb;

        $field_name = ($i > 0) ? $field_name.'-'.$i : $field_name;

        $check_prepare = $wpdb->prepare( 
            "SELECT meta_id, post_id FROM {$wpdb->postmeta} WHERE meta_key = 'owcpv_json_value' AND meta_value LIKE %s" , 
            '%' . $field_name . '%'
        );
        $check_field = $wpdb->get_results( $check_prepare ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery.NoCaching

        return ($get) ? $check_field : !empty($check_field);
    }
}


if (!function_exists('owcpv_get_field_of_product_by_field_id')) {
    /**
     * Get all field of product
     *
     * @since  1.0.0
     */
    function owcpv_get_field_of_product_by_field_id($product_id, $field_id) {
        $fields = owcpv_get_all_fields_of_product($product_id);
        if(!$fields || empty($fields)) return false;

        return isset($fields[$field_id]) ? $fields[$field_id] : false;
    }
}

if (!function_exists('owcpv_calculate_price_by_percent')) {
    /**
     * Calculate Price Of Field By Percent
     *
     * @since  1.0.0
     */
    function owcpv_calculate_price_by_percent($product_id, $percent = 100, $variation_id = 0) {
        if ($variation_id == 0) {
            $product = wc_get_product( $product_id );
        }
        else {
            $product = wc_get_product($variation_id);
        }
        $price = $product->get_price();
        if ($price && !empty($percent)) {
            return floatval($price) / 100 * $percent;
        }
        return 0;
    }
}

if (!function_exists('owcpv_parse_attr_html')) {
    /**
     * Calculate Price Of Field By Percent
     *
     * @since  1.0.0
     */
    function owcpv_parse_attr_html(array $attr, $print = false) {
        $attr_return = implode(' ', array_map(function ($key, $value) {
            if (is_array($value)) {
                $value = implode(' ', $value);
            }
    
            return esc_html($key) . "='" . $value . "'";
        }, array_keys($attr), $attr));

        if ($print) {
            add_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
            echo esc_html($attr_return);
            remove_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
        } 
        else {
            return $attr_return;
        }
        
    }
}

if (!function_exists('owcpv_str_short')) {
    /**
     * Short String Middle
     *
     * @since  1.0.0
     */
    function owcpv_str_short($string, $length, $lastLength = 0, $symbol = '...')
    {
        if (strlen($string) > $length) {
            $result = substr($string, 0, $length - $lastLength - strlen($symbol)) . $symbol;
            return $result . ($lastLength ? substr($string, - $lastLength) : '');
        }

        return $string;
    }
}

if (!function_exists('owcpv_key_by_value')) {
    /**
     * Short String Middle
     *
     * @since  1.0.0
     */
    function owcpv_key_by_value($array, $key, $val) {
        foreach ($array as $index => $item) 
        if (isset($item[$key]) && $item[$key] == $val)
            return $index;
        return false;

    }
}

if (!function_exists('owcpv_swapPos')) {
    function owcpv_swapPos(&$arr, $pos1, $pos2){
        $keys = array_keys($arr);
        $vals = array_values($arr);
        $key1 = array_search($pos1, $keys);
        $key2 = array_search($pos2, $keys);
    
        $tmp = $keys[$key1];
        $keys[$key1] = $keys[$key2];
        $keys[$key2] = $tmp;
    
        $tmp = $vals[$key1];
        $vals[$key1] = $vals[$key2];
        $vals[$key2] = $tmp;
    
        $arr = array_combine($keys, $vals);

    }
}

if (!function_exists('owcpv_get_option')) {
    /**
     * @return string
     */
    function owcpv_get_option($option, $default = false)
    {
        if(!get_option(OWCPV_SETTINGS_KEY)) return $default;
        $settings = json_decode(get_option(OWCPV_SETTINGS_KEY), true);
        
        $settings = apply_filters('owcpv_configurations', $settings);
        $response = (isset($settings[$option]) && !empty($settings[$option])) ? $settings[$option] : $default;
        
        return $response;
    }

}

if (!function_exists('owcpv_get_option_form')) {
    /**
     * @return string
     */
    function owcpv_get_option_form($option, $form_id, $default = false)
    {
        if(!get_post_meta($form_id, 'owcpv_settings_value', true)) return $default;
        $settings = json_decode(get_post_meta($form_id, 'owcpv_settings_value', true), true);
        
        $settings = apply_filters('owcpv_setting_option_data', $settings, $form_id);
        $response = isset($settings[$option]) ? $settings[$option] : $default;
        
        return $response;
    }

}

if (!function_exists('owcpv_send_file_headers')) {
    function owcpv_send_file_headers( $file_name, $file_size ) {
        header( 'Content-Type: application/octet-stream' );
        header( 'Content-Disposition: attachment; filename=' . $file_name );
        header( 'Expires: 0' );
        header( 'Cache-Control: must-revalidate' );
        header( 'Pragma: public' );
        header( 'Content-Length: ' . $file_size );
    }
}

if (!function_exists('owcpv_is_edit_page')) {
    /**
     * is_edit_page 
     * function to check if the current page is a post edit page
     * 
     * @param  string  $new_edit what page to check for accepts new - new post page ,edit - edit post page, null for either
     * @return boolean
     */
    function owcpv_is_edit_page($new_edit = null){
        global $pagenow;
        //make sure we are on the backend
        if (!is_admin()) return false;
        
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        if (isset($_GET['action']) && wc_clean($_GET['action']) == 'trash') return false;

        if($new_edit == "edit")
            return in_array( $pagenow, array( 'post.php',  ) );
        elseif($new_edit == "new") //check for new post page
            return in_array( $pagenow, array( 'post-new.php' ) );
        else //check for either new or edit
            return in_array( $pagenow, array( 'post.php', 'post-new.php' ) );
    }
}

if (!function_exists('owcpv_print_price')) {
    /**
     * owcpv_print_price 
     * wp_kses tag for wc_price
     * 
     */
    function owcpv_print_price($price_value, $args = array()){

        add_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);

        echo esc_html(wc_price($price_value, $args));

        remove_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
    }
}

if (!function_exists('owcpv_prevent_escape_html')) {
    /**
     * owcpv_prevent_escape_html 
     */
    function owcpv_prevent_escape_html($safe_text, $text){
        return $text;
    }
}

function owcpv_check_string_has_char($string, $charsToCheck) {
    $string = strtolower($string);
    $charsToCheck = strtolower($charsToCheck);
    $containsChar = strpos($string, $charsToCheck);
    return $containsChar !== false;
}

function owcpv_check_string_start_with_char($string, $charsToCheck) {
    $string = strtolower($string);
    $charsToCheck = strtolower($charsToCheck);
    return strpos($string, $charsToCheck) === 0;
}

function owcpv_check_string_end_with_char($string, $charsToCheck) {
    $string = strtolower($string);
    $charsToCheck = strtolower($charsToCheck);
    $endsWithLength = strlen($charsToCheck);
    $endOfString = substr($string, -$endsWithLength);

    return $endOfString === $charsToCheck;
}

/**
 * Output a checkbox input box.
 *
 * @param array   $field Field data.
 * @param WC_Data $data WC_Data object, will be preferred over post object when passed.
 */
function owcpv_wp_checkbox( $field, WC_Data $data = null ) {
    global $post;

    $field['class']         = isset( $field['class'] ) ? $field['class'] : 'checkbox';
    $field['style']         = isset( $field['style'] ) ? $field['style'] : '';
    $field['wrapper_class'] = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
    $field['value']         = $field['value'] ?? \Automattic\WooCommerce\Utilities\OrderUtil::get_post_or_object_meta( $post, $data, $field['id'], true );
    $field['cbvalue']       = isset( $field['cbvalue'] ) ? $field['cbvalue'] : 'yes';
    $field['name']          = isset( $field['name'] ) ? $field['name'] : $field['id'];
    $field['desc_tip']      = isset( $field['desc_tip'] ) ? $field['desc_tip'] : false;
    $field['checkbox_ui']   = isset( $field['checkbox_ui'] ) && $field['checkbox_ui'];

    // Custom attribute handling
    $custom_attributes = array();

    if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {

        foreach ( $field['custom_attributes'] as $attribute => $value ) {
            $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
        }
    }

    if ( $field['checkbox_ui'] ) {
        $field['wrapper_class'] .= ' owcpv_toggle';
    }

    $html = '';
    $html .= '<p class="form-field ' . esc_attr( $field['id'] ) . '_field ' . esc_attr( $field['wrapper_class'] ) . '">';

    if ( ! empty( $field['description'] ) && false !== $field['desc_tip'] ) {
        $html .= wc_help_tip( $field['description'] );
    }
    
    $html .= '<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . '</label>';


    if ( $field['checkbox_ui'] ) {
        $field['class'] .= ' owpcv_toggle_input';
    }

    $html .= '<input type="checkbox" class="' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . '" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" value="' . esc_attr( $field['cbvalue'] ) . '" ' . checked( $field['value'], $field['cbvalue'], false ) . '  ' . implode( ' ', $custom_attributes ) . '/>';

    if ( $field['checkbox_ui'] ) {
        $html .= '<label for="' . esc_attr( $field['id'] ) . '" class="owcpv_toggle_switch"></label>';
    }

    
    $html .= '</p>';
    if ( ! empty( $field['description'] ) && false === $field['desc_tip'] ) {
        $html .= '<p class="description">' . wp_kses_post( $field['description'] ) . '</p>';
    }

    add_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
    
    echo esc_html($html);

    remove_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
}

