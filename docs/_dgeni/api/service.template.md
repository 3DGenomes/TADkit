{% extends "api/object.template.md" %}

{% block related_components %}
{% if doc.providerDoc -%}* [{$ doc.providerDoc.name $}]({$ doc.providerDoc.path $}){%- endif %}

{% endblock %}
