/*global Envy: false */
/*jslint nomen: true, vars: true */

document.addEventListener("DOMContentLoaded", function (event) {
    "use strict";
    
    var Demo = {
        configurations: document.getElementById("nodeConfigurations"),
        canvas: document.getElementById("canvas"),
        image: document.getElementById("image"),
        imagePicker: document.getElementById("imagePicker"),
        flow: new Envy.EditorFlow(),
        
        addNode: function (node, configureCallack) {
            node = this.flow.addNode(node);
            if (configureCallack) {
                configureCallack(node);
            }
        },
        
        createElement: function (type, options, changeEventListener) {
            var element = document.createElement(type);
            element.extend(options);
            element.addEventListener("change", changeEventListener);
            
            return element;
        }
    };
    
    Demo.addNode(new Envy.Nodes.FileInputNode(Demo.imagePicker));

    Demo.addNode(new Envy.Nodes.InvertColorTransformNode(), function (node) {
        var enabledEl = Demo.createElement("input", { type: "checkbox", checked: false }, function () {
            node.setPassThrough(!enabledEl.checked);
        });

        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<strong>Enable invert color: </strong>";
        listItemEl.appendChild(enabledEl);
        
        Demo.configurations.appendChild(listItemEl);
    });
    
    Demo.addNode(new Envy.Nodes.RGBToAlphaTransformNode(), function (node) {
        var enabledEl = Demo.createElement("input", { type: "checkbox", checked: false }, function () {
            node.setPassThrough(!enabledEl.checked);
        });

        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<strong>Enable RGB to Alpha: </strong>";
        listItemEl.appendChild(enabledEl);
        
        Demo.configurations.appendChild(listItemEl);
    });
    
    Demo.addNode(new Envy.Nodes.FillColorTransformNode(), function (node) {
        node.setColor(238, 89, 110);
        
        var enabledEl = Demo.createElement("input", { type: "checkbox", checked: true }, function () {
            node.setPassThrough(!enabledEl.checked);
        });
        
        var colorEl = Demo.createElement("input", { type: "text" }, function () {
            var result = /^\#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(colorEl.value);
            if (result) {
                var r = parseInt(result[1], 16);
                var g = parseInt(result[2], 16);
                var b = parseInt(result[3], 16);
                
                node.setColor(r,g,b);
            }
        });
        
        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<strong>Enable color fill: </strong>";
        listItemEl.appendChild(enabledEl);
        listItemEl.append("Color:");
        listItemEl.appendChild(colorEl);
        
        Demo.configurations.appendChild(listItemEl);
    });

    Demo.addNode(new Envy.Nodes.CanvasOutputNode(Demo.canvas));
});
