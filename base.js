
/**
 * A shortcut for `*.getElementById()`.
 * @param {string} id The target element ID
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns 
 */
function _id(id, ancestor = document) {
    return ancestor.getElementById(id);
}
/**
 * A shortcut for `*.getElementsByClassName()`.
 * @param {string} id The target class name
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns 
 */
function _class(id, ancestor = document) {
    return ancestor.getElementsByClassName(id);
}
/**
 * A shortcut for `*.getElementsByTagName()`.
 * @param {string} id The target tag name
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns 
 */
function _tag(tag, ancestor = document) {
    return ancestor.getElementsByTagName(tag);
}
/**
 * A shortcut for `*.querySelector()`.
 * @param {string} id The target query selector
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns 
 */
function _qs(selector, ancestor = document) {
    return ancestor.querySelector(selector);
}
/**
 * A shortcut for `*.querySelectorAll()`.
 * @param {string} id The target query selector
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns 
 */
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

/**
 * Shuffles an array using `Math.random()` to swap elements and returns the result.
 * @param {array} arr The input array
 * @returns The shuffled array
 */
function shuffle(arr) {
    let i = 0;
    while (i < arr.length) {
        let tmp = arr[i];
        let num = Math.round(Math.random()*(arr.length-1));
        arr[i] = arr[num];
        arr[num] = tmp;
        i++;
    }
    return arr;
}

/**
 * A for loop using callbacks. If the callback explicitly returns `false`, the loop is terminated.
 * @param {number} count The number of times to loop
 * @param {function} callback A function that's called for every iteration of the loop. The function is passed an integer indicating the current index.
 */
function loop(count = 1, callback) {
    for (let i = 0; i < count; i++) {
        if (callback(i) === false) return;
    }
}

/**
 * An alternative syntax for the `*.forEach()` method. If the callback explicitly returns `false`, the loop is terminated.
 * @param {array} array The array to loop through
 * @param {function} callback A function that's called for every element in the array. The function is passed the current element of the array.
 */
function loopEach(array, callback) {
    let error = false;
    [...array].forEach((el) => {
        if (!error) {
            if (callback(el) === false) error = true;
        }
    });
}

/**
 * An alternative syntax for `element.addEventListener()`.
 * @param {HTMLElement} el The HTML element to add the listener(s) to
 * @param {string|array} type The event type(s) (single type or array of types) to add to the element
 * @param {function} callback The function to cal when the event is dispatched
 */
function on(el, type, callback) {
    if (!Array.isArray(type)) type = [type];
    type.forEach((type) => {
        el.addEventListener(type, callback);
    });
}

/**
 * A shortcut for storing objects in LocalStorage.
 * @param {string} name The name of the local storage entry
 * @param {any} obj An object to be converted to JSON and stored
 */
function localStorageObjSet(name, obj) {
    window.localStorage.setItem(name, JSON.stringify(obj));
    console.log(`Saved localStorage object '${name}':`, obj);
}
/**
 * Retrieves and JSON-decodes a LocalStorage entry.
 * @param {string} name The name of the local storage entry
 * @returns 
 */
function localStorageObjGet(name) {
    const data = window.localStorage.getItem(name);
    if (data) return JSON.parse(data);
    return false;
}
/**
 * Deletes all contents of LocalStorage.
 */
function localStorageWipe() {
    window.localStorage.clear();
}

/**
 * Determines of an input string is a valid URL.
 * @param {string} string The input string
 * @returns 
 */
function isValidUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (error) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

/**
 * Determines if a string is a valid hostname.
 * @param {string} string The input string
 * @returns 
 */
function isValidHostname(string) {
    return string.match(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/) && !string.match(/^localhost$/);
}

/**
 * Determines if a string is a valid IPv4 or IPv6 address.
 * @param {string} string The input string
 * @returns 
 */
function isValidIp(string) {
    return string.match(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/) && !string.match(/(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/) && !string.match(/^::1$/);
}

/**
 * Escapes HTML entities present in the input string and returns the result.
 * @param {string} text The input string
 * @returns 
 */
function escapeHTML(text) {
    return text
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

/**
 * Positions an HTML element relative to the mouse cursor's position.
 * @param {HTMLElement} el The element to position
 * @returns 
 */
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
/**
 * Shows a popup.
 * @param {string} title The popup title
 * @param {string} body The popup body, can contain HTML
 * @param {*} actions An array containing popup action objects
 * @returns The resulting popup's element ID
 */
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
/**
 * Hides an existing popup.
 * @param {*} id The popup ID returned from `showPopup()`
 */
function hidePopup(id) {
    _id(id).classList.remove('visible');
    setTimeout(() => {
        popupFocus[id].deactivate();
        _id(id).remove();
    }, 300);
}

/**
 * Prompts the user to select a date and time.
 * @param {function} callback The function to call with the resulting date object, not called if the user doesn't select a date
 * @param {boolean} includeDate If false, the calendar will be hidden
 * @param {boolean} includeTime If false, the clock will be hidden
 * @param {Date} startingDate The date at which to start from
 */
function selectDateTime(callback, includeDate = true, includeTime = true, startingDate = new Date()) {
    let title = ['Select'];
    if (includeDate) title.push('date');
    if (includeDate && includeTime) title.push('and');
    if (includeTime) title.push('time');
    const today = new Date();
    if (!startingDate || !startingDate.getTime()) startingDate = new Date();
    let navDate = new Date(startingDate.getTime());
    let selDate = new Date(startingDate.getTime());
    let id = {
        title: randomHex(),
        days: randomHex(),
        prev: randomHex(),
        next: randomHex(),
        calendar: randomHex(),
        clock: randomHex(),
        hours: randomHex(),
        mins: randomHex(),
        secs: randomHex(),
        p: randomHex(),
    }
    id.popup = showPopup(title.join(' '), `
        <div class="col dateSelect">
            <div id="${id.calendar}" class="col gap-10">
                <div class="row gap-10 align-center no-wrap">
                    <button id="${id.prev}" class="btn alt2 noShadow iconOnly">
                        <div class="icon">arrow_back</div>
                    </button>
                    <div id="${id.title}" class="text-center flex-grow monthTitle"></div>
                    <button id="${id.next}" class="btn alt2 noShadow iconOnly">
                        <div class="icon">arrow_forward</div>
                    </button>
                </div>
                <div class="calendar col gap-8 no-wrap">
                    <div class="weekdays">
                        <span>S</span>
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                    </div>
                    <div id="${id.days}" class="days"></div>
                </div>
            </div>
            <div id="${id.clock}" class="clock row gap-10 justify-center align-center no-wrap">
                <div class="row gap-8 align-center no-wrap">
                    <div class="input custom">
                        <input id="${id.hours}" type="number" class="textbox custom">
                    </div>
                    :
                    <div class="input custom">
                        <input id="${id.mins}" type="number" class="textbox custom">
                    </div>
                    :
                    <div class="input custom">
                        <input id="${id.secs}" type="number" class="textbox custom">
                    </div>
                </div>
                <div class="input dropdown custom">
                    <select id="${id.p}" class="textbox">
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                </div>
            </div>
        </div>
    `, [{
        label: 'Cancel',
        escape: true
    }, {
        label: 'Select',
        primary: true,
        action: () => {
            callback(selDate);
        }
    }]);
    if (includeDate) {
        const changeMonth = () => {
            const date = new Date(`${dayjs(navDate).format('YYYY-MM')}-01T12:00:00`);
            _id(id.title).innerText = dayjs(date).format('MMMM YYYY');
            let timestamp = (date.getTime()-(1000*60*60*24*(date.getDay())));
            _id(id.days).innerHTML = '';
            loop(42, (i) => {
                const dayId = randomHex();
                const day = new Date(timestamp+(1000*60*60*24*i));
                _id(id.days).insertAdjacentHTML('beforeend', `
                    <button id="${dayId}" class="btn ${(dayjs(day).format('YYYY-MM-DD') == dayjs(selDate).format('YYYY-MM-DD')) ? '':'alt2'} iconOnly noShadow day ${(day.getMonth() != date.getMonth()) ? 'outside':''}" data-date="${dayjs(day).format('YYYY-MM-DD')}">
                        ${day.getDate()}
                    </button>
                `);
                on(_id(dayId), 'click', () => {
                    loopEach(_qsa(':not(.alt2)', _id(id.days)), (el) => {
                        el.classList.add('alt2');
                    });
                    _id(dayId).classList.remove('alt2');
                    selDate.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
                });
            });
        };
        changeMonth();
        on(_id(id.prev), 'click', () => {
            let month = navDate.getMonth();
            let year = navDate.getFullYear();
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            navDate.setFullYear(year, month, 1);
            changeMonth();
        });
        on(_id(id.next), 'click', () => {
            let month = navDate.getMonth();
            let year = navDate.getFullYear();
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
            navDate.setFullYear(year, month, 1);
            changeMonth();
        });
        let down = false;
        on(_id(id.popup), 'keydown', (e) => {
            if (down) return;
            down = true;
            if (e.code == 'ArrowLeft')
                _id(id.prev).click();
            if (e.code == 'ArrowRight')
                _id(id.next).click();
        });
        on(_id(id.popup), 'keyup', () => {
            down = false;
        });
    } else _id(id.calendar).style.display = 'none';
    if (includeTime) {
        _id(id.p).value = dayjs(selDate).format('A');
        on(_id(id.hours), 'input', () => {
            const el = _id(id.hours);
            let value = parseInt(el.value);
            const period = _id(id.p).value;
            el.value = clamp(value, 1, 12);
            value = parseInt(el.value);
            if (period == 'PM') value += 12;
            selDate.setHours(value);
        });
        on(_id(id.mins), 'input', () => {
            const el = _id(id.mins);
            const value = parseInt(el.value);
            el.value = clamp(value, 1, 59);
            selDate.setMinutes(el.value);
        });
        on(_id(id.secs), 'input', () => {
            const el = _id(id.secs);
            const value = parseInt(el.value);
            el.value = clamp(value, 1, 59);
            selDate.setSeconds(el.value);
        });
        on(_id(id.p), 'change', () => {
            _id(id.hours).dispatchEvent(new Event('input'));
        });
        on(_id(id.hours), 'change', () => {
            _id(id.hours).value = dayjs(selDate).format('h');
        });
        on(_id(id.mins), 'change', () => {
            _id(id.mins).value = dayjs(selDate).format('mm');
        });
        on(_id(id.secs), 'change', () => {
            _id(id.secs).value = dayjs(selDate).format('ss');
        });
        _id(id.hours).dispatchEvent(new Event('change'));
        _id(id.mins).dispatchEvent(new Event('change'));
        _id(id.secs).dispatchEvent(new Event('change'));
    } else _id(id.clock).style.display = 'none';
}

/**
 * Shows a custom context menu at the cursor's position.
 * @param {*} items An array of context menu elements
 * @returns The resulting context menu's element ID
 */
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
                    <button id="${itemId}" class="item" ${(item.tooltip) ? `title="${item.tooltip}"`:''} ${(item.disabled) ? 'disabled':''}>
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
    [..._class('spoiler')].forEach((el) => {
        if (el.dataset.mod) return;
        el.dataset.mod = true;
        const head = _qs('.head', el);
        head.setAttribute('tabindex', '0');
        on(head, 'click', () => {
            el.classList[el.classList.contains('visible') ? 'remove':'add']('visible');
        });
        on(head, 'keyup', (e) => {
            if (e.code == 'Space') head.click();
        });
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