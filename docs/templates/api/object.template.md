{% include "lib/macros.md" %}
{% extends "api/api.template.md" %}

{% block additional %}  

{% if doc.params or doc.returns or doc.this or doc.kind == 'function' -%}
## Usage
{% if doc.usage %}
```
{$ doc.usage $}
```

{% else %}
{%- set sep = joiner(', ') -%}

```js
{$ doc.name $}({%- for param in doc.params %}{$ sep() $}{%- if param.type.optional %}[{% endif -%}{$ param.name $}{%- if param.type.optional %}]{% endif -%}{% endfor %});
```

{% endif %}

{% include "lib/params.template.md" %}
{% include "lib/this.template.md" %}
{% include "lib/returns.template.md" %}
{%- endif %}

{% include "lib/methods.template.md" %}
{% include "lib/events.template.md" %}
{% include "lib/properties.template.md" %}

{% endblock %}
