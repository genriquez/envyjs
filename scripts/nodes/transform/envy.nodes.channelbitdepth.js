/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Transform node that emulates a specific bit depth per channel (RGBA)
     */
    var ChannelBitDepthTransformNode = function () {
        this.init();
    };

    ChannelBitDepthTransformNode.prototype = new Envy.Nodes.TransformNode();

    /**
     * Threhold level to evaluate the input image with
     */
    ChannelBitDepthTransformNode.prototype._bitDepth = 6;

    /**
     * Creates a new Image data based on the sorce output, emulating a specific bit depth per channel (RGBA)
     * @returns {ImageData} Transformed image data
     */
    ChannelBitDepthTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData);
        var i = 0;

        var currentBitDepthMaxValue = 255;
        var targetBitDepthMaxValue = Math.pow(2, this._bitDepth) - 1;

        for (i = 0; i < sourceImageData.data.length; i++) {
            var sourceValue = sourceImageData.data[i];
            sourceValue = Math.round(sourceValue * targetBitDepthMaxValue / currentBitDepthMaxValue) * currentBitDepthMaxValue / targetBitDepthMaxValue;

            targetImageData.data[i] = sourceValue;
        }

        return targetImageData;
    };
    
    /**
     * Bit depth to map the image to
     * @param {Number} bitDepth Bit depth
     */
    ChannelBitDepthTransformNode.prototype.setBitDepth = function (bitDepth) {
        this._bitDepth = bitDepth;
        this.setDirty();
    };

    // Export class
    Envy.Nodes.ChannelBitDepthTransformNode = ChannelBitDepthTransformNode;
}(Envy, this));