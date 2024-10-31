<?php
/** 
 * Default Field
 * 
 * @uses $data
*/
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

$product = wc_get_product($product_id);

$classes = '';
if (!empty($data_conditions)) {
    $classes .= ' has_condition';
    if ($data_conditions['logic_action'] == 'show') {
        $classes .= ' owcpv_hidden';
    }
}

if (!owcpv_get_option_form('calculated_option_price', $form_id)) {
    $classes .= ' not_calculated_option';
}
if (!owcpv_get_option_form('show_option_detail_price', $form_id)) {
    $classes .= ' hide_option_detail';
}
if (!empty($data['hideLabel']) && $data['hideLabel']) {
    $classes .= ' hide_label_color';
}

$type = $data['type'];
$data = wp_json_encode($data, JSON_HEX_APOS);
$data_conditions = !empty($data_conditions) ? wp_json_encode($data_conditions) : '';

$attrs = [
    'class' => 'render-wrap ' . apply_filters('owcpv_render_item_class', $classes),
    'data-type' => $type,
    'data-form' => '['.$data.']',
    'data-condition' => $data_conditions,
];

$attrs = apply_filters('owcpv_html_render_item_attributes', $attrs, $product_id);
?>
<div <?php owcpv_parse_attr_html($attrs, true) ?>></div>