(function (context) {
    "use strict";

    /**
     * ENVY catalog file defines all application dependencies in order.
     * In the future, this file will be used to compile a single JS file
     * with the whole application code.
     **/

    var scriptLoader = context.scriptLoader || function (script) {
        document.write("<script src=\"" + script + "\"></script>");
    };

    scriptLoader("scripts/envy.utils.js");
    scriptLoader("scripts/envy.providers.js");
    scriptLoader("scripts/envy.random.js");
    scriptLoader("scripts/envy.color.js");

    scriptLoader("scripts/nodes/envy.node.js");
    scriptLoader("scripts/nodes/envy.imagenode.js");
    scriptLoader("scripts/nodes/input/envy.nodes.noise.js");
    scriptLoader("scripts/nodes/input/envy.nodes.image.js");
    scriptLoader("scripts/nodes/input/envy.nodes.file.js");
    scriptLoader("scripts/nodes/transform/envy.transformnode.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.grayscale.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.threshold.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.colorkey.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.channelbitdepth.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.alphatorgb.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.rgbtoalpha.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.boxblur.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.softblur.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.copychannel.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.invertcolor.js");
    scriptLoader("scripts/nodes/transform/envy.nodes.fillcolor.js");
    scriptLoader("scripts/nodes/output/envy.nodes.canvas.js");

    scriptLoader("scripts/envy.editorflow.js");
}(this));
