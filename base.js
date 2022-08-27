
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

/**
 * Generates a pseudorandom hexodecimal string of a desired length using `Math.random()`.
 * @param {int} length The length of the random
 * @returns 
 */
function randomHex(length = 8) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let str = '';
    for (i = 0; i < length; i++) {
        str += chars[Math.round(Math.random()*15)];
    }
    return str;
}

/**
 * Generates a pseudorandom integer between a minimum and maximum.
 * @param {int} min The minimum
 * @param {int} max The maximum
 * @returns 
 */
function randomInt(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Keeps a number within a range by preventing it from going above/below its maximum/minimum.
 * @param {integer|float} num The input number
 * @param {integer|float} min The minimum number
 * @param {integer|float} max The maximum number
 * @returns 
 */
function clamp(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
}

/**
 * Keeps a number within a range by underflowing/overflowing.
 * @param {integer|float} num The input number
 * @param {integer|float} min The minimum number
 * @param {integer|float} max The maximum number
 * @returns 
 */
function overflow(num, min, max) {
    if (num < min) return max;
    if (num > max) return min;
    return num;
}

/**
 * Rounds a float to the desired amount of decimal places, clipping any trailing zeros.
 * @param {int|float} number The input number
 * @param {int} decimalPlaces The maximum number of decimal places
 * @returns 
 */
function roundSmart(number, decimalPlaces = 0) {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen;
}

/**
 * Separates a string into its words and returns an array of those words.
 * @param {string} s The input string
 * @returns 
 */
function getWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi, '');
    s = s.replace(/[ ]{2,}/gi, ' ');
    s = s.replace(/\n/g, ' ');
    return s.split(' ').filter(String);
}
/**
 * Returns the number of words in a string.
 * @param {string} s The input string
 * @returns 
 */
function countWords(s){
    return getWords(s).length;
}

/**
 * Pause execution for a desired amount of time. Use this in `async` functions with `await sleep(ms)`.
 * @param {int} ms The number of milliseconds to sleep for
 * @returns 
 */
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
    return false;
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

function escapeHTML(text) {
    let escape = document.createElement('span');
    escape.innerText = text;
    return escape.innerText;
}

function posElRelToCursor(el) {
    const offsetX = 5;
    const offsetY = 5;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const gapX = (window.innerWidth-10)-mouse.x;
    const gapY = (window.innerHeight-10)-mouse.y;
    let x = mouse.x+offsetX;
    let y = mouse.y+offsetY;
    if (width > gapX)
        x = clamp((x-width-(offsetX*2)), 0, Infinity);
    if (height > gapY)
        y = clamp((y-height-(offsetY*2)), 0, Infinity);
    return { left: x, top: y };
}

let tooltipTimeout;
let tooltipResetTimeout;
let mouse = { x: 0, y: 0 };
const hideTooltip = () => {
    clearTimeout(tooltipTimeout);
    clearTimeout(tooltipResetTimeout);
    if (!_id('tooltip'))
        document.body.insertAdjacentHTML('beforeend', `<div id="tooltip"></div>`);
    _id('tooltip').classList.remove('visible');
    tooltipResetTimeout = setTimeout(() => {
        _id('tooltip').style.left = `0px`;
        _id('tooltip').style.top = `0px`;
    }, 150);
}

let popupFocus = [];
function showPopup(title, body, actions = []) {
    const id = randomHex();
    document.body.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="popupCont">
            <div id="${id}-inner" class="popup">
                <div class="title">${title}</div>
                <div class="body">${body}</div>
                ${(actions.length > 0) ? `<div id="${id}-actions" class="actions"></div>`:''}
            </div>
        </div>
    `);
    actions.forEach((action) => {
        const actionId = action.id || randomHex();
        _id(`${id}-actions`).insertAdjacentHTML('beforeend', `
            <button id="${actionId}" class="btn noShadow ${(!action.primary) ? 'alt':''}" ${(action.disabled) ? `disabled`:''}>
                ${(action.icon) ? `<div class="icon">${action.icon}</div>`:''}
                <div>${action.label}</div>
            </button>
        `);
        _id(actionId).addEventListener('click', () => {
            if (action.action) action.action();
            hidePopup(id);
        });
        if (action.escape) {
            _id(id).addEventListener('click', () => {
                _id(actionId).click();
            });
            escapeQueue.push(() => {
                _id(actionId).click();
            });
        }
    });
    _id(`${id}-inner`).addEventListener('click', (e) => {
        e.stopPropagation();
    });
    setTimeout(() => {
        _id(id).classList.add('visible');
        popupFocus[id] = focusTrap.createFocusTrap(_id(id));
        popupFocus[id].activate();
    }, 50);
    return id;
}
function hidePopup(id) {
    _id(id).classList.remove('visible');
    setTimeout(() => {
        popupFocus[id].deactivate();
        _id(id).remove();
    }, 300);
}

function showContext(items) {
    const id = randomHex();
    document.body.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="contextCont">
            <div id="${id}-inner" class="context"></div>
        </div>
    `);
    items.forEach((item) => {
        const itemId = randomHex();
        switch (item.type) {
            case 'sep':
                _id(`${id}-inner`).insertAdjacentHTML('beforeend', `
                    <div class="sep"></div>
                `);
                break;
            case 'header':
                _id(`${id}-inner`).insertAdjacentHTML('beforeend', `
                    <div class="header">${item.name}</div>
                `);
                break;
            case 'item':
                _id(`${id}-inner`).insertAdjacentHTML('beforeend', `
                    <button id="${itemId}" class="item" ${(item.tooltip) ? `title="${item.tooltip}"`:''}>
                        ${(item.icon) ? `<div class="icon">${item.icon}</div>`:''}
                        <div class="label">
                            <div class="name">${item.name}</div>
                            ${(item.desc) ? `<div class="desc">${item.desc}</div>`:''}
                        </div>
                    </button>
                `);
                _id(itemId).addEventListener('click', () => {
                    _id(id).click();
                    if (item.action) item.action();
                });
                break;
        }
    });
    _id(id).addEventListener('click', () => {
        hideContext();
    });
    _id(id).addEventListener('contextmenu', (e) => {
        e.preventDefault();
        hideContext();
    });
    _id(`${id}-inner`).addEventListener('click', (e) => {
        e.stopPropagation();
    });
    const coords = posElRelToCursor(_id(`${id}-inner`));
    _id(`${id}-inner`).style.left = `${coords.left}px`;
    _id(`${id}-inner`).style.top = `${coords.top}px`;
    escapeQueue.push(() => {
        _id(id).click();
    });
    setTimeout(() => {
        _id(id).classList.add('visible');
        popupFocus[id] = focusTrap.createFocusTrap(_id(id));
        popupFocus[id].activate();
    }, 50);
    return id;
}
function hideContext() {
    [..._class('contextCont')].forEach((el) => {
        el.classList.remove('visible');
        popupFocus[el.id].deactivate();
        setTimeout(() => {
            el.remove();
        }, 200)
    });
}

let escapeQueue = [];
window.addEventListener('keyup', (e) => {
    if (e.code == 'Escape') {
        const func = escapeQueue.pop();
        if (func) func();
    }
});

window.addEventListener('mousemove', (e) => {
    mouse = {
        x: e.clientX,
        y: e.clientY
    }
});

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
    [..._qsa('[title]')].forEach((el) => {
        const title = el.title;
        el.addEventListener('mousemove', () => {
            if (!document.body.classList.contains('canHover')) return;
            hideTooltip();
            tooltipTimeout = setTimeout(() => {
                _id('tooltip').innerHTML = title;
                const coords = posElRelToCursor(_id('tooltip'));
                _id('tooltip').style.left = `${coords.left}px`;
                _id('tooltip').style.top = `${coords.top}px`;
                _id('tooltip').classList.add('visible');
            }, 750);
        });
        el.addEventListener('mouseleave', () => {
            hideTooltip();
        });
        el.addEventListener('click', () => {
            hideTooltip();
        });
        el.removeAttribute('title');
    });
}

document.addEventListener('domChange', () => {
    updateEls();
});
window.addEventListener('load', () => {
    updateEls();
});

const params = new URLSearchParams(window.location.search);

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