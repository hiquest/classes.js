// Object.keys   IE9+
// [].forEach    IE9+

/*

var Vehicle = Classes.create({
    fields: ['kpd']
});

var

 */

(function() {

    // ------ Helper methods -------------
    function extendObj(obj, ext) {
        if (!ext) {
            return obj;
        }

        var out = { };

        Object.keys(obj).forEach(function(k) {
            out[k] = obj[k];
        });

        Object.keys(ext).forEach(function(k) {
            out[k] = ext[k];
        });

        return out;
    }

    function addAccessors(obj, _props, name) {
        obj[name] = function(value) {
            if (!value) {
                return _props[name];
            } else {
                _props[name] = value;
            }
        }
    }

    function extendArray(arrOfArrays) {
        var out = [];

        arrOfArrays.forEach(function(arr) {
            arr.forEach(function(el) {
                out.push(el);
            });
        });

        return out;
    }

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

})();