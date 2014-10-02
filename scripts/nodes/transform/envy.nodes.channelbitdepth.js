(function (Envy, context) {
  "use strict";

  var ChannelBitDepthTransformNode = function () {
    this.init();
  };

  // Base node inheritance
  ChannelBitDepthTransformNode.prototype = new Envy.Nodes.ImageNode();

  ChannelBitDepthTransformNode.prototype._source = null;

  /// <summary>Threhold level to evaluate the input image with</summary>
  ChannelBitDepthTransformNode.prototype._bitDepth = 6;

  ChannelBitDepthTransformNode.prototype.setSource = function (node) {
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

  ChannelBitDepthTransformNode.prototype.render = function () {
    var sourceImageData = this._source.render();
    var targetImageData = Envy.Providers.ImageDataFactory.createImageData(sourceImageData.width, sourceImageData.height);

    var currentBitDepthMaxValue = 255;
    var targetBitDepthMaxValue = Math.pow(2, this._bitDepth) - 1;

    for (var i = 0; i < sourceImageData.data.length; i++) {
      var sourceValue = sourceImageData.data[i];
      sourceValue = Math.round(sourceValue * targetBitDepthMaxValue / currentBitDepthMaxValue) * currentBitDepthMaxValue / targetBitDepthMaxValue;

      targetImageData.data[i] = sourceValue;
    }

    return targetImageData;
  };

  // Export class
  Envy.Nodes.ChannelBitDepthTransformNode = ChannelBitDepthTransformNode;
}(Envy, this));
