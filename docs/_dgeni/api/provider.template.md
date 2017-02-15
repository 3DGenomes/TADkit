{% extends "api/object.template.md" %}

{% block related_components %}
{% if doc.serviceDoc -%}
* [{$ doc.serviceDoc.name $}]({$ doc.serviceDoc.path $})
{%- endif %}

{% endblock %}
