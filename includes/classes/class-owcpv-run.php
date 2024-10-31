<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Class OWCPV_Run
 *
 * Thats where we bring the plugin to life
 *
 * @package		OPALWOOCU
 * @subpackage	Classes/OWCPV_Run
 * @author		Opal
 * @since		1.0.0
 */
class OWCPV_Run{

	/**
	 * Our OWCPV_Run constructor 
	 * to run the plugin logic.
	 *
	 * @since 1.0.0
	 */
	function __construct(){
		$this->add_hooks();
	}

	/**
	 * ######################
	 * ###
	 * #### WORDPRESS HOOKS
	 * ###
	 * ######################
	 */

	/**
	 * Registers all WordPress and plugin related hooks
	 *
	 * @access	private
	 * @since	1.0.0
	 * @return	void
	 */
	private function add_hooks(){
	
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_backend_scripts_and_styles' ), 20 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts_and_styles' ), 20 );		
	
	}

	/**
	 * ######################
	 * ###
	 * #### WP Global Data
	 * ###
	 * ######################
	 */
	private function owcpv_print_global_data()
    {
		$owcpv_global_vars = [];

        if (owcpv_check_woocommerce_active()) {
            $attr_tax = wc_get_attribute_taxonomies();
            $attributes = array();
            // $owcpv_global_vars['attr_values'] = [];
            foreach ($attr_tax as $atr) {
                $temp['attribute_id'] = $atr->attribute_name;
                $temp['attribute_label'] = ucwords($atr->attribute_label);
                $temp['attribute_name'] = $atr->attribute_name;
                $terms = get_terms(array(
                    'taxonomy' => wc_attribute_taxonomy_name($atr->attribute_name),
                    'hide_empty' => false,
                    // 'fields' => 'slug=>name'
                ));
                $attributes[] = $temp;

                foreach ($terms as $term) {
                	$owcpv_global_vars['attr_values'][$term->slug] = [
                		'type' => $atr->attribute_name,
                		'label' => ucwords($term->name),
                	];
                }
            }
            $owcpv_global_vars['attributes'] = $attributes;

			$args = array(
				'post_type' => 'opal-product', 
				'numberposts' => -1, 
				// 'exclude' => array($post ? $post->ID : 0)
			);
            $forms = get_posts($args);

            $owcpv_global_vars['forms_list'] = array_map(function ($e) {
                return ['ID' => $e->ID, 'title' => $e->post_title];
            }, $forms);

        }

		return $owcpv_global_vars; 
    }

	/**
	 * ######################
	 * ###
	 * #### WP Translations Data
	 * ###
	 * ######################
	 */
	private function owcpv_print_translations_data() {
        require OWCPV_PLUGIN_DIR.'includes/helpers/translation.php';
        wp_localize_script('form-builder-lib', 'owcpv_trans_lib', $translations_lib);
        wp_localize_script('form-render-lib', 'owcpv_trans_lib', $translations_lib);

        wp_localize_script('form-builder-lib', 'owcpv_pluin_url', ['plugin_url' => OWCPV_PLUGIN_URL]);
        wp_localize_script('form-render-lib', 'owcpv_pluin_url', ['plugin_url' => OWCPV_PLUGIN_URL]);

        wp_localize_script('opalwoocu-backend-scripts', 'owcpv_trans', $translations);
        wp_localize_script('opalwoocu-frontend-scripts', 'owcpv_trans', $translations);
    }

	/**
	 * Enqueue the backend related scripts and styles for this plugin.
	 * All of the added scripts andstyles will be available on every page within the backend.
	 *
	 * @access	public
	 * @since	1.0.0
	 *
	 * @return	void
	 */
	public function enqueue_backend_scripts_and_styles() {
		global $post_type_object, $typenow, $pagenow, $current_screen;

		// Register Scripts
		wp_register_script( 'form-builder-lib', OWCPV_PLUGIN_URL . 'assets/js/libs/form-builder.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'form-repeater-lib', OWCPV_PLUGIN_URL . 'assets/js/libs/form-repeater.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'toast-notice-script', OWCPV_PLUGIN_URL . 'assets/js/libs/jquery.toast.min.js', array( 'jquery' ), OWCPV_VERSION, true );

		wp_register_script( 'edit-form-scripts', OWCPV_PLUGIN_URL . 'assets/js/backend/edit-form-scripts.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'opalwoocu-backend-scripts', OWCPV_PLUGIN_URL . 'assets/js/backend/backend-scripts.js', array( 'jquery' ), OWCPV_VERSION, true );

		wp_register_script( 'owcpv-popup-lib', OWCPV_PLUGIN_URL . 'assets/js/libs/owcpv-popup.min.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'flatpickr-lib', OWCPV_PLUGIN_URL . 'assets/js/libs/flatpickr.min.js', array( 'jquery' ), OWCPV_VERSION, true );
		
		wp_register_style( 'owcpv-popup-styles', OWCPV_PLUGIN_URL . 'assets/css/libs/owcpv-popup.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'opalwoocu-backend-styles', OWCPV_PLUGIN_URL . 'assets/css/backend-styles.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'opalwoocu-formbuilder-styles', OWCPV_PLUGIN_URL . 'assets/css/libs/form-builder.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'toast-notice-style', OWCPV_PLUGIN_URL . 'assets/css/libs/jquery.toast.min.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'flatpickr-style', OWCPV_PLUGIN_URL . 'assets/css/libs/flatpickr.min.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'owcpv-fontawesome', OWCPV_PLUGIN_URL . 'assets/css/libs/fontawesome.min.css', array(), OWCPV_VERSION, 'all' );

		wp_localize_script( 'edit-form-scripts', 'opalwoocu', array(
			'plugin_name'   	=> OWCPV_NAME,
			'plugin_url'   		=> OWCPV_PLUGIN_URL,
			'ajaxurl' 			=> admin_url( 'admin-ajax.php' ),
			'security_nonce'	=> wp_create_nonce( "owcpv-nonce-ajax" ),
			'default_image'		=> OWCPV_PLUGIN_URL.'/assets/images/default-image.jpg'
		));

		wp_localize_script( 'opalwoocu-backend-scripts', 'opaladmin', array(
			'ajaxurl' 			=> admin_url( 'admin-ajax.php' ),
			'security_nonce'	=> wp_create_nonce( "owcpv-nonce-ajax" )
		));

		wp_localize_script('edit-form-scripts', 'owcpv_backend_formbuilder_vars', $this->owcpv_print_global_data());

		wp_enqueue_script( 'form-builder-lib' );
		wp_enqueue_script( 'form-repeater-lib' );
		wp_enqueue_script( 'toast-notice-script' );
		wp_enqueue_script( 'opalwoocu-backend-scripts' );

		if($typenow == 'opal-product' && in_array($current_screen->base, ['post', 'edit'])) {
			wp_enqueue_script( 'edit-form-scripts' );
			wp_enqueue_script( 'owcpv-popup-lib' );
			wp_enqueue_style( 'owcpv-popup-styles' );
			wp_enqueue_script( 'flatpickr-lib' );
			wp_enqueue_style( 'flatpickr-style' );
		}

		if($typenow == 'product') {
			wp_enqueue_script( 'edit-form-scripts' );
			wp_enqueue_style( 'owcpv-fontawesome' );
		}

		wp_enqueue_style( 'opalwoocu-backend-styles' );
		wp_enqueue_style( 'opalwoocu-formbuilder-styles' );
		wp_enqueue_style( 'toast-notice-style' );

		wp_enqueue_media();
		wp_enqueue_script('wp-color-picker');
    	wp_enqueue_style('wp-color-picker');

		$this->owcpv_print_translations_data();
	}

	
	/**
	 * Enqueue the frontend related scripts and styles for this plugin.
	 *
	 * @access	public
	 * @since	1.0.0
	 *
	 * @return	void
	 */
	public function enqueue_frontend_scripts_and_styles() {

		wp_register_script( 'form-render-lib', OWCPV_PLUGIN_URL . 'assets/js/libs/form-render.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'opalwoocu-cart-scripts', OWCPV_PLUGIN_URL . 'assets/js/frontend/cart-scripts.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'owcpv-popup-lib', OWCPV_PLUGIN_URL . 'assets/js/libs/owcpv-popup.min.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'flatpickr-lib', OWCPV_PLUGIN_URL . 'assets/js/libs/flatpickr.min.js', array( 'jquery' ), OWCPV_VERSION, true );
		wp_register_script( 'opalwoocu-frontend-scripts', OWCPV_PLUGIN_URL . 'assets/js/frontend/frontend-scripts.js', array( 'jquery', 'accounting' ), OWCPV_VERSION, true );
		
		wp_register_style( 'opalwoocu-frontend-styles', OWCPV_PLUGIN_URL . 'assets/css/frontend-styles.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'opalwoocu-formrender-styles', OWCPV_PLUGIN_URL . 'assets/css/libs/form-render.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'owcpv-popup-styles', OWCPV_PLUGIN_URL . 'assets/css/libs/owcpv-popup.css', array(), OWCPV_VERSION, 'all' );
		wp_register_style( 'flatpickr-style', OWCPV_PLUGIN_URL . 'assets/css/libs/flatpickr.min.css', array(), OWCPV_VERSION, 'all' );
		
		wp_register_style( 'owcpv-fontawesome', OWCPV_PLUGIN_URL . 'assets/css/libs/fontawesome.min.css', array(), OWCPV_VERSION, 'all' );
		
		wp_localize_script( 'opalwoocu-frontend-scripts', 'opalwoocu', array(
			'currency_format_num_decimals' => wc_get_price_decimals(),
			'currency_format_symbol'       => get_woocommerce_currency_symbol(),
			'currency_format_decimal_sep'  => esc_attr( wc_get_price_decimal_separator() ),
			'currency_format_thousand_sep' => esc_attr( wc_get_price_thousand_separator() ),
			'currency_format'              => esc_attr( str_replace( array( '%1$s', '%2$s' ), array( '%s', '%v' ), get_woocommerce_price_format() ) ),

			'plugin_name'   	=> OWCPV_NAME,
			'plugin_url'   		=> OWCPV_PLUGIN_URL,
			'ajaxurl' 			=> admin_url( 'admin-ajax.php' ),
			'security_nonce'	=> wp_create_nonce( "owcpv-nonce-ajax" ),
		));

		if (is_cart()) {
			wp_enqueue_script( 'opalwoocu-cart-scripts' );
			wp_enqueue_script( 'owcpv-popup-lib' );
			wp_enqueue_script( 'form-render-lib' );
			wp_enqueue_script( 'flexslider' );
			wp_enqueue_script( 'opalwoocu-frontend-scripts' );
			
			wp_enqueue_style( 'owcpv-popup-styles' );
			wp_enqueue_style( 'opalwoocu-frontend-styles' );
			wp_enqueue_style( 'opalwoocu-formrender-styles' );

			wp_enqueue_script( 'flatpickr-lib' );
			wp_enqueue_style( 'flatpickr-style' );
		}

		if (is_singular('product')) {
			wp_enqueue_script( 'flatpickr-lib' );
			wp_enqueue_script( 'form-render-lib' );
			wp_enqueue_script( 'opalwoocu-frontend-scripts' );
			
			wp_enqueue_style( 'owcpv-fontawesome' );
			wp_enqueue_style( 'flatpickr-style' );
			wp_enqueue_style( 'opalwoocu-frontend-styles' );
			wp_enqueue_style( 'opalwoocu-formrender-styles' );
			wp_enqueue_script( 'flexslider' );
			
			// if (!class_exists('Flatsome_Default')) {
				wp_enqueue_script( 'owcpv-popup-lib' );
				wp_enqueue_style( 'owcpv-popup-styles' );
			// }

			$product = wc_get_product(get_the_ID());
			$stock_status = $product->get_stock_status();
			$stock_quantity = $product->get_stock_quantity();
			
			$product_data = array(
				'stock_status'	=> $stock_status,
				'stock_quantity'	=> $stock_quantity,
				'product_id' => get_the_ID(),
			);

			if ( $product->is_type( 'variable' ) ) {
				$product_variations = $product->get_available_variations();
				$stock_quantity = [];
				
				foreach ($product_variations as $variation)  {
					$variation_id = $variation['variation_id'];
        			$variation_obj = new WC_Product_Variation( $variation_id );
					$stock_status = $variation_obj->get_stock_status();
            		$stock_qty = $variation_obj->get_stock_quantity();
					// $variation['attributes']['variation_id'] = $variation['variation_id'];

					$var_data = $variation['attributes'];
					$var_data['stock_status'] = $stock_status;
					$var_data['stock_quantity'] = $stock_qty;
					$var_data['display_price'] = $variation['display_price'];

					$product_data['variation'][$variation['variation_id']] = $var_data;
				}
			}

			wp_localize_script( 'opalwoocu-frontend-scripts', 'owcpv_product', $product_data);
		}

		$this->owcpv_print_translations_data();

	}


}
