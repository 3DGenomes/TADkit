{% extends "base.template.md" %}

{% block content %}

{% block header %}

# {$ doc.name $}

{% block related_components %}{% endblock %}

{% endblock %}


{% block description %}

{$ doc.description $}

{% endblock %}

{% if doc.deprecated %}

## Deprecated API

{$ doc.deprecated $}

{% endif %}

{% block dependencies %}
{%- if doc.requires %}

## Dependencies

{% for require in doc.requires %}
* {$ require $}{% endfor %}

{% endif -%}
{% endblock %}

{% block additional %}
{% endblock %}

{% endblock %}
