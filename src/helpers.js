// Object.keys   IE9+
// [].forEach    IE9+

(function(w) {
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

    w.classesHelpers = {
        extendObj: extendObj,
        addAccessors: addAccessors,
        extendArray: extendArray
    };

})(window);