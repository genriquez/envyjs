/*global Envy: false */
/*jslint nomen: true, vars: true */

document.addEventListener("DOMContentLoaded", function (event) {
    "use strict";
    
    var Demo = {
        configurations: document.getElementById("nodeConfigurations"),
        canvas: document.getElementById("canvas"),
        image: document.getElementById("image"),
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
    
    Demo.addNode(new Envy.Nodes.ImageInputNode(Demo.image));

    Demo.addNode(new Envy.Nodes.ChannelBitDepthTransformNode(), function (node) {
        node.setBitDepth(4);
        
        var enabledEl = Demo.createElement("input", { type: "checkbox", checked: true }, function () {
            node.setPassThrough(!enabledEl.checked);
        });

        var bitDepthEl = Demo.createElement("input", { type: "number", min: 1, max: 8, value: 4 }, function () {
            node.setBitDepth(bitDepthEl.value);
        });

        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<strong>Enable channel bit depth: </strong>";
        listItemEl.appendChild(enabledEl);
        listItemEl.appendChild(document.createTextNode("Bit depth: "));
        listItemEl.appendChild(bitDepthEl);
        
        Demo.configurations.appendChild(listItemEl);
    });

    var colorKey = Demo.addNode(new Envy.Nodes.ColorKeyTransformNode(), function (node) {
        node.setColorKey(132, 176, 214);
        node.setTolerance(50);
        
        var enabledEl = Demo.createElement("input", { type: "checkbox", checked: true }, function () {
            node.setPassThrough(!enabledEl.checked);
        });
        
        var toleranceEl = Demo.createElement("input", { type: "number", min: 1, max: 255, value: 50 }, function () {
            node.setTolerance(toleranceEl.value);
        });
         
        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<strong>Enable colorkey: </strong>";
        listItemEl.appendChild(enabledEl);
        listItemEl.appendChild(document.createTextNode("Tolerance: "));
        listItemEl.appendChild(toleranceEl);
        
        Demo.configurations.appendChild(listItemEl);
    });

    Demo.addNode(new Envy.Nodes.ThresholdTransformNode(), function (node) {
        node.setLevel(100);
        
        var enabledEl = Demo.createElement("input", { type: "checkbox", checked: true }, function () {
            node.setPassThrough(!enabledEl.checked);
        });

        var levelEl = Demo.createElement("input", { type: "number", min: 1, max: 255, value: 100 }, function () {
            node.setLevel(levelEl.value);
        });
        
        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<strong>Enable threshold: </strong>";
        listItemEl.appendChild(enabledEl);
        listItemEl.appendChild(document.createTextNode("Level: "));
        listItemEl.appendChild(levelEl);
        
        Demo.configurations.appendChild(listItemEl);
    });

    Demo.addNode(new Envy.Nodes.GrayscaleTransformNode(), function (node) {
        var enabledEl = Demo.createElement("input", { type: "checkbox", checked: true }, function () {
            node.setPassThrough(!enabledEl.checked);
        });

        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<strong>Enable grayscale: </strong>";
        listItemEl.appendChild(enabledEl);
        
        Demo.configurations.appendChild(listItemEl);
    });

    Demo.addNode(new Envy.Nodes.CanvasOutputNode(Demo.canvas));
});