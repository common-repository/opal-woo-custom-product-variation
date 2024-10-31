<?php
/** 
 * OWCPV Header Admin
 * 
 * @uses owcpv_json_value meta
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

global $post_type_object, $typenow, $pagenow, $current_screen;
?>
<div class="wrap owcpv_admin_header">
    <h2 class="wp-heading-inline"><?php echo esc_html( get_admin_page_title() ); ?></h2>
    <div class="owcpv_dummy_box">
        <?php 
        if ( current_user_can( $post_type_object->cap->create_posts ) ) {
            $post_new_file = "post-new.php?post_type=$typenow";
            echo ' <a href="' . esc_url( admin_url( $post_new_file ) ) . '" class="page-title-action button">' . esc_html( $post_type_object->labels->add_new ) . '</a>';
        }
        ?>
        <a href="#owcpv-box-import-fields" id="owcpv-open-import-form" class="button button-primary page-title-action"><?php esc_html_e('Import form', 'opal-woo-custom-product-variation') ?></a>
        <?php 
        if (get_post_type() == $typenow && in_array( $pagenow, array( 'post.php', 'post-new.php') )) {
            if ($pagenow == 'post.php') {
                ?>
                <a href="<?php echo esc_html($export_link) ?>" id="owcpv-export-form" class="button page-title-action"><?php esc_html_e('Export form', 'opal-woo-custom-product-variation') ?></a>
                <?php
            }
            ?>
            <a href="#" id="owcpv-settings-form" class="button page-title-action button-primary"><?php esc_html_e('Settings', 'opal-woo-custom-product-variation') ?></a>
            <button type="submit" form="post" id="owcpv-publish-form" class="button page-title-action"><?php esc_html_e('Publish form', 'opal-woo-custom-product-variation') ?></button>
            <?php
        }
        ?>
    </div>
    <?php
    OWCPV_Admin::view('form-import-fields', ['sample_fields' => $sample_fields]);
    ?>
</div>
