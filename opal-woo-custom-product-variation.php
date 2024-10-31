<?php
/**
 * Opal Woo Custom Product Variation
 *
 * @package       opal-woo-custom-product-variation
 * @author        WPOPAL
 * @version       1.1.4
 *
 * @wordpress-plugin
 * Plugin Name:   Opal Woo Custom Product Variation
 * Plugin URI:    https://wpopal.com/opal-woo-custom-product-variation
 * Description:   Plugin Advanced Product Field for Woocommerce, add some field for user select
 * Version:       1.1.4
 * Author:        WPOPAL
 * Author URI:    https://wpopal.com
 * License:       GPLv2 or later
 * License URI:   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain:   opal-woo-custom-product-variation
 * Domain Path:   /languages
 * Requires Plugins: woocommerce
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

// Plugin name
define( 'OWCPV_NAME', 'Opal Woo Custom Product Variation' );

// Plugin version
define( 'OWCPV_VERSION', '1.1.4' );

// Plugin Root File
define( 'OWCPV_PLUGIN_FILE', __FILE__ );

// Plugin base
define( 'OWCPV_PLUGIN_BASE', plugin_basename( OWCPV_PLUGIN_FILE ) );

// Plugin Folder Path
define( 'OWCPV_PLUGIN_DIR',	plugin_dir_path( OWCPV_PLUGIN_FILE ) );

// Plugin Folder URL
define( 'OWCPV_PLUGIN_URL',	plugin_dir_url( OWCPV_PLUGIN_FILE ) );

define(	'OWCPV_UPLOAD_DIR', 'owcpv_uploads' );
define(	'OWCPV_CRON_HOOK', 'owcpv_daily_event' );
define(	'OWCPV_SETTINGS_KEY', 'owcpv_settings_key' );

/**
 * Load the main class for the core functionality
 */
require_once OWCPV_PLUGIN_DIR . 'includes/class-opal-woo-custom-product-variation.php';

/**
 * The main function to load the only instance
 * of our master class.
 *
 * @author  Opal
 * @since   1.1.4
 * @return  object|OWCPV_Start_Instance
 */
function owcpv_start() {
	if (file_exists(OWCPV_PLUGIN_DIR.'plugin-updates/plugin-update-checker.php')) {
		require 'plugin-updates/plugin-update-checker.php';
		Puc_v4_Factory::buildUpdateChecker(
			'http://source.wpopal.com/plugins/opal/opal-woo-custom-product-variation.json',
			__FILE__,
			'opal-woo-custom-product-variation'
		);
	}

	return OWCPV_Start_Instance::instance();
}
owcpv_start();
