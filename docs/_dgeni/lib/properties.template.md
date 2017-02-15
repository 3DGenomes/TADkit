{%- if doc.properties %}

## Properties
{%- for property in doc.properties %}
### {$ property.name $}

| Type | Description |
| :--: | :--: |
| {$ property.typeExpression | esc $} | {$ property.description | esc | marked | nobr $} |
  
{% endfor -%}

{%- endif -%}
