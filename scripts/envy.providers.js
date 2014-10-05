/*jslint vars: true*/

(function (context) {
    "use strict";

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var ImageDataFactory = {
        /**
         * Creates an image data object with the given dimensions
         * @param   {Number}    width  Width of the image data to create
         * @param   {Number}    height Height of the image data to create
         * @returns {ImageData} ImageData object with the given dimensions
         */
        createImageData: function (width, height) {
            return ctx.createImageData(width, height);
        }
    };

    // Export Object
    context.Envy = context.Envy || {};
    context.Envy.Providers = context.Envy.Providers || {};
    context.Envy.Providers.ImageDataFactory = ImageDataFactory;
}(this));