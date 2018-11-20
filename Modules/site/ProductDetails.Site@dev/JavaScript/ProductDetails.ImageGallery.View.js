define('ProductDetails.ImageGallery.View', [
    'product_details_image_gallery.tpl',
    'Backbone',
    'underscore',
    'Utils'
], function (
    product_details_image_gallery_tpl,
    Backbone,
    _,
    Utils
) {
    'use strict';
 
    return Backbone.View.extend({
        template: product_details_image_gallery_tpl,
 
        initialize: function initialize () {
            Backbone.View.prototype.initialize.apply(this, arguments);
 
            var self = this;
 
            this.images = this.model.getImages();
 
            this.model.on('change', function () {
                var model_images = this.model.getImages();
                if (!_.isEqual(this.images, model_images)) {
                    this.images = model_images;
                    this.render();
                }
            }, this);
        },
 
        events: {
            'click [data-action="switch-image"]': 'switchImage'
        },
 
        switchImage: function switchImage(e) {
            e.preventDefault();
 
            var id = e.currentTarget.id;
            var re = /\d+/;
            var index = id.match(re)[0];
 
            _.each(this.images, function (image) {
                image.selected = false;
            });
 
            this.images[index].selected = true;
            this.render();
        },
 
        getContext: function () {
            var selectedImage = _.find(this.images, function(image) {
                return image.selected;
            });
 
            return {
                imageResizeId: Utils.getViewportWidth() < 768 ? 'thumbnail' : 'main',
                images: this.images || [],
                firstImage: selectedImage || this.images[0] || {},
                showImages: this.images.length > 0,
                showImageSlider: this.images.length > 1
            };
        }
    });
});