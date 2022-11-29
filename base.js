
/**
 * A shortcut for `*.getElementById()`.
 * @param {string} id The target element ID
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {HTMLElement|undefined} The selected element
 */
function _id(id, ancestor = document) {
    return ancestor.getElementById(id);
}
/**
 * A shortcut for `*.getElementsByClassName()`.
 * @param {string} id The target class name
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {NodeListOf<any>} The selected elements
 */
function _class(id, ancestor = document) {
    return ancestor.getElementsByClassName(id);
}
/**
 * A shortcut for `*.getElementsByTagName()`.
 * @param {string} id The target tag name
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {NodeListOf<any>} The selected elements
 */
function _tag(tag, ancestor = document) {
    return ancestor.getElementsByTagName(tag);
}
/**
 * A shortcut for `*.querySelector()`.
 * @param {string} id The target query selector
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {HTMLElement|undefined} The selected element
 */
function _qs(selector, ancestor = document) {
    return ancestor.querySelector(selector);
}
/**
 * A shortcut for `*.querySelectorAll()`.
 * @param {string} id The target query selector
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {NodeListOf<any>} The selected elements
 */
function _qsa(selector, ancestor = document) {
    return ancestor.querySelectorAll(selector);
}

/**
 * Generates a pseudorandom hexodecimal string of a desired length using `Math.random()`.
 * @param {number} length The length of the random
 * @returns {String} The resulting string
 */
function randomHex(length = 8) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars[Math.round(Math.random()*15)];
    }
    return str;
}

/**
 * Generates a pseudorandom integer between a minimum and maximum.
 * @param {number} min The minimum
 * @param {number} max The maximum
 * @returns {number} The resulting integer
 */
function randomInt(min, max) { 
    return Math.round(min+(Math.random()*(max-min)));
}

/**
 * Generates a pseudorandom float between a minimum and maximum.
 * @param {number} min The minimum
 * @param {number} max The maximum
 * @returns {number} The resulting float
 */
function randomFloat(min, max) {
    return min+(Math.random()*(max-min));
}

/**
 * Selects a random element from an array.
 * @param {array} arr The input array
 * @returns {*} A randomly selected array element
 */
const getRandomElement = (arr) => arr[(Math.ceil(Math.random()*arr.length)-1)];

/**
 * @typedef itemWithWeight
 * @property {*} value The return value for this item
 * @property {number} weight The weight of this item
 */
/**
 * Selects a random item from a provided list, where each item has a specific weight.
 * @param {itemWithWeight[]} args An array of items and their weights
 * @returns A randomly selected value
 */
const getRandomWeighted = (args) => {
    // Get the total weight
    let total = 0;
    args.forEach((arg) => {
        total += arg.weight;
    });
    // Sort options from lightest to heaviest
    args.sort((a, b) => {
        return a.weight-b.weight;
    });
    // Get our random number
    const rand = randomFloat(0, total);
    // Iterate through options until the current weight (num)
    // is greater than our number (rand)
    let num = 0;
    for (const arg of args) {
        num += arg.weight;
        if (rand < num) return arg.value;
    }
}

/**
 * Keeps a number within a range by preventing it from going above/below its maximum/minimum.
 * @param {number} num The input number
 * @param {number} min The minimum number
 * @param {number} max The maximum number
 * @returns {number} The resulting number
 */
function clamp(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
}

/**
 * Keeps a number within a range by underflowing/overflowing.
 * @param {number} num The input number
 * @param {number} min The minimum number
 * @param {number} max The maximum number
 * @returns {number} The resulting number
 */
function overflow(num, min, max) {
    if (num < min) return max;
    if (num > max) return min;
    return num;
}

/**
 * Rounds a float to the desired amount of decimal places, clipping any trailing zeros.
 * @param {number} number The input number
 * @param {number} decimalPlaces The maximum number of decimal places
 * @returns {number} The resulting number
 */
function roundSmart(number, decimalPlaces = 0) {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen;
}

/**
 * Separates a string into its words and returns an array of those words.
 * @param {string} s The input string
 * @returns {String[]} An array of words
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
 * @returns {number} The number of words
 */
function countWords(s){
    return getWords(s).length;
}

/**
 * Pause execution for a desired amount of time. Use this in `async` functions with `await sleep(ms)`.
 * @param {Number} ms The number of milliseconds to sleep for
 * @returns {Promise<undefined>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Shuffles an array using `Math.random()` to swap elements and returns the result.
 * @param {array} arr The input array
 * @returns {array} The shuffled array
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
 * @callback loopCallback
 * @param {number} i The current loop index
 */
/**
 * A for loop using callbacks. If the callback explicitly returns `false`, the loop is terminated.
 * @param {number} count The number of times to loop
 * @param {loopCallback} callback A function that's called for every iteration of the loop. The function is passed an integer indicating the current index.
 */
function loop(count = 1, callback) {
    for (let i = 0; i < count; i++) {
        if (callback(i) === false) return;
    }
}

/**
 * @callback loopEachCallback
 * @param {number} el The current element
 * @param {number} i The current loop index
 */
/**
 * An alternative syntax for the `*.forEach()` method. If the callback explicitly returns `false`, the loop is terminated.
 * @param {array} array The array to loop through
 * @param {loopEachCallback} callback A function that's called for every element in the array. The function is passed the current element of the array.
 */
function loopEach(array, callback) {
    let error = false;
    [...array].forEach((el, i) => {
        if (!error) {
            if (callback(el, i) === false) error = true;
        }
    });
}

/**
 * Prompts the user to download a file. Note that this probably won't work if the file has a different origin domain.
 * @param {String} url The target file URL
 */
function downloadFile(url) {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = true;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
}

/**
 * Converts a number of seconds into `[hh]:[m]m:ss` format.
 * @param {number} s The number of seconds to format
 * @returns {String}
 */
function formatSeconds(s) {
    s = Math.floor(s);
    let m = 0;
    let h = 0;
    if (s < 60) return `0:${s.toString().padStart(2, '0')}`;
    m = Math.floor(s/60);
    s = s%60;
    if (m < 60) return `${m}:${s.toString().padStart(2, '0')}`;
    h = Math.floor(m/60);
    m = m%60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * Get age as an integer from a Date object.
 * @param {Date} date The target date
 * @returns {number}
 */
function getAgeFromDate(date) {
    const now = new Date();
    let age = now.getFullYear()-date.getFullYear();
    if (now.getMonth() < date.getMonth() || (now.getMonth() == date.getMonth() && now.getDate() < date.getDate())) {
        age--;
    }
    return age;
}

/**
 * An alternative syntax for `element.addEventListener()`.
 * @param {HTMLElement} el The HTML element to add the listener(s) to
 * @param {string|array} type The event type(s) (single type or array of types) to add to the element
 * @param {function} callback The function to call when the event is dispatched
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
 * @param {object} obj An object to be converted to JSON and stored
 */
function localStorageObjSet(name, obj) {
    window.localStorage.setItem(name, JSON.stringify(obj));
    console.log(`Saved localStorage object '${name}':`, obj);
}
/**
 * Retrieves and JSON-decodes a LocalStorage entry.
 * @param {string} name The name of the local storage entry
 * @returns {object}
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
 * @returns {Boolean}
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
 * @returns {Boolean}
 */
function isValidHostname(string) {
    return string.match(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/) && !string.match(/^localhost$/);
}

/**
 * Determines if a string is a valid IPv4 or IPv6 address.
 * @param {string} string The input string
 * @returns {Boolean}
 */
function isValidIp(string) {
    return string.match(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/) && !string.match(/(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/) && !string.match(/^::1$/);
}

/**
 * Escapes HTML entities present in the input string and returns the result.
 * @param {string} text The input string
 * @returns {string} The escaped string
 */
function escapeHTML(text) {
    return text
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

/**
 * @typedef REST_requestOpts
 * @property {Object.<string, string|string[]>} query An object containing keys and values to be used in the querystring. Setting a key to an array of strings will add the key to the querystring for each of the provided strings.
 * @property {object} body An object to be converted to JSON and sent in the body of the request. This option will have no effect with `GET` requests.
 * @property {('json'|'text'|'response')} [response] The type of response to be returned. Default is `json`, which will parse the server's response into a Javascript object and return it, adding a `_status` property set to the response code. `text` will return the server's response as test, and `response` will return the response object from `fetch`.
 */
/**
 * Interact with REST/JSON web APIs
 */
class REST {
    constructor(baseUrl, fetchOptions) {
        if (!isValidUrl) throw new Error(`Invalid base URL`);
        this.baseUrl = baseUrl;
        this.fetchOptions = fetchOptions;
    }
    #getQueryString(queryOpt) {
        let querystring = '';
        if (queryOpt) {
            let qs = new URLSearchParams();
            for (const key in opts.query) {
                const value = opts[key];
                if (typeof value == 'string') {
                    qs.append(key, value);
                } else if (typeof value == 'object' && value.length) {
                    for (const val of value) {
                        qs.append(key, val);
                    }
                }
            }
            querystring = qs.toString();
        }
        return querystring;
    }
    #getFullUrl(path, query) {
        let url = `${this.baseUrl}/${path}`;
        url = url.replace(/\/\//g, '/');
        if (query) url = `${url}?${query}`;
        return url;
    }
    async #fetch(method, path, opts) {
        return new Promise(async(resolve, reject) => {
            const qs = this.#getQueryString(opts.query);
            const fetchOpts = {
                ...this.fetchOptions,
                method: method
            };
            if (opts.body || method !== 'GET') {
                fetchOpts.body = JSON.stringify(opts.body);
                if (!fetchOpts.headers) fetchOpts.headers = {};
                fetchOpts.headers['content-type'] = 'application/json';
            }
            let res;
            try {
                res = await fetch(this.#getFullUrl(path, qs), fetchOpts);
            } catch (error) {
                return reject(error);
            }
            const handleResponse = {
                json: async() => {
                    const json = await res.json() || {};
                    json._status = res.status;
                    return resolve(json);
                },
                text: async() => {
                    const text = await res.text();
                    return resolve(text);
                },
                response: async() => {
                    return resolve(res);
                }
            }
            try {
                return handleResponse[opts.response || 'json'];
            } catch (error) {
                return reject(error);
            }
        });
    }
    /**
     * Sends an HTTP `GET` request to the selected endpoint.
     * @param {string} path The subpath (endpoint) of the base URL to make a request to
     * @param {REST_requestOpts} opts Options for this request
     * @returns {Object|string|Promise<Response>} The response in the format set with the `response` option
     */
    async get(path, opts) {
        return this.#fetch('GET', path, opts);
    }
    /**
     * Sends an HTTP `POST` request to the selected endpoint.
     * @param {string} path The subpath (endpoint) of the base URL to make a request to
     * @param {REST_requestOpts} opts Options for this request
     * @returns {Object|string|Promise<Response>} The response in the format set with the `response` option
     */
    async post(path, opts) {
        return this.#fetch('POST', path, opts);
    }
    /**
     * Sends an HTTP `PUT` request to the selected endpoint.
     * @param {string} path The subpath (endpoint) of the base URL to make a request to
     * @param {REST_requestOpts} opts Options for this request
     * @returns {Object|string|Promise<Response>} The response in the format set with the `response` option
     */
    async put(path, opts) {
        return this.#fetch('PUT', path, opts);
    }
    /**
     * Sends an HTTP `PATCH` request to the selected endpoint.
     * @param {string} path The subpath (endpoint) of the base URL to make a request to
     * @param {REST_requestOpts} opts Options for this request
     * @returns {Object|string|Promise<Response>} The response in the format set with the `response` option
     */
    async patch(path, opts) {
        return this.#fetch('PATCH', path, opts);
    }
    /**
     * Sends an HTTP `DELETE` request to the selected endpoint.
     * @param {string} path The subpath (endpoint) of the base URL to make a request to
     * @param {REST_requestOpts} opts Options for this request
     * @returns {Object|string|Promise<Response>} The response in the format set with the `response` option
     */
    async delete(path, opts) {
        return this.#fetch('DELETE', path, opts);
    }
}

/**
 * @typedef leftTopPosition
 * @type {object}
 * @property {number} left
 * @property {number} top
 */
/**
 * Returns `top` and `left` pixel coordinates that, when used, will position the target element relative to the cursor.
 * @param {HTMLElement} el The element to position
 * @returns {leftTopPosition} The element's position
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

/**
 * Called when this popup action button is clicked.
 * @callback popupActionClickCallback
 */
/**
 * @typedef popupAction
 * @type {object}
 * @property {string} label The button's label
 * @property {string} [icon] A Material Symbols icon to use on the button
 * @property {string} [id] A custom ID to give this popup element
 * @property {popupActionClickCallback} [action]
 * @property {boolean} [primary] If `true`, use a primary styled button for this action
 * @property {boolean} [escape] If `true`, this action will be clicked if the user clicks outside of the popup
 * @property {boolean} [noClose] If `true`, clicking this action button won't close the popup
 */
let popupFocus = [];
/**
 * Shows a popup.
 * @param {string} title The popup title
 * @param {string} body The popup body, can contain HTML
 * @param {popupAction[]} actions An array of popup action objects
 * @returns The resulting popup's element ID
 */
function showPopup(title, body, actions = []) {
    const id = randomHex();
    document.body.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="popupCont">
            <div id="${id}-inner" class="popup">
                <div id="${id}-title" class="title">${title}</div>
                <div id="${id}-body" class="body">${body}</div>
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
        _id(actionId).addEventListener('click', (e) => {
            if (action.action) action.action();
            if (!action.noClose) hidePopup(id);
            e.stopPropagation();
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
    _id(`${id}-body`).addEventListener('scroll', (e) => {
        const inner = _id(`${id}-body`);
        const title = _id(`${id}-title`);
        const actionsCont = _id(`${id}-actions`);
        if (inner.scrollTop > 10)
            title.classList.add('scrolled');
        else
            title.classList.remove('scrolled');
        if (actions.length > 0) {
            const rect = inner.getBoundingClientRect();
            if ((inner.scrollHeight-(inner.scrollTop+rect.height)) > 10)
                actionsCont.classList.add('scrolled');
            else
                actionsCont.classList.remove('scrolled');
        }
    });
    _id(`${id}-body`).dispatchEvent(new Event('scroll'));
    setTimeout(() => {
        _id(id).classList.add('visible');
        try {
            popupFocus[id] = focusTrap.createFocusTrap(_id(id));
            popupFocus[id].activate();
        } catch (error) {
            console.error(`Failed to trap focus inside popup`);
        }
    }, 50);
    return id;
}
/**
 * Hides an existing popup.
 * @param {string} id The popup ID returned from `showPopup()`
 */
function hidePopup(id) {
    _id(id).classList.remove('visible');
    setTimeout(() => {
        popupFocus[id].deactivate();
        _id(id).remove();
    }, 300);
}

/**
 * Called when the user submits a `selectDateTime()` popup.
 * @callback selectDateTimeCallback
 * @param {Date} date The selected Date object
 */
/**
 * Prompts the user to select a date and time.
 * @param {selectDateTimeCallback} callback The function to call with the resulting date object, not called if the user doesn't select a date
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
 * Called when this context menu item is clicked.
 * @callback contextMenuItemClickCallback
 */
/**
 * @typedef contextMenuItem
 * @property {string} type `item` for a normal item, `sep` for a separator
 * @property {string} [name] If `type` is `item`, the name of the item
 * @property {string} [icon] If `type` is `item`, a Material Symbol to use for this item
 * @property {string} [tooltip] If `type` is `item`, a hover tooltip to display for this item
 * @property {string} [desc] If `type` is `item`, a description to display under this item
 * @property {boolean} [disabled] If `true` and `type` is `item`, the item won't be clickable
 * @property {contextMenuItemClickCallback} [action] If `type` is `item`, called when the item is clicked
 */
/**
 * Shows a custom context menu at the cursor's position.
 * @param {contextMenuItem[]} items An array of context menu elements
 * @returns {string} The resulting context menu's element ID
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
    _id(id).addEventListener('click', (e) => {
        hideContext();
        e.stopPropagation();
    });
    _id(id).addEventListener('contextmenu', (e) => {
        e.preventDefault();
        hideContext();
    });
    _id(`${id}-inner`).addEventListener('click', (e) => {
        e.stopPropagation();
    });
    _id(`${id}-inner`).style.scale = 1;
    const coords = posElRelToCursor(_id(`${id}-inner`));
    _id(`${id}-inner`).style.left = `${coords.left}px`;
    _id(`${id}-inner`).style.top = `${coords.top}px`;
    _id(`${id}-inner`).style.scale = '';
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
/**
 * Hides all existing context menus
 */
function hideContext() {
    [..._class('contextCont')].forEach((el) => {
        el.classList.remove('visible');
        popupFocus[el.id].deactivate();
        setTimeout(() => {
            el.remove();
        }, 200)
    });
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
            range.dispatchEvent(new Event('input'));
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
    [..._class('spoiler')].forEach((el) => {
        if (el.dataset.mod) return;
        el.dataset.mod = true;
        const head = _qs('.head', el);
        head.setAttribute('tabindex', '0');
        head.title = `Reveal/hide spoiler`
        on(head, 'click', () => {
            el.classList[el.classList.contains('visible') ? 'remove':'add']('visible');
        });
        on(head, 'keyup', (e) => {
            if (e.code == 'Space') head.click();
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
                tooltipTimeout = setTimeout(() => {
                    hideTooltip();
                }, 10*1000);
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

let escapeQueue = [];
let canHover;
let isTouch;
let params;
try {
    window.addEventListener('keyup', (e) => {
        if (e.code == 'Escape') {
            while (true) {
                const func = escapeQueue.pop();
                if (!func) break;
                try {
                    func();
                    break;
                } catch (error) {}
            }
        }
    });
    window.addEventListener('mousemove', (e) => {
        mouse = {
            x: e.clientX,
            y: e.clientY
        };
    });
    document.addEventListener('domChange', () => {
        updateEls();
    });
    window.addEventListener('load', () => {
        updateEls();
    });
    
    /**
     * A `URLSearchParams` object created using `window.location.search`.
     * @type {URLSearchParams}
     */
    params = new URLSearchParams(window.location.search);
    
    // Handle disabling hover if the device doesn't support it
    canHover = window.matchMedia('(hover: none)');
    const canHoverHandler = (result) => {
        if (result.matches) document.body.classList.remove('canHover');
        else document.body.classList.add('canHover');
    };
    canHoverHandler(canHover);
    canHover.addEventListener('change', canHoverHandler);
    
    // Handle the touch device class
    isTouch = window.matchMedia('(pointer: coarse)');
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
} catch (error) {}

try {
    module.exports = {
        _id: _id,
        _class: _class,
        _tag: _tag,
        _qs: _qs,
        _qsa: _qsa,
        randomHex: randomHex,
        randomInt: randomInt,
        randomFloat: randomFloat,
        getRandomElement: getRandomElement,
        getRandomWeighted: getRandomWeighted,
        clamp: clamp,
        overflow: overflow,
        roundSmart: roundSmart,
        getWords: getWords,
        countWords: countWords,
        sleep: sleep,
        shuffle: shuffle,
        loop: loop,
        loopEach: loopEach,
        downloadFile: downloadFile,
        formatSeconds: formatSeconds,
        getAgeFromDate:getAgeFromDate,
        on: on,
        localStorageObjSet: localStorageObjSet,
        localStorageObjGet: localStorageObjGet,
        localStorageWipe: localStorageWipe,
        isValidUrl: isValidUrl,
        isValidHostname: isValidHostname,
        isValidIp: isValidIp,
        escapeHTML: escapeHTML,
        posElRelToCursor: posElRelToCursor,
        hideTooltip: hideTooltip,
        showPopup: showPopup,
        hidePopup: hidePopup,
        selectDateTime: selectDateTime,
        showContext: showContext,
        hideContext: hideContext,
        escapeQueue: escapeQueue,
        params: params,
        canHover: canHover,
        isTouch: isTouch,
    };
} catch (error) {}