export function pluralise(number, titles) {  
    const cases = [2, 0, 1, 1, 1, 2];  
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];  
}

export function lkSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function lkGet(key, initial = '') {
    const value = JSON.parse(localStorage.getItem(key));
    return value !== null ? value : initial;
}

export function lkRemove(key) {
    localStorage.removeItem(key);
}