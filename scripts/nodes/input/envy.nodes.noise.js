(function (Envy, context) {
  "use strict";

  var NoiseInputNode = function (configuration) {
    this.extend(configuration, "_");
    this.init();
  };

  // Node base class inheritance
  NoiseInputNode.prototype = new Envy.Nodes.Node();

  /// <summary>Seed for random data generation</summary>
  NoiseInputNode.prototype._seed = 0;

  /// <summary>Width of the image to generate</summary>
  NoiseInputNode.prototype._width = 100;

  /// <summary>Height of the image to generate</summary>
  NoiseInputNode.prototype._height = 100;

  NoiseInputNode.prototype.render = function() {
    var imageData = Envy.Providers.ImageDataFactory.createImageData(this._width, this._height);
    var random = new Envy.Random(this._seed);

    for (var i = 0; i < imageData.data.length; i++) {
      imageData.data[i] = (i+1) % 4 ? random.nextInteger(256) : 255;
    }

    return imageData;
  };

  // Export class
  Envy.Nodes.NoiseInputNode = NoiseInputNode;
}(Envy, this));
