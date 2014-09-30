(function (Envy, context) {
  "use strict";

  var ThresholdTransformNode = function () {
    this.init();
  };

  // Base node inheritance
  ThresholdTransformNode.prototype = new Envy.Nodes.ImageNode();

  ThresholdTransformNode.prototype._source = null;

  /// <summary>Threhold level to evaluate the input image with</summary>
  ThresholdTransformNode.prototype._level = 128;

  ThresholdTransformNode.prototype.setSource = function (node) {
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

  ThresholdTransformNode.prototype.render = function () {
    var sourceImageData = this._source.render();
    var targetImageData = Envy.Providers.ImageDataFactory.createImageData(sourceImageData.width, sourceImageData.height);

    for (var i = 0; i < sourceImageData.data.length; i++) {
      targetImageData.data[i] = sourceImageData.data[i] > this._level ? 255 : 0;
    }

    return targetImageData;
  };

  // Export class
  Envy.Nodes.ThresholdTransformNode = ThresholdTransformNode;
}(Envy, this));
