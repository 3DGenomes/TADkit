{% block content %}
# {%- if doc.title -%}{$ doc.title $}{%- elif doc.module -%}{$ doc.groupType $} components in {$ doc.module | code $}{%- else -%}{$ doc.groupType $}{%- endif -%}

{$ doc.description $}

| Name | Description |
| :--: | :--: |{% for page in doc.components %}
| {$ page.name $} | {$ page.description | firstLine | marked | nobr $} |{% endfor %}

{% endblock %}