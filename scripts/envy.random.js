/*jslint nomen: true, plusplus: true*/

(function (context) {
    "use strict";

    /**
     * Seeded random number generator. Basic fast implementation
     * based on StackOverlfow answer yb Antti Sykari: http://stackoverflow.com/questions/521295/javascript-random-seeds
     * @param {Number} seed Initial value of the 
     */
    var Random = function (seed) {
        this._seed = seed || this._seed;
    };

    /**
     * Seed to be used by the random number generator
     */
    Random.prototype._seed = 0;

    /**
     * Internal tracker of last generated random number
     */
    Random.prototype._cursor = 0;

    /**
     * Generates a new random value
     * @returns {Number} Random number between 0 and 1
     */
    Random.prototype.next = function () {
        // Multiply output by seed to prevent lower seeds from generating
        // the same pattern as the current after "delta seed" iterations.
        var val = Math.sin(this._seed + this._cursor++) * 10000 * this._seed;
        return val - Math.floor(val);
    };

    /**
     * Generates a new random integer for the given base
     * @param   {Number} base Max integer value to return
     * @returns {Number} Random number between 0 and base
     */
    Random.prototype.nextInteger = function (base) {
        var val = this.next();
        return Math.floor(val * base);
    };

    // Export class
    context.Envy = context.Envy || {};
    context.Envy.Random = Random;
}(this));

