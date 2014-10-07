/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    /**
     * Base transform node
     */
    var TransformNode = function () { };
    
    TransformNode.prototype = new Envy.Nodes.ImageNode();
    
    /**
     *  Source node from which the base Image data to transform is taken from
     */
    TransformNode.prototype._source = null;
    
    /**
     * Cached Image Data output to prevent re-work on multiple render cals
     */
    TransformNode.prototype._cachedOutput = null;
    
    TransformNode.prototype._passThrough = false;
    
    /**
     * Sets if the node should apply the transform or just pass through the source image data
     * @param {Boolean} passThrough Pass through node transform
     */
    TransformNode.prototype.setPassThrough = function (passThrough) {
        this._passThrough = passThrough;
        this.setDirty();
    };
    
    /**
     * Sets the source node for the current transform node, and sets the current node as dirty
     * @param {Envy.ImageNode} node New source node
     */
    TransformNode.prototype.setSource = function (node) {
        // Remove old source dependency
        this.removeSource();

        this.addDependency(node);
        this._source = node;
        this.setDirty();
    };
    
    /**
     * Unregister the current source node
     */
    TransformNode.prototype.removeSource = function () {
        if (this._source) {
            this.removeDependency(this._source);
        }
    };

    /**
     * Creates a copy of the source image data and transforms it
     * @returns {ImageData} Transformed Image data
     */
    TransformNode.prototype.render = function () {
        this._dirty = false;
        
        if (this._passThrough) {
            return this._source.render();
        } else if (!this._cachedOutput) {
            var sourceImageData = this._source.render();
            this._cachedOutput = this._transform(sourceImageData);
        }
        
        return this._cachedOutput;
    };
    
    /**
     * Applies a transformation to the targetImageData, reading the sourceImageData
     * @param {ImageData} sourceImageData Source image data to create the transformed image data from
     * @returns {ImageData} Transformed Image data
     */
    TransformNode.prototype._transform = function (sourceImageData) {
        throw "All transform node subclasses must implement the '_transform' method";
    };
    
    /**
     * Creates a new Image data object copying the dimensions of the source image data
     * @param {ImageData} sourceImageData Image data object to copy the dimensions from
     */
    TransformNode.prototype._createImageData = function (sourceImageData) {
        return Envy.Providers.ImageDataFactory.createImageData(sourceImageData.width, sourceImageData.height);
    };
    
    /**
     * When set as dirty, invalidate the current output cache
     */
    TransformNode.prototype._onSetDirty = function () {
        this._cachedOutput = null;
    };
    
    // Export class
    Envy.Nodes.TransformNode = TransformNode;
}(Envy, this));