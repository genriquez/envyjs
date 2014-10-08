/*global Envy: false, Uint32Array: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    /*
    
        BOX BLUR BY HORIZONTAL AND VERTICAL GROUPING
        
        Given a matrix of pixels of 5x5, let A B C D E be different color pixels, selecting the middle C pixel to calculate 
        its box-blurred value with a given blur level value of 1:
        
            1:      A  B  C  D  E
            2:      A  B  C  D  E
            3:      A  B [C] D  E
            4:      A  B  C  D  E
            5:      A  B  C  D  E
            
        The box-blurred value of that given pixel would be the average value of all pixels in relative positions:
            1 <= x <= -1 and
            1 <= y <= -1 (being 1 and -1 the positive and negative values of the blur level)
            
        A total of 9 pixeles are selected, effectively selecting a box with a border 1 pixel thick surrounding the original middle C pixel.

            1:      A  B  C  D  E
            2:      A [B][C][D] E
            3:      A [B][C][D] E
            4:      A [B][C][D] E
            5:      A  B  C  D  E

        The box-blurred value would be the sum of all values: 3 * (B + C + D), divided by the total number of pixels: (B + C + D) / 3
        
        
        SORT OF LINEAR BOX BLUR ALGORITHM
        
        Step 1: Apply horizontal grouping, by using a sliding window (wth a size of 1 + 2 * level) on the selected pixels and an accumulator adding and substracting the pixels that enter the window:
        
            For pixel B:   [A][B][C] D  E     Current accumulator = ABC; Output =  XAB [ABC] ???  ???  ???
             
            Move horizontally 1 pixel       Accumulator = Accumulator - A + D 
            
            For pixel C:    A [B][C][D] E     Current accumulator = BCD; Output =  XAB  ABC [BCD] ???  ???
        
        Step 2: Apply vertical grouping on the horizontally grouped matrix, using the same sliding window size

            For pixel C3:   BCD [BCD][BCD][BCD] BCD     Output = 3*BCD
            
        Step 3: Divide the resuling accumulated pixel value by the total number of pixels accumulated (1 + 2 * length) ^ 2
        
            C3 = (3*BCD)/(1 + 2 * 1)^2 = (3*BCD)/9 = (BCD)/3
    */
    
    
    
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
        this._level = parseInt(level, 10);
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
    
    /**
     * Applies horizontal pixel grouping, and vertical grouped pixel grouping to calculate
     * pixel total value sum in sort-of linear time.
     * @param   {ImageData} sourceImageData Source image data to apply blur to
     * @returns {ImageData} Blurred image data
     */
    BoxBlurTransformNode.prototype._transform = function (sourceImageData) {
        var channelWorkspace = new Uint32Array(sourceImageData.data.length),
            targetImageData = this._createImageData(sourceImageData),
            totalPixels = sourceImageData.data.length,
            height = sourceImageData.height,
            width = sourceImageData.width,
            channelOffset,
            pixelWindow,
            pixelSum,
            value,
            x,
            y,
            i;

        // Apply blur to each channel
        for (channelOffset = 0; channelOffset < 4; channelOffset++) {
            // Copy channel data to workspace
            for (i = 0; i < totalPixels; i++) {
                channelWorkspace[i] = sourceImageData.data[i * 4 + channelOffset];
            }

            // Horizontal grouping for each row
            for (y = 0; y < height; y++) {
                pixelWindow = [];
                pixelSum = 0;

                // Initialize pixel window and current sum
                for (i = -this._level; i <= this._level; i++) {
                    value = channelWorkspace[y * width + Math.max(i, 0)];
                    pixelWindow.push(value);
                    pixelSum += value;
                }

                // Horizontal grouping of pixels
                for (x = 0; x < width; x++) {
                    channelWorkspace[y * width + x] = pixelSum;
                    pixelSum -= pixelWindow.shift();

                    value = channelWorkspace[y * width + Math.min(x + this._level + 1, width - 1)];
                    pixelWindow.push(value);
                    pixelSum += value;
                }
            }

            // Vertical grouping for each grouped column
            for (x = 0; x < width; x++) {
                pixelWindow = [];
                pixelSum = 0;

                // Initialize pixel window and current sum
                for (i = -this._level; i <= this._level; i++) {
                    value = channelWorkspace[Math.max(i, 0) * width + x];
                    pixelWindow.push(value);
                    pixelSum += value;
                }

                // Vertical grouping of pixels
                for (y = 0; y < height; y++) {
                    channelWorkspace[y * width + x] = pixelSum;
                    pixelSum -= pixelWindow.shift();

                    value = channelWorkspace[Math.min(y + this._level + 1, height - 1) * width + x];
                    pixelWindow.push(value);
                    pixelSum += value;
                }
            }

            // Copy workspace data to channel
            for (i = 0; i < totalPixels; i++) {
                targetImageData.data[i * 4 + channelOffset] = Math.round(channelWorkspace[i] / Math.pow(1 + 2 * this._level, 2));
            }
        }
        
        return targetImageData;
    };
    
    // Export class
    Envy.Nodes.BoxBlurTransformNode = BoxBlurTransformNode;
}(Envy, this));