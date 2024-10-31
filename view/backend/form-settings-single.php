<?php
/** 
 * OWCPV Settings In Single Edit Form
 * 
 * @uses owcpv_option
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

$hidden_global_settings_class = (owcpv_get_option_form('use_global_settings', $form_id, true)) ? 'setting_hidden' : '';
$hidden_allow_toggle_class = (owcpv_get_option_form('allow_toggle_button', $form_id, false)) ? '' : 'setting_hidden';
?>
<div class="owcpv_setting_metabox">
    <div class="options_group owcpv_group_settings_mt">
        <?php
        owcpv_wp_checkbox( array( 
            'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
            'id' => 'allow_toggle_button',
            'class' => 'owcpv_setting_field',
            'label' => esc_html__('Show toggle button', 'opal-woo-custom-product-variation'),
            'value' => owcpv_get_option_form('allow_toggle_button', $form_id, false),
            'cbvalue' => true,
            'checkbox_ui' => true
        ) );
        ?>
    </div>
    <div class="options_group owcpv_group_settings_mt <?php echo esc_html($hidden_allow_toggle_class) ?>" data-condition="allow_toggle_button">
        <?php
        woocommerce_wp_text_input(
            array(
                'id'          => 'button_toggle_label',
                'class' => 'owcpv_setting_field',
                'wrapper_class' => 'owcpv_setting_form', 
                'label'       => esc_html__( 'Button Toggle Label:', 'opal-woo-custom-product-variation' ),
                'placeholder' => '',
                'value'       => owcpv_get_option_form('button_toggle_label', $form_id, ''),
            )
        );
        ?>
    </div>
    <div class="options_group owcpv_group_settings_mt <?php echo esc_html($hidden_allow_toggle_class) ?>" data-condition="allow_toggle_button">
        <?php
        owcpv_wp_checkbox( array( 
            'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
            'id' => 'show_as_default',
            'class' => 'owcpv_setting_field',
            'label' => esc_html__('Show As Default', 'opal-woo-custom-product-variation'),
            'value' => owcpv_get_option_form('show_as_default', $form_id, true),
            'cbvalue' => true,
            'checkbox_ui' => true
        ) );
        ?>
    </div>
</div>
<div class="owcpv_setting_metabox">
    <div class="options_group owcpv_group_settings_mt">
        <h2 style="padding-left: 0;"><?php esc_html_e('Price Summary Section', 'opal-woo-custom-product-variation') ?></h2>
        <ul>
            <li style="display: none;">
            <?php
                // owcpv_wp_checkbox( array( 
                //     'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                //     'id' => 'calculated_total_price',
                //     'class' => 'owcpv_setting_field',
                //     'label' => esc_html__('Calculated in total price', 'opal-woo-custom-product-variation'),
                //     'value' => owcpv_get_option_form('calculated_total_price', $form_id),
                //     'cbvalue' => 1,
                //     'checkbox_ui' => true
                // ) );
            ?>
            </li>
            <li>
            <?php
                owcpv_wp_checkbox( array( 
                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                    'id' => 'calculated_option_price',
                    'class' => 'owcpv_setting_field',
                    'label' => esc_html__('Calculated in option total price', 'opal-woo-custom-product-variation'),
                    'value' => owcpv_get_option_form('calculated_option_price', $form_id),
                    'cbvalue' => 1,
                    'checkbox_ui' => true
                ) );
            ?>
            </li>
            <li>
            <?php
                owcpv_wp_checkbox( array( 
                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                    'id' => 'show_option_detail_price',
                    'class' => 'owcpv_setting_field',
                    'label' => esc_html__('Show options detail price ', 'opal-woo-custom-product-variation'),
                    'value' => owcpv_get_option_form('show_option_detail_price', $form_id),
                    'cbvalue' => 1,
                    'checkbox_ui' => true
                ) );
            ?>
            </li>
        </ul>
    </div>
</div>
<div class="owcpv_setting_metabox">
    <div class="options_group owcpv_group_settings_mt">
        <?php
        owcpv_wp_checkbox( array( 
            'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
            'id' => 'use_global_settings',
            'class' => 'owcpv_setting_field',
            'label' => esc_html__('Use global settings', 'opal-woo-custom-product-variation'),
            'value' => owcpv_get_option_form('use_global_settings', $form_id, true),
            'cbvalue' => true,
            'checkbox_ui' => true
        ) );
        ?>
    </div>
    <div class="options_group owcpv_group_settings_mt <?php echo esc_html($hidden_global_settings_class) ?>" data-condition="use_global_settings">
        <h3><?php esc_html_e('Price', 'opal-woo-custom-product-variation') ?></h3>
        <ul>
            <li>
            <?php
                owcpv_wp_checkbox( array( 
                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                    'id' => 'show_field_price',
                    'class' => 'owcpv_setting_field',
                    'label' => esc_html__('Show price for each field', 'opal-woo-custom-product-variation'),
                    'value' => owcpv_get_option_form('show_field_price', $form_id),
                    'cbvalue' => true,
                    'checkbox_ui' => true,
                ) );
            ?>
            </li>
        </ul>
    </div>
    <div class="options_group owcpv_group_settings_mt <?php echo esc_html($hidden_global_settings_class) ?>" data-condition="use_global_settings">
        <h3><?php esc_html_e('Custom options data ', 'opal-woo-custom-product-variation') ?></h3>
        <ul>
            <li>
            <?php
                owcpv_wp_checkbox( array( 
                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                    'id' => 'show_in_cart',
                    'class' => 'owcpv_setting_field',
                    'label' => esc_html__('Show in Cart & Checkout', 'opal-woo-custom-product-variation'),
                    'value' => owcpv_get_option_form('show_in_cart', $form_id),
                    'cbvalue' => 1,
                    'checkbox_ui' => true
                ) );
            ?>
            </li>
            <li>
            <?php
                owcpv_wp_checkbox( array( 
                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                    'id' => 'show_in_order',
                    'class' => 'owcpv_setting_field',
                    'label' => esc_html__('Show in Order', 'opal-woo-custom-product-variation'),
                    'value' => owcpv_get_option_form('show_in_order', $form_id),
                    'cbvalue' => 1,
                    'checkbox_ui' => true
                ) );
            ?>
            </li>
        </ul>
    </div>
    <div class="options_group owcpv_group_settings_mt <?php echo esc_html($hidden_global_settings_class) ?>" data-condition="use_global_settings">
        <h3><?php esc_html_e('Show or Hide Price In', 'opal-woo-custom-product-variation') ?></h3>
        <ul>
            <li>
            <?php
                owcpv_wp_checkbox( array( 
                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                    'id' => 'show_price_in_cart',
                    'class' => 'owcpv_setting_field',
                    'label' => esc_html__('Show in Cart & Checkout', 'opal-woo-custom-product-variation'),
                    'value' => owcpv_get_option_form('show_price_in_cart', $form_id),
                    'cbvalue' => 1,
                    'checkbox_ui' => true
                ) );
            ?>
            </li>
            <li>
            <?php
                owcpv_wp_checkbox( array( 
                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                    'id' => 'show_price_in_order',
                    'class' => 'owcpv_setting_field',
                    'label' => esc_html__('Show in Order', 'opal-woo-custom-product-variation'),
                    'value' => owcpv_get_option_form('show_price_in_order', $form_id),
                    'cbvalue' => 1,
                    'checkbox_ui' => true
                ) );
            ?>
            </li>
        </ul>
    </div>
</div>
