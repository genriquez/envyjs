(function (context) {
  "use strict";

  var Node = function () { };

  /// <summary>Collection of nodes dependent from the current node</summary>
  Node.prototype._forwardLinks = null;

  /// <summary>Collection of nodes the current node depends on</summary>
  Node.prototype._backwardLinks = null;

  /// <summary>Flag to indicate if the node requires to be re-redered</summary>
  Node.prototype._dirty = false;

  Node.prototype.init = function () {
    /// <summary>Initializes inner collections of the node instance</summary>

    this._forwardLinks = [];
    this._backwardLinks = [];
  };

  Node.prototype.setDirty = function () {
    /// <summary>Marks the current node, and all dependant nodes as dirty</summary>

    this._dirty = true;
    this._forwardLinks.forEach(function (i, node) {
      node.setDirty();
    });

    // Fire event
    this._onSetDirty();
  };

  Node.prototype._onSetDirty = function () {
    /// <summary>Event fired after the current and all dependent nodes are set as dirty</summary>

  };

  Node.prototype.isDirty = function () {
    /// <summary>Returns if the current node is dirty</summary>
    /// <returns type="Boolean" />

    return this._dirty;
  };

  Node.prototype.addDependency = function (source) {
    /// <summary>Adds a backwards link to a node as a dependency of the current node</summary>
    /// <param name="source" type="Node">New dependency node</param>

    this._backwardLinks.push(source);
    source._addReverseDependency(this);
  };

  Node.prototype.removeDependency = function (source) {
    /// <summary>Removes a backward link to a node as a removed dependency</summary>
    /// <param name="source" type="Node">Removed dependency node</param>

    var index = this._backwardLinks.indexOf(source);
    this._backwardLinks.splice(index, 1);
    source._removeReverseDependency(this);
  };

  Node.prototype._addReverseDependency = function (target) {
    /// <summary>Adds a forward link to a node dependent of this one</summary>
    /// <param name="target" type="Node">New dependent node</param>

    this._forwardLinks.push(target);
  };

  Node.prototype._removeReverseDependency = function (target) {
    /// <summary>Removes a forward link to a node no longer dependent of this one</summary>
    /// <param name="target" type="Node">Removed dependent node</param>

    var index = this._forwardLinks.indexOf(target);
    this._forwardLinks.splice(index, 1);
  };

  // Export class
  context.Envy = context.Envy || {};
  context.Envy.Nodes = context.Envy.Nodes || {};
  context.Envy.Nodes.Node = Node;
}(this));
