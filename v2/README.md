
#### [View this README rendered with Tropical](https://src.simplecyber.org/tropical/readme.html)

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
| `align-left` | Aligns the text to the left |
| `align-center` | Aligns the text to the center |
| `align-right` | Aligns the text to the right |

### Miscellaneous classes
| Class | Description |
| --- | --- |
| `no-margin` | Sets the element's `margin` to `0px` |
| `no-padding` | Sets the element's `padding` to `0px` |
| `no-select` | Sets `user-select` to `none` |

## Buttons
Buttons are customized by adding the `btn` class, which works with `<button>` and `<a>` elements.

### Colours
By default, the button will be inverted from the theme's background colour. The colour of the button can be changed by adding one of a handful of extra classes:

| Class | Description |
| --- | --- |
| `secondary` | Makes the button's background slightly differ from the background |
| `tertiary` | Makes the button's background the same as the background |
| `success` | Makes the button's background green |
| `warning` | Makes the button's background yellow |
| `error` | Makes the button's background red |

### Icons
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

## Range sliders
wip

## Progress bars
wip

## Code blocks
wip

## Notices
wip

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
Custom context menus are built using the `ContextMenuBuilder` class. This class' methods are chainable, meaning that you can build and show a context menu without ever needing to store a reference to it. Here it is in action:

```js
const el = document.querySelectorAll('#my-element');
new ContextMenuBuilder()
    .addItem(item => item
        .setLabel(`Here's an item`)
        .setIcon(`info`)
        .setClickHandler(() => console.log(`It works!`)))
    .addSeparator()
    .addItem(item => item
        .setLabel(`Here's another item`)
        .setIcon(`settings`)
    .addItem(item => item
        .setLabel(`This one has no icon`))
    .addItem(item => item
        .setLabel(`And this one's disabled`)
        .setIcon('close')
        .disable())
    .showAtElement(el);
```

## Custom popups
wip

## Custom toast notifications
wip