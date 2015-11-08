/*global Envy: false, Uint32Array: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    /**
     * Transform node that applies box blur to RGBA channels
     */
    var SoftBlurTransformNode = function () {
        this.init();
    };
    
    SoftBlurTransformNode.prototype = new Envy.Nodes.TransformNode();
    
    SoftBlurTransformNode.prototype._level = 1;
    
    /**
     * Sets the level of blur to apply to the image
     * @param {Number} level Level of blur
     */
    SoftBlurTransformNode.prototype.setLevel = function (level) {
        this._level = parseInt(level, 10);
        this.setDirty();
    };
    
    /**
     * Calculates the list of pixel index offsets to sum to obtain a blurred pixel data
     * @returns {Array} Collection of x;y offsets
     */
    SoftBlurTransformNode.prototype._calculatePixelBoxOffsets = function () {
        var x, y, offsets = [];
        
        for (x = -this._level; x <= this._level; x++) {
            for (y = -this._level; y <= this._level; y++) {
                offsets.push({ x: x, y: y });
            }
        }
        
        return offsets;
    };
    
    /**
     * Applies horizontal pixel grouping, and vertical grouped pixel grouping to calculate
     * pixel total value sum in sort-of linear time.
     * @param   {ImageData} sourceImageData Source image data to apply blur to
     * @returns {ImageData} Blurred image data
     */
    SoftBlurTransformNode.prototype._transform = function (sourceImageData) {
        var channelWorkspace = new Uint32Array(sourceImageData.data.length / 4),
            targetImageData = this._createImageData(sourceImageData),
            totalPixels = sourceImageData.data.length,
            height = sourceImageData.height,
            width = sourceImageData.width,
            channelOffset,
            x,
            y,
            i,
            leftToRightAccumulator = [],
            rightToLeftAccumulator = [],
            topBottomAccumulator = [],
            bottomTopAccumulator = [],
            blurriness = this._level + 1;
        
        // Apply blur to each channel
        for (channelOffset = 0; channelOffset < 4; channelOffset++) {
            
            // Copy channel data to workspace
            for (i = 0; i < totalPixels; i++) {
                channelWorkspace[i] = sourceImageData.data[i * 4 + channelOffset];
            }

            // Horizontal grouping for each row
            for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                    var cx = width - x - 1;
                    
                    leftToRightAccumulator[x] = channelWorkspace[y * width + x] / blurriness;
                    rightToLeftAccumulator[cx] = channelWorkspace[y * width + cx] / blurriness;

                    if (x > 0) {
                        leftToRightAccumulator[x] += leftToRightAccumulator[x - 1] * (blurriness - 1) / blurriness;
                        rightToLeftAccumulator[cx] += rightToLeftAccumulator[cx + 1] * (blurriness - 1) / blurriness;
                    } else {
                        leftToRightAccumulator[x] *= blurriness;
                        rightToLeftAccumulator[cx] *= blurriness;
                    }
                }
                
                for (x = 0; x < width; x++) {
                    channelWorkspace[y * width + x] = Math.round((leftToRightAccumulator[x] + rightToLeftAccumulator[x]) / 2);
                }
            }

            // Vertical grouping for each grouped column
            for (x = 0; x < width; x++) {
                for (y = 0; y < height; y++) {
                    var cy = height - y - 1;
                    
                    topBottomAccumulator[y] = channelWorkspace[y * width + x] / blurriness;
                    bottomTopAccumulator[cy] = channelWorkspace[cy * width + x] / blurriness;

                    if (y > 0) {
                        topBottomAccumulator[y] += topBottomAccumulator[y - 1] * (blurriness - 1) / blurriness;
                        bottomTopAccumulator[cy] += bottomTopAccumulator[cy + 1] * (blurriness - 1) / blurriness;
                    } else {
                        topBottomAccumulator[y] *= blurriness;
                        bottomTopAccumulator[cy] *= blurriness;
                    }
                }
                
                for (y = 0; y < height; y++) {
                    channelWorkspace[y * width + x] = Math.round((topBottomAccumulator[y] + bottomTopAccumulator[y]) / 2);
                }
            }
            
            // Copy workspace data to channel
            for (i = 0; i < totalPixels; i++) {
                targetImageData.data[i * 4 + channelOffset] = channelWorkspace[i];
            }
        }
        
        return targetImageData;
    };
    
    // Export class
    Envy.Nodes.SoftBlurTransformNode = SoftBlurTransformNode;
}(Envy, this));