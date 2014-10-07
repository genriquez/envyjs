/*global Envy: false */
/*jslint nomen:true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    /**
     * Transform node that outputs the alpha value of an image to the RGB channels (BW), and clears the alpha channel for full opacity
     */
    var AlphaToRGBTransformNode = function () {
        this.init();
    };

    AlphaToRGBTransformNode.prototype = new Envy.Nodes.TransformNode();

    /**
     * Dumps the Alpha channel values to RGB channels, and overwrites alpha with 255 (full opacity)
     * @param {Object} sourceImageData Image data from the source node
     */
    AlphaToRGBTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData);
        var i = 0;
        
        for (i = 0; i < sourceImageData.data.length; i += 4) {
            targetImageData.data[i] = targetImageData.data[i + 1] = targetImageData.data[i + 2] = sourceImageData.data[i + 3];
            targetImageData.data[i + 3] = 255;
        }
        
        return targetImageData;
    };
    
    // Export class
    Envy.Nodes.AlphaToRGBTransformNode = AlphaToRGBTransformNode;
}(Envy, this));