<?php
/** 
 * OWCPV Editor
 * 
 * @uses owcpv_json_value meta
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

$value = get_post_meta(get_the_ID(), 'owcpv_json_value', true);
$json_decode = json_decode($value);

wp_nonce_field('owcpv_meta_box_nonce', 'owcpv_box_nonce');
?>
<div id="owcpv_editor" class="">
    <div id="editor-loading">
        <img src="<?php echo esc_url(OWCPV_PLUGIN_URL . 'assets/images/loading.gif'); ?>" width="150" height="150"/>
    </div>
</div>
<div style="border-top: 1px solid #c3bcbc;display:none">
    <label><?php esc_html_e("Form JSON code",'opal-woo-custom-product-variation') ?></label>
    <p style="color: red; font-size: 12px"><?php esc_html_e("Edit only if you are expert on json. Other wise it can break this form",'opal-woo-custom-product-variation') ?></p>
    <textarea name="owcpv_json_value" id="owcpv-json-value"><?php echo wp_json_encode($json_decode); ?></textarea>
</div>
