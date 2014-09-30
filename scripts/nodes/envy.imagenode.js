(function (Envy, context) {
  "use strict";

  var ImageNode = function () { };

  // Node base class inheritance
  ImageNode.prototype = new Envy.Nodes.Node();

  // Export
  Envy.Nodes.ImageNode = ImageNode;
}(Envy, this));