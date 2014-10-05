/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Transform node that applies transparency (alpha 0) to pixels that match a specific color with a given tolerance
     */
    var ColorKeyTransformNode = function () {
        this.init();
    };

    ColorKeyTransformNode.prototype = new Envy.Nodes.TransformNode();

    /**
     * Maximum color distance to consider as part of the base color to compare
     */
    ColorKeyTransformNode.prototype._tolerance = 3;

    /**
     * Base color to use for new alpha mask
     */
    ColorKeyTransformNode.prototype._colorKey = null;

    /**
     * Applies transparency (alpha 0) to any pixel with a color similar to the selected color key (with a given tolerance)
     * Color distance is calculated as the scalar magnitude of the difference between the Key and Pixel color vectors in RGB 3D space
     * @param   {Object}    sourceImageData Image data to read data from
     * @returns {ImageData} Transform image data
     */
    ColorKeyTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData);
        var squareTolerance = Math.pow(this._tolerance, 2);
        var i = 0;

        var data = sourceImageData.data;
        for (i = 0; i < data.length; i += 4) {
            var sourceColor = new Envy.Color(data[i], data[i + 1], data[i + 2]);
            var squareColorDistance = this._colorKey.getSquareDistance(sourceColor);

            targetImageData.data[i] = data[i];
            targetImageData.data[i + 1] = data[i + 1];
            targetImageData.data[i + 2] = data[i + 2];
            targetImageData.data[i + 3] = squareColorDistance > squareTolerance ? data[i + 3] : 0;
        }

        return targetImageData;
    };
    
    /**
     * Sets the maximum color distance to match the color key with
     * @param {Number} tolerance Max. color distance
     */
    ColorKeyTransformNode.prototype.setTolerance = function (tolerance) {
        this._tolerance = tolerance;
        this.setDirty();
    };
    
    /**
     * Sets the color key to match pixel colors to
     * @param {Number} r Red channel value of the color to match
     * @param {Number} g Green channel value of the color to match
     * @param {Number} b Blue channel value of the color to match
     */
    ColorKeyTransformNode.prototype.setColorKey = function (r, g, b) {
        this._colorKey = new Envy.Color(r, g, b);
        this.setDirty();
    };

    // Export class
    Envy.Nodes.ColorKeyTransformNode = ColorKeyTransformNode;
}(Envy, this));
