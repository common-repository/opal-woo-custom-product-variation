<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;
if ( ! class_exists( 'OWCPV_Form_Handler' ) ) :

	/**
	 * Main OWCPV_Form_Handler Class.
	 *
	 * @package		OWCPV
	 * @subpackage	Classes/OWCPV_Form_Handler
	 * @since		1.0.0
	 * @author		Opal
	 */
	class OWCPV_Form_Handler {

        public $_session;
		
		private $raw_field_data;

		private $all_fields;

		public $product_id;

		private static $condition_key = [
			'field',
			'relation',
			'relation_attr',
			'value',
			'value_stock',
			'value_attr',
			'value_field',
			'operator'
		];

		private static $default_condition = [
			'0',
			'stock_quantity',
			'stock_status',
			'product_ids',
			'attribute',
			'quantity'
		];


        public function __construct($raw_field_data = false, $product_id = false, $all_fields = false) {
			$this->raw_field_data = $raw_field_data;
			$this->all_fields = $all_fields;
			$this->product_id = $product_id;
			$this->_session = WC()->session;
        }

        public function owcpv_get_condition_field($post_data) {
        	$condition_field = $this->owcpv_check_condition_field($post_data);
			return $condition_field;
		}

        public function owcpv_handle_raw_form_data($form_id = 0, $variation_id = 0) {
			
			$data = $this->raw_field_data;

			$show_field_price = owcpv_get_option('show_field_price');
			if ($form_id && $form_id > 0) {
				if (!owcpv_get_option_form('use_global_settings', $form_id)) {
					$show_field_price = owcpv_get_option_form('show_field_price', $form_id);
				}
			}

			if (!isset($data['label'])) $data['label'] = '';

			if (isset($data['values'])) {
				foreach ($data['values'] as $index => $item_value) {
					if(empty($item_value['label'])) {
						unset($data['values'][$index]);
					}
					if(!$item_value['priceValue']) continue;
					$price_value = $item_value['priceValue'];
					
					if($data['priceOptions'] == 'percent') {
						$price_value = owcpv_calculate_price_by_percent($this->product_id, $item_value['priceValue'], $variation_id);
					}
			
					if ($data['type'] == 'select') {
						$data['values'][$index]['label_raw'] = $item_value['label'];
						if ($show_field_price) {
							$data['values'][$index]['label'] .= ' ('.wp_strip_all_tags(wc_price($price_value)).')';
						}
					}
					elseif ($data['type'] == 'checkbox-group' && isset($data['checkboxsubtype']) && $data['checkboxsubtype'] == 'single-checkbox') {
						$data['label'] .= ' <span class="price_value">('.wp_strip_all_tags(wc_price($price_value)).')</span>';
					}
					else {
						if ($show_field_price) {
							$data['values'][$index]['label'] .= ' <span class="price_value">('.wp_strip_all_tags(wc_price($price_value)).')</span>';
						}
					}
				}
				if(empty($data['values'])) {
					return false;
				}
			}
			
			$data['label'] = '<span class="raw_label">'.trim($data['label']).'</span>';
			if (isset($data['priceCheckbox'])) {
				if ($data['priceCheckbox'] && isset($data['priceValue'])) {
					$price_value = $data['priceValue'];
						
					if($data['priceOptions'] == 'percent') {
						$price_value = owcpv_calculate_price_by_percent($this->product_id, $price_value, $variation_id);
					}
					
					if ($show_field_price) {
						$data['label'] .= ' <span class="price_value">('.wp_strip_all_tags(wc_price($price_value)).')</span>';
					}
				}
			}

			return $data;
		}

		public function owcpv_check_selected_form_data($cart_item_data, $variation_id = 0) {
			
			$data = $this->owcpv_handle_raw_form_data($variation_id);
			
			if (isset($data['values'])) {
				$val_indexs = array_column($cart_item_data, 'value');
				foreach ($data['values'] as $index => $item_value) {
					$data['values'][$index]['selected'] = in_array($index, $val_indexs);
				}
			}
			else {
				$data['value'] = $cart_item_data[0]['value'];
			}

			return $data;
		}

		public function owcpv_handle_raw_form_data_condition() {
			$data = $this->raw_field_data;
			if (!$data['enabelConditional']) return false;

			$data_conditions = [];
			$rules = [];
			$condition_keys = self::$condition_key;

			$data_conditions['required'] = isset($data['required']) ? $data['required'] : false;
			$data_conditions['logic_action'] = $data['logicAction'];

			$i = 0;
			while ($i !== false) {
				if($data['condition_field_'.$i]) {

					foreach ($condition_keys as $key_field) {
						if (isset($data['condition_'.$key_field.'_'.$i])) {
							$rules[$i][$key_field] = $data['condition_'.$key_field.'_'.$i];
						}
						if ($key_field == 'value_field' && isset($data['condition_'.$key_field.'_'.$i.'[]'])) {
							$rules[$i][$key_field] = $data['condition_'.$key_field.'_'.$i.'[]'];
						}
					}
				}

				$i++;
				if (!isset($data['condition_field_'.$i])) $i = false;
			}

			$data_conditions['rules'] = $rules;

			return $data_conditions;
		}

		private function owcpv_get_variations_of_product() {
			$product_id = $this->product_id;
			$product = wc_get_product($product_id);

			if ( !$product->is_type( 'variable' ) ) return false;

			$product_variations = $product->get_available_variations();
			$product_data = [];
			
			foreach ($product_variations as $variation)  {
				$variation_id = $variation['variation_id'];
    			$variation_obj = new WC_Product_Variation( $variation_id );
				$stock_status = $variation_obj->get_stock_status();
        		$stock_qty = $variation_obj->get_stock_quantity();

				$var_data = $variation['attributes'];
				$var_data['stock_status'] = $stock_status;
				$var_data['stock_quantity'] = $stock_qty;
				$var_data['display_price'] = $variation['display_price'];

				$product_data['variation'][$variation['variation_id']] = $var_data;
			}

			return $product_data;

		}

		private function owcpv_get_type_field($field_key) {
			$all_fields = $this->all_fields;
			return (isset($all_fields[$field_key])) ? $all_fields[$field_key]['type'] : false;
		}

		private function owcpv_check_condition_field($post_data) {
			$field_data = $this->raw_field_data;
			$product_id = $this->product_id;
			$product = wc_get_product($product_id);

			if (!$field_data['enabelConditional']) return true;

			$data_conditions = $this->owcpv_handle_raw_form_data_condition();
			$logic_action = $data_conditions['logic_action'];
			$rules = $data_conditions['rules'];
			$rule_pass = [];
			$action_pass = false;

			foreach ($rules as $index => $rule) {
				$field_rule = $rule['field'];
				$item_pass = false;
				$operator = $rule['operator'];

				if (empty($field_rule)) {
					continue;
				}

				if ($field_rule == 'stock_quantity') {
				    $qty = $product->get_stock_quantity();
				    if ($variations = $this->owcpv_get_variations_of_product()) {
				        $variation_id = absint($post_data['variation_id']);
				        $qty = $variations[$variation_id]['stock_quantity'];
				    }
				    switch ($rule['relation']) {
				        case 'is':
				            $item_pass = ($qty == intval($rule['value']));
				            break;
				        case 'is_not':
				            $item_pass = ($qty != intval($rule['value']));
				            break;
				        case 'is_empty':
				            $item_pass = ($qty == 0);
				            break;
				        case 'is_not_empty':
				            $item_pass = ($qty != 0);
				            break;
				        case 'is_greater':
				            $item_pass = ($qty == null) ? true : ($qty > intval($rule['value']));
				            break;
				        case 'is_lessthan':
				            $item_pass = ($qty == null) ? true : ($qty < intval($rule['value']));
				            break;
				        case 'is_greater_or_eqaul':
				            $item_pass = ($qty == null) ? true : ($qty >= intval($rule['value']));
				            break;
				        case 'is_lessthan_or_eqal':
				            $item_pass = ($qty == null) ? true : ($qty <= intval($rule['value']));
				            break;
				        default:
				            $item_pass = false;
				            break;
				    }
				} 
				elseif ($field_rule == 'stock_status') {
				    $stock_status = $product->get_stock_status();
				    if ($variations = $this->owcpv_get_variations_of_product()) {
				        $variation_id = absint($post_data['variation_id']);
				        $stock_status = $variations[$variation_id]['stock_status'];
				    }
				    switch ($rule['relation']) {
				        case 'is':
				            $item_pass = ($stock_status == $rule['value_stock']);
				            break;
				        case 'is_not':
				            $item_pass = ($stock_status != $rule['value_stock']);
				            break;
				        default:
				            $item_pass = false;
				            break;
				    }
				} 
				elseif ($field_rule == 'product_ids') {
			        $rule_product_ids = $rule['value'];
			        $rule_product_arr = array_map('trim', explode(',', $rule_product_ids));

				    switch ($rule['relation']) {
				        case 'is_in':
				            $item_pass = (in_array($product_id, $rule_product_arr));
				            break;
				        case 'is_not_in':
				            $item_pass = (!in_array($product_id, $rule_product_arr));
				            break;
				        default:
				            $item_pass = false;
				            break;
				    }
				} 
				elseif ($field_rule == 'attribute') {
			        if (!empty($rule['relation_attr']) && !empty($rule['value_attr'])) {
						$relation_attr = $rule['relation_attr'];
						$attr_key = 'attribute_pa_'.$relation_attr;
	
						$item_pass = (wp_unslash($post_data[$attr_key]) == $rule['value_attr']);
					}
				} 
				elseif ($field_rule == 'quantity') {
				    $qty = $post_data['quantity'];

				    switch ($rule['relation']) {
				        case 'is':
				            $item_pass = ($qty == intval($rule['value']));
				            break;
				        case 'is_not':
				            $item_pass = ($qty != intval($rule['value']));
				            break;
				        case 'is_greater':
				            $item_pass = ($qty > intval($rule['value']));
				            break;
				        case 'is_lessthan':
				            $item_pass = ($qty < intval($rule['value']));
				            break;
				        case 'is_greater_or_eqaul':
				            $item_pass = ($qty >= intval($rule['value']));
				            break;
				        case 'is_lessthan_or_eqal':
				            $item_pass = ($qty <= intval($rule['value']));
				            break;
				        default:
				            break;
				    }
				}
				else {
					// $item_pass = true;
					if (!isset($post_data[$field_rule])) {
						continue;
					}
					
					$value_field = $rule['value_field'];
					$post_field_rule = $post_data[$field_rule];
					$type = $this->owcpv_get_type_field($field_rule);

					switch ($rule['relation']) {
				        case 'is':
							$item_pass = $post_field_rule === $value_field;
				            break;
				        case 'is_not':
							$item_pass = $post_field_rule !== $value_field;
				            break;
				        case 'is_in':
				            $item_pass = (is_array($value_field) && in_array($post_field_rule, $value_field));
				            break;
				        case 'is_not_in':
				            $item_pass = (is_array($value_field) && !in_array($post_field_rule, $value_field));
				            break;
				        case 'is_empty':
				            $item_pass = empty($post_field_rule);
				            break;
				        case 'is_not_empty':
				            $item_pass = !empty($post_field_rule);
				            break;
				        case 'is_greater':
							if ($type && $type == 'number') {
								$item_pass = absint($post_field_rule) > absint($value_field);
							}
				            break;
				        case 'is_lessthan':
				            if ($type && $type == 'number') {
								$item_pass = absint($post_field_rule) < absint($value_field);
							}
				            break;
				        case 'is_greater_or_eqaul':
				            if ($type && $type == 'number') {
								$item_pass = absint($post_field_rule) >= absint($value_field);
							}
				            break;
				        case 'is_lessthan_or_eqal':
				            if ($type && $type == 'number') {
								$item_pass = absint($post_field_rule) <= absint($value_field);
							}
				            break;
				        case 'contains':
				            if (in_array($type, ['text', 'textarea'])) {
								$item_pass = owcpv_check_string_has_char($post_field_rule, $value_field);
							}
				            break;
				        case 'not_contains':
				            if (in_array($type, ['text', 'textarea'])) {
								$item_pass = !owcpv_check_string_has_char($post_field_rule, $value_field);
							}
				            break;
				        case 'starts_with':
				            if (in_array($type, ['text', 'textarea'])) {
								$item_pass = owcpv_check_string_start_with_char($post_field_rule, $value_field);
							}
				            break;
				        case 'ends_with':
				            if (in_array($type, ['text', 'textarea'])) {
								$item_pass = owcpv_check_string_end_with_char($post_field_rule, $value_field);
							}
				            break;
				        case 'date_is':
				            if ($type && $type == 'date') {
								$item_pass = strtotime($post_field_rule) == strtotime($value_field);
							}
				            break;
				        case 'date_is_before':
				            if ($type && $type == 'date') {
								$item_pass = strtotime($post_field_rule) <= strtotime($value_field);
							}
				            break;
				        case 'date_is_after':
				            if ($type && $type == 'date') {
								$item_pass = strtotime($post_field_rule) >= strtotime($value_field);
							}
				            break;
				        case 'time_is':
				            if ($type && $type == 'date') {
								$item_pass = strtotime($post_field_rule) == strtotime($value_field);
							}
				            break;
				        case 'time_is_before':
				            if ($type && $type == 'date') {
								$item_pass = strtotime($post_field_rule) <= strtotime($value_field);
							}
				            break;
				        case 'time_is_after':
				            if ($type && $type == 'date') {
								$item_pass = strtotime($post_field_rule) == strtotime($value_field);
							}
				            break;
				        default:
				            break;
				    }
				}

				$rule_pass[$index]['field'] = $field_rule;
				$rule_pass[$index]['pass'] = $item_pass;
				$rule_pass[$index]['operator'] = $operator;
			}

			foreach($rule_pass as $i => $item_pass) {
			    $action_item_pass = $item_pass['pass'];
			    if ($i == 0) {
			        $action_pass = $action_item_pass;
			    }
			    else {
			        if ($item_pass['operator'] == 'and') {
			            $action_pass = ($action_item_pass && $action_pass);
			        } 
			        else {
			            $action_pass = ($action_item_pass || $action_pass);
			        }
			    }
			}

			return ($logic_action == 'show') ? $action_pass : !$action_pass;
			// return $action_pass;
			// return $data_conditions;
			// return false;
		}

		public function owcpv_ajax_upload($file_data) {
			
			$response = [['success' => false, 'error' => '']];

            if (isset($file_data["error"]) && $file_data["error"] != 4) {
				$product_id = $this->product_id;
				$field = (object)$this->raw_field_data;
				// echo '<pre>'; print_r($file_data); echo '</pre>'; die();
				
				$success = true;
				$error_message = '';
				
				if ($field === false || $field->type !== 'file') {
					$response = ['success' => false, 'error' => esc_html__('Invalid', 'opal-woo-custom-product-variation')];
					return $response;
				}
				if ($file_data["error"] != UPLOAD_ERR_OK && $file_data["error"] != UPLOAD_ERR_NO_FILE) {
					if ($file_data["error"] == UPLOAD_ERR_INI_SIZE) {
						$error_message = esc_html__('The uploaded file exceeds the maximum upload limit', 'opal-woo-custom-product-variation');
					} else if (in_array($file_data["error"], array(UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE))) {
						$error_message = esc_html__('The uploaded file exceeds the maximum upload limit', 'opal-woo-custom-product-variation');
					} else {
						$error_message = esc_html__('The uploaded file error', 'opal-woo-custom-product-variation');
					}
				} else if ($file_data["error"] === UPLOAD_ERR_OK) {
					if (isset($field->max_size) && $field->max_size && ($file_data["size"] > ($field->max_size * 1024 * 1024))) {
						$success = false;
						/* translators: %s: Maximum file's size allowed for upload. */
						$error_message = (sprintf(__('File exceeds maximum upload size limit of %s MB', 'opal-woo-custom-product-variation'), $field->max_size));
					}
		
					if (isset($field->min_size) && $field->min_size && ($file_data["size"] < ($field->min_size * 1024 * 1024))) {
						$success = false;
						/* translators: %s: Minimum file's size allowed for upload. */
						$error_message = (sprintf(__('File is too small in size, Need %s MB or above', 'opal-woo-custom-product-variation'), $field->min_size));
					}
		
					$file_mime = false;
					$type_allow = isset($field->type_allow) ? $field->type_allow : '';
					if($file_data['type'] == "application/octet-stream"){
						$imageMime = getimagesize($file_data['tmp_name']); // get temporary file REAL info
						$file_mime = $imageMime['mime'];
					}

					if (!$this->owcpv_validate_ext_file_with_config($type_allow, $file_data['name'], $file_mime)) {
						$success = false;
						$error_message = esc_html__('The uploaded file type is not supported', 'opal-woo-custom-product-variation');
					}
		
					if ($success === false) {
						$response = ['success' => $success, 'error' => $error_message];
					} else {
						$file = $this->owcpv_ajax_handle_upload($file_data);
						if ($file['success'] === false) {
							$response = ['success' => false, 'error' => $file['error']];
						} else {
							$response = ['success' => true, 'error' => '', 'file' => $file['file']];
						}
					}
		
					return $response;
				}

			}
			
			$response['data'] = $file_data;
			$response['success'] = 'true';
		
			return $response;
		}

		public function owcpv_validate_ext_file_with_config($exts = '', $file_name = '', $file_mime = false) {
			if (empty($file_name)) return false;
			$supported_extions = false;
			if (!empty($exts)) {
				$supported_extions = preg_split("/[\s,]+/", $exts);
				if (is_array($supported_extions)) {
					$supported_extions = array_filter(array_map('trim', $supported_extions));
					if (count($supported_extions) == 0) {
						$supported_extions = false;
					}
				} else {
					$supported_extions = false;
				}
			}
			if ($supported_extions !== false) {
				$ext = pathinfo($file_name, PATHINFO_EXTENSION);
				if ($file_mime) {
					$ext = explode('/', $file_mime )[1];
					var_dump($ext);
				}
				if (!in_array($ext, $supported_extions)) {
					return false;
				}
			}

			if (!$file_mime) {
				$validate_wp = wp_check_filetype($file_name);
				if (!isset($validate_wp['ext']) || empty($validate_wp['ext'])) {
					return false;
				}
			}
			return true;
		}

		public function owcpv_get_session_cookie() {
			$user_coockie = $this->_session->get_session_cookie();
			return isset($user_coockie[3]) ? $user_coockie[3] : false;
		}
	
		public function owcpv_upload_directory_base($temp = false) {
			if ($temp) {
				return OWCPV_UPLOAD_DIR . '/owcpv_temp/' . md5($this->owcpv_get_session_cookie());
			} else {
				return OWCPV_UPLOAD_DIR . '/' . md5($this->owcpv_get_session_cookie());
			}
		}
	
		public function owcpv_upload_dir_temp($upload) {

			$file_directory = $this->owcpv_upload_directory_base(true);
			$upload['subdir'] = '/' . $file_directory;
			$upload['path'] = $upload['basedir'] . '/' . $file_directory;
			$upload['url'] = $upload['baseurl'] . '/' . $file_directory;

			return $upload;
		}

		public function owcpv_ajax_handle_upload($file_data) {
			if (!function_exists('wp_handle_upload')) {
				require_once(ABSPATH . 'wp-admin/includes/file.php');
			}

			$uploadedfile = $file_data;
			$uploadedfile_name = wc_clean($file_data["name"]);
			$upload_overrides = array('test_form' => false);

			add_filter('upload_dir', array($this, 'owcpv_upload_dir_temp'));
			$movefile = wp_handle_upload($uploadedfile, $upload_overrides);
			remove_filter('upload_dir', array($this, 'owcpv_upload_dir_temp'));

			if ($movefile && !isset($movefile['error'])) {
				$file_name = explode('/' . OWCPV_UPLOAD_DIR . '/', $movefile['file']);
				$movefile['file'] = $file_name[1];
				return ['success' => true, 'file' => array_merge($movefile, array('file_name' => $uploadedfile_name))];
			} 
			else {
				return ['success' => false, 'error' => $movefile['error']];
			}
		}

		public function move_file($file) {
			
			$uploadedfile_name = basename($file);

			$file_directory = $this->owcpv_upload_directory_base();
			$upload = wp_upload_dir();
			$uploadedfile = $upload['basedir'] . '/' . OWCPV_UPLOAD_DIR . '/' . $file;


			$upload['subdir'] = '/' . $file_directory;
			$upload['path'] = $upload['basedir'] . '/' . $file_directory;
			$upload['url'] = $upload['baseurl'] . '/' . $file_directory;


			$wp_filetype = wp_check_filetype_and_ext($uploadedfile, $uploadedfile_name);
			$ext = empty($wp_filetype['ext']) ? '' : $wp_filetype['ext'];
			$type = empty($wp_filetype['type']) ? '' : $wp_filetype['type'];
			$proper_filename = empty($wp_filetype['proper_filename']) ? '' : $wp_filetype['proper_filename'];
			// Check to see if wp_check_filetype_and_ext() determined the filename was incorrect
			if ($proper_filename) {
				$uploadedfile_name = $proper_filename;
			}

			if ((!$type || !$ext)) {
				// $this->add_cart_error(sprintf(__('File %s could not be uploaded.', 'opal-woo-custom-product-variation'), $v->label));
				return FALSE;
			}

			$filename = wp_unique_filename($upload['path'], $uploadedfile_name);
			$new_file = $upload['path'] . "/$filename";
			if (!is_dir($upload['path'])) {
				wp_mkdir_p($upload['path']);
			}

			$move_new_file = @copy($uploadedfile, $new_file);

			if (false === $move_new_file) {
				// $this->add_cart_error(sprintf(__('File %s could not be uploaded.', 'opal-woo-custom-product-variation'), $v->label));
				return FALSE;
			}
			
			require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
			require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';

			wp_delete_file($uploadedfile);

			$stat = stat(dirname($new_file));
			$perms = $stat['mode'] & 0000666;
			$filesystem = new WP_Filesystem_Direct( false );
			$filesystem->chmod($new_file, $perms);

			// Compute the URL.
			$url = $upload['url'] . "/$filename";

			return array(
				'file' => $new_file,
				'url' => $url,
				'type' => $type,
				'file_name' => $uploadedfile_name
			);
		}
		
    }

endif;