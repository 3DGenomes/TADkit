# directive

**Parameters**

-   `type` **object** Track type.
-   `title` **object** Track title.
-   `settings` **array** Track settings.
-   `view` **array** Track view.
-   `data` **array** Track data.
-   `overlay` **array** Value for toggle in template.
-   `toggleoverlay` **function** Toggle function in template.

**Examples**

```javascript
<example>
	<file name="index.html">
		<tk-component-track-barchart></tk-component-track-barchart>
	</file>
</example>
```

# directive

**Examples**

```javascript
`<body route-css-classnames>`
```

# shared

**Examples**

```javascript
`angular.module('myModule',['shared']);`
```

# shared.Color

# shared.Color#colorsFromIni

**Parameters**

-   `text` **value** data.
-   `data`  

Returns **Object** Generate 'colors list' Object from INI data.

# shared.Color#nameToHex

**Parameters**

-   `name` **string** The color name to convert eg.red

Returns **string** The corresponding CSS hex color eg.#ff0000

# shared.Color#testIfHex

**Parameters**

-   `v` **value** The color value to test.

Returns **boolean** true or false.

# shared.Color#THREEColorsFromHex

**Parameters**

-   `data` **Array** Array of CSS hex colors.

Returns **Array** The corresponding THREE Color to Array of THREE Colors

# shared.Color#vertexColorsFromTHREEColors

**Parameters**

-   `colors` **Array** Array of THREE Colors.

Returns **Float32Array** Float32 Array of RGB color components

# shared.Utils

# shared.Utils#whatIsIt

**Parameters**

-   `value` **object** to be returned.
-   `object`  

Returns **string** description of object type
[ null | undefined | String | Array | Object | don't know ].

# TADkit

**Examples**

```javascript
<example>
	<file name="index.html">
		<div ng-app="TADkit" route-css-classnames>
			<div data-ui-view id="main" class="fullheight"></div>
		</div>
	</file>
</example>
```

# TADkit.App

# TADkit.App#init

Returns **array** returned promises.

# TADkit.App#load

Returns **array** returned promises

# TADkit.Components

# TADkit.Datasets

# TADkit.Init

# TADkit.Overlays

# TADkit.OverlaysImport

# TADkit.Projects

# TADkit.Settings

# TADkit.Storyboards

# TADkit.Users
