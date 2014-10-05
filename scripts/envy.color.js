/*jslint nomen: true, vars: true*/

(function (context) {
    "use strict";

    var Color = function (r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    };

    Color.prototype.getSquareDistance = function (color) {
        /// <summary>Calculates the square of the scalar distance between two colors in a RGB 3D space</summary>
        /// <returns type="Integer" />

        return Math.pow(this._r - color._r, 2) + Math.pow(this._g - color._g, 2) + Math.pow(this._b - color._b, 2);
    };

    // Export class
    context.Envy = context.Envy || {};
    context.Envy.Color = Color;
}(this));
