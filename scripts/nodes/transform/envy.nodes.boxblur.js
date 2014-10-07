/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    /**
     * Transform node that applies box blur to RGBA channels
     */
    var BoxBlurTransformNode = function () {
        this.init();
    };
    
    BoxBlurTransformNode.prototype = new Envy.Nodes.TransformNode();
    
    BoxBlurTransformNode.prototype._level = 1;
    
    /**
     * Sets the level of blur to apply to the image
     * @param {Number} level Level of blur
     */
    BoxBlurTransformNode.prototype.setLevel = function (level) {
        this._level = level;
        this.setDirty();
    };
    
    /**
     * Calculates the list of pixel index offsets to sum to obtain a blurred pixel data
     * @returns {Array} Collection of x;y offsets
     */
    BoxBlurTransformNode.prototype._calculatePixelBoxOffsets = function () {
        var x, y, offsets = [];
        
        for (x = -this._level; x <= this._level; x++) {
            for (y = -this._level; y <= this._level; y++) {
                offsets.push({ x: x, y: y });
            }
        }
        
        return offsets;
    };
    
    BoxBlurTransformNode.prototype._transform = function (sourceImageData) {
        var targetImageData = this._createImageData(sourceImageData),
            boxOffsets = this._calculatePixelBoxOffsets(),
            totalSamplesPerPixel = boxOffsets.length,
            height = sourceImageData.height,
            width = sourceImageData.width,
            i;
        
        for (i = 0; i < sourceImageData.data.length; i++) {
            var channelOffset = i % 4,
                pixelIndex = (i - channelOffset) / 4,
                row = Math.floor(pixelIndex / width),
                col = pixelIndex % width,
                pixelTotal = 0;
            
            boxOffsets.forEach(function (offset) {
                var p = {
                    x: Math.min(Math.max(offset.x + col, 0), width - 1),
                    y: Math.min(Math.max(offset.y + row, 0), height - 1)
                };
                
                pixelTotal += sourceImageData.data[(p.x + width * p.y) * 4 + channelOffset];
            });
                       
            targetImageData.data[i] = Math.round(pixelTotal / totalSamplesPerPixel);
        }
        
        return targetImageData;
    };
    
    // Export class
    Envy.Nodes.BoxBlurTransformNode = BoxBlurTransformNode;
}(Envy, this));