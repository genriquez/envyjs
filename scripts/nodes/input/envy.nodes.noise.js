/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Input node to export random RGB colors image data
     * @param {Object} configuration Configuration set for the node
     */
    var NoiseInputNode = function (configuration) {
        this.extend(configuration, "_");
        this.init();
    };

    NoiseInputNode.prototype = new Envy.Nodes.Node();

    /**
     * Seed for random data generation
     */
    NoiseInputNode.prototype._seed = 0;

    /**
     * Width of the image to generate
     */
    NoiseInputNode.prototype._width = 100;

    /**
     * Height of the image to generate
     */
    NoiseInputNode.prototype._height = 100;

    /**
     * Exports an image data object with random RGB vales
     * @returns {ImageData} Random RGB image data
     */
    NoiseInputNode.prototype.render = function () {
        var imageData = Envy.Providers.ImageDataFactory.createImageData(this._width, this._height),
            random = new Envy.Random(this._seed),
            i = 0;

        for (i = 0; i < imageData.data.length; i++) {
            imageData.data[i] = (i + 1) % 4 ? random.nextInteger(256) : 255;
        }

        return imageData;
    };

    // Export class
    Envy.Nodes.NoiseInputNode = NoiseInputNode;
}(Envy, this));
