define('ProductDetails.ItemOptions.View', [
    'ProductViews.Option.View',
    'LiveOrder.Model',
	'LiveOrder.Line.Model',
	'Cart.Confirmation.Helpers',
    
    'product_detail_item_options.tpl',
    
    'Backbone',
    'underscore',
    'jQuery'
], function (
    ProductViewsOptionView,
    LiveOrderModel,
	LiveOrderLineModel,
    CartConfirmationHelpers,
    
    productDetailItemOptionsTpl,
    
    Backbone,
    _,
    jQuery
) {
    'use strict';
    
    var hiddenOptions = {
        'custcol_su_mongramming_font': 3,
        'custcol_shirt_monogram': 2,
        'custcol_shirt_hand_stitching': 1,
        'custcol_shirt_complement_location': 1,
        'custcol_su_set_pieces': 1
    }

	return Backbone.View.extend({

        template: productDetailItemOptionsTpl,
        
        initialize: function initialize(options) {
            this.itemModel = options.itemModel;
            this.application = options.application;
            this.currentOptionIndex = 0;
            this.isLoaded = false;
            this.optionCount = 0;
            this.cart = LiveOrderModel.getInstance();
            this.isUpdating = options.isUpdating;

            var options = {
                options: this.itemModel.get('item').get('custitem_sca_cat_item_options'),
                category: this.itemModel.get('item').get('custitem_sca_item_category')
            };
            
            this.model.fetch({data: options}).done(function() {
                var self = this;
                this.model = new Backbone.Model(_.sortBy(this.model.attributes, function(option){
                    return parseInt(option.order, 10);
                }));

                this.length = Object.keys(this.model.attributes).length;
                
                _.each(this.model.attributes, function(option) {
                    if(option.name) {
                        self.optionCount++;
                    }
                });

                this.render();
            }.bind(this));            
        },
        
        events: {
            'click [data-toggle="set-option"]': 'setOption',
            'click [data-action="change-option"]': 'changeOption',
            'click [data-action="add-to-cart"]': 'addToCart',
            'blur [data-toggle="text-option"]': 'setOption',
            'blur .product-views-option-text-input': 'blurChangeOption',
            'keyup .product-views-option-text-input': 'validateText'
        },

        setOption: function(e) {
            var value = jQuery(e.currentTarget).val();
    

            this.currentOptionModel.set('value', value);
            this.itemModel.setOption(this.currentOption.itemOptionParentId, value);

            if (hiddenOptions[this.currentOption.itemOptionParentId] && hiddenOptions[this.currentOption.itemOptionParentId] === parseInt(value)) {
                switch (this.currentOption.itemOptionParentId) {
                    case 'custcol_su_mongramming_font':
                        this.removeOptions('hideIfNoMonogram');
                        break;
                    case 'custcol_shirt_monogram':
                        this.removeOptions('hideIfNoMonogram');
                        break;
                    case 'custcol_shirt_hand_stitching':
                        this.removeOptions('hideIfNoStitching');
                        break;
                    case 'custcol_shirt_complement_location':
                        this.removeOptions('hideIfNoShirtComplement');
                        break;
                    case 'custcol_su_set_pieces':
                        this.removeOptions('hideIfNoVest');
                        break;
                }
            }
            this.render();
        },

        removeOptions: function removeOptions(optionString) {
            var self = this;

            var filteredOptions = _.filter(this.model.attributes, function(option) {
                return option[optionString] === 'T';
            });

            _.each(filteredOptions, function(option) {
                self.itemModel.setOption(option.itemOptionParentId, null);

                var removeOptionModel = _.find(self.itemModel.get('options').models, function(model){
                    return model.get('cartOptionId') === option.itemOptionParentId;
                });

                removeOptionModel.set('value', null);
            });
        },

        blurChangeOption: function blurChangeOption(e) {
            if (jQuery(e.relatedTarget).data('action') === 'change-option') {
                var direction = jQuery(e.relatedTarget).data('direction');

                if (direction === 'next') {
                    this.currentOptionIndex++;
                } else {
                    this.currentOptionIndex--;
                }
                
                this.render(direction);
            }
        },

        validateText: function validateText(e) {
            if (jQuery(e.currentTarget).val() === '') {
                jQuery('[data-direction="next"]').attr('disabled', true);
            } else {
                jQuery('[data-direction="next"]').attr('disabled', false);
            }

        },

        changeOption: function(e) {
            var direction = jQuery(e.currentTarget).data('direction');

            if (direction === 'next') {
                this.currentOptionIndex++;
            } else {
                this.currentOptionIndex--;
            }
            
            this.render(direction);
        },

        addToCart: function(e) {
            var self = this
			var cartPromise;

			if (!this.itemModel.isNew() && this.itemModel.get('source') === 'cart') {
				cartPromise = this.cart.updateProduct(this.itemModel);
				cartPromise.done(function () {
					self.options.application.getLayout().closeModal();
				});
			} else {
				var line = LiveOrderLineModel.createFromProduct(this.itemModel);
				cartPromise = this.cart.addLine(line);
				CartConfirmationHelpers.showCartConfirmation(cartPromise, line, self.options.application);
			}

			cartPromise.fail(function (jqXhr) {
				var error_details = null;
				try {
					var response = JSON.parse(jqXhr.responseText);
					error_details = response.errorDetails;
				} finally {
					if (error_details && error_details.status === 'LINE_ROLLBACK') {
						self.itemModel.set('internalid', error_details.newLineId);
					}
				}
			});

			this.disableElementsOnPromise(cartPromise, e.target);
			return false;
        },

        render: function render(direction) {
            var self = this;
            
            if (this.model.attributes[this.currentOptionIndex]) {
                this.currentOption = this.model.attributes[this.currentOptionIndex];

                if ((this.currentOption.hideIfNoMonogram === 'T' && (this.itemModel.get('custcol_su_mongramming_font') === '3' || this.itemModel.get('custcol_shirt_monogram') === '2')) 
                || (this.currentOption.hideIfNoStitching === 'T' && this.itemModel.get('custcol_shirt_hand_stitching') === '1')
                || (this.currentOption.hideIfNoShirtComplement === 'T' && this.itemModel.get('custcol_shirt_complement_location') === '1')
                || (this.currentOption.hideIfNoVest === 'T' && this.itemModel.get('custcol_su_set_pieces') === '1')) {
                    if (direction === 'next') {
                        this.currentOptionIndex++;
                    } else {
                        this.currentOptionIndex--;
                    }
                    this.render(direction);
                } else {
                    var allPossibleOptions = this.itemModel.get('options').models;

                    this.currentOptionModel = _.find(allPossibleOptions, function(possibleOption) {
                        return possibleOption.get('cartOptionId') === self.currentOption.itemOptionParentId;
                    });

                    if (!this.currentOptionModel.get('value')) {
                        var selectedOption = _.find(this.currentOptionModel.get('values'), function(selectedOptionValue) {
                            return selectedOptionValue.internalid;
                        });

                        if (selectedOption) {
                            this.currentOptionModel.set('value', selectedOption.internalid);
                            this.itemModel.setOption(self.currentOption.itemOptionParentId, selectedOption.internalid);
                        }
                    }
                    this.isLoaded = true;
                }
            }

            this._render();
        },

        childViews: {
            'Options.Tiles': function() {
                if (this.isLoaded) {
                    return new ProductViewsOptionView({
                        model: this.currentOptionModel,
                        maxLength: this.currentOption.maxLength ? this.currentOption.maxLength : false,
                        configName: this.currentOption ? this.currentOption.name : ''
                    });
                }
            }
        },

        findLastOption: function findLastOption(lastOptionVariant) {
            var isLastOption = true;
            for (var i = this.currentOptionIndex + 1; i < this.length; i++) {
                if (this.model.attributes[i][lastOptionVariant] === 'F') {
                    isLastOption = false;
                }
            }

            return isLastOption;
        },
        
		getContext: function getContext() {
            var selectedOption = {};
            var self = this;
            var isLastOption = this.currentOptionIndex === this.optionCount - 1;
            var isMonogramOption = false;
            var isStitchingOption = false;
            var isShirtComplementOption = false;
            var isNextAvailable = true;

            if (this.currentOptionModel && this.currentOptionModel.get('type') === 'text' && (!this.currentOptionModel.get('value') || this.currentOptionModel.get('value') === '')) {
                isNextAvailable = false;
            }
            
            if (this.isLoaded && self.currentOptionModel.get('value')) {
                selectedOption = _.find(self.currentOption.options, function(option) {
                    return parseInt(option.itemOptionId, 10) === parseInt(self.currentOptionModel.get('value').internalid, 10);
                });
            }

            if (this.currentOption && hiddenOptions[this.currentOption.itemOptionParentId] && hiddenOptions[this.currentOption.itemOptionParentId] === parseInt(this.currentOptionModel.get('value').internalid) && !isLastOption) {
                switch (this.currentOption.itemOptionParentId) {
                    case 'custcol_su_mongramming_font':
                        isLastOption = this.findLastOption('hideIfNoMonogram');
                        break;
                    case 'custcol_shirt_monogram':
                        isLastOption = this.findLastOption('hideIfNoMonogram');
                        break;
                    case 'custcol_shirt_hand_stitching':
                        isLastOption = this.findLastOption('hideIfNoStitching');
                        break;
                    case 'custcol_shirt_complement_location':
                        isLastOption = this.findLastOption('hideIfNoShirtComplement');
                        break;
                    case 'custcol_su_set_pieces':
                        isLastOption = this.findLastOption('hideIfNoVest');
                        break;
                }
            }

            return {
                name: this.currentOption ? this.currentOption.name : '',
                description: this.currentOption ? this.currentOption.description : '',
                image: selectedOption && selectedOption.imageRef ? _.getAbsoluteUrl(selectedOption.imageRef) : null,
                isFirstOption: this.currentOptionIndex === 0,
                isLastOption: isLastOption,
                isLoaded: this.isLoaded,
                showImage:  this.currentOption ? !(this.currentOption.options.length === 1 && this.currentOption.options[0].imageRef === '' && this.currentOption.options[0].itemOptionId === '') : false,
                finishButton: this.isUpdating ? 'Update' : 'Add To Cart',
                isNextAvailable: isNextAvailable
			};
		}
	});
});