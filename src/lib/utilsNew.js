class UtilsNew {
    static isUndefined(obj) {
        return typeof obj === 'undefined';
    }

    static isNotUndefined(obj) {
        return typeof obj !== 'undefined';
    }

    static isNull(obj) {
        return obj === null;
    }

    static isNotNull(obj) {
        return obj !== null;
    }

    static isUndefinedOrNull(obj) {
        return typeof obj === 'undefined' || obj === null;
    }

    static isNotUndefinedOrNull(obj) {
        return typeof obj !== 'undefined' && obj !== null;
    }

    static isEmpty(str) {
        return typeof str === 'undefined' || str === null || str === '';
    }

    static isNotEmpty(str) {
        return typeof str !== 'undefined' && str !== null && str !== '';
    }

    static isEmptyArray(arr) {
        return typeof arr !== 'undefined' && arr !== null && arr.length === 0;
    }

    static isNotEmptyArray(arr) {
        return typeof arr !== 'undefined' && arr !== null && arr.length > 0;
    }

    static containsArray(arr, item) {
        if (UtilsNew.isNotEmptyArray(arr) && UtilsNew.isNotUndefinedOrNull(item)) {
            return arr.indexOf(item) > -1;
        }

        return false;
    }
}