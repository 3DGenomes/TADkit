{% extends "base.template.md" %}

{% block content %}
# {% if doc.title %}{$ doc.title $}{% else %}{$ doc.name $}{% endif %}

{$ doc.description $}

{% if doc.name != 'ng' and doc.name != 'auto' %}
## Installation

First include {$ doc.packageFile $} in your HTML:

```
<script src="angular.js">
<script src="{$ doc.packageFile $}">
```

You can download this file from the following places:

* (Google CDN)[https://developers.google.com/speed/libraries/devguide#angularjs]<br>e.g. {$ ("//ajax.googleapis.com/ajax/libs/angularjs/X.Y.Z/" + doc.packageFile) | code $}
* (Bower)[http://bower.io]<br>e.g. {% code %}bower install {$ doc.packageName $}@X.Y.Z{% endcode %}
* (code.angularjs.org)[http://code.angularjs.org]<br>e.g. {% code %}"//code.angularjs.org/X.Y.Z/{$ doc.packageFile $}"{% endcode %}

where X.Y.Z is the AngularJS version you are running.

Then load the module in your application by adding it as a dependent module:

```
angular.module('app', ['{$ doc.name $}']);
```

With that you&apos;re ready to get started!

{% endif %}

{% if doc.componentGroups %}
## Module Components
{% for componentGroup in doc.componentGroups %}
### {$ componentGroup.groupType $}

| Name | Description |
| :--: | :--: |{% for component in componentGroup.components %}
| {$ component.name $} | {$ component.description | firstLine | marked | nobr $} |{% endfor %}

{% endfor %}
{% endif %}

{% if doc.usage %}
## Usage
```
{$ doc.usage $}
```

{% endif %}

{% endblock %}