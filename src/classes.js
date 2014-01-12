(function(w) {

    /* Helpers */
    var extendObj    = w.classesHelpers.extendObj;
    var addAccessors = w.classesHelpers.addAccessors;
    var extendArray  = w.classesHelpers.extendArray;

    var Classes = window.Classes = { };

    Classes.create = function(options) {
        var clazz = { };

        clazz.create = function(properties) {
            var obj = { };
            var _props = extendObj({}, properties);
            obj._class = clazz;

            options.fields.forEach(function(name) {
                addAccessors(obj, _props, name);
            });

            if (options.methods) {
                Object.keys(options.methods).forEach(function(m) {
                    obj[m] = function() {
                        var args = Array.prototype.slice.call(arguments)
                        options.methods[m].apply(obj, args);
                    }
                });
            }

            return obj;
        };

        clazz.extend = function(extOptions) {
            var newOptions = { };
            newOptions.fields = extendArray(
                [(options.fields || []), (extOptions.fields || [])]
            );

            newOptions.methods = extendObj(
                (options.methods || {}), (extOptions.methods || {})
            );

            return Classes.create(newOptions);
        };

        return clazz;
    };

})(window);