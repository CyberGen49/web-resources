
#### [View this README rendered with Tropical](https://src.simplecyber.org/v2/readme.html)

# The Tropical CSS and Javascript Library
This README contains everything you need to know to make the most out of the Tropical CSS and Javascript library.

You can see a live demo of most of Tropical's elements on the [demo page](test.html).

## What's in the box
* 10 different colour themes
* Paragraphs, headings, lists, blockquotes, tables, and other text elements
* Handy CSS utility classes and Javascript functions
* Buttons in various colours and sizes with optional icons
* Textboxes and textareas
* Range sliders
* Progress bars
* Code blocks with syntax highlighting
* Notices
* Custom context menus
* Custom popups
* Custom toast notifications
* Custom tooltips
* Loading spinners

## Adding Tropical to your site
To add Tropical to your site, add the following lines to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://src.simplecyber.org/v2/base.css">
<link rel="stylesheet" href="https://src.simplecyber.org/v2/themes.css">
<script defer src="https://src.simplecyber.org/lib/tabbable.min.js"></script>
<script defer src="https://src.simplecyber.org/lib/focus-trap.min.js"></script>
<script defer src="https://src.simplecyber.org/lib/prism.min.js"></script>
<script defer src="https://src.simplecyber.org/v2/base.js"></script>
```

`tabbable` and `focus-trap` are highly recommended if you plan on using custom context menus and popups. If you choose to use them, they must be deferred and included in that order.

You only need to include `prism` if you plan on doing syntax highlighting.

## Using themes
Tropical comes with 10 different themes. To make your site to look right, you **must** add one of the theme classes to your `body` element. Valid theme classes are `lightpurple`, `lightblue`, `lightgreen`, `lightyellow`, `lightmuted`, `darkpurple`, `darkblue`, `darkgreen`, `darkyellow`, and `darkmuted`.

You can find more information (primary hue, recommended meta `theme-color` and canon theme names) in the [themes.json](themes.json) file.

Different theme classes can be applied to child elements should you wish to use a different theme for a portion of your site.

## Utility CSS
Tropical ships with a handful of useful CSS classes for making flex layouts and applying different colour meanings.

### Flex layout classes
| Class | Description |
| --- | --- |
| `row` | Sets the element's display to `flex` |
| `col` | Sets the element's display to `flex` and `flex-direction` to `column` |
| `gap-X` | Sets the element's `gap` to a pixel value `X`, where `X` is 2, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28, or 30 |
| `flex-grow` | Sets `flex-grow` to `1` |
| `flex-no-shrink` | Sets `flex-shink` to `0` |
| `flex-wrap` | Sets `flex-wrap` to `wrap` |
| `align-X` | Sets `align-items` to `X`, where `X` is `start`, `center`, or `end` |
| `justify-X` | Sets `justify-content` to `X`, where `X` is `start`, `center`, or `end` |
| `xs` | Turns a row into a column when the screen is less than 480px wide |
| `sm` | Turns a row into a column when the screen is less than 540px wide |
| `md` | Turns a row into a column when the screen is less than 720px wide |
| `lg` | Turns a row into a column when the screen is less than 960px wide |
| `xl` | Turns a row into a column when the screen is less than 1200px wide |

### Text classes
| Class | Description |
| --- | --- |
| `text-success` | Turns the text green |
| `text-warning` | Turns the text yellow |
| `text-danger` | Turns the text red |
| `text-left` | Aligns the text to the left |
| `text-center` | Aligns the text to the center |
| `text-right` | Aligns the text to the right |

### Miscellaneous classes
| Class | Description |
| --- | --- |
| `no-margin` | Sets the element's `margin` to `0px` |
| `no-padding` | Sets the element's `padding` to `0px` |
| `no-select` | Sets `user-select` to `none` |

## Buttons
Buttons are customized by adding the `btn` class, which works with `<button>` and `<a>` elements.

### Colours
By default, the button's background will be inverted from that of the current theme. The colour of the button can be changed by adding one of a handful of extra classes:

| Class | Description |
| --- | --- |
| `secondary` | Makes the button's background slightly differ from the background |
| `tertiary` | Makes the button's background the same as the background |
| `success` | Makes the button's background green |
| `warning` | Makes the button's background yellow |
| `danger` | Makes the button's background red |

### Adding icons
You can add icons to buttons (either before or after the label) by adding an inner element with the `icon` class. The inner text of this icon element should contain a valid [Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) name.

```html
<button class="btn success">
    <span class="icon">save</span>
    Save draft...
</button>
```

#### Icon-only buttons
If you want a circular button that only has an icon, you can add the `iconOnly` class to the button, then add the inner icon element as described above.

```html
<button class="btn danger iconOnly">
    <span class="icon">delete</span>
</button>
```

### Size
You can change the size of buttons by adding the `small` or `large` classes, which make the button slightly smaller or larger, respectively.

### Disabled buttons
Buttons that are disabled will appear greyed out and will not respond to clicks. Only `<button>` elements can be disabled, as they support the `disabled` attribute.

## Textboxes
Text input elements are customized by adding the `textbox` class.

### Text inputs
Any normal text input element (type `text`, `email`, `password`, etc.) works like you would expect:

```html
<div class="col gap-10">
    <div>
        <label>Username</label>
        <input type="text" class="textbox" placeholder="Username">
    </div>
    <div>
        <label>Password</label>
        <input type="password" class="textbox" placeholder="Password">
    </div>
</div>
```

### Textareas
To create a custom `<textarea>` (multi-line textbox) element, you need to wrap the textarea in a parent `<div>` and give the `textbox` class to that parent:

```html
<div class="textbox">
    <textarea id="input" rows="5" placeholder="Type in me!"></textarea>
</div>
```

This makes the scrollbar work properly with our rounded corners.

#### Expandable textareas
By design, `<textarea>` elements don't expand when their contents overflow the bottom of the element. Tropical has an optional fix for this, which you can activate by adding a `data-make-expandable` attribute to the element:

```html
<div class="textbox">
    <textarea id="input" placeholder="Type in me!" data-make-expandable="true"></textarea>
</div>
```

## Progress bars
Progress bars are styled by default, so they don't require any extra classes. To create a progress bar, just make a `<progress>` element and assign it some attributes:

```html
<progress min="0" max="100" value="42"></progress>
```

### Changing the colour
Additionally, you can add one of a few colour classes to change the colour of the progress bar:

| Class | Description |
| --- | --- |
| `success` | Turns the progress bar green |
| `warning` | Turns the progress bar yellow |
| `danger` | Turns the progress bar red |

Note that progress elements without a value will appear indeterminate, which is useful for representing actions where the current progress is unknown.

## Range sliders
Tropical overhauls how range sliders are handled, providing an easy way to display them with a background (filled portion). To create a custom range slider, just make a `<div>` with the `slider` class.

```html
<div class="slider"></div>
```

### Configuration

Next, add data attributes to configure the slider:

| Attribute | Description |
| --- | --- |
| `data-min` | The minimum value of the slider - defaults to 0 |
| `data-max` | The maximum value of the slider - defaults to 100 |
| `data-value` | The starting value of the slider - defaults to 0 |
| `data-step` | The step size of the slider - defaults to 1 |
| `data-textbox` | A selector for an input element to link to the slider's value |
| `data-range-id` | An ID to give to the inner range input |
| `data-prog-id` | An ID to give to the inner progress input |

Not all of these data values are required. Only use the ones that you need.

```html
<div class="row align-center gap-10">
    <div style="width: 100px">
        <input id="sliderValue" class="textbox" type="number">
    </div>
    <div class="flex-grow">
        <div class="slider"
             data-min="0"
             data-max="100"
             data-value="69"
             data-textbox="#sliderValue"></div>
    </div>
</div>
```

### Handling changes
When initialized, Tropical will automatically populate the slider element with inner `<progress>` and `<input type="range">` elements. Changing the slider element's data values after this point will have no effect, so to make changes to these values, target those new inner elements instead.

If you change the value of the range or progress elements using Javascript, you'll need to dispatch `change` events on them to update the slider's appearance:

```js
const sliderInners = document.querySelectorAll('#my-slider > *');
for (const el of sliderInners) {
    el.dispatchEvent(new Event('change'));
}
```

## Code blocks
It's good practice to make code blocks by putting your code inside of `<pre><code></code></pre>` elements, so that's how Tropical handles it. This also makes scrollbars play nicely with our rounded corners.

```html
<pre><code>
const myVar = 42;
</code></pre>
```

### Syntax highlighting
Tropical's syntax highlighting is handled by [Prism](https://prismjs.com/), and can be activated by adding Prism to your site (detailed above), and adding a `language-X` class to your `<code>` elements, where `X` is the language you want to highlight. While we don't support all of Prism's languages, you can find all valid language classes [here](https://prismjs.com/#supported-languages).

```html
<pre><code class="language-javascript">
const myVar = 42;
</code></pre>
```

## Notices
Notices are special elements that are meant to draw the attention of the user. To create a notice, start with a `<div>` element and add the `notice` class. Then, create another `<div>` element inside of it and give it the `body` class.

```html
<div class="notice">
    <div class="body">
        <p>This is some important text!</p>
    </div>
</div>
```

### Adding an icon
Optionally, you can add an icon to the notice by creating another `<div>` above the body and giving it the `icon` class. The inner text of this icon element should contain a valid [Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) name.

```html
<div class="notice">
    <div class="icon">info</div>
    <div class="body">
        <p>This notice is here to give you some information!</p>
    </div>
</div>
```

## Tooltips
Tropical includes custom hover tooltips that are applied automatically to elements with a `title` attribute and support HTML content.

To disable the custom tooltip on an element, add a `data-no-tooltip` attribute to it.

```html
<!-- With custom tooltip -->
<div title="Hey custom tooltip!">Hover over me!</div>

<!-- With default tooltip -->
<div title="Hi default tooltip!" data-no-tooltip="true">Hover over me!</div>
```

## Custom context menus
Custom context menus are built using the `ContextMenuBuilder` and `ContextMenuItemBuilder` classes. These class' methods are chainable, meaning that you can build and show a context menu without ever needing to store a reference to it.

### Adding items
To add an item, call the `addItem()` method and pass it a callback function. This callback will be passed a new `ContextMenuItemBuilder` object, which you can use to configure the item.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item
        /* ... */);
```

#### Setting a label
Set the item's label by calling the `setLabel()` method and passing it a string.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item
        .setLabel('My item'));
```

#### Setting an icon
Set the item's icon by calling the `setIcon()` method and passing it a string. This string should be a valid [Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) name.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item
        .setLabel('My item')
        .setIcon('star'));
```

#### Setting a tooltip
Optionally, you can add a hover tooltip to the item, in the case that you want to display more information on hover. Add a tooltip with the `setTooltip()` method and pass it a string.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item
        .setLabel('My item')
        .setIcon('star')
        .setTooltip(`Here's some extra info!`));
```

#### Setting a click handler
If you want to make the item actually do something when clicked, you'll need to add a click handler. Do this with the `setClickHandler()` method and pass it a callback function to be called on click.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item
        .setLabel('My item')
        .setIcon('star')
        .setTooltip(`Here's some extra info!`)
        .setClickHandler(() => console.log('Clicked!')));
```

#### Disabling/enabling the item
You can disable the item by calling the `disable()` method. You can also re-enable it by calling the `enable()` method. This is especially useful if you need to conditionally disable an item based on the current state of the page.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item
        .setLabel('My item')
        .setIcon('star')
        .setTooltip(`Here's some extra info!`)
        .disable());
```

#### Building the item separately
You don't have to build your context menu items inside of the `addItem()` callback, and can instead create a new `ContextMenuItemBuilder` object, pass it your existing menu, then force the menu's `addItem()` method to return your item.

```js
const menu = new ContextMenuBuilder();
const item = new ContextMenuItemBuilder(menu)
    .setLabel('Secret item')
    .setIcon('star');
menu.addItem(() => item);
```

### Adding separators
To add a separator, all you need to do is call the `addSeparator()` method.

```js
const menu = new ContextMenuBuilder()
    .addItem(/* ... */)
    .addSeparator()
    .addItem(/* ... */)
    .addItem(/* ... */);
```

### Removing the space reserved for icons
If you don't want to add icons to your context menu, you can remove the space reserved for them by calling the `setIconVisibility()` method and passing it `false`.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item.setLabel('I have no icon!'))
    .addItem(item => item.setLabel('Neither do I!'))
    .setIconVisibility(false);
```

### Displaying the menu
There are a few ways to display the menu.

#### Show at cursor
To show the menu at the cursor's current position, call the `showAtCursor()` method. Chances are, this is the method you'll want to use.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item.setLabel(`Hi I'm an item!`))
    .showAtCursor();
```

#### Show at element
To show the menu at an HTML element, call the `showAtElement()` method and pass it the element. This will position the menu's origin corner (depending on screen position) at the center of the element.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item.setLabel(`Hi I'm an item!`))
    .showAtElement(document.querySelector('#my-element'));
```

#### Show at coordinates
To show the menu at specific x, y coordinates, call the `showAtCoords()` method and pass it your coordinates.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item.setLabel(`Hi I'm an item!`))
    .showAtCoords(100, 100);
```

### Hiding the menu
The menu will be hidden when clicked outside of, or when any of the items are clicked. If you want to hide it programmatically, use the `hide()` method.

```js
const menu = new ContextMenuBuilder()
    .addItem(item => item.setLabel(`Hi I'm an item!`))
    .showAtCursor();
// Hide the menu after 1 second
setTimeout(() => {
    menu.hide();
}, 1000);
```

## Custom popups
wip

## Custom toast notifications
wip