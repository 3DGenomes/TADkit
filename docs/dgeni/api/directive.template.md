{% include "lib/macros.md" -%}
{% extends "api/api.template.md" %}

{% block additional %}
## Directive Info

{% if doc.scope %}* This directive creates new scope.{% endif %}
* This directive executes at priority level {$ doc.priority $}.

{% block usage %}
## Usage

{% if doc.usage %}
```
{$ doc.usage $}
```

{% else %}

{% if doc.restrict.element %}
* as element:{% if doc.name.indexOf('ng') == 0 -%}(This directive can be used as custom element, but be aware of <a href="guide/ie">IE restrictions</a>).{%- endif %}
    ```
    <{$ doc.name | dashCase $}
      {%- for param in doc.params %}
      {$ directiveParam(param.alias or param.name, param.type, '="', '"') $}
      {%- endfor %}>
    ...
    </{$ doc.name | dashCase $}>
    ```
{% endif -%}
{%- if doc.restrict.attribute -%}
* as attribute:
    ```
    <{$ doc.element $}
      {%- for param in doc.params %}
      {$ directiveParam(param.name, param.type, '="', '"') $}
      {%- endfor %}>
    ...
    </{$ doc.element $}>
    ```
{% endif -%}
{%- if doc.restrict.cssClass -%}
* as CSS class:
    ```
    {% set sep = joiner(' ') %}
    <{$ doc.element $} class="
    {%- for param in doc.params -%}
      {$ sep() $}{$ directiveParam(param.name, param.type, ': ', ';') $}
    {%- endfor %}"> ... </{$ doc.element $}>
    ```
{% endif -%}

{%- endif %}

{% endblock -%}

{%- if doc.animations %}
## Animations
{$ doc.animations $}
{$ 'module:ngAnimate.$animate' $} to learn more about the steps involved in the animation.
{%- endif -%}

{% include "lib/params.template.md" %}
{% include "lib/events.template.md" %}
{% endblock %}
