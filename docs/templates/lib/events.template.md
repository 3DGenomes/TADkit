{%- if doc.events %}
## Events

{%- for event in doc.events %}
### {$ event.name $}

{$ event.description | esc | marked | nobr $}

{%- if event.eventType == 'listen' %}
#### {$ event.eventTarget $}
{%- else %}
#### Type:
{$ event.eventType $}

#### Target:
{$ event.eventTarget $}

{% endif -%}

{% endfor -%}

{% endif -%}
