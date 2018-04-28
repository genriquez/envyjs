/*global Envy: false */
/*jslint nomen:true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    var InvertColorTransformNode = function () {
        this.init();
    };

    InvertColorTransformNode.prototype = new Envy.Nodes.TransformNode();

    InvertColorTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData);
        var i = 0,
            j = 0;
        
        for (i = 0; i < sourceImageData.data.length; i += 4) {
            for (j = 0; j < 3; j++) {
                targetImageData.data[i + j] = sourceImageData.data[i + j] ^ 255;
            }

            targetImageData.data[i + 3] = sourceImageData.data[i + 3];
        }
        
        return targetImageData;
    };
    
    // Export class
    Envy.Nodes.InvertColorTransformNode = InvertColorTransformNode;
}(Envy, this));