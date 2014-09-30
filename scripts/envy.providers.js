(function (context) {
  "use strict";

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var ImageDataFactory = {
    createImageData: function (width, height) {
      /// <summary>Creates an image data object with the given dimensions</summary>
      /// <param name="width" type="Integer">Width of the image data to create</param>
      /// <param name="height" type="Integer">Height of the image data to create</param>

      return ctx.createImageData(width, height);
    }
  };

  // Export Object
  context.Envy = context.Envy || {};
  context.Envy.Providers = context.Envy.Providers || {};
  context.Envy.Providers.ImageDataFactory = ImageDataFactory;
}(this));