{% include "lib/macros.md" -%}
{% extends "api/directive.template.md" %}

{% block usage %}
## Usage
```
<input type="{$ doc.inputType $}"
  {%- for param in doc.params %}
       {$ directiveParam(param.alias or param.name, param.type, '="', '"') $}
  {%- endfor %}>
```
{% endblock %}