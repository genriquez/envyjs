/*global Envy: false */
/*jslint nomen:true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    var FillColorTransformNode = function () {
        this.init();
        
        this._color = new Envy.Color(0,0,0);
    };

    FillColorTransformNode.prototype = new Envy.Nodes.TransformNode();
    
    FillColorTransformNode.prototype._color = null;

    FillColorTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData);
        var i = 0;
        
        for (i = 0; i < sourceImageData.data.length; i += 4) {
            targetImageData.data[i + 0] = this._color.r;
            targetImageData.data[i + 1] = this._color.g;
            targetImageData.data[i + 2] = this._color.b;
            targetImageData.data[i + 3] = sourceImageData.data[i + 3];
        }
        
        return targetImageData;
    };
    
    /**
     * Sets the color to fill
     * @param {Number} r Red channel value of the color
     * @param {Number} g Green channel value of the color
     * @param {Number} b Blue channel value of the color
     */
    FillColorTransformNode.prototype.setColor = function (r, g, b) {
        this._color = new Envy.Color(r, g, b);
        this.setDirty();
    };
    
    // Export class
    Envy.Nodes.FillColorTransformNode = FillColorTransformNode;
}(Envy, this));