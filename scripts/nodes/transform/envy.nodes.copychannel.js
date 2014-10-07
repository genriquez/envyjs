/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";
    
    var channelMapping = { "r": 0, "g": 1, "b": 2, "a": 3 };
    
    var CopyChannelTransformNode = function () {
        this.init();
    };
    
    CopyChannelTransformNode.prototype = new Envy.Nodes.TransformNode();
    
    CopyChannelTransformNode.prototype._fromChannel = null;

    CopyChannelTransformNode.prototype._toChannel = null;
    
    CopyChannelTransformNode.prototype._channelOriginNode = null;

    CopyChannelTransformNode.prototype.setChannels = function (source, target) {
        this._fromChannel = channelMapping[source.toLowerCase()];
        this._toChannel = channelMapping[(target || source).toLowerCase()];
        
        this.setDirty();
    };
    
    CopyChannelTransformNode.prototype.setChannelOriginNode = function (node) {
        if (this._channelOriginNode) {
            this.removeDependency(this._channelOriginNode);
        }
        
        this._channelOriginNode = node;
        this.addDependency(node);
        
        this.setDirty();
    };
    
    CopyChannelTransformNode.prototype._transform = function (sourceImageData) {
        var originImageData = this._channelOriginNode ? this._channelOriginNode.render() : sourceImageData,
            targetImageData = this._createImageData(sourceImageData),
            i;
        
        for (i = 0; i < sourceImageData.data.length; i++) {
            var channel = i % 4;
            targetImageData.data[i] = (channel === this._toChannel ? originImageData.data[i - channel + this._toChannel] : sourceImageData.data[i]);
        }
        
        return targetImageData;
    };
    
    // Export class
    Envy.Nodes.CopyChannelTransformNode = CopyChannelTransformNode;
}(Envy, this));