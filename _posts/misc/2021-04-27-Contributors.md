---
layout: page
title: Contributors
categories: secondary-pages
tags: Page Miscellaneous
---

网站的贡献者（排名不分先后）：

{% assign allAuthor = site.posts | map: "Author" %}
{% assign grouped_elements = site.posts | group_by: "Author" %}

<table style="width: max-content;">
    <thead><tr><th style="width: 25rem;">作者</th><th style="width: 25rem;">页面数量</th></tr></thead>
    <tbody>
{% for elem in grouped_elements %}
{% unless elem.name == ""%}
        <tr><td style="width: 25rem;">{{ elem.name }}</td><td style="width: 25rem;">{{ elem.size }}</td></tr>
{% endunless %}
{% endfor %}
    </tbody>
</table>

> 以上列表由 Jekyll 收集该网站所有页面作者后自动生成，最近一次更新于 {{ "now" | date: "%Y-%m-%d %H:%M" }}。

---

特别感谢 肖杰中，是清子，吴小满，林卓衡 在该网站初步构建和筛选USACO打卡时提供的帮助， 李云天 在美工方面的工作。

感谢 2017 - 2019 届的学长与学姐。本网站许多备赛材料来源于在学长学姐总结的资料基础上进行汇总，改编，修正。 

感谢 2019 - 2020 届的所有计算机科学方向学生，USACO 解析汇总中的解析都来源于他们的日常备赛打卡。