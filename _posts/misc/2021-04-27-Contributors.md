---
layout: page
title: Contributors
categories: secondary-pages
tags: Page Miscellaneous
useTOC: false
---
<div style="display: flex; margin-bottom: 2rem; flex-wrap: wrap;">
{% assign allAuthor = site.posts | map: "Author" %}
{% assign authorList = "" | split: ","%}
{% for postAuthor in allAuthor %}
    {% for author in postAuthor %}
        {% assign authorList = authorList | push: author %}
    {% endfor %}
{% endfor %}
{% assign uniqAuthor = authorList | uniq %}
{% for author in uniqAuthor %}
    {% assign count = 0 | to_integer %}
    {% for postAuthor in authorList %}
        {% if postAuthor == author %}
            {%assign count = count | plus: 1 %}
        {% endif %}
    {% endfor %}
<a class="tag" style="margin-top: 5px">{{ author }} ({{ count }})</a>
{% endfor %}
</div>

> 以上列表由 Jekyll 收集该网站所有页面作者后自动生成，最近一次更新于 {{ "now" | date: "%Y-%m-%d %H:%M" }}。

---

特别感谢 肖杰中，是清子，吴小满，林卓衡 在该网站初步构建和筛选USACO打卡时提供的帮助， 李云天 在美工方面的工作。

感谢 2017 - 2019 届的学长与学姐。本网站许多备赛材料来源于在学长学姐总结的资料基础上进行汇总，改编，修正。 

感谢 2019 - 2020 届的所有计算机科学方向学生，USACO 解析汇总中的解析都来源于他们的日常备赛打卡。