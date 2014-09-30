(function (Envy, context) {
  "use strict";

  var ImageInputNode = function (image) {
    this.init();

    this._image = image;
  };

  // Base class inheritance
  ImageInputNode.prototype = new Envy.Nodes.ImageNode();

  /// <summary>Imge object to export as image data</summary>
  ImageInputNode.prototype._image = null;

  ImageInputNode.prototype.render = function () {
    var canvas = document.createElement("canvas");
    canvas.height = this._image.height;
    canvas.width = this._image.width;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this._image, 0, 0);

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  // Export class
  Envy.Nodes.ImageInputNode = ImageInputNode;
}(Envy, this));
