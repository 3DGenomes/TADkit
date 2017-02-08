{%- if doc.methods %}
## Methods

{%- for method in doc.methods %}
### {$ method.name $}
{$ method.description $}

{% if method.params %}
#### Parameters

| Param | Type | Details |
| :--: | :--: | :--: |
{%- for param in method.params %}
| {$ param.name | esc $} | {$ param.typeExpression | esc $} | {$ param.description | esc | marked | nobr $} |{% endfor -%}

{% endif %}

{% if method.this %}
#### Method's {% code %}this{% endcode %}</h4>

{$ method.this $}

{% endif %}

{% if method.returns %}
#### Returns</h4>

| Type | Description |
| :--: | :--: |
| {$ method.returns.typeExpression | esc $} | {$ method.returns.description | esc | marked | nobr $} |

{% endif %}

{% endfor -%}

{%- endif -%}
