/*global Envy: false */
/*jslint nomen: true, plusplus: true, vars: true */

(function (Envy, context) {
    "use strict";

    /**
     * Input node to export image data from a picked image file
     * @param {HTMLInput} file File input element
     */
    var FileInputNode = function (file) {
        var self = this;
        
        this.init();

        this._file = file;
        file.addEventListener("change", function() { self._readImage(); }, false);
    };

    FileInputNode.prototype = new Envy.Nodes.ImageInputNode();

    /**
     * File input element used to pick the image
     */
    FileInputNode.prototype._file = null;
    
    FileInputNode.prototype._readImage = function () {
        var files = this._file.files;
        
        if (files.length) {
            var self = this;
            var file = files[0];
            
            var reader = new FileReader();
            reader.onload = function(e) {
                self._image = new Image();
                self._image.src = e.target.result; 
                self.setDirty(); 
            };
            
            reader.readAsDataURL(file);
        }
    };

    // Export class
    Envy.Nodes.FileInputNode = FileInputNode;
}(Envy, this));
