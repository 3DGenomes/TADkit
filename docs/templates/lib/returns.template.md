{% if doc.returns -%}
### Returns

| Type | Description |
| :--: | :--: |
| {$ doc.returns.typeExpression | esc $} | {$ doc.returns.description | esc | marked | nobr $} |

{%- endif %}