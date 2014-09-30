(function (Envy, context) {
  "use strict";

  var GrayscaleTransformNode = function () {
    this.init();
  };

  GrayscaleTransformNode.prototype = new Envy.Nodes.Node();

  GrayscaleTransformNode.prototype._source = null;

  GrayscaleTransformNode.prototype._cachedImageData = null;

  GrayscaleTransformNode.prototype.setSource = function (node) {
    /// <summary>Sets the source node to transform</summary>
    /// <param name="node" type="Node">New source node to transform</param>

    if (this._source) {
      // Remove old source dependency
      this.removeDependency(this._source);
    }

    this.addDependency(node);
    this._source = node;
    this.setDirty();
  };

  GrayscaleTransformNode.prototype.render = function () {
    this._cachedImageData = this._cachedImageData || this._transform();
    return this._cachedImageData;
  };

  GrayscaleTransformNode.prototype._transform = function () {
    /// <summary>Applies grayscale filter to source Image Data</summary>
    /// <returns type="ImageData" />

    var sourceImageData = this._source.render();
    var filteredImageData = Envy.Providers.ImageDataFactory.createImageData(sourceImageData.width, sourceImageData.height);

    for (var i = 0; i < sourceImageData.data.length; i += 4) {
      var grayLevel = (sourceImageData.data[i] + sourceImageData.data[i + 1] + sourceImageData.data[i + 2]) / 3;
      filteredImageData.data[i] = filteredImageData.data[i + 1] = filteredImageData.data[i + 2] = Math.floor(grayLevel);
      filteredImageData.data[i+3] = 255;
    }

    return filteredImageData;
  };


  GrayscaleTransformNode.prototype._onSetDirty = function () {
    /// <summary>On set dirty, the cached Image Data is invalidated</summary>

    this._cachedImageData = null;
  };

  // Export class
  Envy.Nodes.GrayscaleTransformNode = GrayscaleTransformNode;
}(Envy, this));
