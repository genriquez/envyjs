(function (context) {
  "use strict";

  var EditorFlow = function () { };

  /// <summary>Last added node to the current flow</summary>
  EditorFlow.prototype._currentNode = null;

  EditorFlow.prototype.addNode = function (node) {
    this._currentNode && node.setSource(this._currentNode);
    this._currentNode = node;
    return node;
  };

  // Export class
  context.Envy = context.Envy || {};
  context.Envy.EditorFlow = EditorFlow;
}(this));