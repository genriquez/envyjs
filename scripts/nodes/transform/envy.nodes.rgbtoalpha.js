/*global Envy: false */
/*jslint nomen:true, plusplus: true, vars: true */

(function (Envy) {
    "use strict";
    
    var RGBToAlphaTransformNode = function () {
        this.init();
    };

    RGBToAlphaTransformNode.prototype = new Envy.Nodes.TransformNode();

    RGBToAlphaTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData);
        var i = 0;
        
        for (i = 0; i < sourceImageData.data.length; i += 4) {
            targetImageData.data[i + 3] = sourceImageData.data[i] / 3 + sourceImageData.data[i + 1] / 3 + sourceImageData.data[i + 2] / 3;
            targetImageData.data[i] = targetImageData.data[i + 1] = targetImageData.data[i + 2] = 255;
        }
        
        return targetImageData;
    };
    
    // Export class
    Envy.Nodes.RGBToAlphaTransformNode = RGBToAlphaTransformNode;
}(Envy));