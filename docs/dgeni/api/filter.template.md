{% include "lib/macros.md" -%}
{% extends "api/api.template.md" %}

{% block additional %}

 ## Usage
### In HTML Template Binding
{% if doc.usage %}
```
{$ doc.usage $}
```

{% else %}

```html
{{ {$ doc.name $}_expression | {$ doc.name $}
{%- for param in doc.params %} : {$ param.name $}{% endfor -%}
}}
```

{% endif %}
{%- set sep = joiner(', ') -%}
### In JavaScript

```js
$filter('{$ doc.name $}')({% for param in doc.params %}{$ sep() $}{$ param.name $}{% endfor -%})
```

{% include "lib/params.template.md" %}
{% include "lib/this.template.md" %}
{% include "lib/returns.template.md" %}

{% endblock %}
