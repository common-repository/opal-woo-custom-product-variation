jQuery( function( $ ) {

	const FORMDATA = $("#owcpv-json-value").text(),

		DEFAULTIMG = opalwoocu.default_image,
		DEFAULTCOLOR = '#3c434a',
		
		DYNAMICFIELDS = ["date", "number", "text", "textarea", 'paragraph', 'hidden', 'file', 'header', 'separator'],
		OPTIONFIELDS = ["checkbox-group", "radio-group", "select", "imageOption", ],
		BLOCKFIELDS = ["header", "separator"],
		DISABLEFIELDS = ['autocomplete', 'button', 'starRating', 'paragraph', 'separator'],

		CUSTOMFFBD = {

			uiSelector : {
				label: 'UI Selector',
				value: false,
				type: 'checkbox',
				description: 'Select option as dropdown',
			},
			hideLabel : {
				label: 'Hide Label',
				value: false,
				type: 'checkbox',
				description: 'Hide label after option',
			},
			priceCheckbox : {
				label: 'Enable Custom Price',
				value: false,
				type: 'checkbox',
				description: 'Should the price of the product or cart change when the user interacts with this field? ',
			},
			priceOptions: {
				label: 'Price Options',
				multiple: false,
				description: 'Choose the price calculation method',
				options: {
					'percent': 'Percentage of Product Price',
					'fixed': 'Fixed Price',
				},
			},
			priceValue: {
				label: 'Price Value',
				value: '',
				placeholder: 'Price Value',
				group: 'general'
			},
			radiosubtype: {
				label: 'Type',
				options: {
					'': 'Normal',
					'image-option': 'Image Group',
					'color-option': 'Color Group',
					'button-option': 'Button Group',
					'image-extra': 'Image Gallery Group',
				},
				multiple: false,
				group: 'general'
			},
			checkboxsubtype: {
				label: 'Type',
				options: {
					'': 'Normal',
					'single-checkbox': 'Single Checkbox',
				},
				multiple: false,
				group: 'general'
			},
			
			//Advanced Tab Content
			hideField: {
				label: 'Hide Field',
				value: '',
				type: 'hidden',
				group: 'advanced'
			},
			hideFieldCart: {
				label: 'In Cart & Checkout',
				value: false,
				type: 'checkbox',
				group: 'advanced',
				description: 'Field is still used as will be hidden'
			},
			hideFieldOrder: {
				label: 'In Order Detail',
				value: false,
				type: 'checkbox',
				group: 'advanced',
				description: 'Field is still used as will be hidden'
			},
			name: {
				label: 'Name',
				value: '',
				placeholder: 'name',
				group: 'advanced',
				description: 'Note: This value must be unique'
			},
			className: {
				label: 'Class',
				value: 'form-control',
				placeholder: 'class',
				group: 'advanced',
				description: 'HTML Class of field'
			},
			widthItem: {
				label: 'Item Width (%)',
				value: '',
				placeholder: '100',
				group: 'advanced',
				description: 'Customize the size of the field'
			},
			
			//Conditional Tab Content
			enabelConditional: {
				label: 'Enable Conditional Logic',
				value: false,
				type: 'checkbox',
				group: 'conditional',
				description: 'Allow using condition to show/hide any field by other fields.'
			},
			logicAction: {
				label: 'Logic Action',
				multiple: false,
				options: {
					'show': 'Show',
					'hide': 'Hide',
				},
				description: 'Field if below condtions are true',
				group: 'conditional control_conditional'
			},
			conditionField: {
				label: 'Fields',
				multiple: false,
				name: 'condition_field_0',
				options: {
					'0': 'Select Field',
					'stock_quantity': '[Stock Quantity]',
					'stock_status': '[Stock Status]',
					'product_ids': '[Product IDs]',
					'attribute': '[Attributes/Variations]',
					'quantity': '[Product Quantity]',
				},
				group: 'repeater_conditinal',
				'data-pattern-name': 'condition_field_++',
			},
			conditionRelation: {
				label: 'Relation',
				multiple: false,
				name: 'condition_relation_0',
				options: {
					'0': 'Select Relation',
					'is': 'Is',
					'is_not': 'Is Not',
					'is_in': 'Is In',
					'is_not_in': 'Is Not In',
					'is_empty': 'Is Empty',
					'is_not_empty': 'Is Not Empty',
					'is_greater': 'Is Greater Than',
					'is_lessthan': 'Is Less Than',
					'is_greater_or_equal': 'Is Greater Than Or Equal',
					'is_lessthan_or_equal': 'Is Less Than Or Equal',
					'contains': 'Text Contains',
					'not_contains': 'Text Not Contains',
					'starts_with': 'Text Starts With',
					'ends_with': 'Text Ends With',
					'date_is': 'Date Is',
					'date_is_before': 'Date Is Before',
					'date_is_after': 'Date Is After',
					'time_is': 'Time Is',
					'time_is_before': 'Time Is Before',
					'time_is_after': 'Time Is After',
				},
				group: 'repeater_conditinal',
				'data-pattern-name': 'condition_relation_++',
			},
			conditionRelationAttr: {
				label: 'Relation',
				multiple: false,
				options: optionsAttr(),
				group: 'repeater_conditinal owcpv_hidden',
				name: 'condition_relation_attr_0',
				'data-pattern-name': 'condition_relation_attr_++',
			},
			conditionValue: {
				label: 'Value',
				name: 'condition_value_0',
				placeholder: 'Value',
				value: '',
				group: 'repeater_conditinal',
				'data-pattern-name': 'condition_value_++',
			},
			conditionValueStock: {
				label: 'Value',
				multiple: false,
				options: {
					'instock': 'In Stock',
					'outofstock': 'Out of Stock',
					'onbackorder': 'On Backorder',
				},
				group: 'repeater_conditinal owcpv_hidden',
				name: 'condition_value_stock_0',
				'data-pattern-name': 'condition_value_stock_++',
			},
			conditionValueField: {
				label: 'Value',
				placeholder: 'Value',
				value: '',
				group: 'repeater_conditinal owcpv_hidden',
				name: 'condition_value_field_0',
				'data-pattern-name': 'condition_value_field_++',
			},
			conditionValueAttr: {
				label: 'Value',
				multiple: false,
				options: optionsAttrValue(),
				group: 'repeater_conditinal owcpv_hidden',
				name: 'condition_value_attr_0',
				'data-pattern-name': 'condition_value_attr_++',
			},
			conditionOperator: {
				label: 'Operator',
				name: 'condition_operator_0',
				multiple: false,
				options: {
					'and': 'AND',
					'or': 'OR',
				},
				group: 'repeater_conditinal',
				'data-pattern-name': 'condition_operator_++',
			},

			//Upload File Fields
			min_size: {
				label: 'Upload Min Size',
				value: 0,
				type: 'number',
				description: '(In MB)',
				group: 'general',
			},
			max_size: {
				label: 'Upload Max Size',
				value: 0,
				type: 'number',
				description: '(In MB)',
				group: 'general',
			},
			type_allow: {
				label: 'File extentions Supported',
				value: '',
				description: 'Example: jpg,jpeg,png,gif (leave blank for using default wordpress types)',
				group: 'general',
			},
			
			// Button Option Fields
			shapeStyle: {
				label: 'Shape Style',
				// name: 'shape_style',
				multiple: false,
				options: {
					'rectangle': 'Rectangle',
					'circle': 'Circle',
				},
				group: 'general',
				description: 'Shape of the button',
			},
			shapeSize: {
				label: 'Shape Size (px)',
				value: 0,
				type: 'number',
				description: 'Button width, auto if left blank',
				group: 'general',
			},
		};


	function optionsAttr() {
		var attr= {};
		$.each(owcpv_backend_formbuilder_vars.attributes, function (key, value) {
			attr[value.attribute_id] = value.attribute_label;
		});
		return attr;
	}

	function optionsAttrValue() {
		return owcpv_backend_formbuilder_vars.attr_values;
	}

	function strip(html){
		let doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.textContent || "";
	}

	function escHtmlLabel(data) {
        $.each(data, function(i, v) {
        	if (typeof v.label != 'undefined') {
                data[i]['label'] = strip(v.label);
            }    
        })

        return data;
    }

	function onChangeConditionField() {
		$('.fld-conditionField').on('change', function(e) {
			e.preventDefault();
			var field = $(this).val(),
				itemParent = $(this).parents('.item_condition'),
				onAdded = itemParent.hasClass('added'),

				relationBox = itemParent.find('.fld-conditionRelation'),
				conditionRelationWrap = relationBox.parents('.conditionRelation-wrap'),

				relationAttrBox = itemParent.find('.fld-conditionRelationAttr'),
				conditionRelationAttrWrap = relationAttrBox.parents('.conditionRelationAttr-wrap'),

				valueBox = itemParent.find('.fld-conditionValue'),
				conditionValueWrap = valueBox.parents('.conditionValue-wrap'),

				valueStockBox = itemParent.find('.fld-conditionValueStock'),
				conditionValueStockWrap = valueStockBox.parents('.conditionValueStock-wrap'),

				valueAttrBox = itemParent.find('.fld-conditionValueAttr'),
				conditionValueAttrWrap = valueAttrBox.parents('.conditionValueAttr-wrap'),

				valueFieldBox = itemParent.find('.fld-conditionValueField'),
				conditionValueFieldWrap = valueFieldBox.parents('.conditionValueField-wrap');

			if(field == 'attribute') {
				var defaultAttr = owcpv_backend_formbuilder_vars.attributes[0].attribute_id;
				conditionRelationWrap.addClass('owcpv_hidden');
				conditionRelationAttrWrap.removeClass('owcpv_hidden');
				
				if (onAdded) {
					relationAttrBox.val(defaultAttr).change();
				}

				conditionValueWrap.addClass('owcpv_hidden');
				conditionValueStockWrap.addClass('owcpv_hidden');
				conditionValueFieldWrap.addClass('owcpv_hidden');
				conditionValueAttrWrap.removeClass('owcpv_hidden');
			}
			else {
				conditionRelationAttrWrap.addClass('owcpv_hidden');
				conditionRelationWrap.removeClass('owcpv_hidden');
				relationBox.find('option').show();
				switch (field) {
					case 'stock_status':
						if (onAdded) {
							relationBox.val('is');
						}
						relationBox.find('option').each(function() {
							var valOption = $(this).attr('value');
							if ($.inArray(valOption, ['is', 'is_not']) === -1) $(this).hide();
						});
						break;
					case 'product_ids':
						if (onAdded) {
							relationBox.val('is_in');
						}
						relationBox.find('option').each(function() {
							var valOption = $(this).attr('value');
							if ($.inArray(valOption, ['is_in', 'is_not_in']) === -1) $(this).hide();
						});
						break;
					case 'stock_quantity':
						if (onAdded) {
							relationBox.val('is');
						}
						relationBox.find('option').each(function() {
							var valOption = $(this).attr('value');
							if ($.inArray(valOption, ['is', 'is_not', 'is_empty', 'is_not_empty', 'is_greater', 'is_lessthan', 'is_greater_or_equal', 'is_lessthan_or_equal']) === -1) $(this).hide();
						});
						break
					case 'quantity':
						if (onAdded) {
							relationBox.val('is');
						}
						relationBox.find('option').each(function() {
							var valOption = $(this).attr('value');
							if ($.inArray(valOption, ['is', 'is_not', 'is_greater', 'is_lessthan', 'is_greater_or_equal', 'is_lessthan_or_equal']) === -1) $(this).hide();
						});
						break
					default:
						if (onAdded) {
							relationBox.val('0');
						}
						break;
				} 

				conditionValueAttrWrap.addClass('owcpv_hidden');
				if (field == 'stock_status') {
					conditionValueWrap.addClass('owcpv_hidden');
					conditionValueFieldWrap.addClass('owcpv_hidden');
					conditionValueStockWrap.removeClass('owcpv_hidden');
					if (onAdded) {
						valueStockBox.val('instock');
					}
				}
				else if ($.inArray(field, ['stock_status', 'product_ids', 'stock_quantity', 'quantity', 'attribute', '0']) === -1) {
					// var fieldEl = $('.fld-name.form-control').filter(function() { return this.value == field }),
					// fieldType = fieldEl.closest('li.form-field').attr('type');
					// console.log(field);
					// relationBox.find('option').each(function() {
					// 	var valOption = $(this).attr('value');
					// 	if (fieldType == 'date') {
					// 		if ($.inArray(valOption, ['date_is', 'date_is_before', 'date_is_after', 'time_is', 'time_is_before', 'time_is_after']) === -1) $(this).hide();
					// 	}
					// 	else {
					// 		if ($.inArray(valOption, ['date_is', 'date_is_before', 'date_is_after', 'time_is', 'time_is_before', 'time_is_after']) !== -1) $(this).hide();
					// 	}
					// });

					// if (fieldType == 'date') valueFieldBox.val('');

					conditionValueWrap.addClass('owcpv_hidden');
					conditionValueStockWrap.addClass('owcpv_hidden');
					conditionValueFieldWrap.removeClass('owcpv_hidden');
					relationBox.change();
					valueFieldBox.empty();

					
				}
				else {
					conditionValueFieldWrap.addClass('owcpv_hidden');
					conditionValueStockWrap.addClass('owcpv_hidden');
					conditionValueWrap.removeClass('owcpv_hidden');
				}
			}
		})

		$('.fld-conditionRelationAttr').on('change', function(e) {
			e.preventDefault();
			var relation = $(this).val(),
			itemParent = $(this).parents('.item_condition'),
			valueAttrBox = itemParent.find('.fld-conditionValueAttr'),
			onAdded = itemParent.hasClass('added');

			valueAttrBox.find('option').hide();
			valueAttrBox.find('option[type="'+relation+'"]').show();

			if (onAdded) {
				valueAttrBox.val(valueAttrBox.find('option[type="'+relation+'"]').first().attr('value')).change();
			}
		})

		$('.fld-conditionRelation').on('change', function(e) {
			e.preventDefault();
			var relation = $(this).val(),
			itemParent = $(this).closest('.item_condition'),
			valueBox = itemParent.find('.conditionValue-wrap'),
			valueFieldBox = itemParent.find('.conditionValueField-wrap'),
			valueField = itemParent.find('.fld-conditionValueField'),
			field = itemParent.find('.fld-conditionField').val();

			if (field && $.inArray(field, ['stock_status', 'product_ids', 'stock_quantity', 'quantity', 'attribute', '0']) === -1) {
				var fieldEl = $('.fld-name.form-control').filter(function() { return this.value == field }),
					fieldType = fieldEl.closest('li.form-field').attr('type');

				if($.inArray(fieldType, OPTIONFIELDS) !== -1) {
					if($.inArray(relation, ['is', 'is_not', 'is_in', 'is_not_in']) !== -1) {
						if (!valueField.is('select')) {
							var valueFieldSelect = $("<select>");

							$.each(valueField[0].attributes, function(index, attribute) {
					          	valueFieldSelect.attr(attribute.name, attribute.value);
					        });
					        valueFieldSelect.removeAttr('type');

			                valueField.replaceWith(valueFieldSelect);

			                document.dispatchEvent(new CustomEvent("owcpvReplaceConditionValueSelect", {
			                    detail: { relation: relation, field: field, valueFieldSelect: valueFieldSelect }
			                }));
						}
						else {
							valueField.empty();
							document.dispatchEvent(new CustomEvent("owcpvReplaceConditionValueSelect", {
			                    detail: { relation: relation, field: field, valueFieldSelect: valueField }
			                }));
						}
					}
					else {
						if (valueField.is('select')) {
							valueField.select2('destroy'); 
							var valueFieldInput = $("<input>");
	
							$.each(valueField[0].attributes, function(index, attribute) {
								  valueFieldInput.attr(attribute.name, attribute.value);
							});
							valueFieldInput.attr('type', 'text');
	
							valueField.replaceWith(valueFieldInput);
						}
					}
				}
				else {
					if (valueField.is('select')) {
						valueField.select2('destroy'); 
						var valueFieldInput = $("<input>");

						$.each(valueField[0].attributes, function(index, attribute) {
							valueFieldInput.attr(attribute.name, attribute.value);
						});
						valueFieldInput.attr('type', 'text');
						
						valueField.replaceWith(valueFieldInput);
					}

					if (fieldType == 'date') {
						let subtype = fieldEl.closest('li.form-field').find('.fld-subtype.form-control').val(),
							flatpickrConfig = {};
						
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

						valueField.attr('type', subtype);
						valueField.flatpickr(flatpickrConfig);
					}
				}

			}

			if ($.inArray(relation, ['is_empty', 'is_not_empty']) === -1) {
				valueBox.show();
				valueFieldBox.show();
			}
			else {
				valueBox.hide();
				valueFieldBox.hide();
			}


		})
	}

	var owcpvFormbuilder = {

		typeUserEvents: {},
		typeUserAttrs: {},
		typeUserDisabledAttrs: {},

		init: function() {
			this.pushEventFields();
			this.pushAttrsFields();
			this.disableTypesField();

			this.initFormbuilder();
		},

		pushAttrsFields: function() {
			var typeUserAttrs = {};

			DYNAMICFIELDS.forEach(function (item, index) {
				typeUserAttrs[item] = {
					priceCheckbox: CUSTOMFFBD.priceCheckbox,
					priceOptions: CUSTOMFFBD.priceOptions,
					priceValue: CUSTOMFFBD.priceValue,
					hideField: CUSTOMFFBD.hideField,
					hideFieldCart: CUSTOMFFBD.hideFieldCart,
					hideFieldOrder: CUSTOMFFBD.hideFieldOrder,
					enabelConditional: CUSTOMFFBD.enabelConditional,
					logicAction: CUSTOMFFBD.logicAction,
					conditionField: CUSTOMFFBD.conditionField,
					conditionRelation: CUSTOMFFBD.conditionRelation,
					conditionRelationAttr: CUSTOMFFBD.conditionRelationAttr,
					conditionValue: CUSTOMFFBD.conditionValue,
					conditionValueStock: CUSTOMFFBD.conditionValueStock,
					conditionValueField: CUSTOMFFBD.conditionValueField,
					conditionValueAttr: CUSTOMFFBD.conditionValueAttr,
					conditionOperator: CUSTOMFFBD.conditionOperator,
					className: CUSTOMFFBD.className,
					widthItem: CUSTOMFFBD.widthItem,
					name: CUSTOMFFBD.name
				};

				if (item == 'header' || item == 'separator') {
					delete typeUserAttrs[item].priceCheckbox;
					delete typeUserAttrs[item].priceOptions;
					delete typeUserAttrs[item].priceValue;
					delete typeUserAttrs[item].hideField;
					delete typeUserAttrs[item].hideFieldCart;
					delete typeUserAttrs[item].hideFieldOrder;
				}

				if (item == 'file') {
					$.extend(typeUserAttrs[item], {
						min_size: CUSTOMFFBD.min_size,
						max_size: CUSTOMFFBD.max_size,
						type_allow: CUSTOMFFBD.type_allow,
					});
				}
			});

			OPTIONFIELDS.forEach(function (item, index) {
				typeUserAttrs[item] = {
					// uiSelector: CUSTOMFFBD.uiSelector,
					priceCheckbox: CUSTOMFFBD.priceCheckbox,
					priceOptions: CUSTOMFFBD.priceOptions,
					hideField: CUSTOMFFBD.hideField,
					hideFieldCart: CUSTOMFFBD.hideFieldCart,
					hideFieldOrder: CUSTOMFFBD.hideFieldOrder,
					enabelConditional: CUSTOMFFBD.enabelConditional,
					logicAction: CUSTOMFFBD.logicAction,
					conditionField: CUSTOMFFBD.conditionField,
					conditionRelation: CUSTOMFFBD.conditionRelation,
					conditionRelationAttr: CUSTOMFFBD.conditionRelationAttr,
					conditionValue: CUSTOMFFBD.conditionValue,
					conditionValueStock: CUSTOMFFBD.conditionValueStock,
					conditionValueField: CUSTOMFFBD.conditionValueField,
					conditionValueAttr: CUSTOMFFBD.conditionValueAttr,
					conditionOperator: CUSTOMFFBD.conditionOperator,
					className: CUSTOMFFBD.className,
					widthItem: CUSTOMFFBD.widthItem,
					name: CUSTOMFFBD.name
				};

				if (item == 'radio-group') {
					$.extend(typeUserAttrs[item], {
						radiosubtype: CUSTOMFFBD.radiosubtype,
						uiSelector: CUSTOMFFBD.uiSelector,
						hideLabel: CUSTOMFFBD.hideLabel,
						shapeStyle: CUSTOMFFBD.shapeStyle,
						shapeSize: CUSTOMFFBD.shapeSize,
					});
				}
				
				if (item == 'checkbox-group') {
					$.extend(typeUserAttrs[item], {
						checkboxsubtype: CUSTOMFFBD.checkboxsubtype,
					});
				}

				// if (item == 'select') {
				// 	delete typeUserAttrs[item].uiSelector;
				// }
			});
			
			return this.typeUserAttrs = typeUserAttrs;
		},

		pushEventFields: function() {
			var typeUserEvents = {};

			const fields = $.merge(DYNAMICFIELDS, OPTIONFIELDS);
			fields.forEach(function (item, index) {
				typeUserEvents[item] = {
					onadd: function (fld) {
						var field = $('#'+fld.id);
						field.find('.form-group').each(function() {
							var description = $(this).find('.form-control').attr('description');
							if (description) {
								$(this).append('<div style="width: 100%;color:#888;font-size:11px;float:left;margin-top: 5px;">'+description+'</div>');
							}
						});

						if (field.find('.fld-radiosubtype').length) {
							let st = field.find('.fld-radiosubtype').val();
							if (st != 'button-option') {
								field.find('.shapeStyle-wrap').remove();
								field.find('.shapeSize-wrap').remove();
							}
							if (st != 'color-option') {
								field.find('.hideLabel-wrap').remove();
							}
						}
						
						if (field.find('.fld-subtype').length) {
							let st = field.find('.fld-subtype').val();
							if (st == 'color') {
								field.find('.maxlength-wrap').remove();
							}
						}
					}
				};
			});
			
			return this.typeUserEvents = typeUserEvents;
		},

		disableTypesField: function() {
			var typeUserDisabledAttrs = {};
			const fields = $.merge(DYNAMICFIELDS, OPTIONFIELDS);
			
			fields.forEach(function (item, index) {
				typeUserDisabledAttrs[item] = ['access', 'other', 'inline', 'multiple'];
			});
			
			return this.typeUserDisabledAttrs = typeUserDisabledAttrs;
		},

		priceCheckedProps: function(fld) {
			var fieldType = $(fld).attr('type'),
				priceCheckbox = $(fld).find('input.fld-priceCheckbox'),
				priceOptions = $(fld).find('.priceOptions-wrap'),
				priceValue = $(fld).find('.priceValue-wrap'),
				showPrice = priceCheckbox.is(":checked");
			
			if (!showPrice) {
				priceOptions.hide();
				priceValue.hide();
				if($.inArray(fieldType, OPTIONFIELDS) != -1) {
					$(fld).find('.option-priceValue.option-attr').hide();
				}
			}
	
			priceCheckbox.change(function() {
				if(priceOptions.length > 0) {
					priceOptions.slideToggle();
				}
				if(priceValue.length > 0) {
					priceValue.slideToggle();
				}

				if($.inArray(fieldType, OPTIONFIELDS) != -1) {
					$(fld).find('.option-priceValue.option-attr').toggle();
				}
			});
		},

		addAttrFieldOnAddOption: function(fld) {
			$(fld).find('.option-priceValue.option-attr').attr('placeholder', 'Price');
			$(fld).find('.option-label.option-attr').attr('placeholder', 'Label');
			$(fld).find('.option-value.option-attr').attr('placeholder', 'Value');
			$(fld).find('.option-owcpvValue.option-attr').attr('placeholder', 'Value');
		},

		conditionCheckedProps: function(fld) {
			var conditionCheckbox = $(fld).find('input.fld-enabelConditional'),
				showCondition = conditionCheckbox.is(":checked");
			
			if (!showCondition) {
				$(fld).find('.control_conditional').addClass('not_enable');
			}
			
			conditionCheckbox.change(function() {
				$(fld).find('.control_conditional').toggleClass('not_enable');
			});
		},

		handleImageGroup: function(fieldId) {
			var parentWrap = $(fieldId).find('.sortable-options > li');

			parentWrap.each(function() {
				var valField = $(this).find('input.option-owcpvValue'),
					imgUrl;
			
				valField.hide();
				$(this).addClass('image_group_row');

				if ($(this).find('.img_group_preview').length < 1) {
					
					imgUrl = (valField.val() != '') ? valField.val() : DEFAULTIMG;

					$(this).append('<figure class="img_group_preview"><img src="'+imgUrl+'" alt="" width="70" height="70"></figure>');
					valField.val(imgUrl);

					var wpMedia;
					$(this).find('.img_group_preview').on('click', function() {
						var imgTag = $(this).find('img');
					
						wpMedia = wp.media({
							title : 'Choose or Upload an Image',
							multiple: false,
							library: {
								type: [ 'image' ]
							},
						});
						
						wpMedia.open();

						wpMedia.on('select', function() {
							var attachment = wpMedia.state().get('selection').first().toJSON();

							if(attachment.url) {
								imgTag.attr('src', attachment.url);
								valField.val(attachment.url);
							}
						});
					})
				}
			});

		},

		handleImageExtra: function(fieldId) {
			var parentWrap = $(fieldId).find('.sortable-options > li');

			const actionGallary = '<div class="owcpv_gallery_action"><a class="edit-image" href="#"><i class="dashicons dashicons-update-alt"></i></a><a class="remove-image" href="#"><i class="dashicons dashicons-no-alt"></i></a></div>';
			parentWrap.each(function(index) {
				// Continue
				if ($(this).hasClass('image_extra_row')) return;

				$(this).addClass('image_group_row image_extra_row');
				$(this).append('<div class="owcpv_gallery_box"><div class="gallery-metabox-list"></div><div><a class="gallery-add button button-primary" href="#">Add Images</a></div></div>');

				var par = $(this);
				var media_frame;
				var galleryInput = $(this).find('.option-owcpvGallery');
					galleryVal = [];

				galleryInput.hide();

				var getGalleryVal = () => {
					let galleryInput = par.find('.option-owcpvGallery');
					if (galleryInput.val()) {
						galleryVal = JSON.parse(decodeURIComponent(galleryInput.val()));
						return galleryVal;
					}
					else {
						return false;
					}
				};

				var getGalleryIdsOfOption = (item, exclude = false) => {
					var arr = [];
					if (item.find('.gallery-metabox-list .attachment').length) {
						item.find('.gallery-metabox-list .attachment').each(function() {
							var id = $(this).attr('data-id');
							if(id && id != exclude) {
								arr.push(id);
							}
						})
					}
			
					return arr;
				}

				var onEditImg = () => {
					par.find('.owcpv_gallery_box a.edit-image:not(.added_event)').on('click.igmbEditMediaManager', function(e) {
						e.preventDefault();
				
						var that = $( this ),
							id = that.closest('.attachment').attr('data-id');
				
						if ( media_frame ) {
							media_frame.close();
						}
				
						media_frame = wp.media.frames.media_frame = wp.media( {
							className: 'media-frame igmb-edit-media-frame',
							frame: 'select',
							multiple: false,
							title: 'Edit Gallery',
							library: {
								type: 'image',
								exclude: getGalleryIdsOfOption(par, id)
							},
							button: {
								text: 'Update images'
							}
						} );
				
						// Pre-select current image when opening our media frame.
						media_frame.on( 'open', function() {
							var selection = media_frame.state().get( 'selection' );
				
							attachment = wp.media.attachment( id );
							attachment.fetch();
							selection.add( attachment ? [ attachment ] : [] );
				
						} );
				
						media_frame.on( 'select', function() {
							attachment = media_frame.state().get( 'selection' ).first().toJSON();
							// Check if thumbnail size exists, if not use full size

							if (id != attachment.id) {
								if ( attachment.sizes.thumbnail ) {
									attachmentThumb = attachment.sizes.thumbnail.url;
								} else {
									attachmentThumb = attachment.url;
								}
					
								that.closest('.attachment').attr('data-id', attachment.id);
								that.closest('.attachment').find( 'img.image-preview' ).attr( 'src', attachmentThumb );

								let galleryVal = getGalleryVal();
								if (galleryVal) {
									let objIndex = galleryVal.findIndex((obj => obj.id == id));
									galleryVal[objIndex].id = attachment.id;
									galleryVal[objIndex].src = attachment.url;
									galleryVal[objIndex].thumb = attachmentThumb;

									galleryInput.val(encodeURIComponent(JSON.stringify(galleryVal)));
								}
							}
						} );
				
						// Now that everything has been set, let's open up the frame.
						media_frame.open();
				
					} );
					par.find('.owcpv_gallery_box a.edit-image').addClass('added_event');
				};

				var onRemoveImg = () => {
					par.find('.owcpv_gallery_box a.remove-image:not(.added_event)').on('click.igmbRemoveMedia', function(e) {
						e.preventDefault();
						var idRemove = $( this ).closest( '.attachment' ).attr('data-id');
						$( this ).closest( '.attachment' ).fadeOut(300, function() {
							let galleryVal = getGalleryVal();
							if (galleryVal) {
								galleryVal = $.grep(galleryVal, function(e){ 
									return e.id != idRemove; 
							   	});

								galleryInput.val(encodeURIComponent(JSON.stringify(galleryVal)));
							}
							$(this).remove();
						});
					} );
					par.find('.owcpv_gallery_box a.edit-image').addClass('added_event');
				};

				if (galleryInput.val()) {
					var galleryVal = JSON.parse(decodeURIComponent(galleryInput.val()));
					if (galleryVal.length) {
						$.each(galleryVal, function(i, item) {
							let attachmentPreview = '<img class="image-preview" src="' + item.src + '">';
							par.find( '.gallery-metabox-list' ).append('<div class="attachment" data-id="'+item.id+'">' + attachmentPreview + actionGallary + '</div>');
						})
					}
				}
				
				$(this).find('.owcpv_gallery_box a.gallery-add').on('click', function(e) {
					e.preventDefault();

					if ( media_frame ) {
						media_frame.close();
					}
			
					media_frame = wp.media.frames.media_frame = wp.media( {
						className: 'media-frame igmb-add-media-frame',
						frame: 'select',
						multiple: true,
						title: 'Gallery',
						library: {
							type: 'image',
							exclude: getGalleryIdsOfOption(par)
						},
						button: {
							text: 'Add images'
						}
					} );

					media_frame.on( 'select', function() {
						var selection = media_frame.state().get( 'selection' );
						var attachmentPreview,
							attachmentArr = [];

						selection.map( function( attachment, i ) {
							var attachment = attachment.toJSON();
							
							if ( attachment.sizes.thumbnail ) {
								attachmentThumb = attachment.sizes.thumbnail.url;
							} else {
								attachmentThumb = attachment.url;
							}
			
							attachmentPreview = '<img class="image-preview" src="' + attachmentThumb + '">';

							attachmentArr[i] = {
								'id': attachment.id,
								'src': attachment.url,
								'thumb': attachmentThumb,
							};
				
							par.find( '.gallery-metabox-list' ).append( '<div class="attachment" data-id="'+attachment.id+'">' + attachmentPreview + actionGallary + '</div>' );
						} );

						onEditImg();
						onRemoveImg();
						galleryVal = $.merge(galleryVal, attachmentArr);
						galleryInput.val(encodeURIComponent(JSON.stringify(galleryVal)));
					} );

					media_frame.open();
			
					// makeSortable();
				} );

				onEditImg();
				onRemoveImg();
				
			});

		},

		//handleColorOption
		handleColorOption: function(fieldId, $selector = 'input.option-owcpvValue') {
			var parentWrap = $(fieldId).find('.sortable-options > li');

			parentWrap.each(function() {
				var valField = $(this).find($selector);
				if(valField.val() == '') valField.val(DEFAULTCOLOR);
				valField.wrap('<div class="color-picker-wrap"></div>');

				var colorPickerOption = {
					defaultColor: DEFAULTCOLOR,
					change: function(event, ui){},
					clear: function() {},
					hide: true,
					palettes: true
				};
				 
				valField.wpColorPicker(colorPickerOption);
			});

		},

		handleColorPicker: function(fieldId) {
			var valField = $(fieldId).find('input.fld-value');
			if(valField.val() == '') valField.val(DEFAULTCOLOR);
			valField.wrap('<div class="color-picker-wrap"></div>');

			var colorPickerOption = {
				defaultColor: DEFAULTCOLOR,
				change: function(event, ui){},
				clear: function() {},
				hide: true,
				palettes: true
			};
				
			valField.wpColorPicker(colorPickerOption);

		},
		
		handleSingleCheckbox: function(fieldId) {
			var optionField = $(fieldId).find('.field-options');

			optionField.find('.sortable-options').sortable( "destroy" );
			optionField.find('.option-actions').remove();
			optionField.find('li .remove').remove();
		},

		handleFieldTab: function(fieldId) {
			var formElement = $(fieldId).find('.form-elements'),
				itemConditionClass = $(fieldId).attr('id')+'-condition-item';
					
			formElement.find('input[name="idField"]').val(fieldId);

			formElement.children()
				.wrapAll('<div class="content-elements"></div>');
			
			var navElement = '<nav class="navigation-element">';
				navElement += '<a href="#" data-nav="general" class="navigation-element-btn active">General</a>';
				navElement += '<a href="#" data-nav="advanced" class="navigation-element-btn">Advanced</a>';
				navElement += '<a href="#" data-nav="conditional" class="navigation-element-btn">Conditional Logic</a>';
				navElement += '</nav';
				
			formElement.prepend(navElement);
			
			//
			formElement.find('.repeater_conditinal').wrapAll('<div class="condition_wrapper conditional form-group control_conditional"><div class="item_condition '+itemConditionClass+'"></div></div>');
			formElement.find('.item_condition').append('<div class="repeater_conditinal repeater_btn"><a href="javascript:void(0)" class="rpt_btn_remove">- Remove Condition</a></div>');
			formElement.find('.condition_wrapper').append('<nav class="repeater_btn"><a href="javascript:void(0)" class="rpt_btn_add">+ Add Condition</a></nav>');

			owcpvFormbuilder.conditionCheckedProps(fieldId);

			formElement.find('.general.form-group').wrapAll('<div class="general form-group-tab"></div>');
			formElement.find('.advanced.form-group').wrapAll('<div class="advanced form-group-tab"></div>');
			formElement.find('.conditional.form-group').wrapAll('<div class="conditional form-group-tab"></div>');

			formElement.find('.form-group-tab.advanced').hide();
			formElement.find('.form-group-tab.conditional').hide();
			
			formElement.find('.navigation-element-btn').on('click', function(e) {
				e.preventDefault();
				var gr = $(this).data('nav');
				formElement.find('.navigation-element-btn').removeClass('active');
				$(this).addClass('active');
				formElement.find('.form-group-tab').hide();
				formElement.find('.form-group-tab.'+gr).show();
			})
	
		},

		handleCondition: function(fieldId) {
			var formElement = $(fieldId).find('.form-elements'),
				itemConditionClass = $(fieldId).attr('id')+'-condition-item';

			var arrData = $.parseJSON(FORMDATA),
				conditionData = [],
				loop = false,
				indexData = false,
				i = 0;

			$.each(arrData, function(index, item) {
				if($(fieldId).find('.form-control[value="'+item.name+'"]').length > 0) {
					indexData = index;
					return false;
				}
			})

			if (indexData !== false) {
				loop = true;
				parseData = arrData[indexData];
				while (loop) {
					var itemCondition = {};
					itemCondition['condition_field_'+i] = parseData['condition_field_'+i];
					itemCondition['condition_relation_'+i] = parseData['condition_relation_'+i];
					itemCondition['condition_relation_attr_'+i] = parseData['condition_relation_attr_'+i];
					itemCondition['condition_value_'+i] = parseData['condition_value_'+i];
					itemCondition['condition_value_stock_'+i] = parseData['condition_value_stock_'+i];
					itemCondition['condition_value_attr_'+i] = parseData['condition_value_attr_'+i];
					itemCondition['condition_value_field_'+i] = parseData['condition_value_field_'+i];
					itemCondition['condition_operator_'+i] = parseData['condition_operator_'+i];
					
					conditionData[i] = itemCondition;
					i++;
					if (!parseData['condition_field_'+i]) {
						loop = false;
					}
				}
			}

			// console.log(FORMDATA);

			onChangeConditionField();

			if (conditionData.length === 0) {
				formElement.find('.'+itemConditionClass).addClass('added');
			}
			formElement.find('.condition_wrapper').repeater({
				btnAddClass: 'rpt_btn_add',
				btnRemoveClass: 'rpt_btn_remove',
				groupClass: itemConditionClass,
				minItems: 1,
				maxItems: 0,
				startingIndex: 0,
				showMinItemsOnLoad: true,
				reindexOnDelete: true,
				repeatMode: 'insertAfterLast',
				animation: 'fade',
				animationSpeed: 400,
				animationEasing: 'swing',
				clearValues: true,
				afterAdd: function($item) {
					onChangeConditionField();
					if (!$item.hasClass('added')) {
						$item.find('.fld-conditionField').change();
						$item.find('.fld-conditionRelation').change();
						$item.find('.fld-conditionRelationAttr').change();
					}
					
					//afterAdded
					$item.addClass('added');

					document.dispatchEvent(new CustomEvent("owcpvAddedCondition", {
					    detail: {item: $item}
					}));
					// $(document).trigger('owcpvAddedCondition', [{item: $item}]);
				},
			}, conditionData);
		},

		genFieldEl: function(data, conditionField) {
			var curField = conditionField.closest('.form-elements').find('.fld-name.form-control').val();
			var nameCon = conditionField.attr('name');
		    var fieldEl = '<optgroup label="Form fields">';

			// console.log(data);
			var nameConSelected = '';
			$.each(data, function(index, item) {
				if(item.name == curField) {
					nameConSelected = item[nameCon];
					return false;
				}
			});

		    $.each(data, function(index, item) {
				if ($.inArray(item.type, BLOCKFIELDS) !== -1) return;
				
		    	var disable = (item.name == curField) ? 'disabled="disabled"' : '';
		    	var selected = (nameConSelected == item.name) ? 'selected="selected"' : '';
			    fieldEl += '<option value="'+item.name+'" '+disable+' '+selected+'>'+item.label+'</option>';

			});
			fieldEl += '</optgroup>';

			return fieldEl;
		},

		togglerRadioOption: function(fieldId) {
			var radioState;
			$(fieldId).find('.option-selected.option-attr').on('click', function(e) {
				if (radioState === this) {
					this.checked = false;
					radioState = null;
				} else {
					radioState = this;
				}
			});
		},

		initFormbuilder: function() {
			console.log(FORMDATA);
			var formBuilder = $('#owcpv_editor').formBuilder({
				"formData": FORMDATA,
				disableFields: DISABLEFIELDS,
				// disabledActionButtons: ['clear', 'data', 'save'],
				showActionButtons: false ,
				fields: [
					{
						label: 'Image Option',
						type: 'radio-group',  
						radiosubtype: 'image-option',
						values: [{ 
							label: "Option 1", 
							value: DEFAULTIMG,
						}],
						icon: '<span class="dashicons dashicons-format-image"></span>'
					},
					{
						label: 'Image Group',
						type: 'radio-group',  
						radiosubtype: 'image-extra',
						values: [{ 
							label: "Option 1", 
							value: DEFAULTIMG,
						}],
						icon: '<span class="dashicons dashicons-images-alt2"></span>'
					},
					{
						label: 'Color Option',
						type: 'radio-group',  
						radiosubtype: 'color-option',
						values: [{ 
							label: "Option 1", 
							value: DEFAULTCOLOR,
						}],
						icon: '<span class="dashicons dashicons-image-filter"></span>'
					},
					{
						label: 'Button Option',
						type: 'radio-group',  
						radiosubtype: 'button-option',
						values: [{ 
							label: "Option 1", 
							value: "option-1",
						}],
						icon: '<span class="dashicons dashicons-button"></span>'
					},
					{
						label: 'True/False',
						type: 'checkbox-group',  
						checkboxsubtype: 'single-checkbox',
						icon: '<span class="dashicons dashicons-yes-alt"></span>'
					},
					{
						label: 'Color Picker',
						type: 'text',  
						subtype: 'color',
						icon: '<span class="dashicons dashicons-color-picker"></span>'
					},
					{
						label: 'Email',
						type: 'text',  
						subtype: 'email',
						icon: '<span class="dashicons dashicons-email-alt"></span>'
					},
					{
						label: 'Phone Number',
						type: 'text',  
						subtype: 'tel',
						icon: '<span class="dashicons dashicons-phone"></span>'
					},
					{
						label: 'Time',
						type: 'date',  
						subtype: 'time',
						icon: '<span class="dashicons dashicons-hourglass"></span>'
					},
					{
						label: 'Date & Time',
						type: 'date',  
						subtype: 'datetime-local',
						icon: '<span class="dashicons dashicons-clock"></span>'
					},
					{
						label: 'Separator',
						type: 'separator',  
						icon: '<span class="dashicons dashicons-image-flip-vertical"></span>'
					},
				], 
				controlOrder: [
			        // 'radio-group',
			        // 'select'
		      	],
				disabledSubtypes: {
					file: ['file'],
				},
				replaceFields: [
					{
						label: 'File Upload',
						type: 'file',  
					}
				],
				editOnAdd: true,

				typeUserAttrs: this.typeUserAttrs,
				typeUserEvents: this.typeUserEvents,
				typeUserDisabledAttrs: this.typeUserDisabledAttrs,
			
				onAddField: function(fieldId) {
					const currentFieldId = fieldId;
				},

				onAddFieldAfter: function(fieldId, fieldData) {
					// console.log($("#owcpv-json-value").val());
					// console.log($(this)[0].actions.getData());

					fieldId = '#'+fieldId;
					owcpvFormbuilder.handleFieldTab(fieldId);
					owcpvFormbuilder.priceCheckedProps(fieldId);
					owcpvFormbuilder.handleCondition(fieldId);
				
					if($.inArray(fieldData.type, OPTIONFIELDS) !== -1) {
						$(fieldId).find('.option-value.option-attr').hide();
					}
					
					if (fieldData.type === 'radio-group' && fieldData.radiosubtype) {
						
						if (fieldData.radiosubtype == 'color-option') {
							owcpvFormbuilder.handleColorOption(fieldId);
						}
						if (fieldData.radiosubtype == 'button-option') {
							owcpvFormbuilder.handleColorOption(fieldId, 'input.option-colorOption');
						}
						if (fieldData.radiosubtype == 'image-option') {
							owcpvFormbuilder.handleImageGroup(fieldId);
							$(fieldId).find('.option-owcpvValue.option-attr').hide();
						}
						if (fieldData.radiosubtype == 'image-extra') {
							owcpvFormbuilder.handleImageGroup(fieldId);
							owcpvFormbuilder.handleImageExtra(fieldId);
						}
						
					}

					if (fieldData.type === 'checkbox-group' && fieldData.checkboxsubtype) {
						owcpvFormbuilder.handleSingleCheckbox(fieldId);												
					}

					if (fieldData.type == 'text') {
						if (fieldData.subtype && fieldData.subtype == 'color') {
							owcpvFormbuilder.handleColorPicker(fieldId);
						}
					}

					owcpvFormbuilder.addAttrFieldOnAddOption(fieldId);
					owcpvFormbuilder.togglerRadioOption(fieldId);
					
					$(fieldId).find('.option-selected.option-attr').attr('name', fieldId+'-option');
					$(fieldId).on('owcpv_added_option', function() {
						$(this).find('.option-selected.option-attr').attr('name', fieldId+'-option');
						
						owcpvFormbuilder.addAttrFieldOnAddOption(fieldId);
						owcpvFormbuilder.togglerRadioOption(fieldId);

						if($.inArray(fieldData.type, OPTIONFIELDS) !== -1) {
							$(fieldId).find('.option-value.option-attr').hide();
						}

						if (fieldData.type === 'radio-group' && fieldData.radiosubtype) {
							if (fieldData.radiosubtype == 'color-option') {
								owcpvFormbuilder.handleColorOption(fieldId);
							}
							if (fieldData.radiosubtype == 'button-option') {
								owcpvFormbuilder.handleColorOption(fieldId, 'input.option-colorOption');
							}
							if (fieldData.radiosubtype == 'image-option') {
								owcpvFormbuilder.handleImageGroup(fieldId);
								$(this).find('.option-owcpvValue.option-attr').hide();
							}
							if (fieldData.radiosubtype == 'image-extra') {
								owcpvFormbuilder.handleImageGroup(fieldId);
								owcpvFormbuilder.handleImageExtra(fieldId);
							}
							
						}
						else {
							$(this).find('.option-owcpvValue.option-attr').show();
						}

						var fieldType = fieldData.type,
							priceCheckbox = $(this).find('input.fld-priceCheckbox'),
							showPrice = priceCheckbox.is(":checked");
						
						if (!showPrice) {
							if($.inArray(fieldType, OPTIONFIELDS) != -1) {
								$(this).find('.option-priceValue.option-attr').hide();
							}
						} 
					});
				},
				onAddOption: (optionTemplate, optionIndex, st) => {
					if (st == 'image-extra') {
						if (!optionTemplate.owcpvGallery) {
							optionTemplate.owcpvGallery = ``;
						}	
					}
					
					if (st == 'button-option') {
						if (!optionTemplate.colorOption) {
							optionTemplate.colorOption = ``;
						}	
					}

					if (!optionTemplate.owcpvValue) {
						optionTemplate.owcpvValue = ``;
					}

					optionTemplate.value = `${optionIndex.index}`;
					
					if (!optionTemplate.label) {
						optionTemplate.label = `Option ${optionIndex.index + 1}`;
					}

					if (!optionTemplate.priceValue) {
						optionTemplate.priceValue = '';
					}

					return optionTemplate;
				},
			});

			$.fn.owcpvBuilder = formBuilder;

			$("#post").on('submit', function () {
				var data = escHtmlLabel(formBuilder.actions.getData());
				$("#owcpv-json-value").text(JSON.stringify(data));
			});
	
			document.addEventListener('owcpvFieldAdded', function (e) {
				var addField = e.detail.field;
				var data = escHtmlLabel(formBuilder.actions.getData());

				if (typeof addField.checkboxsubtype != undefined && addField.checkboxsubtype == 'single-checkbox') {
					var wrapId = addField.wrapid;
					$('#toggle-'+wrapId).prop("checked",true).change();
				}

			    if (data.length) {
				    $('.fld-conditionField').each(function() {
						if ($(this).find('optgroup').length) {
							if ($.inArray(addField.type, BLOCKFIELDS) !== -1) return;
							$(this).find('optgroup').append('<option value="'+addField.name+'">'+addField.label+'</option>');
						}	
						else {
					    	var fieldEl = owcpvFormbuilder.genFieldEl(data, $(this));
					    	$(this).append(fieldEl);
						}			    	
				    	$(this).select2({
					        minimumResultsForSearch: -1
					  	});
				    });
			    }
			});

			document.addEventListener("owcpvRowRemoved", function(e) {
			    var rmField = e.detail.field;
				var data = escHtmlLabel(formBuilder.actions.getData());

				data = $.grep(data, function (el, i) {
				    if (data[i].name === rmField) { // or whatever
				        return false;
				    }
				    return true; // keep the element in the array
				});

			    if (data.length) {
				    $('.fld-conditionField').each(function() {
				    	if ($(this).find('optgroup option[value="'+rmField+'"]').length) {
				    		$(this).find('optgroup option[value="'+rmField+'"]').remove();
							
							$(this).select2({
								minimumResultsForSearch: -1
							});
				    	}
				    });
			    }
			});

			document.addEventListener("owcpvLoaded", function(e) {
			    var data = JSON.parse(FORMDATA);
			    if (data && data.length) {
				    $('.fld-conditionField').each(function() {
				    	
				    	var fieldEl = owcpvFormbuilder.genFieldEl(data, $(this));

				    	$(this).append(fieldEl);
				    	$(this).select2({
					        minimumResultsForSearch: -1
					  	});
					  	$(this).closest('.item_condition').find('.fld-conditionRelation').change();
				    });
			    }
			});
			
			document.addEventListener("owcpvFieldCopy", function(e) {
				var fieldId = '#'+e.detail.field;
				var formElement = $(fieldId).find('.form-elements');
				// owcpvFormbuilder.handleFieldTab(fieldId);

				formElement.find('.navigation-element-btn').on('click', function(e) {
					e.preventDefault();
					var gr = $(this).data('nav');
					formElement.find('.navigation-element-btn').removeClass('active');
					$(this).addClass('active');
					formElement.find('.form-group-tab').hide();
					formElement.find('.form-group-tab.'+gr).show();
				});

				owcpvFormbuilder.conditionCheckedProps(fieldId);
			});

			document.addEventListener("owcpvEditOpened", function(e) {
			    var data = escHtmlLabel(formBuilder.actions.getData());
			    var rowID = e.detail.rowWrapperID;
			    $('#'+rowID).siblings('.form-field.editing').find('.close-field').click();

		        $('.fld-conditionField').each(function() {
		        	var options = $(this).find('optgroup option');
		        	if (options.length) {
			        	options.each(function() {
			        		var option = $(this),
			        			val = option.attr('value');
		        		    $.each(data, function(index, item) {
		        		    	if (item.name == val) {
		        		    		option.text(item.label.replace(/^\s*<br\s*\/?>|<br\s*\/?>\s*$/g,''));
		        		    		return false;
		        		    	}
		        			});
			        	});

			        	$(this).select2({
			    	        minimumResultsForSearch: -1
			    	  	});

						// $(this).closest('.item_condition').find('.fld-conditionRelation').change();
		        	}
		        });

    	        $('.fld-name.form-control').on('focusin', function(){
    	            $(this).data('val', $(this).val());
    	        });
            	$('.fld-name.form-control').on('change', function() {
            		var prev = $(this).data('val');
            	    var current = $(this).val();

    	            $('.fld-conditionField').each(function() {
    	            	var option = $(this).find('optgroup option[value="'+prev+'"]');
    	            	if (option.length) {
    	    	        	option.attr('value', current);
    	    	        	$(this).select2({
    	    	    	        minimumResultsForSearch: -1
    	    	    	  	});
    	            	}

    	            });
            	});
			});

			document.addEventListener("owcpvAddedCondition", function(e) {
			    if ($.isFunction(formBuilder.actions.getData)) {
				    var itemAdd = e.detail.item;
				    var data = escHtmlLabel(formBuilder.actions.getData());
				    var conditionField = itemAdd.find('.fld-conditionField');
			        var fieldEl = owcpvFormbuilder.genFieldEl(data, conditionField);

				    conditionField.append(fieldEl);
				    conditionField.select2({
				        minimumResultsForSearch: -1
				  	});
			    }
			});

			document.addEventListener("owcpvReplaceConditionValueSelect", function(e) {
			    var field = e.detail.field;
			    var relation = e.detail.relation,
					multiple = $.inArray(relation, ['is_in', 'is_not_in']) !== -1;
			    var fieldSelect = e.detail.valueFieldSelect,
					nameSelect = fieldSelect.attr('name'),
					curField = fieldSelect.closest('li.form-field').find('.fld-name.form-control').val();
			    var data = JSON.parse(FORMDATA);

		     	if ($.isFunction(formBuilder.actions.getData)) {
			    	data = escHtmlLabel(formBuilder.actions.getData());
		     	}

				if (multiple && nameSelect.indexOf('[]') == -1) {
					nameSelect = nameSelect+'[]';
				}
				else {
					nameSelect = nameSelect.replace('[]', '');
				}
				fieldSelect.attr('name', nameSelect);

				var nameSelectVal = -1;
				$.each(data, function(index, item) {
		        	if (item.name == curField && item[nameSelect]) {
						nameSelectVal = item[nameSelect];
						return false;
					}
				});

		        $.each(data, function(index, item) {
		        	if (item.name == field) {
		        		if (item.values.length) {
		        			$.each(item.values, function(i, value) {
    						    fieldSelect.append('<option value='+value.value+'>'+value.label+'</option>');
		        			});
		        		}
		        		return false;
		        	}
		    	});

				fieldSelect.select2({
					multiple: multiple,
					minimumResultsForSearch: -1
				});

				if (nameSelectVal != -1) {
					fieldSelect.val(nameSelectVal);
					fieldSelect.select2();
				}
			});
		}
	};

	$(document).ready(function($) {
		owcpvFormbuilder.init();

		// Multiple taxonomies.
		if ( $('#tagsdiv-post_tag').length ) {
			window.tagBox && window.tagBox.init();
		} else {
			$('.meta-box-sortables').children('div.postbox').each(function(){
				if ( this.id.indexOf('tagsdiv-') === 0 ) {
					window.tagBox && window.tagBox.init();
					return false;
				}
			});
		}
	});
	
	$(document).on('owcpv_on_init_formbuilder_editor', function() {
		$('#editor-loading').fadeOut();
	});
	

});