(function (Envy, context) {
  "use strict";

  var CanvasOutputNode = function (canvasElement) {
    this._canvas = canvasElement;
    this.init();
  };

  // Node base class inheritance
  CanvasOutputNode.prototype = new Envy.Nodes.Node();

  /// <summary>Canvas element to otput content to</summary>
  CanvasOutputNode.prototype._canvas = null;

  /// <summary>Input node to display the image from</summary>
  CanvasOutputNode.prototype._source = null;

  CanvasOutputNode.prototype.setSource = function (node) {
    /// <summary>Sets the source node to display in the linked canvas element</summary>
    /// <param name="node" type="Node">New source node to display</param>

    if (this._source) {
      // Remove old source dependency
      this.removeDependency(this._source);
    }

    this.addDependency(node);
    this._source = node;
    this.setDirty();
  };

  CanvasOutputNode.prototype.render = function () {
    /// <summary>Outputs the source node image into the canvas</summary>

    var imageData = this._source.render();
    this._canvas.width = imageData.width;
    this._canvas.height = imageData.height;

    var ctx = this._canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);
  };

  CanvasOutputNode.prototype._onSetDirty = function () {
    /// <summary>On set dirty, the node is automatically re-rendered after the current context execution ends</summary>
    var self = this;

    setTimeout(function () {
      self.render();
    }, 0);
  };

  // Export class
  Envy.Nodes.CanvasOutputNode = CanvasOutputNode;
}(Envy, this));