<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;
if ( ! class_exists( 'OWCPV_Meta' ) ) :

    /**
     * Main OWCPV_Start_Instance_Admin Class.
     *
     * @package		OWCPV
     * @subpackage	Classes/OWCPV_Meta
     * @since		1.0.0
     * @author		Opal
     */
    Class OWCPV_Meta {
        private static $_instance = null;
        public function __construct() {
            add_filter( 'woocommerce_product_data_tabs',[$this, 'add_single_product_tab']);
            add_action( 'woocommerce_product_data_panels', [$this, 'add_custom_product_data_content'], 9999);
            add_action( 'woocommerce_process_product_meta', [$this, 'save_custom_product_tab_data'] );
        }

        public static function instance($file = '', $version = '1.0.0') {
            if (is_null(self::$_instance)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        /**
         * Add tabs for woocommerce single product
         */
        public function add_single_product_tab($tabs) {
            $tabs['opal-product-tabs'] = [
                'label' => esc_html__('OWCPV Forms', 'opal-woo-custom-product-variation'),
                'target' => 'opal-product-tabs',
                'priority' => 60
            ];
            return $tabs;
        }
        
        public function add_custom_product_data_content() {
            global $post;
            global $thepostid;

            $args = [
                'post_type' => 'opal-product',
                'posts_per_page' => -1,
                'post_status' => 'publish'
            ];
            $form_list = new WP_Query($args);

            $forms_product = owcpv_get_form_of_product($thepostid);

            ?>
            <!-- id below must match target registered in above add_my_custom_product_data_tab function -->
            <div id="opal-product-tabs" class="panel woocommerce_options_panel">
                <div class="opal-section-tab owcpv-flex">
                    <div class="opal-wrapper-section">
                        <div class="opal-section-header"><strong><?php esc_html_e('Select Form', 'opal-woo-custom-product-variation') ?></strong></div>
                        <div class="opal-checkbox-form">
                            <?php
                            if ($form_list->have_posts()) {
                                while ($form_list->have_posts()) {
                                    $form_list->the_post();
                                    $cbval = get_the_ID();

                                    $val = (is_array($forms_product) && in_array($cbval, $forms_product)) ? $cbval : '';

                                    woocommerce_wp_checkbox( array( 
                                        'wrapper_class' => 'owcpv_form', 
                                        'class' => 'owcpv_form_select',
                                        'id' => 'field_'.$cbval,
                                        'name' => 'owcpv_form[]', 
                                        'label' => get_the_title().' ('.get_the_ID().')',
                                        'cbvalue' => $cbval,
                                        'value' => $val,
                                    ) );
                                }

                            }
                            wp_reset_postdata();

                            ?>
                        </div>
                    </div>
                    <div class="opal-wrapper-section">
                        <div class="opal-section-header"><strong><?php esc_html_e('Drag to sort form', 'opal-woo-custom-product-variation') ?></strong></div>
                        <ul class="opal-list-selected-form">
                        <?php
                        if (is_array($forms_product)) {
                            foreach($forms_product as $form) {
                                printf('<li class="sort" data-id="%1$s"><div class="handle_sort">%2$s (%3$s)</div></li>', esc_html($form), esc_html(get_the_title($form)), esc_html($form));
                            }
                        }
                        ?>
                        </ul>
                        <div class="opal-no-form <?php if ($forms_product && !empty($forms_product)) echo esc_html('owcpv_hidden') ?>"><?php esc_html_e('No form selected!', 'opal-woo-custom-product-variation') ?></div>
                        <input type="hidden" id="opal-sort-form-value" name="owcpv_form_sort">
                    </div>
                </div>
            </div>
            <?php
        }
        public function save_custom_product_tab_data( $product_id ) {
            $forms_of_product = owcpv_get_form_of_product($product_id);

            $forms_update = [];
            if (isset($_POST['owcpv_form']) && !empty($_POST['owcpv_form'])) {
                $forms_update = wc_clean($_POST['owcpv_form']); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            }
            if (isset($_POST['owcpv_form_sort']) && !empty($_POST['owcpv_form_sort'])) {
                $forms_update = array_map('trim', explode(',', wc_clean($_POST['owcpv_form_sort']))); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            }

            if (!empty($forms_of_product)) {
                foreach ($forms_of_product as $form_o) {
                    if (!in_array($form_o, $forms_update)) {
                        $products_apply_form = get_post_meta($form_o, 'owcpv_form_product', true);
                        if (is_array($products_apply_form) && !empty($products_apply_form)) {
                            if (($key = array_search($product_id, $products_apply_form)) !== false) {
                                array_splice($products_apply_form, $key, 1);

                                if(!empty($products_apply_form)) {
                                    update_post_meta( $form_o, 'owcpv_form_product', $products_apply_form );
                                }
                                else {
                                    delete_post_meta( $form_o, 'owcpv_form_product' );
                                }
                            }
                        }
                    }
                }
            }

            if (!empty($forms_update)) {
                foreach ($forms_update as $form_u) {
                    $products_apply_form = get_post_meta($form_u, 'owcpv_form_product', true);
                    if (!$products_apply_form || empty($products_apply_form)) {
                        $products_apply_form = [];
                    }

                    if (!in_array($product_id, $products_apply_form)) {
                        $products_apply_form[] = $product_id;
                        update_post_meta( $form_u, 'owcpv_form_product', $products_apply_form );
                    }
                }

                update_post_meta( $product_id, 'owcpv_form', $forms_update );
            }
            else {
                delete_post_meta( $product_id, 'owcpv_form' );
            }
        }
    }  

endif; // End if class_exists check.