define('Product.Container.View', [
    'Backbone',
    'jQuery',
    'underscore',
    'Backbone.View',
    'Backbone.View.render'
], function ProductContainerView(
    Backbone,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        childView: Backbone.View,
        template: null,
        childViewOptions: {},
        viewsPerRow: 3,
        rowsCount: 12,
        childTemplate: null,
        cellTemplate: null,
        rowTemplate: null,
        cellsContainerId: 'backbone.collection.view.cells',
        cellContainerId: 'backbone.collection.view.cell',
        rowsContainerId: 'backbone.collection.view.rows',
        context: {},
        events: {
            'click .groupTitle': 'selectHeader'
        },
        dependencies: {},
        initialize: function initialize(options) {
            var self = this;
            this.application = options.application;
            this.childView = options.childView || this.childView;
            this.childViewOptions = options.childViewOptions || this.childViewOptions;
            this.viewsPerRow = options.viewsPerRow ? options.viewsPerRow : this.viewsPerRow;
            if (this.viewsPerRow < 1) {
                this.viewsPerRow = Infinity;
            }
            this.context = options.context || {};
            this.collection = options.collection;
            this.childTemplate = options.childTemplate || this.childTemplate;
            this.cellTemplate = options.cellTemplate || this.cellTemplate;
            this.rowTemplate = options.rowTemplate || this.rowTemplate;
            this.cellsContainerId = options.cellsContainerId || this.cellsContainerId;
            this.cellContainerId = options.cellContainerId || this.cellContainerId;
            this.template = options.template || this.template;
            this.childCells = [];

            this.application.getLayout().on('afterAppendView', function afterViewRender() {
                var $groupItemOption = jQuery('.groupItemOption');
                var $groupTitle = jQuery('.groupTitle');
                var url = window.location.href;
                var strURLParam = url.substring(url.indexOf('?'));

                jQuery('.groupItemOption:eq(0) .container_item_option').css('display', 'block');
                _.each(self.collection.models, function collections(model) {
                    var optionID = model.get('urlParameterName');
                    if (strURLParam.indexOf(optionID.toLowerCase()) !== -1 || model.get('type') === 'checkbox') {
                        jQuery('[data-cart-option-id="' + model.get('cartOptionId') + '"]').addClass('isSelected');
                    }
                });
                $groupTitle.click(function () {
                    $groupItemOption.removeClass('current');
                    jQuery(this).parent().addClass('current');
                    self.checkSlideOpen($groupItemOption);
                });
                jQuery('[data-view="Product.Options"] input').change(function changeValue(e) {

                    jQuery(this).closest('[data-type="option"]').addClass('isSelected');
                    var optionId = e.target.name;
                    var value = e.target.value;
                    self.checkOption($groupItemOption, optionId, value);
                });

                $groupItemOption.each(function() {
                    var $groupItem = jQuery(this);
                    var isComplete = true;
                    jQuery(this).find('[data-type="option"]').not('.compExclude').each(function() {
                        if (!jQuery(this).hasClass('isSelected'))
                            isComplete = false;
                    });

                    if(isComplete) {
                        $groupItem.addClass('isComplete');
                    }

                });

                /* ---- INITIAL OPEN ----*/
                $groupItemOption.each(function() {
                    var $this = jQuery(this);
                    if (!($this.hasClass('isComplete'))) {
                        $this.addClass('current');
                        return false;
                    }
                });

                /* ---- OPEN CURRENT SLIDE ----*/
                self.checkSlideOpen($groupItemOption);

                var tooltip_image = new Image();
                var $helpContainer = jQuery('<div class="product-image-helper-container"></div>');
                $helpContainer.css({'background-image': 'url(' + _.getAbsoluteUrl('img/ajax-loader.gif') + ')',
                    'position': 'absolute',
                    'z-index': '1000',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center middle'
                });
                $helpContainer.append(tooltip_image);
                jQuery('body').append($helpContainer);
                jQuery('.product-option-help').hover(function(e) {
                    var tooltip_image_url = jQuery(this).attr('data-image');
                    var windowSize = jQuery(window).width();
                    var leftImageLoc = e.pageX + 10;

                    tooltip_image.src = _.getAbsoluteUrl(tooltip_image_url);
                    jQuery(tooltip_image).css({
                        'width': '160px'
                    });

                    jQuery(tooltip_image).fadeIn(90);
                    if (windowSize < leftImageLoc + 160) {
                        jQuery(tooltip_image).parent().css({
                            'top': e.pageY + 10,
                            'left': e.pageX - 160
                        });
                    } else {
                        jQuery(tooltip_image).parent().css({
                            'top': e.pageY + 10,
                            'left': e.pageX + 10
                        });
                    }

                }, function() {
                    tooltip_image.src = '';
                    jQuery(tooltip_image).fadeOut(90);
                })

                var item = self.options.childViewOptions.item;

                var runDeps = _(self.dependencies).keys();
                var optionsDep = item.get('options').filter(function (i) {return i && i.get('cartOptionId') && runDeps.indexOf(i.get('cartOptionId')) >= 0});
                _(optionsDep).each(function (opt) {
                    var val = opt.get('value') && opt.get('value').internalid;
                    self.checkDependencies(opt.get('cartOptionId'), val);
                });
            });
        },
        checkDependencies: function checkDependencies(optionId, optionValue) {
            if (this.dependencies[optionId]) {
                _.each(_(_(_(this.dependencies[optionId]).values()).flatten()).uniq(), function (elem) {
                    jQuery('#' + elem + '-container .active input').click().change();
                    jQuery('#' + elem + '-container').addClass('compExclude').hide();
                });
                if (this.dependencies[optionId][optionValue]) {
                    _.each(this.dependencies[optionId][optionValue], function (elem) {
                        jQuery('#' + elem + '-container').removeClass('compExclude').show();
                    });
                }
            }
        },
        checkOption: function checkOption($groupItemOption, optionId, optionValue) {
            this.checkDependencies(optionId, optionValue);

            $groupItemOption.each(function() {
                var $groupItem = $(this);
                var isComplete = true;
                jQuery(this).find('[data-type="option"]').not('.compExclude').each(function() {
                    if (!jQuery(this).hasClass('isSelected'))
                        isComplete = false;
                });

                if(isComplete) {
                    $groupItem.addClass('isComplete');
                    if ($groupItem.hasClass('current') && $groupItem.next().size() > 0) {
                        $groupItem.next().addClass('current');
                        $groupItem.removeClass('current');
                    }
                }
                else {
                    $groupItem.removeClass('isComplete');
                }

            });
            this.checkSlideOpen($groupItemOption);
        },
        checkSlideOpen: function checkSlideOpen($groupItemOption) {
            $groupItemOption.each(function() {
                var $this = jQuery(this);
               // if ($this.attr('id') !== 'group_1')
                    if ($this.hasClass('current') ) {
                        $this.find('.container_item_option').slideDown();
                    } else {
                        $this.find('.container_item_option').slideUp();
                    }

            });
        },
        createChildElement: function createChildElement() {
            var data = this.placeholderData || {};
            var tagName = data.childTagName || 'div';
            var element = jQuery('<' + tagName + '></' + tagName + '>');

            if (data.childId) {
                element.attr('id', data.childId);
            }

            if (data.childClass) {
                element.addClass(data.childClass);
            }

            if (data.childDataAction) {
                element.attr('data-action', data.childDataAction);
            }

            if (data.childDataType) {
                element.attr('data-type', data.childDataType);
            }

            return element;
        },
        generateRowContext: function generateRowContext() {
            return {};
        },
        generateCellContext: function generateCellContext(childViewInstance) {
            var childViewInstance_context = childViewInstance.getTemplateContext ?
                childViewInstance.getTemplateContext() : childViewInstance.getContext ? childViewInstance.getContext() : {};
            return _.extend(
                childViewInstance_context, {
                    spanSize: this.calculateSpanSize()
                }
            );
        },
        calculateSpanSize: function calculateSpanSize() {
            return this.rowsCount / this.viewsPerRow;
        },
        createCell: function createCell(model, index, isParent, html) {
            var options = _.extend({}, this.childViewOptions, {model: model, index: index });
            var childViewInstance = new (this.childView)(options);

            this.childCells.push(childViewInstance);

            childViewInstance.setElement(this.createChildElement());

            childViewInstance.render();

            if (childViewInstance.$el.children().length === 1) {
                childViewInstance.setElement(childViewInstance.$el.children()[0]);
            }

            return childViewInstance.$el;
        },
        appendCellsToRow: function appendCellsToRow(cells) {
            var $row;
            var $placeholder
            var $cells = jQuery(_(cells).map(function (element) {
                return element.get(0);
            }));

            if (this.rowTemplate) {
                $row = jQuery(this.rowTemplate(this.generateRowContext()));
                $placeholder = $row.find('[data-type="' + this.cellsContainerId + '"]');

                if ($placeholder.length) {
                    $placeholder.replaceWith($cells);
                } else {
                    $row.append($cells);
                }
                return $row;
            } else {
                return $cells;
            }

        },
        render: function render() {
            var self = this;
            var rows = [];
            var groupIdSet;
            var groupItem;
            var $groupHead;
            var groupStart  = false;
            var groupTemplate = jQuery('<div class="groupItem"></div>');
            var groupTemp = groupTemplate;
            var groupStart = false;
            var totalOption = this.collection.length;
            var dependencies = {};

            this.collection = this.collection instanceof Backbone.Collection ? this.collection : new Backbone.Collection(this.collection);
            this.$el.empty();
            if (this.template) {
                this._render();
            }
            if (self.childTemplate) {
                self.childView.prototype.template = self.childTemplate;
            }
            this.viewsPerRow = this.placeholderData && this.placeholderData.viewsPerRow || this.viewsPerRow;
            // @property {Array<Object>} collection this kind of view should be always have a collection property which is what is rendered.
            this.collection.each(function (model, index) {
                var isParent = model.get('isParent');
                var groupId = model.get('groupId');
                var displayOption = model.get('displayOption');
                var parentTitle =  model.get('parentTitle');

                var depends = model.get('depends');
                if (depends) {
                    _.each(depends.split('|'), function (optionValuePair) {
                        var optionValue = optionValuePair.split('=');
                        var optionId = optionValue[0];
                        if (!optionId) return;
                        var valuesWhenActive = optionValue[1].split(',');

                        if (!dependencies[optionId]) {
                            dependencies[optionId] = {};
                        }
                        _.each(valuesWhenActive, function(value) {
                            if (!dependencies[optionId][value]) {
                                dependencies[optionId][value] = [];
                            }
                            dependencies[optionId][value].push(model.get('cartOptionId'));
                        });
                    });
                }
                var cell;
                if (displayOption)
                if (groupId) {
                    groupStart = true;
                    if (groupIdSet === groupId) {
                        groupTemp.find('.container_item_option').append(self.createCell(model, index));
                        if (index + 2 >= totalOption) {
                            rows.push(groupTemp);
                        }
                    } else if (groupIdSet !== groupId) {
                        if (groupIdSet) {
                            rows.push(groupTemp);
                            groupTemp = jQuery('<div id="group_' + groupId + '" class="groupItemOption"></div>');
                            if (isParent) {
                                groupTemp.append('<div id="group_' + groupId + '_title" class="groupTitle"><span>' + parentTitle + '</span><i class="collapse-option"></i><span class="info-message">steps completed</span></div>');
                                groupTemp.append('<div class="container_item_option" data-groupid="group_' + groupId + '"></div>');
                            }

                            groupTemp.find('.container_item_option').append(self.createCell(model, index));


                        } else {
                            groupTemp = jQuery('<div id="group_' + groupId + '" class="groupItemOption"></div>');
                            if (isParent) {
                                groupTemp.append('<div id="group_' + groupId + '_title" class="groupTitle"><span>' + parentTitle + '</span><i class="collapse-option"></i><span class="info-message">steps completed</span></div>');
                                groupTemp.append('<div class="container_item_option" data-groupid="group_' + groupId + '"></div>');
                            }

                            groupTemp.find('.container_item_option').append(self.createCell(model, index));
                        }

                        groupIdSet = groupId;
                    } else {
                        cell = self.createCell(model, index);
                        rows.push(cell);
                    }

                }
                else {
                    cell = self.createCell(model, index);
                    rows.push(cell);
                }
            });


            var $content = jQuery(_(rows).map(function (element) {
                return element.get(0);
            }));

            if (this.template) {
                this.$('[data-type="' + this.rowsContainerId + '"]').replaceWith($content);
            } else {
                this.$el.append($content);
            }

            this.dependencies = dependencies;
        },
        destroy: function destroy() {
            _.each(this.childCells, function(child){
                child && child.destroy();
            });

            Backbone.View.prototype.destroy.apply(this, Array.prototype.slice.call(arguments));
        },
        getContext: function getContext() {
            var context = {
                collection : this.collection
                ,	showCells: !!this.collection.length
            };

            return _.extend(context, this.context);
        },
        selectHeader: function selectHeader(e) {
            console.log(e);
        }
    });
});
