---
layout: page
title: Neural Network Posts
Author: 
tags: ["Page"]
---

这里会不定期的更新一些神经网络模型的论文笔记，如果对这个方向感兴趣的可以看看。


<div class="horizontal-flex-box">
{% assign all_posts = site.posts | where: "tags", "Neural Network" %}
{% for p in all_posts %}
<div class="flex-page-card" onclick="window.location.href='{{ site.baseurl }}{{ p.url }}'">
    <h3>{{p.title}}</h3>
    <blockquote>
        {% if p.Author != nil %}
        {% include fn/icon.html type="people" size="1.5rem" %}
        {{ p.Author | join: ', '}} | 
        {% endif %}
        {% include fn/icon.html type="calander" size="1.5rem" %}
        {{ p.date | date_to_string }}
    </blockquote>
    <div class="horizontal-flex-box">
        <p>{{ p.content | strip_html | escape | slice: 0, 200}} ...</p>
        <!--<img src="{{p.excrept_pic}}" width="40%" height="40%"/>-->
    </div>
</div>
{% endfor %}
</div>

<div style="background: url('../../../../assets/neural_network.svg') no-repeat right bottom; height: 20rem; background-size: contain;"/>