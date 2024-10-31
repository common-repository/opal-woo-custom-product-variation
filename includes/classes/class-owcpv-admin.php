<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;
if ( ! class_exists( 'OWCPV_Admin' ) ) :

	/**
	 * Main OWCPV_Admin Class.
	 *
	 * @package		OPALWOOCU
	 * @subpackage	Classes/OWCPV_Admin
	 * @since		1.0.0
	 * @author		Opal
	 */
	final class OWCPV_Admin {

        protected static $_instance = null;

        public function __construct()
        {
            //create product meta
            OWCPV_Meta::instance();
            
            add_action( 'woocommerce_before_order_itemmeta', array($this, 'owcpv_add_hidden_field_in_order_item'), 10, 3 );
            add_action( 'woocommerce_after_order_itemmeta', array($this, 'owcpv_order_item_line_item_html'), 10, 3 );

            add_filter( 'woocommerce_admin_order_preview_get_order_details', [$this, 'owcpv_custom_order_preview_details'], 10, 2);

            add_action( 'add_meta_boxes', [$this, 'owcpv_add_custom_meta_box'] );
            add_action( 'save_post_opal-product', [$this, 'owcpv_save_custom_fields_data'], 10 );

            add_action( 'admin_enqueue_scripts', [$this, 'owcpv_remove_postbox'] );

            add_action( 'wp_ajax_owcpv_load_product_meta_box', [$this, 'owcpv_load_product_meta_box'] ); // wp_ajax_{action}

            add_action( 'wp_ajax_owcpv_form_export', [$this, 'owcpv_form_export'] ); // wp_ajax_{action}
            add_action( 'wp_ajax_owcpv_form_clone', [$this, 'owcpv_form_clone'] ); // wp_ajax_{action}
            add_action( 'wp_ajax_owcpv_handle_import_form', [$this, 'owcpv_handle_import_form'] ); // wp_ajax_{action}
            add_action( 'wp_ajax_owcpv_handle_import_sample_fields', [$this, 'owcpv_handle_import_sample_fields'] ); // wp_ajax_{action}
            add_action( 'wp_ajax_owcpv_remove_product_of_form', [$this, 'owcpv_remove_product_of_form'] ); // wp_ajax_{action}
            add_action( 'wp_ajax_owcpv_update_status_form', [$this, 'owcpv_update_status_form'] ); // wp_ajax_{action}

            add_action( 'all_admin_notices', [$this, 'owcpv_add_custom_header_admin'] );
            add_action( 'admin_menu', [$this, 'owcpv_remove_notice_cpt' ] );

            add_filter( 'post_row_actions', [$this, 'owcpv_custom_row_actions'], 50, 2 );
            add_action( 'restrict_manage_posts', [$this, 'owcpv_filter_post_type_by_taxonomy'] );
            add_filter( 'parse_query', [$this, 'owcpv_convert_id_to_term_in_query'] );
            add_filter( 'manage_edit-opal-product_columns', [$this, 'owcpv_add_cpt_columns'] );
            add_action( 'manage_posts_custom_column', [$this, 'owcpv_populate_columns_cpt'] );

            add_filter( 'get_user_option_screen_layout_opal-product', [$this, 'owcpv_change_column_cpt_edit_page'], 10, 3);

            add_action( 'submitpost_box', [$this, 'owcpv_add_before_sidebar_admin'] );
            add_action( 'post_submitbox_minor_actions', [$this, 'owcpv_add_active_toggle_button_submitbox'] );

            add_filter( 'display_post_states', [$this, 'owcpv_change_post_states_cpt'], 10, 2 );
            add_filter( 'views_edit-opal-product', [$this, 'owcpv_custom_draft_translation'] );
            add_filter( 'post_row_actions', [$this, 'owcpv_remove_quickedit_cpt'], 10, 2 );
        }

        public static function instance() {
			if ( is_null( self::$_instance ) ) {
				self::$_instance = new self();
			}

			return self::$_instance;
		}


        public function owcpv_add_active_toggle_button_submitbox($post) {
            if ($post->post_type == 'opal-product') {
                $active = (get_post_status(get_the_ID()) == 'publish') ? 'checked' : '';
                ?>
                <div class="owcpv_box_toggle_button">
                    <label class="owcpv_toggle toggle_active_form">
                        <input class="owpcv_toggle_input" type="checkbox" <?php echo esc_html($active) ?> data-id="<?php echo esc_html(get_the_ID()) ?>">
                        <div class="owcpv_toggle_switch"></div>
                        <strong><?php esc_html_e('Acive form', 'opal-woo-custom-product-variation') ?></strong>
                    </label>
                </div>
                <?php
            }
        }

        public function owcpv_remove_quickedit_cpt($actions, $post) {
            if ($post->post_type == 'opal-product') {
                // Remove "Quick Edit"
                unset($actions['inline hide-if-no-js']);
            }
            return $actions;
        }

        public function owcpv_custom_draft_translation( $views ) {
            if (isset($views['draft'])) {
                $views['draft'] = str_replace('Draft', esc_html__('Deactive', 'opal-woo-custom-product-variation'), $views['draft']);
            }
            return $views;
        }

        public function owcpv_change_post_states_cpt($post_states, $post) {
            if ($post->post_type != 'opal-product') return $post_states;

            if (isset($post_states['draft'])) {
                $post_states['draft'] = esc_html__('Deactive', 'opal-woo-custom-product-variation');
            }

            return $post_states;
        }

        public function owcpv_add_before_sidebar_admin($post) {
            global $post_type_object, $typenow, $pagenow, $current_screen;
            if($typenow == 'opal-product' && in_array($current_screen->base, ['post', 'edit'])) {
                printf('%s', '<div class="owcpv_overflow_sidebar"></div>');
            }
        }

        public function owcpv_change_column_cpt_edit_page($result, $option, $user) {
            return 1;
        }

        public function owcpv_custom_row_actions( $actions, $object ) {
            // unset( $actions['edit'] );

            if ($object->post_type == 'opal-product') {
                $actions['export'] = '<a href="'.$this->owcpv_get_export_form_link($object->ID).'">'.__('Export Form', 'opal-woo-custom-product-variation').'</a>';
                $actions['clone'] = '<a href="'.$this->owcpv_get_clone_form_link($object->ID).'">'.__('Clone', 'opal-woo-custom-product-variation').'</a>';
            }
            return $actions;
        }
        
        public function owcpv_filter_post_type_by_taxonomy() {
            global $typenow;
            $post_type = 'opal-product'; // change to your post type
            $taxonomy  = 'product_cat'; // change to your taxonomy
            if ($typenow == $post_type) {
                $selected      = isset($_GET[$taxonomy]) ? absint($_GET[$taxonomy]) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

                $info_taxonomy = get_taxonomy($taxonomy);
                wp_dropdown_categories(array(
                    /* translators: %s: Taxonomy label. */
                    'show_option_all' => sprintf( esc_html__( 'Show all %s', 'opal-woo-custom-product-variation' ), $info_taxonomy->label ),
                    'taxonomy'        => $taxonomy,
                    'name'            => $taxonomy,
                    'orderby'         => 'name',
                    'selected'        => $selected,
                    'show_count'      => true,
                    'hide_empty'      => true,
                ));
            };
        }
        
        public function owcpv_convert_id_to_term_in_query($query) {
            global $pagenow;
            $post_type = 'opal-product'; // change to your post type
            $taxonomy  = 'product_cat'; // change to your taxonomy
            $q_vars    = &$query->query_vars;
            if ( $pagenow == 'edit.php' && isset($q_vars['post_type']) && $q_vars['post_type'] == $post_type && isset($q_vars[$taxonomy]) && is_numeric($q_vars[$taxonomy]) && $q_vars[$taxonomy] != 0 ) {
                $term = get_term_by('id', $q_vars[$taxonomy], $taxonomy);
                $q_vars[$taxonomy] = $term->slug;
            }
        }
        
        public function owcpv_add_cpt_columns( $columns ) {
            $columns['form_product_cat'] = esc_html__('Product Category', 'opal-woo-custom-product-variation');
            $columns['form_active'] = esc_html__('Active', 'opal-woo-custom-product-variation');
            $columns['form_products'] = esc_html__('Products Applied', 'opal-woo-custom-product-variation');
            
            owcpv_swapPos($columns, 'date', 'form_product_cat');
            owcpv_swapPos($columns, 'author', 'form_product_cat');
            owcpv_swapPos($columns, 'date', 'form_active');
            owcpv_swapPos($columns, 'author', 'form_active');
            owcpv_swapPos($columns, 'date', 'form_products');
            owcpv_swapPos($columns, 'author', 'form_products');
            owcpv_swapPos($columns, 'form_active', 'form_products');
            owcpv_swapPos($columns, 'form_product_cat', 'form_products');
            return $columns;
        }
        
        public function owcpv_populate_columns_cpt( $column ) {
            if ( 'form_product_cat' == $column ) {
                $form_product_cat = wc_get_product_category_list(get_the_ID(), ', ');
                echo ($form_product_cat) ? wp_kses_post($form_product_cat) : sprintf('%s', '<span class="na">–</span>');
            }

            if ( 'form_products' == $column ) {
                $products_applied = get_post_meta(get_the_ID(), 'owcpv_form_product', true);
                
                if ($products_applied && is_array($products_applied) && !empty($products_applied)) {
                    ?>
                    <ul class="owcpv_preview_products_applied">
                        <?php
                        foreach ($products_applied as $product) {
                            if ( !get_post_status( $product ) ) continue;

                            $product_name = owcpv_str_short(get_the_title($product), 15);
                            
                            printf(
                                '<li><a href="%1s" target="_blank" title="%2s">%3s</a></li>', 
                                esc_url(get_the_permalink($product)), 
                                esc_html(get_the_title($product)), 
                                esc_html($product_name)
                            );
                        }
                        ?>
                    </ul>
                    <?php
                }
                else {
                    printf('%s', '<span class="na">–</span>');
                }
            }

            if ( 'form_active' == $column ) {
                $active = (get_post_status(get_the_ID()) == 'publish') ? 'checked' : '';
                ?>
                <div class="owcpv_box_toggle_button">
                    <label class="owcpv_toggle toggle_active_form">
                        <input class="owpcv_toggle_input" type="checkbox" <?php echo esc_html($active) ?> data-id="<?php echo esc_html(get_the_ID()) ?>">
                        <div class="owcpv_toggle_switch"></div>
                    </label>
                </div>
                <?php
                // $form_product_cat = wc_get_product_category_list(get_the_ID(), ', ');
                // echo ($form_product_cat) ? $form_product_cat : '<span class="na">–</span>';
            }
        }

        /**
         *  Call View Admin Template
         */
        public static function view($view, $data = array()) {
            extract($data);
            $path_view = apply_filters('owcpv_path_view_admin', OWCPV_PLUGIN_DIR . 'view/backend/' . $view . '.php', $data);
            include($path_view);
        }

        public function owcpv_add_custom_meta_box() {

            // Add Form Builder Box
            add_meta_box("opal_build_form", esc_html__("Build your form", "owcpv"), array($this, 'opal_meta_box_create_form_view'), 'opal-product', "normal", "high", null);

            // Add apply products to form metabox
            add_meta_box( 'owcpv_apply_products', esc_html__('Apply for products', 'opal-woo-custom-product-variation'), array($this, 'owcpv_form_product_metabox'), 'opal-product', 'side', 'default' );

            // Add display settings
            add_meta_box( 'owcpv_display_settings', esc_html__('Display Settings', 'opal-woo-custom-product-variation'), array($this, 'owcpv_display_settings_metabox'), 'opal-product', 'side', 'default' );
            
            // Update author meta box
            remove_meta_box('authordiv', 'opal-product', 'normal');
            add_meta_box( 'authordiv', esc_html__( 'Author', 'opal-woo-custom-product-variation' ), 'post_author_meta_box', 'opal-product', 'side', 'default', array( '__back_compat_meta_box' => true ) );


        }
        
        public function opal_meta_box_create_form_view() {
            self::view('form-general');
        }

        // Save custom field data when the post is saved or updated
        public function owcpv_save_custom_fields_data($post_id) {
            if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

            $settings = [
                'allow_toggle_button' => 0,
                'button_toggle_label' => esc_html__( 'Add Your Personalisation', 'opal-woo-custom-product-variation' ),
                'show_as_default' => 0,
                // 'calculated_total_price' => 1,
                'calculated_option_price' => 1,
                'show_option_detail_price' => 1,
                'use_global_settings' => 1,
                'show_field_price' => 1,
                'show_in_cart' => 1,
                'show_in_order' => 1,
                'show_price_in_cart' => 1,
                'show_price_in_order' => 1,
            ];

            // Set fefault value if not processing import
            foreach ($settings as $key => $value) {
                $default = $value;
                if (!empty($_REQUEST['action']) && $_REQUEST['action'] == 'editpost') {
                    $default = 0;
                }
                $settings[$key] = (isset($_POST[$key])) ? sanitize_key($_POST[$key]) : $default; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                if ($key == 'button_toggle_label') {
                    $settings[$key] = (isset($_POST[$key])) ? esc_html($_POST[$key]) : $default; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                }
            }
            
            $settings = apply_filters('owcpv_settings_data_single_form', wp_json_encode($settings), $post_id);
            update_post_meta($post_id, 'owcpv_settings_value', $settings);
            
            if (isset($_POST['owcpv_json_value']) && !empty($_POST['owcpv_json_value'])) {

                add_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
                $json_value_escaped = esc_html($_POST['owcpv_json_value']); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                remove_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);

                $data_form = $this->owcpv_prepare_data_import_form($json_value_escaped, $post_id);

                if (!$data_form) {
                    wp_die('Your data is incorrect. Please check and try again!', 'opal-woo-custom-product-variation');
                }

                update_post_meta($post_id, 'owcpv_json_value', $data_form);
            }

            if( isset( $_POST['owcpv_form_product'] ) && !empty($_POST['owcpv_form_product'])) {

                $form_product = array_map( 'absint', (array) wp_unslash( $_POST['owcpv_form_product'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended

                foreach ($form_product as $product_id) {
                    $owcpv_form = get_post_meta($product_id, 'owcpv_form', true);
                    $owcpv_form = ($owcpv_form && is_array($owcpv_form)) ? $owcpv_form : [];

                    if (!in_array($post_id, $owcpv_form)) {
                        $owcpv_form[] = $post_id;
                    }
                    if (!empty($owcpv_form)) {
                        update_post_meta( $product_id, 'owcpv_form', $owcpv_form );
                    }
                }

                update_post_meta( $post_id, 'owcpv_form_product', $form_product );
            }
            else {
                delete_post_meta( $post_id, 'owcpv_form_product' );
            }
        }

        public function owcpv_add_hidden_field_in_order_item($item_id, $item, $product) {
            $meta_data = $item->get_all_formatted_meta_data( '' );
            
            $owcpv_meta_key = [];
            foreach ($meta_data as $meta_id => $meta) {
                $owcpv_value = json_decode($meta->value, true);
                $key = 'form_id';
                $is_owcpv_meta = strpos(json_encode($owcpv_value), "\"" . $key . "\":") !== false;
                if ($is_owcpv_meta && is_array($owcpv_value)) {
                    $meta_key = sanitize_title($meta->key);
                    $owcpv_meta_key[] = $meta_key;
                }
            }
    
            add_filter('woocommerce_hidden_order_itemmeta', function($hidden_meta) use ($owcpv_meta_key) {
                $hidden_meta = array_merge($hidden_meta, $owcpv_meta_key);
                return $hidden_meta;
            });

        }
        
        public static function owcpv_order_item_line_item_html($item_id, $item, $product) {
            $owcpv_meta_data = $item->get_meta('owcpv_value');

            $owcpv_meta_data = apply_filters('owcpv_meta_data_item_order', $owcpv_meta_data, $item_id);

            if ($owcpv_meta_data && !empty($owcpv_meta_data)) {
                self::view('order-item-table', ['owcpv_meta_data' => $owcpv_meta_data, 'order' => $item->get_order(), 'item_id' => $item_id]);
            }
        }

        public function owcpv_custom_order_preview_details($data, $order) {
            $data['item_html'] = self::owcpv_get_order_preview_details_html($order);

            return $data;
        }

        /**
         * Get items to display in the preview as HTML.
         *
         * @param  WC_Order $order Order object.
         * @return string
         */
        public static function owcpv_get_order_preview_details_html( $order ) {
            $hidden_order_itemmeta = apply_filters(
                'woocommerce_hidden_order_itemmeta',
                array(
                    '_qty',
                    '_tax_class',
                    '_product_id',
                    '_variation_id',
                    '_line_subtotal',
                    '_line_subtotal_tax',
                    '_line_total',
                    '_line_tax',
                    'method_id',
                    'cost',
                    '_reduced_stock',
                    '_restock_refunded_items',
                )
            );

            $line_items = apply_filters( 'woocommerce_admin_order_preview_line_items', $order->get_items(), $order );
            $columns    = apply_filters(
                'woocommerce_admin_order_preview_line_item_columns',
                array(
                    'product'  => __( 'Product asdasd', 'opal-woo-custom-product-variation' ),
                    'quantity' => __( 'Quantity', 'opal-woo-custom-product-variation' ),
                    'tax'      => __( 'Tax', 'opal-woo-custom-product-variation' ),
                    'total'    => __( 'Total', 'opal-woo-custom-product-variation' ),
                ),
                $order
            );

            if ( ! wc_tax_enabled() ) {
                unset( $columns['tax'] );
            }

            $html = '
            <div class="wc-order-preview-table-wrapper">
                <table cellspacing="0" class="wc-order-preview-table">
                    <thead>
                        <tr>';

            foreach ( $columns as $column => $label ) {
                $html .= '<th class="wc-order-preview-table__column--' . esc_attr( $column ) . '">' . esc_html( $label ) . '</th>';
            }

            $html .= '
                        </tr>
                    </thead>
                    <tbody>';

            foreach ( $line_items as $item_id => $item ) {

                $product_object = is_callable( array( $item, 'get_product' ) ) ? $item->get_product() : null;
                $row_class      = apply_filters( 'woocommerce_admin_html_order_preview_item_class', '', $item, $order );

                $html .= '<tr class="wc-order-preview-table__item wc-order-preview-table__item--' . esc_attr( $item_id ) . ( $row_class ? ' ' . esc_attr( $row_class ) : '' ) . '">';

                foreach ( $columns as $column => $label ) {
                    $html .= '<td class="wc-order-preview-table__column--' . esc_attr( $column ) . '">';
                    switch ( $column ) {
                        case 'product':
                            $html .= wp_kses_post( $item->get_name() );

                            if ( $product_object ) {
                                $html .= '<div class="wc-order-item-sku">' . esc_html( $product_object->get_sku() ) . '</div>';
                            }

                            $meta_data = $item->get_all_formatted_meta_data( '' );

                            // echo '<pre>'; print_r($hidden_order_itemmeta); echo '</pre>';

                            if ( $meta_data ) {
                                $html .= '<table cellspacing="0" class="wc-order-item-meta">';

                                foreach ( $meta_data as $meta_id => $meta ) {
                                    if ( in_array( $meta->key, $hidden_order_itemmeta, true ) ) {
                                        continue;
                                    }
                                    $owcpv_value = json_decode($meta->value, true);
                                    $key = 'form_id';
                                    $is_owcpv_meta = strpos(json_encode($owcpv_value), "\"" . $key . "\":") !== false;
                                    if ($is_owcpv_meta) {
                                        continue;
                                    }

                                    $html .= '<tr><th>' . wp_kses_post( $meta->display_key ) . ':</th><td>' . wp_kses_post( force_balance_tags( $meta->display_value ) ) . '</td></tr>';
                                }
                                $html .= '</table>';

                                ob_start();
                                self::owcpv_order_item_line_item_html($item_id, $item, $product_object);
                                $html .= ob_get_clean();
                            }
                            break;
                        case 'quantity':
                            $html .= esc_html( $item->get_quantity() );
                            break;
                        case 'tax':
                            $html .= wc_price( $item->get_total_tax(), array( 'currency' => $order->get_currency() ) );
                            break;
                        case 'total':
                            $html .= wc_price( $item->get_total(), array( 'currency' => $order->get_currency() ) );
                            break;
                        default:
                            $html .= apply_filters( 'woocommerce_admin_order_preview_line_item_column_' . sanitize_key( $column ), '', $item, $item_id, $order );
                            break;
                    }
                    $html .= '</td>';
                }

                $html .= '</tr>';
            }

            $html .= '
                    </tbody>
                </table>
            </div>';

            return $html;
        }

 
        /*
        * Display the fields inside it
        */
        public function owcpv_form_product_metabox( $post_object ) {
            wp_enqueue_style( 'woocommerce_admin_styles' );
            wp_enqueue_style( 'wc-admin-layout' );
            wp_enqueue_script( 'select2' );
            
            $html = '';
            
            $appended_posts = get_post_meta( $post_object->ID, 'owcpv_form_product',true );
            
            /*
            * Select Posts with AJAX search
            */
            $html .= '<p><select id="owcpv_form_product" name="owcpv_form_product[]" multiple="multiple" style="width:99%;max-width:25em;">';
            if( $appended_posts ) {
                foreach( $appended_posts as $post_id ) {
                    $title = get_the_title( $post_id );
                    $title = ( mb_strlen( $title ) > 50 ) ? mb_substr( $title, 0, 49 ) . '...' : $title;
                    $html .=  '<option value="' . $post_id . '" selected="selected">' . $title . '</option>';
                }
            }
            $html .= '</select></p>';
            
            $html_allow = array( 
                'p' => array(), 
                'select' => array(
                    'id' => array(),
                    'name' => array(),
                    'multiple' => array(),
                    'style' => array(),
                ), 
                'option' => array(
                    'value' => array(),
                    'selected' => array()
                )
            );
            
            // print escape $html;
            echo wp_kses($html, $html_allow);
        }

        public function owcpv_display_settings_metabox($post_object) {
            self::view('form-settings-single', ['form_id' => $post_object->ID]);
        }

        public function owcpv_add_custom_header_admin() {
            global $post_type_object, $typenow, $pagenow, $current_screen;
            if($typenow == 'opal-product' && in_array($current_screen->base, ['post', 'edit'])) {
                $post_type_object = get_post_type_object( $typenow );

                $sample_fields = array(
                    array(
                        'image' => OWCPV_PLUGIN_URL . 'assets/images/sample-1.jpg',
                        'data' => '[{"type":"radio-group","required":false,"label":"Color Option","inline":false,"other":false,"priceCheckbox":true,"priceOptions":"percent","radiosubtype":"color-option","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"radio-group-1699349852201-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","owcpvValue":"#dd9933","priceValue":"10","selected":false},{"label":"Option 2","value":"1","owcpvValue":"#dd3333","priceValue":"15","selected":false},{"label":"Option 3","value":"2","owcpvValue":"#81d742","priceValue":"20","selected":false}]},{"type":"radio-group","required":false,"label":"Image Option","inline":false,"other":false,"priceCheckbox":true,"priceOptions":"fixed","radiosubtype":"image-option","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"radio-group-1699349873519-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","owcpvValue":"http:\/\/wpdemo.local\/wp-content\/uploads\/2023\/11\/tshirt-2.jpg","priceValue":"10","selected":false},{"label":"Option 2","value":"1","owcpvValue":"http:\/\/wpdemo.local\/wp-content\/uploads\/2023\/11\/hoodie-green-1.jpg","priceValue":"20","selected":false}]},{"type":"select","required":false,"label":"Select","priceCheckbox":true,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"select-1699351504455-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","owcpvValue":"","priceValue":"10","selected":true},{"label":"Option 2","value":"1","owcpvValue":"","priceValue":"20","selected":false},{"label":"Option 3","value":"2","owcpvValue":"","priceValue":"15","selected":false}]},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"other":false,"priceCheckbox":true,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"checkbox-group-1699351514607-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","owcpvValue":"","priceValue":"10","selected":true},{"label":"Option 2","value":"1","owcpvValue":"","priceValue":"11","selected":false},{"label":"Option 3","value":"2","owcpvValue":"","priceValue":"12","selected":false}]}]',
                    ),
                    array(
                        'image' => OWCPV_PLUGIN_URL . 'assets/images/sample-2.jpg',
                        'data' => '[{"type":"file","subtype":"fineuploader","required":false,"label":"File Upload","priceCheckbox":false,"priceOptions":"percent","type_allow":"jpg,jpeg,png,svg","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"file-1699242102792-0","enabelConditional":true,"logicAction":"show","condition_field_0":"attribute","condition_relation_0":"0","condition_relation_attr_0":"logo","condition_value_stock_0":"instock","condition_value_attr_0":"yes","condition_operator_0":"and"},{"type":"number","required":false,"label":"Your high (Cm)<br>","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"number-1699240908070-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and"},{"type":"text","subtype":"color","required":false,"label":"Color<br>","value":"#3c434a","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"text-1699240948141-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and"},{"type":"date","required":false,"label":"Select delivery date","description":"Your order will be delivered to you on this date","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"date-1699240997750-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and"},{"type":"radio-group","required":false,"label":"Zipper<br>","inline":false,"other":false,"priceCheckbox":true,"priceOptions":"percent","radiosubtype":"image-option","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"radio-group-1699241161680-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and","values":[{"label":"Without zipper","value":"0","priceValue":"10","owcpvValue":"\/wp-content\/plugins\/opal-woo-custom-product-variation\/assets/images\/hoodie-green-1.jpg","selected":false},{"label":"With zipper","value":"1","priceValue":"12","owcpvValue":"\/wp-content\/plugins\/opal-woo-custom-product-variation\/assets/images\/hoodie-with-zipper-2.jpg","selected":false},{"label":"With logo","value":"2","priceValue":"15","owcpvValue":"\/wp-content\/plugins\/opal-woo-custom-product-variation\/assets/images\/hoodie-with-logo-2.jpg","selected":false}]}]',
                    ),
                    array(
                        'image' => OWCPV_PLUGIN_URL . 'assets/images/sample-3.jpg',
                        'data' => '[{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"other":false,"priceCheckbox":true,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"checkbox-group-1703735441945-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"brand","condition_value_stock_0":"instock","condition_value_attr_0":"alaska","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","owcpvValue":"","priceValue":"10","selected":true},{"label":"Option 2","value":"1","owcpvValue":"","priceValue":"15","selected":false}]},{"type":"radio-group","required":false,"label":"Radio Group","other":false,"priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"radio-group-1703735443585-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"brand","condition_value_stock_0":"instock","condition_value_attr_0":"alaska","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","owcpvValue":"","priceValue":"","selected":false},{"label":"Option 2","value":"1","owcpvValue":"","priceValue":"","selected":false},{"label":"Option 3","value":"2","owcpvValue":"","priceValue":"","selected":false}]},{"type":"number","required":false,"label":"Number","placeholder":"Write a number...","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"number-1703735555308-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"brand","condition_value_stock_0":"instock","condition_value_attr_0":"alaska","condition_operator_0":"and"},{"type":"text","required":false,"label":"Text Field","placeholder":"Write something...","subtype":"text","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"text-1703735584488-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"brand","condition_value_stock_0":"instock","condition_value_attr_0":"alaska","condition_operator_0":"and"},{"type":"textarea","required":false,"label":"Text Area","placeholder":"Write something...","subtype":"textarea","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"textarea-1703735597149-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"brand","condition_value_stock_0":"instock","condition_value_attr_0":"alaska","condition_operator_0":"and"},{"type":"date","required":false,"label":"Date Field","subtype":"date","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"date-1703735612327-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"brand","condition_value_stock_0":"instock","condition_value_attr_0":"alaska","condition_operator_0":"and"}]',
                    ),
                    array(
                        'image' => OWCPV_PLUGIN_URL . 'assets/images/sample-4.jpg',
                        'data' => '[{"type":"radio-group","required":false,"label":"Color Option","other":false,"priceCheckbox":false,"priceOptions":"percent","radiosubtype":"color-option","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"radio-group-1699241446260-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","priceValue":"","owcpvValue":"#dd3333","selected":false},{"label":"Option 2","value":"1","priceValue":"","owcpvValue":"#eeee22","selected":false},{"label":"Option 3","value":"2","priceValue":"","owcpvValue":"#81d742","selected":false}]},{"type":"text","subtype":"color","required":false,"label":"Color Picker","value":"#1e73be","priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"text-1699241448437-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and"},{"type":"radio-group","required":false,"label":"Image Option","other":false,"priceCheckbox":false,"priceOptions":"percent","radiosubtype":"image-option","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"radio-group-1699241446929-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and","values":[{"label":"Option 1","value":"0","priceValue":"","owcpvValue":"\/wp-content\/plugins\/opal-woo-custom-product-variation\/assets/images\/vneck-tee-2.jpg","selected":false},{"label":"Option 3","value":"1","priceValue":"","owcpvValue":"\/wp-content\/plugins\/opal-woo-custom-product-variation\/assets/images\/vnech-tee-blue-1.jpg","selected":false},{"label":"Option 2","value":"2","priceValue":"","owcpvValue":"\/wp-content\/plugins\/opal-woo-custom-product-variation\/assets/images\/vnech-tee-green-1.jpg","selected":false},{"label":"Option 4","value":"3","priceValue":"","owcpvValue":"\/wp-content\/plugins\/opal-woo-custom-product-variation\/assets/images\/t-shirt-with-logo-1.jpg","selected":false}]},{"type":"file","subtype":"fineuploader","required":false,"label":"File Upload","multiple":false,"priceCheckbox":false,"priceOptions":"percent","hideFieldCart":false,"hideFieldOrder":false,"className":"form-control","name":"file-1699241442653-0","enabelConditional":false,"logicAction":"show","condition_field_0":"0","condition_relation_0":"0","condition_relation_attr_0":"color","condition_value_stock_0":"instock","condition_value_attr_0":"blue","condition_operator_0":"and"}]',
                    ),
                );

                self::view('admin-header', [
                    'export_link' => $this->owcpv_get_export_form_link(get_the_ID()),
                    'sample_fields' => apply_filters('owcpv_get_data_sample_fields_import', $sample_fields)
                ]);
            }
        }

        public function owcpv_remove_notice_cpt() {
            global $post_type_object, $typenow, $pagenow, $current_screen;
            if (get_post_type() == $typenow && in_array( $pagenow, array( 'post.php') )) {
                remove_all_actions( 'admin_notices' );
            }
        }

        public function owcpv_load_product_meta_box(){
            check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

            $return = array();
        
            $search_results = new WP_Query( array( 
                's'=> wc_clean($_GET['q']), // the search query
                'post_status' => 'publish', // if you don't want drafts to be returned
                'ignore_sticky_posts' => 1,
                'post_type' => 'product',
                'posts_per_page' => 50 // how much to show at once
            ) );
            if( $search_results->have_posts() ) :
                while( $search_results->have_posts() ) : $search_results->the_post();	
                    // shorten the title a little
                    $title = ( mb_strlen( $search_results->post->post_title ) > 50 ) ? mb_substr( $search_results->post->post_title, 0, 49 ) . '...' : $search_results->post->post_title;
                    $return[] = array( $search_results->post->ID, $title );
                endwhile;
            endif;
            echo wp_json_encode( $return );
            die;
        }

        public function owcpv_handle_import_form() {
            check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

            if (isset($_FILES['owcpv_file_import']["error"]) && absint($_FILES['owcpv_file_import']["error"]) != 4) {
                if (absint($_FILES['owcpv_file_import']["error"]) == UPLOAD_ERR_INI_SIZE) {
                    $error_message = esc_html__('The uploaded file exceeds the maximum upload limit', 'opal-woo-custom-product-variation');
                } else if (in_array(absint($_FILES['owcpv_file_import']["error"]), array(UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE))) {
                    $error_message = esc_html__('The uploaded file exceeds the maximum upload limit', 'opal-woo-custom-product-variation');
                }
                $ext = pathinfo(wc_clean( wp_unslash($_FILES['owcpv_file_import']['name'])), PATHINFO_EXTENSION);
                if ($ext != 'json' || wc_clean($_FILES['owcpv_file_import']['type']) != 'application/json') {
                    $error_message = esc_html__('Only allow upload Json(.json) file', 'opal-woo-custom-product-variation');
                }
            }
            else {
                $error_message = esc_html__('Please upload a file to import', 'opal-woo-custom-product-variation');
            }

            // phpcs:ignore Generic.PHP.NoSilencedErrors.Discouraged, WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
            $data_upload = file_get_contents(wc_clean( wp_unslash($_FILES['owcpv_file_import']['tmp_name'])));
            $data_upload = json_decode($data_upload, true);

            $data_form = $this->owcpv_prepare_data_import_form($data_upload['data_form']);

            if (!$data_form) {
                $error_message = esc_html__('Your file is not in the correct format or the data is incorrect. Please check and try again!', 'opal-woo-custom-product-variation');
            }

            if (isset($error_message)) {
                $error = new \WP_Error( 'file_error', $error_message );
                if ( is_wp_error( $error ) ) {
                    _default_wp_die_handler( $error->get_error_message(), 'OWCPV' );
                }
            }

            $form_arr = array(
                'post_title'   => esc_html__('OWCPV Form', 'opal-woo-custom-product-variation'),
                'post_status'  => 'draft',
                'post_author'  => get_current_user_id(),
                'post_type'    => 'opal-product',
                'tax_input'    => array(
                    'product_cat' => $data_upload['product_cats'],
                ),
                'meta_input'   => array(
                    'owcpv_form_product' => $data_upload['products_apply'],
                    'owcpv_settings_value' => $data_upload['form_settings'],
                    'owcpv_json_value' => $data_form,
                ),
            );

            // Skip update meta form
            remove_action('save_post_opal-product', [$this, 'owcpv_save_custom_fields_data'], 10);

            $insert_form = wp_insert_post($form_arr);
            if ( is_wp_error( $insert_form ) ) {
                _default_wp_die_handler( $insert_form->get_error_message(), 'OWCPV' );
            }

            // Add form to product
            if (!empty($data_upload['products_apply']) && is_array($data_upload['products_apply'])) {
                $form_product = array_map( 'absint', (array) wp_unslash( $data_upload['products_apply'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                foreach ($form_product as $product_id) {
                    $owcpv_form = get_post_meta($product_id, 'owcpv_form', true);
                    $owcpv_form = ($owcpv_form && is_array($owcpv_form)) ? $owcpv_form : [];
    
                    if (!in_array($insert_form, $owcpv_form)) {
                        $owcpv_form[] = $insert_form;
                    }
                    if (!empty($owcpv_form)) {
                        update_post_meta( $product_id, 'owcpv_form', $owcpv_form );
                    }
                }
            }

            redirect_post($insert_form);
            wp_die();
        }

        public function owcpv_handle_import_sample_fields() {
            check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );


            if (!isset($_POST['owcpv_import_sample']) || empty($_POST['owcpv_import_sample'])) {
                $error = new \WP_Error( 'sample_error', esc_html__('Please choose a sample to import', 'opal-woo-custom-product-variation') );
                if ( is_wp_error( $error ) ) {
                    _default_wp_die_handler( $error->get_error_message(), 'OWCPV' );
                }
            }

            add_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
            $import_sample_escaped = esc_html($_POST['owcpv_import_sample']);
            remove_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);

            $data_form = $this->owcpv_prepare_data_import_form($import_sample_escaped);
            if (!$data_form) {
                $error = new \WP_Error( 'sample_error', esc_html__('Your file is not in the correct format or the data is incorrect. Please check and try again!', 'opal-woo-custom-product-variation') );
                if ( is_wp_error( $error ) ) {
                    _default_wp_die_handler( $error->get_error_message(), 'OWCPV' );
                }
            }
            // $data_form = $import_sample_escaped;

            $form_arr = array(
                'post_title'   => esc_html__('OWCPV Form Sample', 'opal-woo-custom-product-variation'),
                'post_status'  => 'draft',
                'post_author'  => get_current_user_id(),
                'post_type'    => 'opal-product',
                'meta_input'   => array(
                    'owcpv_json_value' => $data_form,
                ),
            );

            $insert_form = wp_insert_post($form_arr);
            if ( is_wp_error( $insert_form ) ) {
                _default_wp_die_handler( $insert_form->get_error_message(), 'OWCPV' );
            }

            redirect_post($insert_form);
            wp_die();
        }

        public function owcpv_remove_product_of_form() {
            check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

            if(!isset($_POST['product_id']) || empty($_POST['product_id'])) return;
            if(!isset($_POST['form_id']) || empty($_POST['form_id'])) return;

            $product_id = absint($_POST['product_id']);
            $form_id = absint($_POST['form_id']);

            $forms_of_product = owcpv_get_form_of_product($product_id);

            foreach ($forms_of_product as $key => $form) {
                if ($form_id == $form) {
                    unset($forms_of_product[$key]);
                }
            }
            $forms_of_product = array_values($forms_of_product);

            if(!empty($forms_of_product)) {
                update_post_meta( $product_id, 'owcpv_form', $forms_of_product );
            }
            else {
                delete_post_meta( $product_id, 'owcpv_form' );
            }

            esc_html_e('Removed product!', 'opal-woo-custom-product-variation');

            wp_die();
        }

        public function owcpv_update_status_form() {
            check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

            if(!isset($_POST['form_id']) || empty($_POST['form_id'])) return;
            if(!isset($_POST['checked']) || empty($_POST['checked'])) return;

            $form_id = absint($_POST['form_id']);
            $status = (wc_clean($_POST['checked']) === 'true') ? 'publish' : 'draft';

            $updated = wp_update_post(array(
                'ID' => $form_id,
                'post_status' => $status,
            ));

            $message = (wc_clean($_POST['checked']) === 'true') ? esc_html__('Active successfully!', 'opal-woo-custom-product-variation') : esc_html__('Deactive successfully!', 'opal-woo-custom-product-variation');
            wp_send_json( [
                'status' => (!is_wp_error($updated) && $updated) ? 'success' : 'failure',
                'message' => (!is_wp_error($updated) && $updated) ? $message : esc_html__('An error has occurred!', 'opal-woo-custom-product-variation')
            ] );

            wp_die();
        }

        public function owcpv_form_export() {
            check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

            $form_id = absint($_REQUEST['form_id']);
            if (empty($form_id)) die();

            $file_data = $this->prepare_template_export( $form_id );

            if ( is_wp_error( $file_data ) ) {
                return $file_data;
            }

            owcpv_send_file_headers( $file_data['name'], strlen( $file_data['content'] ) );

            // Clear buffering just in case.
            @ob_end_clean();

            flush();

            add_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);
            // Output file contents.
            // PHPCS - Export widget json
            echo esc_html($file_data['content']);

            remove_filter('esc_html', 'owcpv_prevent_escape_html', 99, 2);

            die;
        }

        public function owcpv_form_clone() {
            check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

            $form_id = absint($_REQUEST['form_id']);
            if (empty($form_id)) die();

            $data_form = get_post_meta($form_id, 'owcpv_json_value', true);
            $products_apply = get_post_meta($form_id, 'owcpv_form_product', true);
            $form_settings = get_post_meta($form_id, 'owcpv_settings_value', true);
            $product_cats = wp_get_post_terms($form_id, 'product_cat', array('fields' => 'ids'));

            $form_arr = array(
                'post_title'   => get_the_title($form_id) . ' - Clone',
                'post_status'  => 'draft',
                'post_author'  => get_current_user_id(),
                'post_type'    => 'opal-product',
                'tax_input'    => array(
                    'product_cat' => $product_cats,
                ),
                'meta_input'   => array(
                    'owcpv_form_product' => $products_apply,
                    'owcpv_settings_value' => $form_settings,
                    'owcpv_json_value' => $data_form,
                ),
            );

            // Skip update meta form
            remove_action('save_post_opal-product', [$this, 'owcpv_save_custom_fields_data'], 10);

            $insert_form = wp_insert_post($form_arr);
            if ( is_wp_error( $insert_form ) ) {
                _default_wp_die_handler( $insert_form->get_error_message(), 'OWCPV' );
            }

            $post_type = 'opal-product';
            $sendback  = wp_get_referer();
            $sendback = add_query_arg( 'post_type', $post_type, $sendback );

            // Redirect to the list screen.
            \wp_safe_redirect(
                \add_query_arg(
                    [
                        // 'cloned' => 1,
                        // 'ids'    => $post->ID,
                    ],
                    $sendback
                )
            );
            exit();
        }

        private function prepare_template_export($form_id) {
            $data_form = get_post_meta($form_id, 'owcpv_json_value', true);
            $products_apply = get_post_meta($form_id, 'owcpv_form_product', true);
            $form_settings = get_post_meta($form_id, 'owcpv_settings_value', true);
            $product_cats = wp_get_post_terms($form_id, 'product_cat', array('fields' => 'ids'));

            $export_content = [
                'data_form' => $data_form,
                'products_apply' => $products_apply,
                'product_cats' => $product_cats,
                'form_settings' => $form_settings,
            ];

            $file_data = [
                'name' => 'owcpv-form-' . $form_id . '-' . gmdate( 'Y-m-d' ) . '.json',
                'content' =>  wp_json_encode( $export_content ),
            ];

            return $file_data;
        }

        private function owcpv_prepare_data_import_form($data_upload, $post_id = false) {
            $raw_data = json_decode(wp_unslash($data_upload));
            if ($raw_data && is_array($raw_data)) {
                $list_fields = [];
                foreach ($raw_data as $index => $field) {
                    if (isset($field->name)) {
                        $i = 0;
                        if ($post_id) {
    
                            $field_exist = owcpv_check_field_exist($field->name, $i, true);
                            if (isset($field_exist[0]->post_id) && $field_exist[0]->post_id == $post_id) {
                                if (!in_array($field->name, $list_fields)) {
                                    $list_fields[] = $field->name;
                                    continue;
                                }
                            }
                        }
    
                        $field_in_arr = $field->name;
                        while (owcpv_check_field_exist($field->name, $i) || in_array($field_in_arr, $list_fields)) {
                            $i++;
                            $field_in_arr = $field->name.'-'.$i;
                        } 
                        if ($i > 0) {
                            $raw_data[$index]->name .= '-'. $i;
                        }
                        $list_fields[] = $raw_data[$index]->name;
                    }
                }
                $data_upload = wp_unslash(wp_json_encode($raw_data, JSON_UNESCAPED_UNICODE));
            }
            else {
                $data_upload = false;
            }

            // echo '<pre>'; print_r($data_upload); echo '</pre>'; die();
            return apply_filters('owcpv_prepare_data_import_form', $data_upload);
        }

        private function owcpv_get_export_form_link($form_id, $print = false) {
            if ($print) {
                echo esc_url(admin_url( 'admin-ajax.php' ).'?action=owcpv_form_export&form_id='.$form_id.'&ajax_nonce_parameter='.wp_create_nonce( "owcpv-nonce-ajax" ));
            } else {
                return esc_url(admin_url( 'admin-ajax.php' ).'?action=owcpv_form_export&form_id='.$form_id.'&ajax_nonce_parameter='.wp_create_nonce( "owcpv-nonce-ajax" )); 
            }
        }
        
        private function owcpv_get_clone_form_link($form_id, $print = false) {
            if ($print) {
                echo esc_url(admin_url( 'admin-ajax.php' ).'?action=owcpv_form_clone&form_id='.$form_id.'&ajax_nonce_parameter='.wp_create_nonce( "owcpv-nonce-ajax" ));
            } else {
                return esc_url(admin_url( 'admin-ajax.php' ).'?action=owcpv_form_clone&form_id='.$form_id.'&ajax_nonce_parameter='.wp_create_nonce( "owcpv-nonce-ajax" )); 
            }
        }

        public function owcpv_remove_postbox() {
            if( 'opal-product' === get_current_screen()->post_type ) {
                wp_deregister_script( 'postbox' );
                wp_enqueue_script('wp-a11y');
                wp_enqueue_script('tags-box');
                wp_enqueue_script('tags-suggest');
                wp_enqueue_script('quicktags');
            }
        }
    }

endif;

