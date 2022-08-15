
function _id(id, ancestor = document) {
    return ancestor.getElementById(id);
}
function _class(id, ancestor = document) {
    return ancestor.getElementsByClassName(id);
}
function _tag(tag, ancestor = document) {
    return ancestor.getElementsByTagName(tag);
}
function _qs(selector, ancestor = document) {
    return ancestor.querySelector(selector);
}
function _qsa(selector, ancestor = document) {
    return ancestor.querySelectorAll(selector);
}

function randomHex(length = 8) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let str = '';
    for (i = 0; i < length; i++) {
        str += chars[Math.round(Math.random()*15)];
    }
    return str;
}

function clamp(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
}

function randomInt(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
}

function roundSmart(number, decimalPlaces = 0) {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen;
}

function getWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi, '');
    s = s.replace(/[ ]{2,}/gi, ' ');
    s = s.replace(/\n/g, ' ');
    return s.split(' ').filter(String);
}
function countWords(s){
    return getWords(s).length;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function localStorageObjSet(name, obj) {
    window.localStorage.setItem(name, JSON.stringify(obj));
    console.log(`Saved localStorage object '${name}':`, obj);
}
function localStorageObjGet(name) {
    const data = window.localStorage.getItem(name);
    if (data) return JSON.parse(data);
    return {};
}
function localStorageWipe() {
    window.localStorage.clear();
}

function isValidUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (error) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function isValidHostname(string) {
    return string.match(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/) && !string.match(/^localhost$/);
}

function isValidIp(string) {
    return string.match(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/) && !string.match(/(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/) && !string.match(/^::1$/);
}

const updateEls = () => {
    [..._qsa('textarea')].forEach((el) => {
        if (el.dataset.mod) return;
        el.dataset.mod = true;
        el.addEventListener('resize', () => {
            el.style.height = ``;
            el.style.height = `${el.scrollHeight-32}px`;
        });
        el.addEventListener('input', () => {
            el.dispatchEvent(new Event('resize'));
        });
        setTimeout(() => {
            if (el.value)
                el.dispatchEvent(new Event('input'));
        }, 500);
    });
    [..._qsa('.slider:not(.custom)')].forEach((el) => {
        if (el.dataset.mod) return;
        el.dataset.mod = true;
        const range = _qs('input[type="range"]', el);
        const progress = _qs('progress', el);
        progress.min = range.min;
        progress.max = range.max;
        const valueInto = _id(el.dataset.valueInto);
        if (valueInto) valueInto.addEventListener('input', () => {
            range.value = valueInto.value;
            progress.value = valueInto.value;
        });
        range.addEventListener('input', () => {
            progress.value = range.value;
            if (valueInto) valueInto.value = range.value;
        });
        range.dispatchEvent(new Event('input'));
    });
    [..._qsa('[data-copy-el]')].forEach((el) => {
        if (el.dataset.mod) return;
        el.dataset.mod = true;
        el.addEventListener('click', () => {
            let text = _id(el.dataset.copyEl).innerText;
            if (!text) text = _id(el.dataset.copyEl).value;
            navigator.clipboard.writeText(text);
        });
    });
    [..._class('copyable')].forEach((el) => {
        if (el.dataset.mod) return;
        el.dataset.mod = true;
        el.addEventListener('click', () => {
            let text = el.innerText;
            navigator.clipboard.writeText(text);
        });
    });
}

document.addEventListener('domChange', () => {
    updateEls();
});
window.addEventListener('load', () => {
    updateEls();
});

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

// Handle disabling hover if the device doesn't support it
const canHover = window.matchMedia('(hover: none)');
const canHoverHandler = (result) => {
    if (result.matches) document.body.classList.remove('canHover');
    else document.body.classList.add('canHover');
};
canHoverHandler(canHover);
canHover.addEventListener('change', canHoverHandler);

// Handle the touch device class
const isTouch = window.matchMedia('(pointer: coarse)');
const isTouchHandler = (result) => {
    if (result.matches) document.body.classList.add('isTouch');
    else document.body.classList.remove('isTouch');
};
isTouchHandler(isTouch);
isTouch.addEventListener('change', isTouchHandler);

// Handle DOM mutations and dispatching the domChange event
const mutationObs = new MutationObserver(() => {
    document.dispatchEvent(new Event('domChange'));
});
mutationObs.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});