/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Output node to render image data into a canvas element
     * @param {HTMLCanvas} canvasElement HTML Canvas element to render the output to
     */
    var CanvasOutputNode = function (canvasElement) {
        this._canvas = canvasElement;
        this.init();
    };

    CanvasOutputNode.prototype = new Envy.Nodes.Node();

    /**
     * Canvas element to otput content to
     */
    CanvasOutputNode.prototype._canvas = null;

    /**
     * Input node to display the image from
     */
    CanvasOutputNode.prototype._source = null;

    /**
     * Sets the source node to display in the linked canvas element
     * @param {Envy.ImageNode} node New source node to display
     */
    CanvasOutputNode.prototype.setSource = function (node) {
        if (this._source) {
            // Remove old source dependency
            this.removeDependency(this._source);
        }

        this.addDependency(node);
        this._source = node;
        this.setDirty();
    };

    /**
     * Outputs the source node image into the canvas
     */
    CanvasOutputNode.prototype.render = function () {
        var imageData = this._source.render();
        this._canvas.width = imageData.width;
        this._canvas.height = imageData.height;

        var ctx = this._canvas.getContext("2d");
        ctx.putImageData(imageData, 0, 0);
    };

    /**
     * On set dirty, the node is automatically re-rendered after the current context execution ends
     */
    CanvasOutputNode.prototype._onSetDirty = function () {
        var self = this;

        setTimeout(function () {
            self.render();
        }, 0);
    };

    // Export class
    Envy.Nodes.CanvasOutputNode = CanvasOutputNode;
}(Envy, this));