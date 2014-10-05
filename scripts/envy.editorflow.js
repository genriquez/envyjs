/*jslint nomen: true, vars: true*/

(function (context) {
    "use strict";

    /**
     * Node flow builder
     */
    var EditorFlow = function () { };

    /**
     * Last added node to the current flow
     */
    EditorFlow.prototype._currentNode = null;

    EditorFlow.prototype.addNode = function (node) {
        if (this._currentNode) {
            node.setSource(this._currentNode);
        }
        
        this._currentNode = node;
        return node;
    };

    // Export class
    context.Envy = context.Envy || {};
    context.Envy.EditorFlow = EditorFlow;
}(this));