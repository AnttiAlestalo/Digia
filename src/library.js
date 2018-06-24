export function jsAddToArray(aArray, str) {
    let aNewArry = (Array.isArray(aArray) ? aArray : []);
    if (aNewArry.indexOf(str) < 0) {
            aNewArry.push(str)
    }
    return aNewArry;
}

export function jsRemoveFromArray(aArray, str) {
    let aNewArry = (Array.isArray(aArray) ? aArray : []);
    const i = aNewArry.indexOf(str);
    if (i >= 0) {
        aNewArry.splice(i, 1);
    }
    return aNewArry;
}

export function jsInArray(aArray, str) {
    let aNewArry = (Array.isArray(aArray) ? aArray : []);
    return (aNewArry.indexOf(str) >= 0)
}

export function jsTrim(str){
    return str.replace(/\s+/g,' ').trim();
}

export function jsIsInteger(strValue) {
    const RegEx = /^\d+$/;
    return String(strValue).search(RegEx) !== -1
}

export function jsIsEmail(strEmail){
    let ReqEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return ReqEx.test(strEmail)
}

export function jsLeft(str, n){
    if (str == undefined || n <= 0) {
        return "";
    } else if (n > str.length) {
        return str;
    } else {
        return str.substring(0, n);
    }
}

export function jsStrRight(str1, str2){
    if (str1 == undefined) return "";
    let i = str1.lastIndexOf(str2);
    let iLen = str2.length;
    if (i < 0 || (i+iLen) === str1.length) {
        return "";
    } else {
        return str1.substring(i + iLen, str1.length);
    }
}

export function jsSort(prop, bNum, bDescending){
    if (bNum) {
        if (bDescending) {
            return function(a, b){
                if (a[prop] < b[prop]){
                    return 1;
                } else if (a[prop] > b[prop]){
                    return -1;
                }
                return 0;
            }
        } else {
            return function(a, b){
                if (a[prop] > b[prop]){
                    return 1;
                } else if (a[prop] < b[prop]){
                    return -1;
                }
                return 0;
            }
        }
    } else {
        if (bDescending) {
            return function(a, b){
                if (a[prop].toLowerCase() < b[prop].toLowerCase()){
                    return 1;
                } else if (a[prop].toLowerCase() > b[prop].toLowerCase()){
                    return -1;
                }
                return 0;
            }
        } else {
            return function(a, b){
                if (a[prop].toLowerCase() > b[prop].toLowerCase()){
                    return 1;
                } else if (a[prop].toLowerCase() < b[prop].toLowerCase()){
                    return -1;
                }
                return 0;
            }
        }
    }
}