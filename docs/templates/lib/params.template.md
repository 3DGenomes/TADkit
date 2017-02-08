{%- if doc.params %}

### Arguments

| Param | Type | Details |
| :--: | :--: | :--: |
{%- for param in doc.params %}
| {$ param.name | esc $} | {$ param.typeExpression | esc $} | {$ param.description | esc | marked | nobr $} |{% endfor -%}

{%- endif -%}
