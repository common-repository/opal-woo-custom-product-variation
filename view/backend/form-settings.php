<?php
/** 
 * OWCPV Settings Page
 * 
 * @uses owcpv_option
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

$fb_class = '';

?>
<div class="wrap">
    <div class="owcpv_header_settings">
        <h1 class="owcpv_title_page"><?php esc_html_e('Settings', 'opal-woo-custom-product-variation') ?></h2>
        <h3 class="owcpv_subtitle_page"><?php esc_html_e('Aplly for all forms', 'opal-woo-custom-product-variation') ?></h3>
    </div>
</div>
<div class="wrap owcpv_wrap_settings">
    <ul class="owcpv_g_set_tabs <?php echo esc_html($fb_class); ?>">
        <li>
            <a href="#owcpv_disp_settings" class="active">
                <img src="<?php echo esc_url(OWCPV_PLUGIN_URL.'/assets/images/display-settings.svg') ?>" width="20" height="20" alt=""><?php esc_html_e('Display Settings', 'opal-woo-custom-product-variation'); ?>
            </a>
        </li>
        <li>
            <a href="#owcpv_content_settings">
                <img src="<?php echo esc_url(OWCPV_PLUGIN_URL.'/assets/images/string-settings.svg') ?>" width="20" height="20" alt=""><?php esc_html_e('Contents/Strings', 'opal-woo-custom-product-variation'); ?>
            </a>
        </li>
        <li>
            <a href="#owcpv_validation_message_settings">
                <img src="<?php echo esc_url(OWCPV_PLUGIN_URL.'/assets/images/validations-settings.svg') ?>" width="20" height="20" alt=""><?php esc_html_e('Validation Messages', 'opal-woo-custom-product-variation'); ?>
            </a>
        </li>
        <li>
            <a href="#owcpv_other_settings">
                <img src="<?php echo esc_url(OWCPV_PLUGIN_URL.'/assets/images/other-settings.svg') ?>" width="20" height="20" alt=""><?php esc_html_e('Other settings', 'opal-woo-custom-product-variation'); ?>
            </a>
        </li>
        <li>
            <a href="#owcpv_import_export">
                <img src="<?php echo esc_url(OWCPV_PLUGIN_URL.'/assets/images/backup-settings.svg') ?>" width="20" height="20" alt=""><?php esc_html_e('Import/Export Settings', 'opal-woo-custom-product-variation'); ?>
            </a>
        </li>
    </ul>
    <div class="owcpv_g_set_tabcontents <?php echo esc_html($fb_class); ?>">
        <div class="owcpv_wrap_tabcontent">
            <div id="owcpv_disp_settings" class="owcpv_tabcontent">
                <div class="options_group">
                    <h3><?php esc_html_e('Position', 'opal-woo-custom-product-variation') ?></h3>
                    <div class="option_item">
                        <?php
                        owcpv_wp_checkbox( array( 
                            'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                            'id' => 'catalog_mode',
                            'class' => 'owcpv_setting_field',
                            'label' => esc_html__('Catalog mode', 'opal-woo-custom-product-variation'),
                            'description' => esc_html__('Not using to accompany purchase', 'opal-woo-custom-product-variation'),
                            'desc_tip' => true,
                            'value' => owcpv_get_option('catalog_mode'),
                            'cbvalue' => true,
                            'checkbox_ui' => true
                        ) );
                        ?>
                    </div>
                    <ul>
                        <li class="option_item owcpv_group_settings_mt toggle_hidden <?php if(owcpv_get_option('catalog_mode')) echo esc_html('owcpv_hidden') ?>" data-condition="catalog_mode">
                        <?php
                            woocommerce_wp_select(
                                array(
                                    'id'          => 'render_position',
                                    'value'       => owcpv_get_option('render_position', ''),
                                    'label'       => __( 'Render Fields Position', 'opal-woo-custom-product-variation' ),
                                    'options'     => array(
                                        'woocommerce_after_add_to_cart_quantity-10'  => __( 'Before "Add to cart" button - 10', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_after_add_to_cart_button-5'  => __( 'After "Add to cart" button - 5', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_before_add_to_cart_quantity-5'  => __( 'Before "Quantity" - 5', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_after_add_to_cart_quantity-5'  => __( 'After "Quantity" - 5', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_before_variations_form-5'  => __( 'Before "Variation fields" (Only Variable Products) - 5', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_after_variations_table-5'  => __( 'After "Variation fields" (Only Variable Products) - 5', 'opal-woo-custom-product-variation' ),
                                    ),
                                    'wrapper_class' => 'owcpv_setting_form', 
                                    'class' => 'owcpv_setting_field',
                                    'style' => 'width:100%;margin-left:0'
                                )
                            );
                        ?>
                        </li>
                        <li class="option_item owcpv_group_settings_mt toggle_hidden <?php if(!owcpv_get_option('catalog_mode')) echo esc_html('owcpv_hidden') ?>" data-condition="catalog_mode">
                        <?php
                            woocommerce_wp_select(
                                array(
                                    'id'          => 'render_position_catalog',
                                    'value'       => owcpv_get_option('render_position_catalog', ''),
                                    'label'       => __( 'Render Fields Position', 'opal-woo-custom-product-variation' ),
                                    'options'     => array(
                                        'woocommerce_single_product_summary-4'  => __( 'Before "Title" - 4', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_single_product_summary-5'  => __( 'After "Title" - 5', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_single_product_summary-19'  => __( 'Before "Excerpt" - 19', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_single_product_summary-20'  => __( 'After "Excerpt" - 20', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_single_product_summary-9'  => __( 'Before "Price" - 9', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_single_product_summary-10'  => __( 'After "Price" - 10', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_single_product_summary-29'  => __( 'Before "Add to cart" form - 29', 'opal-woo-custom-product-variation' ),
                                        'woocommerce_single_product_summary-30'  => __( 'After "Add to cart" form - 30', 'opal-woo-custom-product-variation' ),
                                    ),
                                    'wrapper_class' => 'owcpv_setting_form', 
                                    'class' => 'owcpv_setting_field',
                                    'style' => 'width:100%;margin-left:0'
                                )
                            );
                        ?>
                        </li>
                        <li>
                        <?php
                            woocommerce_wp_text_input(
                                array(
                                    'id'          => 'render_position_prioty',
                                    'class' => 'owcpv_setting_field',
                                    'wrapper_class' => 'owcpv_setting_form',
                                    'label'       => esc_html__( 'Prioty: ', 'opal-woo-custom-product-variation' ),
                                    'placeholder' => '5',
                                    'value'       => owcpv_get_option('render_position_prioty', ''),
                                    'style' => 'width:100%'
                                )
                            );
                        ?>
                        </li>
                    </ul>
                </div>
                <div class="options_group">
                    <h3><?php esc_html_e('Price', 'opal-woo-custom-product-variation') ?></h3>
                    <ul>
                        <li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'show_field_price',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Show price for each field', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('show_field_price'),
                                'cbvalue' => true,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                        <li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'change_price_box',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Change price box', 'opal-woo-custom-product-variation'),
                                'description' => esc_html__('Changing price on default price box when the options are selected', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('change_price_box'),
                                'cbvalue' => true,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                    </ul>
                </div>
                <div class="options_group">
                    <h3><?php esc_html_e('Price Summary Section', 'opal-woo-custom-product-variation') ?></h3>
                    <ul>
                        <li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'show_option_price',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Show Options Price ', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('show_option_price'),
                                'cbvalue' => 1,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'show_option_total_price',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Show Options Total Price ', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('show_option_total_price'),
                                'cbvalue' => 1,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                        <li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'show_product_price',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Show Product Price ', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('show_product_price'),
                                'cbvalue' => 1,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                        <li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'show_total_price',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Show Total', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('show_total_price'),
                                'cbvalue' => 1,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                    </ul>
                </div>
                <div class="options_group">
                    <h3><?php esc_html_e('Custom options data ', 'opal-woo-custom-product-variation') ?></h3>
                    <ul>
                        <li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'show_in_cart',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Show in Cart & Checkout', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('show_in_cart'),
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
                                'value' => owcpv_get_option('show_in_order'),
                                'cbvalue' => 1,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                    </ul>
                </div>
                <div class="options_group">
                    <h3><?php esc_html_e('Show or Hide Price In', 'opal-woo-custom-product-variation') ?></h3>
                    <ul>
                        <li>
                        <?php
                            owcpv_wp_checkbox( array( 
                                'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                'id' => 'show_price_in_cart',
                                'class' => 'owcpv_setting_field',
                                'label' => esc_html__('Show in Cart & Checkout', 'opal-woo-custom-product-variation'),
                                'value' => owcpv_get_option('show_price_in_cart'),
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
                                'value' => owcpv_get_option('show_price_in_order'),
                                'cbvalue' => 1,
                                'checkbox_ui' => true
                            ) );
                        ?>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="owcpv_content_settings" class="owcpv_tabcontent" style="display: none;">
                <div class="options_group">
                    <h3><?php esc_html_e('Price Summary Section Labels', 'opal-woo-custom-product-variation') ?></h3>
                    <ul>
                        <li>
                        <?php
                            woocommerce_wp_text_input(
                                array(
                                    'id'          => 'option_price_label',
                                    'class' => 'owcpv_setting_field',
                                    'wrapper_class' => 'owcpv_setting_form', 
                                    'label'       => esc_html__( 'Options Price Label: ', 'opal-woo-custom-product-variation' ),
                                    'placeholder' => '',
                                    'value'       => esc_html__( 'Options Price', 'opal-woo-custom-product-variation' ),
                                )
                            );
                        ?>
                        </li>
                        <li>
                        <?php
                            woocommerce_wp_text_input(
                                array(
                                    'id'          => 'product_price_label',
                                    'class' => 'owcpv_setting_field',
                                    'wrapper_class' => 'owcpv_setting_form', 
                                    'label'       => esc_html__( 'Product Price Label:', 'opal-woo-custom-product-variation' ),
                                    'placeholder' => '',
                                    'value'       => esc_html__( 'Product Price', 'opal-woo-custom-product-variation' ),
                                )
                            );
                        ?>
                        </li>
                        <li>
                        <?php
                            woocommerce_wp_text_input(
                                array(
                                    'id'          => 'total_price_label',
                                    'class' => 'owcpv_setting_field',
                                    'wrapper_class' => 'owcpv_setting_form', 
                                    'label'       => esc_html__( 'Total Price Label:', 'opal-woo-custom-product-variation' ),
                                    'placeholder' => '',
                                    'value'       => esc_html__( 'Total Price', 'opal-woo-custom-product-variation' ),
                                )
                            );
                        ?>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="owcpv_validation_message_settings" class="owcpv_tabcontent" style="display: none;">
                <div class="options_group">
                    <h3><?php esc_html_e('Error Messages for field Validation', 'opal-woo-custom-product-variation') ?></h3>
                    <ul>
                        <?php
                        require OWCPV_PLUGIN_DIR.'includes/helpers/define.php';

                        $validates_message = apply_filters('owcpv_validates_message_custom', $validates_message);
                        foreach ($validates_message as $name => $message) {
                            ?>
                            <li>
                            <?php
                            woocommerce_wp_text_input(
                                array(
                                    'id'            => $name,
                                    'class' => 'owcpv_setting_field',
                                    'wrapper_class' => 'owcpv_setting_form', 
                                    'label'         => isset($message['label']) ? $message['label'] : '',
                                    'value'         => owcpv_get_option($name, ''),
                                    'placeholder'   => isset($message['placeholder']) ? $message['placeholder'] : '',
                                    'description'   => isset($message['description']) ? $message['description'] : '',
                                    'desc_tip'      => isset($message['desc_tip']) ? $message['desc_tip'] : false,
                                    'type'          => isset( $message['type'] ) ? $message['type'] : 'text',
                                    'data_type'     => isset( $message['data_type'] ) ? $message['data_type'] : '',
                                )
                            );
                            ?>
                            <li>
                            <?php
                        }
                        ?>
                    </ul>
                </div>
            </div>
            <div id="owcpv_other_settings" class="owcpv_tabcontent" style="display: none;">
                <h3><?php esc_html_e('Other Settings', 'opal-woo-custom-product-variation') ?></h3>
                <div class="options_group">
                    <?php
                    owcpv_wp_checkbox( array( 
                        'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                        'id' => 'update_summary_price',
                        'class' => 'owcpv_setting_field',
                        'label' => esc_html__('Update summary price as quantity change', 'opal-woo-custom-product-variation'),
                        'value' => owcpv_get_option('update_summary_price', 1),
                        'cbvalue' => 1,
                        'checkbox_ui' => true
                    ) );
                    ?>
                </div>
                <div class="options_group">
                    <div class="option_item">
                        <?php
                        owcpv_wp_checkbox( array( 
                            'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                            'id' => 'using_classic_cart_page',
                            'class' => 'owcpv_setting_field',
                            'label' => esc_html__('Using classic cart page', 'opal-woo-custom-product-variation'),
                            'description' => esc_html__('Force using shortcode: [woocommerce_cart]', 'opal-woo-custom-product-variation'),
                            'value' => owcpv_get_option('using_classic_cart_page', 0),
                            'cbvalue' => 1,
                            'checkbox_ui' => true
                        ) );
                        ?>
                    </div>
                    <div class="option_item owcpv_group_settings_mt <?php if(!owcpv_get_option('using_classic_cart_page', 0)) echo esc_html('setting_hidden') ?>" data-condition="using_classic_cart_page">
                        <ul>
                            <li>
                            <?php
                                owcpv_wp_checkbox( array( 
                                    'wrapper_class' => 'owcpv_setting_form owcpv_flex_row_reverse owcpv_flex_align_items_center', 
                                    'id' => 'edit_field_cart',
                                    'class' => 'owcpv_setting_field',
                                    'label' => esc_html__('Allow edit fields in cart page', 'opal-woo-custom-product-variation'),
                                    'value' => owcpv_get_option('edit_field_cart', 1),
                                    'cbvalue' => 1,
                                    'checkbox_ui' => true
                                ) );
                            ?>
                            </li>
                            <?php
                                woocommerce_wp_text_input(
                                    array(
                                        'id'          => 'edit_field_cart_button',
                                        'class' => 'owcpv_setting_field',
                                        'wrapper_class' => 'owcpv_setting_form', 
                                        'label'       => esc_html__( 'Edit field cart button text:', 'opal-woo-custom-product-variation' ),
                                        'placeholder' => '',
                                        'value'       => owcpv_get_option('edit_field_cart_button', esc_html__( 'Edit', 'opal-woo-custom-product-variation' )),
                                    )
                                );
                            ?>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="owcpv_import_export" class="owcpv_tabcontent" style="display: none;">
                <div class="options_group">
                    <div class="owcpv_group_option">
                        <img src="<?php echo esc_url(OWCPV_PLUGIN_URL.'/assets/images/download-solid.svg') ?>" width="50" alt="">
                        <div>
                            <h3><?php esc_html_e('Export Settings', 'opal-woo-custom-product-variation') ?></h3>
                            <p><?php esc_html_e('Download a backup file of your settings', 'opal-woo-custom-product-variation' ) ?></p>
                        </div>
                    </div>
                    <div class="owcpv_action_button">
                        <a href="<?php echo esc_url(admin_url( 'admin-ajax.php' ).'?action=owcpv_settings_export&ajax_nonce_parameter='.wp_create_nonce( "owcpv-nonce-ajax" )); ?>" id="owcpv_download_settings" class="button button-primary"><?php esc_html_e('Download settings', 'opal-woo-custom-product-variation') ?></a>
                    </div>
                </div>
                <form id="owcpv-form-import-settings" class="options_group" method="post" action="<?php echo esc_url(admin_url( 'admin-ajax.php' )) ?>" enctype="multipart/form-data">
                    <div class="owcpv_group_option">
                        <img src="<?php echo esc_url(OWCPV_PLUGIN_URL.'/assets/images/file-import-solid.svg') ?>" width="50" alt="">
                        <div>
                            <h3><?php esc_html_e('Import Settings', 'opal-woo-custom-product-variation') ?></h3>
                            <fieldset id="owcpv-import-form-settings">
                                <input type="hidden" name="action" value="owcpv_handle_import_settings">
                                <?php wp_nonce_field('owcpv-nonce-ajax', 'ajax_nonce_parameter');  ?>
                                <div class="owcpv_field_wrap">
                                    <input type="file" name="owcpv_setting_import" accept=".json,application/json" required="">
                                </div>
                                <p class="owcpv_notice"><?php esc_html_e('*Notice: All existing settings will be overwritten', 'opal-woo-custom-product-variation') ?></p>
                            </fieldset>
                        </div>
                    </div>
                    <div class="owcpv_action_button">
                        <button id="owcpv_import_settings" class="button button-primary"><?php esc_html_e('Upload file and import settings', 'opal-woo-custom-product-variation') ?></a>
                    </div>
                </form>
            </div>
        </div>
        <div class="owcpv_setting_action mt">
            <input type="hidden" name="action" value="owcpv_handle_settings_form">
            <?php wp_nonce_field('owcpv-nonce-ajax', 'ajax_nonce_parameter');  ?>
            <button type="button" id="owcpv_submit_settings" class="button"><?php esc_html_e('Save settings', 'opal-woo-custom-product-variation') ?></button>
        </div>
    </div>
    <div style="clear: both"></div>
</div>
