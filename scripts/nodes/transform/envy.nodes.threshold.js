/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Transform node that rounds RGBA channel values to min or max values, comparing it by a base level
     */
    var ThresholdTransformNode = function () {
        this.init();
    };

    ThresholdTransformNode.prototype = new Envy.Nodes.TransformNode();

    /**
     * Threhold level to evaluate the input image with
     */
    ThresholdTransformNode.prototype._level = 128;

    /**
     * Sets the threshold level for the current node
     * @param {Number} level Threshold level
     */
    ThresholdTransformNode.prototype.setLevel = function (level) {
        this._level = level;
        this.setDirty();
    };
    
    /**
     * Rounds RGBA channel values to min or max values, comparing it to a base level
     * @returns {ImageData} Transformed Image data
     */
    ThresholdTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData);
        var i = 0;

        for (i = 0; i < sourceImageData.data.length; i++) {
            targetImageData.data[i] = sourceImageData.data[i] > this._level ? 255 : 0;
        }

        return targetImageData;
    };

    // Export class
    Envy.Nodes.ThresholdTransformNode = ThresholdTransformNode;
}(Envy, this));
