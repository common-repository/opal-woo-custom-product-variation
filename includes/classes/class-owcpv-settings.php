<?php
use Automattic\WooCommerce\Admin\Features\Features;
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Class OWCPV_Settings
 *
 * This class contains all of the plugin settings.
 * Here you can configure the whole plugin data.
 *
 * @package		OWCPV
 * @subpackage	Classes/OWCPV_Settings
 * @author		Opal
 * @since		1.0.0
 */
class OWCPV_Settings{

	/**
	 * The plugin name
	 *
	 * @var		string
	 * @since   1.0.0
	 */
	private $plugin_name;

	private $settings = [];

	/**
	 * Our OWCPV_Settings constructor 
	 * to run the plugin logic.
	 *
	 * @since 1.0.0
	 */
	function __construct(){

		$this->settings = $this->owcpv_get_settings_default();
		$this->plugin_name = OWCPV_NAME;
		$plugin = OWCPV_PLUGIN_BASE;
		
        add_filter("plugin_action_links_$plugin", array($this, 'add_settings_link'));

		register_activation_hook(OWCPV_PLUGIN_FILE, array($this, 'install'));
		register_activation_hook(OWCPV_PLUGIN_FILE, array($this, 'owcpv_deactive_without_woocommerce'));
		register_deactivation_hook(OWCPV_PLUGIN_FILE, array($this, 'deactivation'));

		add_action(OWCPV_CRON_HOOK, array($this, 'owcpv_delete_temp_files'));
		add_action('admin_init', array($this, 'owcpv_trigger_deactice_addon_without_woocommerce'));

		add_action( 'init', [$this, 'register_post_types' ] );
		add_action( 'admin_menu', [$this, 'owcpv_custom_submenu' ] );

		add_action( 'wp_ajax_owcpv_handle_settings_form', [$this, 'owcpv_handle_settings_form'] );
		add_action( 'wp_ajax_owcpv_settings_export', [$this, 'owcpv_settings_export'] );
		add_action( 'wp_ajax_owcpv_handle_import_settings', [$this, 'owcpv_handle_import_settings'] );
		// add_action( 'admin_notices', array($this, 'owcpv_handle_settings_form'), 99 );
	}

	/**
	 * Return the plugin name
	 *
	 * @access	public
	 * @since	1.0.0
	 * @return	string The plugin name
	 */
	public function get_plugin_name(){
		return apply_filters( 'OWCPV/settings/get_plugin_name', $this->plugin_name );
	}

	public function add_settings_link($links) {
		if ( !owcpv_check_woocommerce_active() ) return $links;

        $settings = '<a href="' . admin_url('edit.php?post_type=opal-product&page=owcpv-settings') . '">' . esc_html__('Settings', 'opal-woo-custom-product-variation') . '</a>';
        array_push($links, $settings);
        
		$products = '<a href="' . admin_url('edit.php?post_type=opal-product') . '">' . esc_html__('Create Forms', 'opal-woo-custom-product-variation') . '</a>';
        array_push($links, $products);
        return $links;
    }

	public function owcpv_deactive_without_woocommerce() {
		if (!class_exists('Woocommerce')) {
			add_action( 'admin_notices', array($this, 'owcpv_child_plugin_notice') );
			// deactivate_plugins(OWCPV_PLUGIN_BASE);
		}
	}
	
	public function owcpv_trigger_deactice_addon_without_woocommerce() {
		if (!class_exists('Woocommerce')) {
			add_action( 'admin_notices', array($this, 'owcpv_child_plugin_notice') );
			
			// Deactive addon if Woo is not actived
			// deactivate_plugins(OWCPV_PLUGIN_BASE); 
			// if ( isset( $_GET['activate'] ) ) {
			// 	unset( $_GET['activate'] );
			// }
		}
	}
	
	public function owcpv_child_plugin_notice(){
		$message = __('<strong>Opal Woo Custom Product Variation</strong> is an addon extention of <strong>Woocommerce Plugin</strong>. Please active <strong>Woocommerce Plugin</strong> to be able to use this extention!', 'opal-woo-custom-product-variation');
		?>
		<div class="error"><p>
		<?php 
		echo wp_kses_post($message); 
		?>
		</p></div>
		<?php
	}

	public function install() {
		$this->owcpv_add_default_settings();
		$this->owcpv_protect_upload_dir();
		$this->owcpv_schedule_cron();
	}

	public function deactivation() {
		wp_clear_scheduled_hook(OWCPV_CRON_HOOK);
	}

	private function owcpv_protect_upload_dir() {
		$upload_dir = wp_upload_dir();

		$files = array(
			array(
				'base' => $upload_dir['basedir'] . '/' . OWCPV_UPLOAD_DIR,
				'file' => '.htaccess',
				'content' => 'Options -Indexes' . "\n"
					. '<Files *.php>' . "\n"
					. 'deny from all' . "\n"
					. '</Files>'
			)
		,
			array(
				'base' => $upload_dir['basedir'] . '/' . OWCPV_UPLOAD_DIR,
				'file' => 'index.php',
				'content' => '<?php ' . "\n"
					. '// Silence is golden.'
			)
		);

		\WP_Filesystem();
		global $wp_filesystem;
		foreach ($files as $file) {
			if ((wp_mkdir_p($file['base'])) && (!file_exists(trailingslashit($file['base']) . $file['file']))  // If file not exist
			) {
				$wp_filesystem->put_contents(trailingslashit($file['base']) . $file['file'], $file['content'], FS_CHMOD_FILE);
			}
		}
	}

	private function owcpv_schedule_cron() {
		if (!wp_next_scheduled(OWCPV_CRON_HOOK)) {
			wp_schedule_event(time(), 'daily', OWCPV_CRON_HOOK);
		}
	}

	public function owcpv_delete_temp_files() {
		$upload = wp_upload_dir();
		$directory = $upload['basedir'] . '/' . OWCPV_UPLOAD_DIR . '/owcpv_temp/';
		$files = glob($directory . "*");
		$now = time();

		foreach ($files as $file) {

			if (is_file($file)) {
				if ($now - filemtime($file) >= 60 * 60 * 24 * 1) { // 1 days
					if (strpos($file, '/owcpv_temp/') !== false) {
						wp_delete_file($file);
					}
				}
			} else if (is_dir($file)) {
				$files_sub = glob($file . "/*");

				foreach ($files_sub as $file_sub) {
					if (is_file($file_sub)) {
						if ($now - filemtime($file_sub) >= 60 * 60 * 24 * 1) { // 1 days
							if (strpos($file_sub, '/owcpv_temp/') !== false) {
								wp_delete_file($file_sub);
							}
						}
					}
				}
				$files_sub = glob($file . "/*");
				if (count($files_sub) === 0) {
					if (strpos($file, '/owcpv_temp/') !== false) {
						wp_delete_file($file);
					}
				}
			}
		}
	}

	/**
	 * Create post type
	 */
	public function register_post_types() {
		register_post_type(
			'opal-product', 
			[
				'labels'          =>[
					'name'               => esc_html__( 'Opal Product Field Groups', 'opal-woo-custom-product-variation' ),
					'singular_name'      => esc_html__( 'Opal Product Field Group', 'opal-woo-custom-product-variation' ),
					'add_new'            => esc_html__( 'Add New', 'opal-woo-custom-product-variation' ),
					'add_new_item'       => esc_html__( 'Add New Opal Product Field Group', 'opal-woo-custom-product-variation' ),
					'edit_item'          => esc_html__( 'Edit Opal Product Field Group', 'opal-woo-custom-product-variation' ),
					'new_item'           => esc_html__( 'New Opal Product Field Group', 'opal-woo-custom-product-variation' ),
					'view_item'          => esc_html__( 'View Opal Product Field Group', 'opal-woo-custom-product-variation' ),
					'search_items'       => esc_html__( 'Search Opal Product Field Groups', 'opal-woo-custom-product-variation' ),
					'not_found'          => esc_html__( 'No Opal Product Field Groups found', 'opal-woo-custom-product-variation' ),
					'not_found_in_trash' => esc_html__( 'No Opal Product Field Groups found in Trash', 'opal-woo-custom-product-variation' ),
					'menu_name' => esc_html__('Opal CPV', 'opal-woo-custom-product-variation')
				],
				'public'			=> false,
				'show_ui'			=> true,
				'_builtin'			=> false,
				// 'show_in_menu' => 'edit.php?post_type=product',
				'show_in_nav_menus' => true,
				'can_export' => true,
				'capability_type'	=> 'post',
				'hierarchical'		=> false,
				'rewrite'			=> false,
				'query_var'			=> false,
				'supports' 			=> ['title', 'author'],
				'taxonomies'		=> ['product_cat', 'product_tag'],
				'show_in_rest'      => false,
				'menu_icon'			=> 'dashicons-welcome-widgets-menus'
			]
		);
		
	}
	
	public function owcpv_custom_submenu() {
		global $pagenow;

		remove_submenu_page('edit.php?post_type=opal-product', 'edit-tags.php?taxonomy=product_cat&amp;post_type=opal-product');
		remove_submenu_page('edit.php?post_type=opal-product', 'edit-tags.php?taxonomy=product_tag&amp;post_type=opal-product');
		add_submenu_page(
			'edit.php?post_type=opal-product',
			__( 'OWCPV Setting', 'opal-woo-custom-product-variation' ),
			__( 'Settings', 'opal-woo-custom-product-variation' ),
			'manage_options',
			'owcpv-settings',
			[$this, 'owpcv_setting_page_callback'],
			9
		);
		
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ($pagenow == 'edit.php' && isset($_GET['page']) && wc_clean($_GET['page']) == 'owcpv-settings') {
			remove_all_actions( 'admin_notices' );
		}
		
	}
	
	public function owpcv_setting_page_callback() {
		wp_enqueue_style( 'woocommerce_admin_styles' );
		wp_enqueue_style( 'wc-admin-layout' );
		wp_enqueue_script( 'woocommerce_admin' );
		wp_enqueue_script( 'jquery-tiptip' );

		$locale        = localeconv();
		$decimal_point = isset( $locale['decimal_point'] ) ? $locale['decimal_point'] : '.';
		$decimal       = ( ! empty( wc_get_price_decimal_separator() ) ) ? wc_get_price_decimal_separator() : $decimal_point;

		$params = array(
			/* translators: %s: decimal */
			'i18n_decimal_error'                => sprintf( esc_html__( 'Please enter a value with one decimal point (%s) without thousand separators.', 'opal-woo-custom-product-variation' ), $decimal ),
			/* translators: %s: price decimal separator */
			'i18n_mon_decimal_error'            => sprintf( esc_html__( 'Please enter a value with one monetary decimal point (%s) without thousand separators and currency symbols.', 'opal-woo-custom-product-variation' ), wc_get_price_decimal_separator() ),
			'i18n_country_iso_error'            => esc_html__( 'Please enter in country code with two capital letters.', 'opal-woo-custom-product-variation' ),
			'i18n_sale_less_than_regular_error' => esc_html__( 'Please enter in a value less than the regular price.', 'opal-woo-custom-product-variation' ),
			'i18n_delete_product_notice'        => esc_html__( 'This product has produced sales and may be linked to existing orders. Are you sure you want to delete it?', 'opal-woo-custom-product-variation' ),
			'i18n_remove_personal_data_notice'  => esc_html__( 'This action cannot be reversed. Are you sure you wish to erase personal data from the selected orders?', 'opal-woo-custom-product-variation' ),
			'i18n_confirm_delete'               => esc_html__( 'Are you sure you wish to delete this item?', 'opal-woo-custom-product-variation' ),
			'decimal_point'                     => $decimal,
			'mon_decimal_point'                 => wc_get_price_decimal_separator(),
			'ajax_url'                          => admin_url( 'admin-ajax.php' ),
			'strings'                           => array(
				'import_products' => esc_html__( 'Import', 'opal-woo-custom-product-variation' ),
				'export_products' => esc_html__( 'Export', 'opal-woo-custom-product-variation' ),
			),
			'nonces'                            => array(
				'gateway_toggle' => current_user_can( 'manage_woocommerce' ) ? wp_create_nonce( 'woocommerce-toggle-payment-gateway-enabled' ) : null,
			),
			'urls'                              => array(
				'add_product'     => Features::is_enabled( 'new-product-management-experience' ) || \Automattic\WooCommerce\Utilities\FeaturesUtil::feature_is_enabled( 'product_block_editor' ) ? esc_url_raw( admin_url( 'admin.php?page=wc-admin&path=/add-product' ) ) : null,
				'import_products' => current_user_can( 'import' ) ? esc_url_raw( admin_url( 'edit.php?post_type=product&page=product_importer' ) ) : null,
				'export_products' => current_user_can( 'export' ) ? esc_url_raw( admin_url( 'edit.php?post_type=product&page=product_exporter' ) ) : null,
			),
		);
		wp_localize_script( 'woocommerce_admin', 'woocommerce_admin', $params );
		
		OWCPV_Admin::view('form-settings');
	}

	private function owcpv_add_default_settings() {
		$settings_option = get_option(OWCPV_SETTINGS_KEY);
		if (!$settings_option) {
			$settings = $this->owcpv_get_settings_default();
			update_option(OWCPV_SETTINGS_KEY, wp_json_encode($settings));
		}
	}

	private function owcpv_get_settings_default() {
		$settings = [
			'show_field_price' => 1,
			'change_price_box' => 1,
			'catalog_mode' => 0,
			'render_position' => '',
			'render_position_catalog' => '',
			'render_position_prioty' => '',
			'show_total_price' => 1,
			'show_product_price' => 1,
			'show_option_price' => 1,
			'show_option_total_price' => 1,
			'show_in_cart' => 1,
			'show_in_checkout' => 1,
			'show_in_order' => 1,
			'show_price_in_cart' => 1,
			'show_price_in_checkout' => 1,
			'show_price_in_order' => 1,
			'update_summary_price' => 1,
			'using_classic_cart_page' => 0,
			'edit_field_cart' => 0,
			'edit_field_cart_button' => esc_html__( 'Edit', 'opal-woo-custom-product-variation' ),
			'option_price_label' => esc_html__( 'Options Price', 'opal-woo-custom-product-variation' ),
			'product_price_label' => esc_html__( 'Product Price', 'opal-woo-custom-product-variation' ),
			'total_price_label' => esc_html__( 'Total', 'opal-woo-custom-product-variation' ),
		];

		require OWCPV_PLUGIN_DIR.'includes/helpers/define.php';
		foreach ($validates_message as $name => $message) {
			$settings[$name] = $message['value'];
		}

		return $settings;
	}

	public function owcpv_handle_settings_form() {
		check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );
		$settings = $this->owcpv_get_settings_default();

		foreach ($settings as $name => $field) {
			$field_val = isset($_POST[$name]) ? wc_clean($_POST[$name]) : 0;
			$settings[$name] = $field_val;
		}

		$flag = update_option(OWCPV_SETTINGS_KEY, wp_json_encode($settings));

		wp_send_json_success( [
			'message' => esc_html__('Update settings successfully!', 'opal-woo-custom-product-variation' )
		] );
		
		die();
	}

	public function owcpv_settings_export() {
		check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

		$file_data = $this->prepare_template_export();

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

	private function prepare_template_export() {
		$settings = get_option(OWCPV_SETTINGS_KEY, wp_json_encode($this->owcpv_get_settings_default()));
		
		$file_data = [
			'name' => 'owcpv-data-settings-' . gmdate( 'Y-m-d' ) . '.json',
			'content' =>  $settings,
		];

		return $file_data;
	}

	public function owcpv_handle_import_settings() {
		check_ajax_referer( 'owcpv-nonce-ajax', 'ajax_nonce_parameter' );

		if (isset($_FILES['owcpv_setting_import']["error"]) && $_FILES['owcpv_setting_import']["error"] != 4) {
			if ($_FILES['owcpv_setting_import']["error"] == UPLOAD_ERR_INI_SIZE) {
				$error_message = esc_html__('The uploaded file exceeds the maximum upload limit', 'opal-woo-custom-product-variation');
			} else if (in_array($_FILES['owcpv_setting_import']["error"], array(UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE))) {
				$error_message = esc_html__('The uploaded file exceeds the maximum upload limit', 'opal-woo-custom-product-variation');
			}
			$ext = pathinfo($_FILES['owcpv_setting_import']['name'], PATHINFO_EXTENSION);
			if ($ext != 'json' || $_FILES['owcpv_setting_import']['type'] != 'application/json') {
				$error_message = esc_html__('Only allow upload Json(.json) file', 'opal-woo-custom-product-variation');
			}
		}
		else {
			$error_message = esc_html__('Please upload a file to import', 'opal-woo-custom-product-variation');
		}
		
		// phpcs:ignore Generic.PHP.NoSilencedErrors.Discouraged, WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$data_upload = file_get_contents(wc_clean($_FILES['owcpv_setting_import']['tmp_name']));
		// $data_upload = json_decode($data_upload, true);
		if (empty($data_upload)) {
			$error_message = esc_html__('File upload is empty', 'opal-woo-custom-product-variation');
		}

		if (isset($error_message)) {
			$error = new \WP_Error( 'file_error', $error_message );
			if ( is_wp_error( $error ) ) {
				_default_wp_die_handler( $error->get_error_message(), 'OWCPV' );
			}
		}

		update_option(OWCPV_SETTINGS_KEY, $data_upload);
		// set_transient( 'owcpv_import_settings', 'yes',  10);

		wp_safe_redirect(admin_url('edit.php?post_type=opal-product&page=owcpv-settings'));
		wp_die();
	}

}
