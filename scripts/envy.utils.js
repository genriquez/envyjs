(function (context) {
    "use strict";

    /**
     * Copies all the properties of an object onto the current object
     * @param   {Object} extensionObject      Object to copy the property from
     * @param   {String} targetPropertyPrefix Property name prefix to apply to all copied properties
     * @returns {Object} The current object
     */
    Object.prototype.extend = function (extensionObject, targetPropertyPrefix) {
        var objectProperty;
        
        targetPropertyPrefix = targetPropertyPrefix || "";

        for (objectProperty in extensionObject) {
            if (extensionObject.hasOwnProperty(objectProperty)) {
                this[targetPropertyPrefix + objectProperty] = extensionObject[objectProperty];
            }
        }

        return this;
    };
}(this));