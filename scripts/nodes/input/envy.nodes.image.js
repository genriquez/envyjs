/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Input node to export image data of an image
     * @param {HTMLImage} image HTML Image element
     */
    var ImageInputNode = function (image) {
        this.init();

        this._image = image;
    };

    ImageInputNode.prototype = new Envy.Nodes.ImageNode();

    /**
     * Imge object to export as image data
     */
    ImageInputNode.prototype._image = null;

    /**
     * Renders the image into a canvas element, and exports it as image data
     * @returns {ImageData} Image data of the selected image
     */
    ImageInputNode.prototype.render = function () {
        var canvas = document.createElement("canvas");
        canvas.height = this._image.height;
        canvas.width = this._image.width;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this._image, 0, 0);

        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    // Export class
    Envy.Nodes.ImageInputNode = ImageInputNode;
}(Envy, this));
