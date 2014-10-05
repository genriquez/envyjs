/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Transform node that applies grayscale to the input image data
     */
    var GrayscaleTransformNode = function () {
        this.init();
    };

    GrayscaleTransformNode.prototype = new Envy.Nodes.TransformNode();

    /**
     * Applies grayscale filter to source Image Data
     * @returns {ImageData} Transformed image data
     */
    GrayscaleTransformNode.prototype._transform = function (sourceImageData) {
        var filteredImageData = this._createImageData(sourceImageData);
        var i = 0;

        for (i = 0; i < sourceImageData.data.length; i += 4) {
            var grayLevel = (sourceImageData.data[i] + sourceImageData.data[i + 1] + sourceImageData.data[i + 2]) / 3;
            filteredImageData.data[i] = filteredImageData.data[i + 1] = filteredImageData.data[i + 2] = Math.floor(grayLevel);
            filteredImageData.data[i + 3] = sourceImageData.data[i + 3];
        }

        return filteredImageData;
    };

    // Export class
    Envy.Nodes.GrayscaleTransformNode = GrayscaleTransformNode;
}(Envy, this));
