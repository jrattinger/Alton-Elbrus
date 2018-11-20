define('Facets.ItemCell.Extend', [
    'Facets.ItemCell.View',
    'underscore',
    'SC.Configuration',
    'jQuery',
    'Utils'
], function FacetsItemCellExtend(
    FacetsItemCellView,
    _,
    Configuration,
    jQuery,
    Utils
) {
    'use strict';

    _.extend(FacetsItemCellView.prototype, {
        events: {
            'mouseover img.facets-item-cell-grid-image' : 'mouseOverImage',
            'mouseout img.facets-item-cell-grid-image' : 'mouseOverImage'
        },
        checkIfHover: function checkIfHover(imageURL) {
            var hoverImage = false;
            var imageURLArray = imageURL.split('_');
            var imageArray = imageURLArray[imageURLArray.length - 1].split('.');
            if (imageArray[0] === 'hover') {
                hoverImage = true;
            }
            return hoverImage;
        },
        mouseOverImage: function mouseOverImage(e) {
            var target = jQuery(e.currentTarget);
            var currentImage = target.attr('src');
            var hoverImage = target.data('hoverimage');
            if (hoverImage) {
                target.attr('src', hoverImage);
                target.data('hoverimage', currentImage);
            }
        },

        getAllItemImages: function getAllItemImages (item)  {
        var result = [],
            item_images_detail = item.get('itemimages_detail') || {};

        result = Utils.imageFlatten(item_images_detail);

            //@class ImageContainer
            return result.length ? result : [{
                //@property {String} url
                url: Utils.getAbsoluteUrlOfNonManagedResources(Configuration.get('imageNotAvailable'))
                //@property {String} altimagetext
                ,	altimagetext: item.get('_name')
            }];
        },

        getContext: _.wrap(FacetsItemCellView.prototype.getContext, function getContext(fn) {
            var content = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;
            var imageDetails = this.getAllItemImages(this.model);
            var hoverImage = '';
            var thumbnail = this.model.getThumbnail();
            _.each(imageDetails, function (imageDetail) {
                if (self.checkIfHover(imageDetail.url) && imageDetails.length > 1) {
                    hoverImage = imageDetail.url;
                }
            });

            if (this.checkIfHover(thumbnail.url) && imageDetails.length > 1) {
                thumbnail.url = imageDetails[1].url;
            }
            content.hoverImage = hoverImage;
            content.thumbnail = thumbnail;
            return content;
        })
    });
});
