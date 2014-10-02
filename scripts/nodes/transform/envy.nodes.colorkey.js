(function (Envy, context) {
  "use script";

  var ColorKeyTransformNode = function () {
    this.init();
  };

  // Base node prototype inheritance
  ColorKeyTransformNode.prototype = new Envy.Nodes.ImageNode();

  ColorKeyTransformNode.prototype._source = null;

  // Maximum color distance to consider as part of the base color to compare
  ColorKeyTransformNode.prototype._tolerance = 3;

  // Base color to use for new alpha mask
  ColorKeyTransformNode.prototype._colorKey = null

  ColorKeyTransformNode.prototype.setSource = function (node) {
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

  ColorKeyTransformNode.prototype.render = function () {
    var sourceImageData = this._source.render();
    var targetImageData = Envy.Providers.ImageDataFactory.createImageData(sourceImageData.width, sourceImageData.height);

    var squareTolerance = Math.pow(this._tolerance, 2);

    var data = sourceImageData.data;
    for(var i = 0; i < data.length; i += 4) {
      var sourceColor = new Envy.Color(data[i], data[i+1], data[i+2]);
      var squareColorDistance = this._colorKey.getSquareDistance(sourceColor);

      targetImageData.data[i] = data[i];
      targetImageData.data[i+1] = data[i+1];
      targetImageData.data[i+2] = data[i+2];
      targetImageData.data[i+3] = squareColorDistance > squareTolerance ? data[i+3] : 0;
    }

    return targetImageData;
  };

  // Export class
  Envy.Nodes.ColorKeyTransformNode = ColorKeyTransformNode;
}(Envy, this));
