/*jslint nomen: true, vars: true*/

(function (context) {
    "use strict";

    /**
     * Node flow builder
     */
    var EditorFlow = function () {
        this._branchRootStack = [];
    };

    /**
     * Last added node to the current flow
     */
    EditorFlow.prototype._currentNode = null;
    
    EditorFlow.prototype._branchRootStack = null;

    EditorFlow.prototype.branch = function () {
        this._branchRootStack.push(this._currentNode);
    };

    EditorFlow.prototype.endBranch = function () {
        var node = this._currentNode;
        this._currentNode = this._branchRootStack.pop();
        
        return node;
    };

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