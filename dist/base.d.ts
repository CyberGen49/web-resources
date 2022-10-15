export type loopCallback = (i: number) => any;
export type loopEachCallback = (el: number, i: number) => any;
export type leftTopPosition = {
    left: number;
    top: number;
};
/**
 * Called when the user submits a `selectDateTime()` popup.
 */
export type selectDateTimeCallback = (date: Date) => any;
/**
 * Called when this context menu item is clicked.
 */
export type contextMenuItemClickCallback = () => any;
export type contextMenuItem = {
    /**
     * `item` for a normal item, `sep` for a separator
     */
    type: string;
    /**
     * If `type` is `item`, the name of the item
     */
    name?: string;
    /**
     * If `type` is `item`, a Material Symbol to use for this item
     */
    icon?: string;
    /**
     * If `type` is `item`, a hover tooltip to display for this item
     */
    tooltip?: string;
    /**
     * If `type` is `item`, a description to display under this item
     */
    desc?: string;
    /**
     * If `true` and `type` is `item`, the item won't be clickable
     */
    disabled?: boolean;
    /**
     * If `type` is `item`, called when the item is clicked
     */
    action?: contextMenuItemClickCallback;
};
/**
 * Called when this popup action button is clicked.
 */
export type popupActionClickCallback = () => any;
export type popupAction = {
    /**
     * The button's label
     */
    label: string;
    /**
     * A Material Symbols icon to use on the button
     */
    icon?: string;
    /**
     * A custom ID to give this popup element
     */
    id?: string;
    action?: popupActionClickCallback;
    /**
     * If `true`, use a primary styled button for this action
     */
    primary?: boolean;
    /**
     * If `true`, this action will be clicked if the user clicks outside of the popup
     */
    escape?: boolean;
    /**
     * If `true`, clicking this action button won't close the popup
     */
    noClose?: boolean;
};
/**
 * A shortcut for `*.getElementById()`.
 * @param {string} id The target element ID
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {HTMLElement|undefined} The selected element
 */
export function _id(id: string, ancestor?: HTMLElement): HTMLElement | undefined;
/**
 * A shortcut for `*.getElementsByClassName()`.
 * @param {string} id The target class name
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {NodeListOf<any>} The selected elements
 */
export function _class(id: string, ancestor?: HTMLElement): NodeListOf<any>;
/**
 * A shortcut for `*.getElementsByTagName()`.
 * @param {string} id The target tag name
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {NodeListOf<any>} The selected elements
 */
export function _tag(tag: any, ancestor?: HTMLElement): NodeListOf<any>;
/**
 * A shortcut for `*.querySelector()`.
 * @param {string} id The target query selector
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {HTMLElement|undefined} The selected element
 */
export function _qs(selector: any, ancestor?: HTMLElement): HTMLElement | undefined;
/**
 * A shortcut for `*.querySelectorAll()`.
 * @param {string} id The target query selector
 * @param {HTMLElement} ancestor The ancestor element to start from
 * @returns {NodeListOf<any>} The selected elements
 */
export function _qsa(selector: any, ancestor?: HTMLElement): NodeListOf<any>;
/**
 * Generates a pseudorandom hexodecimal string of a desired length using `Math.random()`.
 * @param {number} length The length of the random
 * @returns {String} The resulting string
 */
export function randomHex(length?: number): string;
/**
 * Generates a pseudorandom integer between a minimum and maximum.
 * @param {number} min The minimum
 * @param {number} max The maximum
 * @returns {number} The resulting integer
 */
export function randomInt(min: number, max: number): number;
/**
 * Keeps a number within a range by preventing it from going above/below its maximum/minimum.
 * @param {number} num The input number
 * @param {number} min The minimum number
 * @param {number} max The maximum number
 * @returns {number} The resulting number
 */
export function clamp(num: number, min: number, max: number): number;
/**
 * Keeps a number within a range by underflowing/overflowing.
 * @param {number} num The input number
 * @param {number} min The minimum number
 * @param {number} max The maximum number
 * @returns {number} The resulting number
 */
export function overflow(num: number, min: number, max: number): number;
/**
 * Rounds a float to the desired amount of decimal places, clipping any trailing zeros.
 * @param {number} number The input number
 * @param {number} decimalPlaces The maximum number of decimal places
 * @returns {number} The resulting number
 */
export function roundSmart(number: number, decimalPlaces?: number): number;
/**
 * Separates a string into its words and returns an array of those words.
 * @param {string} s The input string
 * @returns {String[]} An array of words
 */
export function getWords(s: string): string[];
/**
 * Returns the number of words in a string.
 * @param {string} s The input string
 * @returns {number} The number of words
 */
export function countWords(s: string): number;
/**
 * Pause execution for a desired amount of time. Use this in `async` functions with `await sleep(ms)`.
 * @param {Number} ms The number of milliseconds to sleep for
 * @returns {Promise<undefined>}
 */
export function sleep(ms: number): Promise<undefined>;
/**
 * Shuffles an array using `Math.random()` to swap elements and returns the result.
 * @param {array} arr The input array
 * @returns {array} The shuffled array
 */
export function shuffle(arr: any[]): any[];
/**
 * @callback loopCallback
 * @param {number} i The current loop index
 */
/**
 * A for loop using callbacks. If the callback explicitly returns `false`, the loop is terminated.
 * @param {number} count The number of times to loop
 * @param {loopCallback} callback A function that's called for every iteration of the loop. The function is passed an integer indicating the current index.
 */
export function loop(count: number, callback: loopCallback): void;
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
export function loopEach(array: any[], callback: loopEachCallback): void;
/**
 * Prompts the user to download a file. Note that this probably won't work if the file has a different origin domain.
 * @param {String} url The target file URL
 */
export function downloadFile(url: string): void;
/**
 * Converts a number of seconds into `[hh]:[m]m:ss` format.
 * @param {number} s The number of seconds to format
 * @returns {String}
 */
export function formatSeconds(s: number): string;
/**
 * An alternative syntax for `element.addEventListener()`.
 * @param {HTMLElement} el The HTML element to add the listener(s) to
 * @param {string|array} type The event type(s) (single type or array of types) to add to the element
 * @param {function} callback The function to call when the event is dispatched
 */
export function on(el: HTMLElement, type: string | any[], callback: Function): void;
/**
 * A shortcut for storing objects in LocalStorage.
 * @param {string} name The name of the local storage entry
 * @param {object} obj An object to be converted to JSON and stored
 */
export function localStorageObjSet(name: string, obj: object): void;
/**
 * Retrieves and JSON-decodes a LocalStorage entry.
 * @param {string} name The name of the local storage entry
 * @returns {object}
 */
export function localStorageObjGet(name: string): object;
/**
 * Deletes all contents of LocalStorage.
 */
export function localStorageWipe(): void;
/**
 * Determines of an input string is a valid URL.
 * @param {string} string The input string
 * @returns {Boolean}
 */
export function isValidUrl(string: string): boolean;
/**
 * Determines if a string is a valid hostname.
 * @param {string} string The input string
 * @returns {Boolean}
 */
export function isValidHostname(string: string): boolean;
/**
 * Determines if a string is a valid IPv4 or IPv6 address.
 * @param {string} string The input string
 * @returns {Boolean}
 */
export function isValidIp(string: string): boolean;
/**
 * Escapes HTML entities present in the input string and returns the result.
 * @param {string} text The input string
 * @returns {string} The escaped string
 */
export function escapeHTML(text: string): string;
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
export function posElRelToCursor(el: HTMLElement): leftTopPosition;
export function hideTooltip(): void;
/**
 * Shows a popup.
 * @param {string} title The popup title
 * @param {string} body The popup body, can contain HTML
 * @param {popupAction[]} actions An array of popup action objects
 * @returns The resulting popup's element ID
 */
export function showPopup(title: string, body: string, actions?: popupAction[]): string;
/**
 * Hides an existing popup.
 * @param {string} id The popup ID returned from `showPopup()`
 */
export function hidePopup(id: string): void;
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
export function selectDateTime(callback: selectDateTimeCallback, includeDate?: boolean, includeTime?: boolean, startingDate?: Date): void;
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
export function showContext(items: contextMenuItem[]): string;
/**
 * Hides all existing context menus
 */
export function hideContext(): void;
export let escapeQueue: any[];
export let params: any;
export let canHover: any;
export let isTouch: any;
//# sourceMappingURL=base.d.ts.map