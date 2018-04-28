/*jslint nomen: true, vars: true*/

(function (context) {
    "use strict";

    var Color = function (r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this._a = a;
    };

    Color.prototype.getSquareDistance = function (color) {
        /// <summary>Calculates the square of the scalar distance between two colors in a RGB 3D space</summary>
        /// <returns type="Integer" />

        return Math.pow(this.r - color.r, 2) + Math.pow(this.g - color.g, 2) + Math.pow(this.b - color.b, 2);
    };

    // Export class
    context.Envy = context.Envy || {};
    context.Envy.Color = Color;
}(this));
