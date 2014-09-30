(function (context) {
  "use strict";

  /**
   * Seeded random number generator. Basic fast implementation
   * based on StackOverlfow answer yb Antti Sykari:
   *    http://stackoverflow.com/questions/521295/javascript-random-seeds
   **/

  var Random = function (seed) {
    this._seed = seed || this._seed;
  };

  /// <summary>Seed to be used by the random number generator</smmary>
  Random.prototype._seed = 17;

  /// <summary>Current cursor of generated values</summary>
  Random.prototype._cursor = 0;

  Random.prototype.next = function () {
    /// <summary>Generates a new random value</summary>
    /// <returns type="Float" />

    // Multiply output by seed to prevent lower seeds from generating
    // the same pattern as the current after "delta seed" iterations.
    var val = Math.sin(this._seed + this._cursor++) * 10000 * this._seed;
    return val - Math.floor(val);
  };

  Random.prototype.nextInteger = function (base) {
    /// <summary>Generates a new random integer for the given abse</summary>
    /// <returns type="Integer" />

    var val = this.next();
    return Math.floor(val * base);
  };

  // Export class
  context.Envy = context.Envy || {};
  context.Envy.Random = Random;
}(this));

