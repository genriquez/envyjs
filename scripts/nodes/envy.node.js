/*jslint nomen: true, plusplus: true */

(function (context) {
    "use strict";

    var Node = function () { };

    /**
     * Collection of nodes dependent from the current node
     */
    Node.prototype._forwardLinks = null;

    /**
     * Collection of nodes the current node depends on
     */
    Node.prototype._backwardLinks = null;

    /**
     * Flag to indicate if the node requires to be re-redered
     */
    Node.prototype._dirty = false;

    /**
     * Initializes inner collections of the node instance
     */
    Node.prototype.init = function () {
        this._forwardLinks = [];
        this._backwardLinks = [];
    };

    /**
     * Marks the current node, and all dependant nodes as dirty
     */
    Node.prototype.setDirty = function () {
        this._dirty = true;
        this._forwardLinks.forEach(function (node) {
            node.setDirty();
        });

        // Fire event
        this._onSetDirty();
    };

    /**
     * Event fired after the current and all dependent nodes are set as dirty
     */
    Node.prototype._onSetDirty = function () { };

    /**
     * Returns if the current node is dirty
     * @returns {Boolean}
     */
    Node.prototype.isDirty = function () {
        return this._dirty;
    };

    /**
     * Adds a backwards link to a node as a dependency of the current node
     * @param {Envy.Node} source New dependency node
     */
    Node.prototype.addDependency = function (source) {
        this._backwardLinks.push(source);
        source._addReverseDependency(this);
    };

    /**
     * Removes a backward link to a node as a removed dependency
     * @param {Envy.Node} source Removed dependency node
     */
    Node.prototype.removeDependency = function (source) {
        var index = this._backwardLinks.indexOf(source);
        this._backwardLinks.splice(index, 1);
        
        source._removeReverseDependency(this);
    };

    /**
     * Adds a forward link to a node dependent of this one
     * @param {Envy.Node} target New dependent node
     */
    Node.prototype._addReverseDependency = function (target) {
        this._forwardLinks.push(target);
    };

    /**
     * Removes a forward link to a node no longer dependent of this one
     * @param {Envy.Node} target Removed dependent node
     */
    Node.prototype._removeReverseDependency = function (target) {
        var index = this._forwardLinks.indexOf(target);
        this._forwardLinks.splice(index, 1);
    };

    // Export class
    context.Envy = context.Envy || {};
    context.Envy.Nodes = context.Envy.Nodes || {};
    context.Envy.Nodes.Node = Node;
}(this));
