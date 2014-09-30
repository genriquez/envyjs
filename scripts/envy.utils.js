(function (context) {
  "use strict";

  Object.prototype.extend = function (extensionObject, targetPropertyPrefix) {
    targetPropertyPrefix = targetPropertyPrefix || "";

    for (var property in extensionObject) {
      if (extensionObject.hasOwnProperty(property)) {
        this[targetPropertyPrefix + property] = extensionObject[property];
      }
    }

    return this;
  };

}(this));