<?php
/** 
 * Price Calculator
 * 
 * @uses $product
*/
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

$custom_args_price = [
	'wrap_price' => true
];

$product = wc_get_product($product_id);

$show_option_total_price = owcpv_get_option('show_option_total_price');
$show_product_price = owcpv_get_option('show_product_price');
$show_total_price = owcpv_get_option('show_total_price');
?>
<div class="owcpv_price_summary <?php if(!$show_option_total_price && !$show_product_price && !$show_total_price) echo esc_html('owcpv_hidden') ?>" style="width: 100%;">
	<ul>
		<?php
		if(owcpv_get_option('show_option_price')) {
			?><li class="owcpv_option_price"></li><?php
		}
		?>
		<li class="owcpv_options_total <?php if(!$show_option_total_price) echo esc_html('owcpv_hidden') ?>">
			<span><?php echo esc_html(owcpv_get_option('option_price_label', esc_html__('Options Price:', 'opal-woo-custom-product-variation'))) ?></span>
			<span class="owcpv_price_outer ">
				<span class="owcpv_price"><?php owcpv_print_price(0, $custom_args_price); ?></span>
			</span>
		</li>
		<li class="owcpv_product_base <?php if(!$show_product_price) echo esc_html('owcpv_hidden') ?>">
			<span><?php echo esc_html(owcpv_get_option('product_price_label', esc_html__('Product Price:', 'opal-woo-custom-product-variation'))) ?></span>
			<span class="owcpv_price_outer ">
				<span class="owcpv_price"><?php owcpv_print_price($product->get_price(), $custom_args_price); ?></span>
			</span>
		</li>
		<li class="owcpv_total <?php if(!$show_total_price) echo esc_html('owcpv_hidden') ?>">
			<span><?php echo esc_html(owcpv_get_option('total_price_label', esc_html__('Total:', 'opal-woo-custom-product-variation'))) ?></span>
			<span class="owcpv_price_outer ">
				<span class="owcpv_price"><?php owcpv_print_price($product->get_price(), $custom_args_price); ?></span>
			</span>
		</li>
	</ul>
</div>