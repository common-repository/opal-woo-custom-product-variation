<?php
/** 
 * OWCPV Form Import Fields
 * 
 * @uses owcpv_json_value meta
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    
?>
<div id="owcpv-box-import-fields" class="mfp-hide">
    <form id="owcpv-form-import" method="post" action="<?php echo esc_url(admin_url( 'admin-ajax.php' )) ?>" enctype="multipart/form-data">
        <input type="hidden" name="action" value="owcpv_handle_import_form">
        <?php wp_nonce_field('owcpv-nonce-ajax', 'ajax_nonce_parameter');  ?>
        <h4 class="owcpv_heading_import"><?php esc_html_e('Upload import file', 'opal-woo-custom-product-variation') ?></h4>
        <fieldset id="owcpv-import-form-inputs">
            <input type="file" name="owcpv_file_import" accept=".json,application/json" required="">
            <input id="owcpv-import-form-action" type="submit" class="button" value="Import Now">
        </fieldset>
    </form>
    <form id="owcpv-form-import-sample" method="post" action="<?php echo esc_url(admin_url( 'admin-ajax.php' )) ?>" enctype="multipart/form-data">
        <input type="hidden" name="action" value="owcpv_handle_import_sample_fields">
        <?php wp_nonce_field('owcpv-nonce-ajax', 'ajax_nonce_parameter');  ?>
        <?php
        if (is_array($sample_fields) && !empty($sample_fields)) {
            ?>
            <h4 class="owcpv_heading_import"><?php esc_html_e('Or you can also use the following samples:', 'opal-woo-custom-product-variation') ?></h4>
            <ul class="owcpv_sample_fields">
                <?php
                foreach ($sample_fields as $index => $field) {
                    ?>
                    <li class="owcpv_sample_field">
                        <input type="submit" name="owcpv_import_sample" class="owcpv_import_sample owcpv_hidden" value='<?php echo esc_html($field['data']) ?>' id="owcpv_sample_<?php echo esc_html($index) ?>">
                        <label for="owcpv_sample_<?php echo esc_html($index) ?>">
                            <strong><?php printf('%1s %2s', esc_html__('Sample ', 'opal-woo-custom-product-variation'), absint($index + 1)) ?></strong>
                            <img src="<?php echo esc_html($field['image']) ?>" alt="">
                        </label>
                    </li>
                    <?php
                }
                ?>
            </ul>
            <?php
        }
        ?>
    </form>
</div>