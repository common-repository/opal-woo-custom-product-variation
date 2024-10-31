<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly    

$validates_message = [
    'required_field_message' => [
        'label' => esc_html__('Required field message', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Field is required', 'opal-woo-custom-product-variation'),
        'placeholder' => ''
    ],
    'minimum_length_string_message' => [
        'label' => esc_html__('Error on minimum length validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Minimum {minLength} characters required', 'opal-woo-custom-product-variation'),
    ],
    'maximum_length_string_message' => [
        'label' => esc_html__('Error on maximum length validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Maximum {maxLength} characters allowed', 'opal-woo-custom-product-variation'),
        'description' => esc_html__('{minLength} - To display minimum length allowed', 'opal-woo-custom-product-variation'),
        'desc_tip' => true,
    ],
    'minimum_value_message' => [
        'label' => esc_html__('Error on minimum value validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Minimum value is {minValue}', 'opal-woo-custom-product-variation'),
    ],
    'maximum_value_message' => [
        'label' => esc_html__('Error on maximum value validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Maximum value is {maxValue}', 'opal-woo-custom-product-variation'),
    ],
    'minimum_option_message' => [
        'label' => esc_html__('Error on minimum options validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Select minimum {minOptions} options', 'opal-woo-custom-product-variation'),
    ],
    'maximum_option_message' => [
        'label' => esc_html__('Error on maximum options validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Select maximum {maxOptions} options', 'opal-woo-custom-product-variation'),
    ],
    'maximum_file_size_message' => [
        'label' => esc_html__('Error on maximum file size validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Maximum file size should be {maxFileSize}', 'opal-woo-custom-product-variation'),
    ],
    'minimum_file_size_message' => [
        'label' => esc_html__('Error on minimum file size validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Minimum file size should be {minFileSize}', 'opal-woo-custom-product-variation'),
    ],
    'extention_support_message' => [
        'label' => esc_html__('Error on file extension support validation', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('File type is not supported', 'opal-woo-custom-product-variation'),
    ],
    'being_upload_message' => [
        'label' => esc_html__('Message when trying to submit cart while files are being uploaded', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Files are being uploaded.', 'opal-woo-custom-product-variation'),
    ],
    'invalid_email_message' => [
        'label' => esc_html__('Validation message for invalid email', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Provide a valid email address', 'opal-woo-custom-product-variation'),
    ],
    'invalid_url_message' => [
        'label' => esc_html__('Validation message for invalid URL', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Provide a valid URL', 'opal-woo-custom-product-variation'),
    ],
    'other_value_required_message' => [
        'label' => esc_html__('Error on other value validation error', 'opal-woo-custom-product-variation'),
        'value' => esc_html__('Other value required', 'opal-woo-custom-product-variation'),
    ],
];