<?php
/** 
 * OWCPV Fields In Order Item
 * 
 * @uses $owcpv_meta_data
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    
?>
<h4 class="owcpv_field_order"><?php esc_html_e('Custom fields', 'opal-woo-custom-product-variation') ?></h4>
<?php if (is_array($owcpv_meta_data)): ?>
	<table class="owcpv_table_field">
	    <tr>
	        <th><?php esc_html_e('Label', 'opal-woo-custom-product-variation') ?></th>
	        <th><?php esc_html_e('Value', 'opal-woo-custom-product-variation') ?></th>
	        <th><?php esc_html_e('Cost', 'opal-woo-custom-product-variation') ?></th>
	    </tr>
	    <?php foreach ($owcpv_meta_data as $key => $field): 
	    	if (!is_array($field)) continue;
	    	foreach ($field as $index => $item_field) {
				$val_field = (isset($item_field['owcpvValue'])) ? $item_field['owcpvValue'] : $item_field['value'];
	    		?>
				<tr class="owcpv_item_field">
					<?php if ($index == 0): ?>
						<th class="owcpv_item_label" rowspan="<?php echo esc_html(count($field)) ?>"><?php echo esc_html(wp_strip_all_tags($item_field['field_label'])); ?></th>
					<?php endif ?>
					<td class="owcpv_item_value">
						<?php  
						if (isset($item_field['type'])) {
							if ($item_field['type'] == 'image-option') {
								printf('<div style="display: flex; align-items: center"><img src="%1s" alt="" style="margin-right: 5px" width="70" height="70"><span>%2s</span></div style="display: flexl; align-items: center">', esc_html($val_field), esc_html($item_field['label']));
							}
							elseif ($item_field['type'] == 'file') {
								$label = owcpv_str_short($item_field['label'], 30, 5);
								printf('<div><a href="%1s" target="_blank">%2s</a></div>', esc_html($val_field), esc_html($label));
							}
							else {
								printf('<strong>%1s</strong>: %2s', esc_html($item_field['label']), esc_html($val_field));
							}
						} 
						elseif ($item_field['label'] == $val_field) {
							echo esc_html($val_field);
						}
						else {
							printf('<strong>%1s</strong>: %2s', esc_html($item_field['label']), esc_html($val_field));
						}
						?>
					</td>
					<td class="owcpv_item_price"><?php owcpv_print_price($item_field['priceValue']); ?></td>
				</tr>
	    		<?php
	    	}
	    	?>
	    <?php endforeach ?>
	</table>
<?php endif ?>
