/*------------------------- 
Frontend related javascript
-------------------------*/

(function( $ ) {

	"use strict";

    const DEFAULTCONDITIONFIELD = ['stock_status', 'product_ids', 'stock_quantity', 'quantity', 'attribute', '0'];

    window.owcpv_price_format = function(price) {
        if ( typeof opalwoocu === 'undefined' ) {
            return false;
        }
    
        return accounting.formatMoney( price, {
            symbol:    opalwoocu.currency_format_symbol,
            decimal:   opalwoocu.currency_format_decimal_sep,
            thousand:  opalwoocu.currency_format_thousand_sep,
            precision: opalwoocu.currency_format_num_decimals,
            format:    opalwoocu.currency_format
        });
    }

    // Price Format by Number
    function priceFormat($price) {
        return $price.toFixed(2).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }

    // Convert MB to Byte
    function convertMbToByte($size) {
        return parseFloat($size) * 1048576;
    }

    // Check Arr1 Contained Arr2 Or Not
    function arrContainedArr(arr1, arr2) {
        var isContained = arr2.every(function(value) {
            return arr1.includes(value);
        });
  
        return isContained;
    }

    // Compare 2 arr same value
    function arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
  
        arr1.sort();
        arr2.sort();
  
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
  
        return true;
    }

    // Check array has value greater than a value
    function hasValueGreaterThan(array, threshold, equal = false) {
        var hasGreaterValue = false;
      
        threshold = Number(threshold);
        if(isNaN(threshold)) return false;

        $.each(array, function(index, value) {
            value = Number(value);
            if(isNaN(value)) return;

            if (equal) {
                if (value >= threshold) {
                    hasGreaterValue = true;
                    return false;
                }
            } 
            else {
                if (value > threshold) {
                    hasGreaterValue = true;
                    return false;
                }
            }
        });
        
        return hasGreaterValue;
    }

    // Check array has value contains string
    function hasValueContainsString(myArray, searchSubstring) {
        var containsSubstring = $.grep(myArray, function(element) {
            return element.indexOf(String(searchSubstring)) !== -1;
        }).length > 0;
        
        return containsSubstring;
    }
    
    // Check if any element in the array starts with the string
    function hasValueStartWithString(myArray, searchString) {
        var startsWithString = $.grep(myArray, function(element) {
            return element.indexOf(searchString) === 0;
        }).length > 0;

        return startsWithString;
    }
    
    // Check if any element in the array ends with the string
    function hasValueEndWithString(myArray, searchString) {
        var endsWithString = $.grep(myArray, function(element) {
            return new RegExp(searchString + "$").test(element);
        }).length > 0;

        return endsWithString;
    }

    // Recursive show/hide field base on condition field
    function recursiveCondition(itemRender) {
        var show = itemRender.attr('show'),
            dataCondition = itemRender.data('condition');

        if (dataCondition == '' || typeof dataCondition == 'undefined') return;

        var rules = dataCondition.rules,
            checkShow = true;

        $.each(rules, function(index, ruleItem) {
            var ruleField = ruleItem.field;
            var ruleFieldWrap = $('.form-group.field-' + ruleField).closest('.render-wrap');
            if (ruleFieldWrap.hasClass('owcpv_hidden') && show === 'true') {
                checkShow = false;
                return false;
            }
            else {
                recursiveCondition(ruleFieldWrap);
            }
        })
        
        if(!checkShow) itemRender.addClass('owcpv_hidden');
        if(checkShow && show === 'true') itemRender.removeClass('owcpv_hidden');

        if (itemRender.hasClass('owcpv_hidden')) {
            itemRender.find('input, select').each(function() {
                $(this).prop('disabled', true);
            })
        }
        else {
            itemRender.find('input, select').each(function() {
                $(this).prop('disabled', false);
            })
        }

        owcpv.updatePriceCalculator();
    }

    var owcpv = {
        owcpv_product_data: {},
        
        // Init owcpv
        init: function(owcpv_input_data = '') {
            if (owcpv_input_data != '') {
                this.owcpv_product_data = owcpv_input_data;
            }
            else {
                if (typeof owcpv_product !== "undefined") {
                    this.owcpv_product_data = owcpv_product;
                }
            }
            
            if ($.isEmptyObject( this.owcpv_product_data )) return false;
            //Run form render action
            this.renderForm();
        },

        // Get Base Price
        getBasePrice: function() {
            return parseFloat($('.owcpv_product_base .wrap_price').text());
        },

        // Get Price by Base Price
        priceByPercent: function($percent) {
            return owcpv.getBasePrice() / 100 * $percent;
        },

        // Calculate Price Field
        fieldPriceCalculator: function($field, $price, $init = false) {
            var $fieldHasPrice = $field.attr('price-value'),
                $fieldType = $field.attr('type'),
                $plus = true,
                $wrapField = $field.parents('.render-wrap'),
                $attrSelected = $wrapField.attr('attribute-selected');

            if ($field.is('select')) {
                $fieldType = 'select';
            }

            switch($fieldType) {
                case 'checkbox':

                    if (!$field.is(":checked")) {
                        $field.removeAttr('checkbox-price');
                    } 
                    else {
                        $field.attr('checkbox-price', $price);
                    }

                    if ($wrapField.find('input[checkbox-price]').length > 0) {
                        $price = 0;
                        $wrapField.find('input[checkbox-price]').each(function() {
                            $price += parseFloat($(this).attr('checkbox-price'));
                        });
                    }
                    else {
                        $plus = false;
                    }

                    break;
                case 'radio':
                    $plus = false;
                    var radiosubtype = $field.attr('radiosubtype'),
                        colorOption = $field.attr('color-option');
                        
                    if ($field.is(":checked")) {
                        $('.formbuilder-radio input[name="'+$field.attr('name')+'"]').removeClass('radio_checked');
                        $field.addClass('radio_checked');
                        
                        if (radiosubtype && colorOption && radiosubtype == 'button-option') {
                            $('.formbuilder-radio input[name="'+$field.attr('name')+'"]').each(function() {
                                $(this).next('label').css({
                                    'background-color': '',
                                    'color': $(this).attr('color-option'),
                                });
                            })
                            $field.next('label').css({
                                'background-color': colorOption,
                                'color': '#fff',
                            });
                        }

                        $plus = true;
                        $init = true;
                    }
                    else {
                        if (radiosubtype && radiosubtype == 'button-option') {
                            $('.formbuilder-radio input[name="'+$field.attr('name')+'"]').each(function() {
                                $(this).next('label').css({
                                    'background-color': '',
                                    'color': $(this).attr('color-option'),
                                });
                            })
                        }
                    }
                    break;
                case 'select':
                    $fieldHasPrice = true;
                    if (!$price) {
                        $fieldHasPrice = false;
                        $price = 0;
                    }
                    break;
                case 'file':
                    if (!$field.hasClass('file_uploaded')) {
                        $plus = false;
                    }
                    $fieldHasPrice = true;
                    if (!$price) {
                        $fieldHasPrice = false;
                    }
                    break;
                default:
                    if ($field.val() == '') {
                        $plus = false;
                    }
            }

            if(!$fieldHasPrice) {
                $price = 0;
            }
            
            if ($plus) {
                $wrapField.attr('field-price', $price);
            }
            else if (!$init) {
                $wrapField.removeAttr('field-price');
            }

            owcpv.updatePriceCalculator();
        },

        // Update Price Field after Calculating
        updatePriceCalculator: function() {
            var $optionPrice = 0;
            
            $('.owcpv_price_summary .owcpv_option_price').empty().html('<ul class="owcpv_list_option_price"></ul>');
            $(".owcpv_inner_form:not(.toggle_hidden) .render-wrap:not(.owcpv_hidden)").each(function() {
                if ($(this).attr('field-price')) {
                    var label = $(this).find('label.field-label .raw_label').text(),
                        price = parseFloat($(this).attr('field-price'));

                    if (!$(this).hasClass('hide_option_detail') && price) {
                        $('.owcpv_price_summary .owcpv_option_price .owcpv_list_option_price').append('<li><span>'+label+'</span><span class="owcpv_price_outer">'+owcpv_price_format(price)+'</span></li>');
                    }

                    if (!$(this).hasClass('not_calculated_option')) {
                        $optionPrice += price;
                    }
                }
            })

            var $totalPrice = this.getBasePrice() + parseFloat($optionPrice);

            $('.owcpv_options_total .wrap_price').text(priceFormat($optionPrice));
            $('.owcpv_total .wrap_price').text(priceFormat($totalPrice));

            $('.owcpv_price_summary').trigger('owcpv_update_price_summary', [priceFormat($totalPrice), parseFloat($optionPrice)]);
        },

        // Update Price Field after Changing Variation
        updatePriceChangeVariation: function($wrapField) {
            var $dataRender = $wrapField.data('form')[0],
                $priceOption = $dataRender.priceOptions;

            $wrapField.find('input, textarea').each(function() {
                var $field = $(this),
                    $price = parseFloat($(this).attr('price-value'));

                if($price) {
                    if($priceOption === 'percent') {
                        $price = owcpv.priceByPercent($price);
                    }
                    $price = priceFormat($price);
                    $wrapField.find('label[for="'+$field.attr('id')+'"] .price_value').text(' ('+owcpv_price_format($price)+')');
                }
            })
            $wrapField.find('select').each(function() {
                var $field = $(this);

                $field.find('option').each(function() {
                    var $option = $(this),
                        $price = parseFloat($(this).attr('price-value')),
                        $label_raw = $option.attr('label_raw');

                    if($price) {
                        if($priceOption === 'percent') {
                            $price = owcpv.priceByPercent($price);
                        }
                        $price = priceFormat($price);
                        $option.text($label_raw+' ('+owcpv_price_format($price)+')');
                    }
                })
            })
            if ($wrapField.find('input[name="owcpv_file"]').length > 0) {
                var $price = parseFloat($dataRender.priceValue);

                if($price) {
                    if($priceOption === 'percent') {
                        $price = owcpv.priceByPercent($price);
                    }
                    $price = priceFormat($price);
                    $wrapField.find('label[for="'+$dataRender.name+'"] .price_value').text(' ('+owcpv_price_format($price)+')');
                }
            }
        },

        // Update Price Value Field
        updatePriceField: function($wrapField) {
            $wrapField.find('input, textarea').each(function() {
                var $field = $(this),
                    $price = parseFloat($(this).attr('price-value')),
                    $priceOption = $(this).attr('price-options');

                if($price) {
                    if($priceOption === 'percent') {
                        $price = owcpv.priceByPercent($price);
                    }
                    $price = priceFormat($price);
                    owcpv.fieldPriceCalculator($field, $price, true);
                }
                $field.on('change', function(e) {
                    e.preventDefault();

                    var $price = parseFloat($(this).attr('price-value'));
                    if($priceOption === 'percent') {
                        $price = owcpv.priceByPercent($price);
                    }
                    $price = priceFormat($price);
                    owcpv.fieldPriceCalculator($(this), $price);
                })
            });

            $wrapField.find('select').each(function() {
                var $field = $(this),
                    $fieldSelected = $field.find('option:selected'),
                    $priceOption = $(this).attr('price-options'),
                    $price = parseFloat($fieldSelected.attr('price-value'))

                if ($fieldSelected.attr('value') && $price) {
                    if($priceOption === 'percent') {
                        $price = owcpv.priceByPercent($price);
                    }
                    $price = priceFormat($price);

                    owcpv.fieldPriceCalculator($field, $price, true);
                    // if (owcpv.handleCondition($wrapField)) {
                    // }
                }

                $field.on('change', function(e) {
                    e.preventDefault();

                    var $field = $(this),
                        $fieldSelected = $field.find('option:selected'),
                        $price = parseFloat($fieldSelected.attr('price-value'));

                    if($price) {
                        if($priceOption === 'percent') {
                            $price = owcpv.priceByPercent($price);
                        }
                        $price = priceFormat($price);
                    }

                    owcpv.fieldPriceCalculator($(this), $price);
                })
            });

            if ($wrapField.find('input[name="owcpv_file"]').length > 0) {
                var $dataRender = $wrapField.data('form')[0],
                    $priceOption = $dataRender.priceOptions,
                    $price = parseFloat($dataRender.priceValue);

                if($price) {
                    if($priceOption === 'percent') {
                        $price = owcpv.priceByPercent($price);
                    }
                    $price = priceFormat($price);
                    owcpv.fieldPriceCalculator($wrapField.find('input[name="owcpv_file"]'), $price);
                }
            }
        },

        // Change Required Attr
        changeRequiredAttr: function ($wrapField, $remove = true) {
            $wrapField.find('input, textarea').each(function() {
                if ($remove) {
                    $(this).removeAttr('required aria-required');
                } 
                else {
                    $(this).attr({ 'required': "required", 'aria-required': 'true' });
                }
                // $(this).prop('required', !$remove);
            });
            
            $wrapField.find('select').each(function() {
                if ($remove) {
                    $(this).removeAttr('required aria-required');
                } 
                else {
                    $(this).attr({ 'required': "required", 'aria-required': 'true' });
                }
                // $(this).prop('required', !$remove);
            });
        },

        // Handle Condition Field
        handleCondition: function ($wrapField, $attributes = false, $rendered = false, $field = false) {
            var dataCondition = $wrapField.data('condition'),
                logicAction = dataCondition.logic_action,
                required = dataCondition.required,
                rules = dataCondition.rules,
                rulePass = [],
                actionPass = false,
                $optionPrice = parseFloat($('.owcpv_options_total .wrap_price').text()),
                $totalPrice = parseFloat($('.owcpv_total .wrap_price').text()),
                fieldPrice = parseFloat($wrapField.attr('field-price'));

            if (dataCondition == '' || typeof dataCondition == 'undefined') return true;
            if (!$rendered && rules.length < 1) return true;

            if ($rendered) {
                // console.log($('[name="radio-group-1704278015771-0"]'));
                // console.log($wrapField);
            }
            
            $.each(rules, function(index, ruleItem) {
                var field = ruleItem.field,
                    operator = ruleItem.operator,
                    itemPass = false;
                
                rulePass[index] = {};

                // var checkField = rulePass.filter(p => p.field == $field).length;
                // if ($.inArray(field, DEFAULTCONDITIONFIELD) !== -1) {
                //     field = ruleItem.field;
                // }
                // else if ($field && !checkField) {
                //     field = $field;
                // }

                if (field == 'stock_quantity') {
                    var qty = owcpv.owcpv_product_data.stock_quantity;
                    if ($attributes) {
                        var varID = $attributes.variation_id;
                        qty = owcpv.owcpv_product_data.variation[varID].stock_quantity;
                    }
                    switch (ruleItem.relation) {
                        case 'is':
                            itemPass = (qty == parseInt(ruleItem.value));
                            break;
                        case 'is_not':
                            itemPass = (qty != parseInt(ruleItem.value));
                            break;
                        case 'is_empty':
                            itemPass = (qty == 0);
                            break;
                        case 'is_not_empty':
                            itemPass = (qty != 0);
                            break;
                        case 'is_greater':
                            itemPass = (qty == null) ? true : (qty > parseInt(ruleItem.value));
                            break;
                        case 'is_lessthan':
                            itemPass = (qty == null) ? true : (qty < parseInt(ruleItem.value));
                            break;
                        case 'is_greater_or_equal':
                            itemPass = (qty == null) ? true : (qty >= parseInt(ruleItem.value));
                            break;
                        case 'is_lessthan_or_equal':
                            itemPass = (qty == null) ? true : (qty <= parseInt(ruleItem.value));
                            break;
                        default:
                            itemPass = false;
                            break;
                    }
                } 
                if (field == 'stock_status') {
                    var stock_status = owcpv.owcpv_product_data.stock_status;
                    if ($attributes) {
                        var varID = $attributes.variation_id;
                        stock_status = owcpv.owcpv_product_data.variation[varID].stock_status;
                    }
                    switch (ruleItem.relation) {
                        case 'is':
                            itemPass = (stock_status == ruleItem.value_stock);
                            break;
                        case 'is_not':
                            itemPass = (stock_status != ruleItem.value_stock);
                            break;
                        default:
                            itemPass = false;
                            break;
                    }
                } 
                if (field == 'product_ids') {
                    var prodID = owcpv.owcpv_product_data.product_id,
                        ruleProductIds = ruleItem.value,
                        ruleProductArr = $.map(ruleProductIds.split(","), $.trim);

                    switch (ruleItem.relation) {
                        case 'is_in':
                            itemPass = ($.inArray(prodID, ruleProductArr) !== -1)
                            break;
                        case 'is_not_in':
                            itemPass = ($.inArray(prodID, ruleProductArr) === -1)
                            break;
                        default:
                            itemPass = false;
                            break;
                    }
                } 
                if (field == 'attribute') {
                    if ($attributes) {
                        var relationAttr = ruleItem.relation_attr,
                            attrKey = 'attribute_pa_'+relationAttr;

                        itemPass = ($attributes[attrKey] == ruleItem.value_attr);
                    }
                } 
                if (field == 'quantity') {
                    var cartInput = $('.single-product .cart input[name="quantity"]'),
                        qty = parseInt(cartInput.val());

                    switch (ruleItem.relation) {
                        case 'is':
                            itemPass = (qty == parseInt(ruleItem.value));
                            break;
                        case 'is_not':
                            itemPass = (qty != parseInt(ruleItem.value));
                            break;
                        case 'is_greater':
                            itemPass = (qty > parseInt(ruleItem.value));
                            break;
                        case 'is_lessthan':
                            itemPass = (qty < parseInt(ruleItem.value));
                            break;
                        case 'is_greater_or_equal':
                            itemPass = (qty >= parseInt(ruleItem.value));
                            break;
                        case 'is_lessthan_or_equal':
                            itemPass = (qty <= parseInt(ruleItem.value));
                            break;
                        default:
                            break;
                    }
                } 

                if ($rendered && $.inArray(field, DEFAULTCONDITIONFIELD) === -1) {
                    var fieldWrap = $('.form-group.field-'+field).closest('.render-wrap'),
                        type = fieldWrap.data('type'),
                        data = fieldWrap.data('form')[0],
                        valRulField = ruleItem.value_field;

                    if (type == 'radio-group') {
                        var fieldVal = $('input[name="'+field+'"]:checked').val(),
                            dataVal = false;
                        if (fieldVal && data.values[fieldVal]) {
                            dataVal = (data.values[fieldVal].owcpvValue == '') ? data.values[fieldVal].label : data.values[fieldVal].owcpvValue;
                        }

                    }
                    else if (type == 'checkbox-group') {
                        var fieldVal = [],
                            dataVal = [];

                        fieldWrap.find('input[type="checkbox"]:checked').each(function(){
                            var itemDataVal = (data.values[$(this).val()].owcpvValue == '') ? data.values[$(this).val()].label : data.values[$(this).val()].owcpvValue;
                            fieldVal.push($(this).val());
                            dataVal.push(itemDataVal);
                        });

                        if(fieldVal.length == 1) fieldVal = fieldVal[0];
                        if(dataVal.length == 1) dataVal = dataVal[0];
                    }
                    else {
                        var fieldVal = $('[name="'+field+'"]').val();
                        
                        if (typeof data.values != 'undefined' && data.values[fieldVal]) {
                            var dataVal = (data.values[fieldVal].owcpvValue == '') ? data.values[fieldVal].label : data.values[fieldVal].owcpvValue;
                        }
                        else {
                            var dataVal = fieldVal;
                        }

                        
                    }

                    const storageDataField = localStorage.getItem('target_field_'+field);
                    var storageObj = [];
                    var targetFieldName = $wrapField.data('form')[0].name;

                    if (storageDataField) {
                        storageObj = JSON.parse(storageDataField);
                    }

                    
                    if ($.inArray(targetFieldName, storageObj) === -1) {
                        storageObj.push(targetFieldName);
                        localStorage.setItem('target_field_'+field, JSON.stringify(storageObj));
                    
                        if (type == 'checkbox-group') {
                            field += '[]';
                        }
                        $('[name="'+field+'"]').on('change', function(e) {
                            e.stopPropagation();
    
                            owcpv.handleCondition($wrapField, false, true, field);
                        });
                    }
                    // console.log(storageObj);


                    switch (ruleItem.relation) {
                        case 'is':
                            if ($.isArray(valRulField)) {
                                if ($.isArray(fieldVal)) {
                                    itemPass = arraysAreEqual(valRulField, fieldVal);
                                }
                                else {
                                    itemPass = false;
                                }
                            }
                            else {
                                if ($.isArray(fieldVal)) {
                                    itemPass = false;
                                }
                                else {
                                    itemPass = fieldVal == valRulField;
                                }
                            }
                            break;
                        case 'is_not':
                            if ($.isArray(valRulField)) {
                                if ($.isArray(fieldVal)) {
                                    itemPass = !arraysAreEqual(valRulField, fieldVal);
                                }
                                else {
                                    itemPass = true;
                                }
                            }
                            else {
                                if ($.isArray(fieldVal)) {
                                    itemPass = true;
                                }
                                else {
                                    itemPass = fieldVal != valRulField;
                                }
                            }
                            break;
                        case 'is_in':
                            if (!$.isArray(valRulField)) {
                                valRulField = [valRulField];
                            }
                            if ($.isArray(fieldVal)) {
                                itemPass = arrContainedArr(valRulField, fieldVal);
                            }
                            else {
                                itemPass = $.inArray(fieldVal, valRulField) !== -1;
                            }
                            break;
                        case 'is_not_in':
                            if (!$.isArray(valRulField)) {
                                valRulField = [valRulField];
                            }
                            if ($.isArray(fieldVal)) {
                                itemPass = !arrContainedArr(valRulField, fieldVal);
                            }
                            else {
                                itemPass = $.inArray(fieldVal, valRulField) === -1;
                            }
                            break;
                        case 'is_empty':
                            if ($.isArray(fieldVal)) {
                                itemPass = fieldVal.length < 1;
                            }
                            else {
                                itemPass = (typeof fieldVal == 'undefined' || fieldVal == '');
                            }
                            break;
                        case 'is_not_empty':
                            if ($.isArray(fieldVal)) {
                                itemPass = fieldVal.length > 0;
                            }
                            else {
                                itemPass = (typeof fieldVal != 'undefined' && fieldVal != '');
                            }
                            break;
                        case 'is_greater':
                            if ($.isArray(dataVal)) {
                                itemPass = hasValueGreaterThan(dataVal, valRulField);
                            }
                            else {
                                itemPass = dataVal > valRulField;
                            }
                            break;
                        case 'is_lessthan':
                            if ($.isArray(dataVal)) {
                                itemPass = !hasValueGreaterThan(dataVal, valRulField);
                            }
                            else {
                                itemPass = dataVal < valRulField;
                            }
                            break;
                        case 'is_greater_or_equal':
                            if ($.isArray(dataVal)) {
                                itemPass = hasValueGreaterThan(dataVal, valRulField);
                            }
                            else {
                                itemPass = dataVal >= valRulField;
                            }
                            break;
                        case 'is_lessthan_or_equal':
                            if ($.isArray(dataVal)) {
                                itemPass = !hasValueGreaterThan(dataVal, valRulField);
                            }
                            else {
                                itemPass = dataVal <= valRulField;
                            }
                            break;
                        case 'contains':
                            if ($.isArray(dataVal)) {
                                itemPass = hasValueContainsString(dataVal, valRulField);
                            }
                            else {
                                itemPass = dataVal.indexOf(valRulField) !== -1;
                            }
                            break;
                        case 'not_contains':
                            if ($.isArray(dataVal)) {
                                itemPass = !hasValueContainsString(dataVal, valRulField);
                            }
                            else {
                                itemPass = dataVal.indexOf(valRulField) === -1;
                            }
                            break;
                        case 'starts_with':
                            if ($.isArray(dataVal)) {
                                itemPass = hasValueStartWithString(dataVal, valRulField);
                            }
                            else {
                                itemPass = dataVal.indexOf(valRulField) === 0;
                            }
                            break;
                        case 'ends_with':
                            if ($.isArray(dataVal)) {
                                itemPass = hasValueEndWithString(dataVal, valRulField);
                            }
                            else {
                                itemPass = new RegExp(valRulField + "$").test(dataVal);
                            }
                            break;
                        case 'date_is':
                            if (type != 'date') {
                                itemPass = false;
                            }
                            else {
                                dataVal = new Date(dataVal);
                                valRulField = new Date(valRulField);
                                itemPass = dataVal == valRulField;
                            }
                            break;
                        case 'date_is_before':
                            if (type != 'date') {
                                itemPass = false;
                            }
                            else {
                                dataVal = new Date(dataVal);
                                valRulField = new Date(valRulField);
                                itemPass = dataVal < valRulField;
                            }
                            break;
                        case 'date_is_after':
                            if (type != 'date') {
                                itemPass = false;
                            }
                            else {
                                dataVal = new Date(dataVal);
                                valRulField = new Date(valRulField);
                                itemPass = dataVal > valRulField;
                            }
                            break;
                        case 'time_is':
                            if (type != 'date') {
                                itemPass = false;
                            }
                            else {
                                itemPass = dataVal == valRulField;
                            }
                            break;
                        case 'time_is_before':
                            if (type != 'date') {
                                itemPass = false;
                            }
                            else {
                                dataVal = new Date('2024-01-10T'+dataVal);
                                valRulField = new Date('2024-01-10T'+valRulField);
                                itemPass = dataVal < valRulField;
                            }
                            break;
                        case 'time_is_after':
                            if (type != 'date') {
                                itemPass = false;
                            }
                            else {
                                dataVal = new Date('2024-01-10T'+dataVal);
                                valRulField = new Date('2024-01-10T'+valRulField);
                                itemPass = dataVal > valRulField;
                            }
                            break;
                        default:
                            itemPass = dataVal == valRulField;
                            break;
                    }
                }

                rulePass[index]['field'] = field;
                rulePass[index]['pass'] = itemPass;
                rulePass[index]['operator'] = operator;
            })

            // console.log(rulePass);

            $.each(rulePass, function(i, itemPass) {
                var actionItemPass = itemPass.pass;
                if (i == 0) {
                    actionPass = actionItemPass;
                }
                else {
                    if (itemPass.operator == 'and') {
                        actionPass = (actionItemPass && actionPass);
                    } 
                    else {
                        actionPass = (actionItemPass || actionPass);
                    }
                }
            });

            if ((actionPass && logicAction == 'show') || (!actionPass && logicAction != 'show')) {
                
                if (fieldPrice && $wrapField.hasClass('owcpv_hidden')) {
                    $optionPrice += fieldPrice;
                    $totalPrice += fieldPrice;
                    $('.owcpv_options_total .wrap_price').text(priceFormat($optionPrice));
                    $('.owcpv_total .wrap_price').text(priceFormat($totalPrice));
                }

                $wrapField.attr('show', true);
                $wrapField.removeClass('owcpv_hidden');

                if (required) {
                    owcpv.changeRequiredAttr($wrapField, false);
                }
            } 
            else {

                if (fieldPrice && !$wrapField.hasClass('owcpv_hidden')) {
                    $optionPrice -= fieldPrice;
                    $totalPrice -= fieldPrice;
                    $('.owcpv_options_total .wrap_price').text(priceFormat($optionPrice));
                    $('.owcpv_total .wrap_price').text(priceFormat($totalPrice));
                }

                $wrapField.attr('show', false);
                $wrapField.addClass('owcpv_hidden');  

                if (required) {
                    owcpv.changeRequiredAttr($wrapField);
                }
            }

            if ($rendered) {
                $('.render-wrap').each(function(i) {
                    recursiveCondition($(this));
                })
            }

            if (fieldPrice) {
                $('.owcpv_options_total .wrap_price').text(priceFormat($optionPrice));
                $('.owcpv_total .wrap_price').text(priceFormat($totalPrice));
            }

            return (logicAction == 'show') ? actionPass : !actionPass;
        },

        // Handle Image Group Field
        handleImageGroup: function ($wrapField) {
            $wrapField.find('.formbuilder-radio-group').each(function() {
                var $parentTag = $(this).find('.formbuilder-radio');
                $parentTag.addClass('owcpv_custom_radio_group');
                $parentTag.each(function() {
                    var imgInput = $(this).find('input[type="radio"]'),
                        imgInputId = imgInput.attr('id'),
                        imgUrl = imgInput.attr('owcpv-value');
                    
                    if (imgUrl) {
                        $('<label for="'+imgInputId+'" class="img_group_preview"><img src="'+imgUrl+'" alt="" width="70" height="70"></label>').insertAfter(imgInput);
                    }
                })
            });
        },

        // Add Popup Image Preview
        addPopupPreview: function($wrapField) {
            $wrapField.find('.owcpv_show_preview').on('click', function(e) {
                e.preventDefault();

                var input = $(this).closest('.formbuilder-radio').find('input[type="radio"]'),
                    id = input.attr('id'),
                    radiosubtype = input.attr('radiosubtype'),
                    data = input.attr('owcpv-value'),
                    dataGallery = input.attr('owcpv-gallery'),
                    label = $(this).closest('.formbuilder-radio').find('label[for="'+id+'"]:not(.img_group_preview)').html(),
                    html = '';
                
                if (radiosubtype == 'image-option' && data) {
                    let images = '<li><div class="preview_inner"><img src="' + data + '" /></div></li>';
                    html = '<div class="owcpv_popup_preview"><div class="owcpv_header_popup"><h4>'+label+'</h4></div><div class="owcpv_body_popup"><ul class="slides">' + images + '</ul></div><div class="owcpv_footer_popup"><a class="footer_popup_btn" id="close-btn" href="#">Cancel</a><a class="footer_popup_btn" id="select-option-btn" data-id="'+id+'" href="#">Select</a></div></div>';
                }
                if (radiosubtype == 'image-extra' && dataGallery) {
                    var galleryVal = JSON.parse(decodeURIComponent(dataGallery));
                    if (galleryVal.length) {
                        html = '<div class="owcpv_popup_preview"><div class="owcpv_header_popup"><h4>'+label+'</h4></div><div class="owcpv_body_popup wrapper_slider"><ul class="slides">';
                        $.each(galleryVal, function(i, item) {
                            html += '<li><div class="preview_inner"><img src="' + item.src + '" /></div></li>';
                        })
                        html += '</ul><div class="custom-navigation"><a href="#" class="flex-prev"><i class="fas fa-chevron-left"></i></a><a href="#" class="flex-next"><i class="fas fa-chevron-right"></i></a></div></div><div class="owcpv_footer_popup"><a class="footer_popup_btn" id="close-btn" href="#">Cancel</a><a class="footer_popup_btn" id="select-option-btn" data-id="'+id+'" href="#">Select</a></div></div>';
                    }
                }
                
                if (html != '') {

                    $.magnificPopup.open({
                        items: {
                            src: html,
                            type: 'inline'
                        },
                        callbacks: {
                            open: function() {
                                if ($('.wrapper_slider .slides li').length > 1) {
                                    $('.wrapper_slider').flexslider({
                                        animation: "slide",
                                        customDirectionNav: $(".custom-navigation a")
                                    });
                                }

                                $('#close-btn').on('click',function(event){
                                    event.preventDefault();
                                    $.magnificPopup.close();
                                }); 
                                $('#select-option-btn').on('click',function(event){
                                    event.preventDefault();
                                    var id = $(this).data('id');
                                    $("input#"+id).prop("checked",true).change();
                                    $.magnificPopup.close();
                                }); 
                            },
                            close: function() {
                              // Will fire when popup is closed
                            }
                            // e.t.c.
                        }
                    });
                }

            });
        },
        
        // Handle Custom Radio Group Field
        handleCustomRadioGroup: function ($wrapField, $name, $subType) {
            var radioGroup = $wrapField.find('.formbuilder-radio-group')
            var nameField = $name,
                val = $('input[name="'+nameField+'"]:checked').val(),
                classShowClear = (typeof val == 'undefined') ? 'owcpv_hidden' : '';
            
            radioGroup.addClass('owcpv_custom_radio_group_parent ' + $subType);
            radioGroup.append('<a href="#" class="owcpv_clear_field '+classShowClear+'">Clear option</a>');

            $('input[name="'+nameField+'"]').on('change', function() {
                let curVal = $('input[name="'+nameField+'"]:checked').val();
                if (typeof curVal == 'undefined') {
                    $wrapField.find('.owcpv_clear_field').addClass('owcpv_hidden');
                }
                else {
                    $wrapField.find('.owcpv_clear_field').removeClass('owcpv_hidden');
                }
            })

            radioGroup.find('.owcpv_clear_field').on('click', function(e) {
                e.preventDefault();
                $('input[name="'+nameField+'"]:checked').prop('checked', false).change();
            })
            
            var $parentTag = radioGroup.find('.formbuilder-radio');
            $parentTag.addClass('owcpv_custom_radio_group');
            $parentTag.each(function() {
                var radioInput = $(this).find('input[type="radio"]'),
                    radioInputId = radioInput.attr('id'),
                    radioVal = radioInput.attr('owcpv-value');
                
                if (radioVal) {
                    if ($subType == 'image-option' || $subType == 'image-extra') {
                        $('<label for="'+radioInputId+'" class="img_group_preview"><img src="'+radioVal+'" alt="" width="70" height="70"><a href="#" class="owcpv_show_preview"><i class="fas fa-search-plus"></i></a></label>').insertAfter(radioInput);
                    }
                    if ($subType == 'color-option') {
                        $('<label for="'+radioInputId+'" class="color_group_preview" style="background-color: '+radioVal+'"></label>').insertAfter(radioInput);
                    }
                }
                if ($subType == 'button-option') {

                    var label = $(this).find('label[for="'+radioInputId+'"]'),
                        colorOption = radioInput.attr('color-option'),
                        shapeStyle = radioInput.attr('shape-style'),
                        shapeSize = radioInput.attr('shape-size'),
                        labelWidth = label.outerWidth();
                    if (colorOption) {
                        label.css({
                            'border-color': colorOption,
                            'color': colorOption,
                        });
                        if (shapeSize && shapeSize != '') {
                            label.wrapInner('<span></span>');
                            label.find('span').addClass('owcpv_hidden_line').css({
                                '-webkit-line-clamp': '1'
                            });
                            label.css({
                                'width': shapeSize,
                            });
                            labelWidth = shapeSize;
                        }
                        if (shapeStyle && shapeStyle == 'circle') {
                            label.css({
                                'height': labelWidth,
                                'border-radius': '50%'
                            });
                        }
                    }
                }
            })

            owcpv.addPopupPreview($wrapField);
        },
        
        // Render Form
        renderForm: function() {
            $(".render-wrap").each(function() {
                var $wrapField = $(this),
                    $currencySymbol = $wrapField.data('currency_symbol'),
                    $dataRender = $(this).data('form')[0];

                var $configFineUploader = {
                    // autoUpload: true,
                    multiple: false,
                    validation: {
                        // acceptFiles: $dataRender.type_allow.split(','),
                        allowedExtensions: ($dataRender.type_allow) ? $dataRender.type_allow.split(',') : [],
                        itemLimit: 1,
                        allowEmpty: false,
                        minSizeLimit: ($dataRender.min_size) ? convertMbToByte($dataRender.min_size) : 0,
                        sizeLimit: ($dataRender.max_size) ? convertMbToByte($dataRender.max_size) : 0,
                    },
                    retry: {
                        enableAuto: false
                    },
                    callbacks: {
                        onStatusChange: function(id, oldStatus, newStatus) {
                            if ($dataRender.priceCheckbox && $dataRender.priceValue) {
                                var $price = $dataRender.priceValue;
                                $price = ($dataRender.priceOptions === 'percent') ? owcpv.priceByPercent($price) : $price;

                                if (newStatus == qq.status.UPLOAD_SUCCESSFUL) {
                                    $wrapField.attr('field-price', $price).find('input[name="owcpv_file"]').addClass('file_uploaded');
                                }
                                else {
                                    $wrapField.removeAttr('field-price').find('input[name="owcpv_file"]').removeClass('file_uploaded');
                                }
                                owcpv.updatePriceCalculator();
                            }
                        },
                        onComplete: function(id, chunkData, responseJSON) {
                            var fieldID = $dataRender.name;
                            $('input#'+fieldID).val(responseJSON.file.file);
                            owcpv.owcpv_product_data['temp_file'] = responseJSON.file.file;
                        },
                        onDeleteComplete: function(id) {
                            var fieldID = $dataRender.name;
                            $('input#'+fieldID).val('');
                            owcpv.owcpv_product_data['temp_file'] = '';
                        },
                        onDelete: function(e) {
                            $.ajax({
                                type : "post",
                                dataType : "json",
                                url : opalwoocu.ajaxurl,
                                data : {
                                    'action': 'owcpv_delete_fineuploader',
                                    'ajax_nonce_parameter': opalwoocu.security_nonce,
                                    'temp_file': owcpv.owcpv_product_data.temp_file
                                },
                                beforeSend: function(){
                                    
                                },
                                success: function(response) {
                                    if(!response.success) {
                                        alert(response.error);
                                    }
                                },
                            })
                        },
                    },
                    showMessage: function(message) {
                        // prevent alert popup message
                    },
                    request: {
                        endpoint: opalwoocu.ajaxurl,
                        inputName: 'owcpv_file',
                        params: {
                            'action': 'owcpv_handler_fineuploader',
                            'ajax_nonce_parameter': opalwoocu.security_nonce,
                            'product_id': owcpv.owcpv_product_data.product_id,
                            'field_id': $dataRender.name
                        }
                    },
                    deleteFile: {
                        enabled: 1,
                        endpoint: opalwoocu.ajaxurl,
                        params: {
                            'action': 'owcpv_delete_fineuploader',
                            'ajax_nonce_parameter': opalwoocu.security_nonce,
                            'temp_file': 'none'
                        },
                        method: 'POST'
                    }

                };

                $( document ).on( "found_variation.first", function ( e, v ) {
                    $('.owcpv_product_base .wrap_price').text(priceFormat(v.display_price));
                    owcpv.updatePriceCalculator();
                    owcpv.updatePriceChangeVariation($wrapField);
                    owcpv.updatePriceField($wrapField);

                } );

                if ($dataRender.enabelConditional) {
                    owcpv.handleCondition($wrapField);
                    $('.single-product .cart input[name="quantity"]').on('change', function(e) {
                        var attrSelected = $wrapField.attr('attribute-selected'),
                            attributes = (attrSelected) ? JSON.parse(attrSelected) : false,
                            rendered = ($wrapField.find('.rendered-form').length > 0);
                        
                        owcpv.handleCondition($wrapField, attributes, rendered);
                    })
                    $( document ).on( "found_variation.first", function ( e, v ) {
                        var attributes = v.attributes,
                            rendered = ($wrapField.find('.rendered-form').length > 0);

                        attributes.variation_id = v.variation_id;
                        $wrapField.attr('attribute-selected', JSON.stringify(attributes));

                        owcpv.handleCondition($wrapField, attributes, rendered);
                    } );
                }

                $wrapField.formRender({
                    formData: $wrapField.data('form'),
                    controlConfig: {
                        "file.fineuploader": $configFineUploader,
                        'domain': opalwoocu.plugin_url
                    },
                    layoutTemplates: {
                        label: function(label, data) {
                            return $('<label class="field-label"/>')
                              .attr('for', data.id)
                              .append(label);
                        }
                    },
                    onRender: (e) => {
                        // console.log(localStorage.getItem());
                        localStorage.removeItem('target_field_'+$dataRender.name);

                        if ($dataRender.widthItem) {
                            var widthItem = parseFloat($dataRender.widthItem);
                            if (widthItem <= 100 && widthItem > 0) {
                                $wrapField.css('width', widthItem+'%');
                            }
                        }

                        if ($dataRender.type == 'radio-group' && $dataRender.radiosubtype) {
                            if ($dataRender.radiosubtype != '') {
                                owcpv.handleCustomRadioGroup($wrapField, $dataRender.name, $dataRender.radiosubtype);
                            }
                            if ($dataRender.uiSelector) {
                                var nameField = $dataRender.name,
                                    owcpv_val = $('input[name="'+nameField+'"]:checked').attr('owcpv-value'),
                                    val = $('input[name="'+nameField+'"]:checked').val();

                                var defLabel = 'Choose an option',
                                    resuilt = defLabel,
                                    label = '';
                                if(typeof val != 'undefined') {
                                    resuilt = $('input[name="'+nameField+'"]:checked').nextAll('label[for]').text();

                                    if ($dataRender.radiosubtype == 'color-option') {
                                        label = '<span class="owcpv_color_select owcpv_option_val" style="background:'+owcpv_val+'"></span>';
                                    }
                                    if ($dataRender.radiosubtype == 'image-option' || $dataRender.radiosubtype == 'image-extra') {
                                        label = '<img class="owcpv_image_select owcpv_option_val" width="50" height="50" src="'+owcpv_val+'">';
                                    }
                                }

                                $wrapField.find('.formbuilder-radio-group').addClass('ui-selector');
                                $wrapField.find('.radio-group').hide();
                                $('<div class="ui-selector-resuilt">'+label+'<span class="label-option">'+resuilt+'</span></div>').insertAfter($wrapField.find('.field-label'));

                                $wrapField.find('.ui-selector-resuilt').on('click', function(e) {
                                    e.preventDefault();
                                    $(this).toggleClass('opened');
                                    $(this).next('.radio-group').slideToggle();
                                });

                                $('input[name="'+nameField+'"]').on('change', function() {
                                    var owcpv_val = $(this).attr('owcpv-value');
                                    var val = $('input[name="'+nameField+'"]:checked').val();

                                    if (typeof val == 'undefined') {
                                        $wrapField.find('.ui-selector-resuilt').html('<span class="label-option">'+defLabel+'</span>')
                                    }
                                    else {
                                        $wrapField.find('.ui-selector-resuilt .label-option').text($(this).nextAll('label[for]').text());
                                        $wrapField.find('.ui-selector-resuilt').toggleClass('opened').next('.radio-group').slideToggle();
    
                                        if ($dataRender.radiosubtype == 'color-option') {
                                            var label = '<span class="owcpv_color_select owcpv_option_val" style="background:'+owcpv_val+'"></span>';
                                            if ($wrapField.find('.owcpv_color_select').length < 1) {
                                                $wrapField.find('.ui-selector-resuilt').prepend(label);
                                            }
                                            else {
                                                $wrapField.find('.owcpv_color_select').css('background', owcpv_val);
                                            }
                                        }
                                        if ($dataRender.radiosubtype == 'image-option' || $dataRender.radiosubtype == 'image-extra') {
                                            var label = '<img class="owcpv_image_select owcpv_option_val" width="50" height="50" src="'+owcpv_val+'">';
                                            if ($wrapField.find('.owcpv_image_select').length < 1) {
                                                $wrapField.find('.ui-selector-resuilt').prepend(label);
                                            }
                                            else {
                                                $wrapField.find('.owcpv_image_select').attr('src', owcpv_val);
                                            }
                                        }
                                    }

                                })
                            }

                        }

                        if ($dataRender.type == 'date') {
                            var nameField = $dataRender.name,
                                subtype = $dataRender.subtype,
                                flatpickrConfig = {};

                            // console.log($dataRender);
                            switch (subtype) {
                                case 'datetime-local':
                                    flatpickrConfig = {
                                        enableTime: true,
                                        dateFormat: "Y-m-d H:i",
                                    };
                                    break;
                                case 'time':
                                    flatpickrConfig = {
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                    };
                                    break;
                                default:
                                    break;
                            }
                            
                            $('input[name="'+nameField+'"]').flatpickr(flatpickrConfig);
                        }

                        owcpv.updatePriceField($wrapField);
                    },
                });

                
            })
        }
    };

    $(document).ready( function() {
        // Run Script
        owcpv.init();
        
        $(".render-wrap").each(function() {
            var $wrapField = $(this);
            
            owcpv.handleCondition($wrapField, false, true);
        });
        
        $('.owpcv_toggle_input').on('change', function() {
            var innerForm = $(this).closest('.owcpv_box_toggle_button').next('.owcpv_inner_form'),
                renderForm = innerForm.find('.render-wrap');
            
            innerForm.toggleClass('toggle_hidden').slideToggle();
            owcpv.updatePriceCalculator();
            
            if (renderForm.length) {
                renderForm.each(function() {
                    var dataForm = $(this).data('form')[0],
                    required = dataForm.required;
                    if (typeof required !== 'undefined' && required) {
                        console.log($(this).hasClass('owcpv_hidden'));
                        if (!$(this).hasClass('owcpv_hidden')) {
                            owcpv.changeRequiredAttr($(this), innerForm.hasClass('toggle_hidden'));
                        }
                    }
                })
            }

            $(document).trigger('owcpv_after_toggle_form_item', [innerForm]);
		});

        if ($('.owcpv_price_summary').length && $('.owcpv_change_price').length) {
            $('.owcpv_price_summary').on('owcpv_update_price_summary', function(e, $totalPrice, $optionPrice) {
                var priceFormat = owcpv_price_format($totalPrice);
                $('.price.owcpv_change_price .woocommerce-Price-amount bdi:not(del bdi)').html(priceFormat);
                if ($('.price.owcpv_change_price del').length) {
                    var delPrice = $('.price.owcpv_change_price del bdi'),
                        delPriceVal = parseFloat(delPrice[0].lastChild.data);
                    
                    if (delPrice.find('.owcpv_del_price').length) {
                        delPriceVal = parseFloat(delPrice.find('.owcpv_del_price').data('del-price'));
                    }

                    var delPriceFormat = delPriceVal + $optionPrice;
                    delPrice.html('<span class="owcpv_del_price" data-del-price="'+delPriceVal+'">'+owcpv_price_format(delPriceFormat)+'</span>');
                }
            });
        }
    });
    $.fn.owcpv = owcpv;

})( jQuery );
