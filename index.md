---
layout: home_page
title: {{ site.name }}
---

<h1>主要页面</h1>
<div class="horizontal-grid-box">
    <div 
        class="grid-page-card"
        onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/31/To-Beginners.html'"
    >
        <h2>初学者指南</h2>
        <div class="horizontal-flex-box">
            <p>如果你刚刚接触CS，看看这里吧！这里罗列了一些初学者常常遇到的问题 - 例如 “如何应对程序报错？” 等。</p>
            <img style="padding: 1rem" src="/assets/compass.png" height="25%" width="25%"/>
        </div>
    </div>
    <div class="grid-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/03/04/notes.html'">
        <h2>笔记</h2>
        <div class="horizontal-flex-box">
            <p>这里是学长学姐们写的一些关于CS的专题笔记，如果你自己有一些专题的笔记，也可以发给我们挂到这里分享给大家一起看</p>
            <img style="padding: 1rem" src="/assets/notes.png" height="25%" width="25%"/>
        </div>
    </div>
    <div class="grid-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Competitions.html'">
        <h2>竞赛</h2>
        <div class="horizontal-flex-box">
            <p>计算机有许多相关的竞赛，我们收集整理了其中比较有含金量的部分的比赛简介，赛制和时间以及一些准备建议</p>
            <img style="padding: 1rem" src="/assets/competition.png" height="25%" width="25%"/>
            <p>目前，我们提供 USACO 的历年真题解析与 ACSL 讲义</p>
        </div>
    </div>
    <div class="grid-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Schedule.html'">
        <h2>日程安排</h2>
        <div class="horizontal-flex-box">
            <p>这里记录了最近的比赛日程。如果你想预约TA也可以在这里预约。</p>
            <img style="padding: 1rem" src="/assets/schedule.png" height="25%" width="25%"/>
        </div>
    </div>
    <div class="grid-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Computer-Science-Plus.html'">
        <h2>Computer Science +</h2>
        <div class="horizontal-flex-box">
            <p>CS当然不止有竞赛！这里罗列了一些学长学姐们自己做的一些project，例如小游戏，小工具和科研结果，有空的时候可以在这里看看，拓宽一下视野。这里还有学长学姐们博客的链接🔗，有空可以来串串门哦 ：）</p>
            <img style="padding: 1rem" src="/assets/cs_plus.png" height="25%" width="25%"/>
        </div>
    </div>
    <div class="grid-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/About-Us.html'">
        <h2>关于我们</h2>
        <div class="horizontal-flex-box">
            <p>关于广外 CS 社和这个网站的一切</p>
            <img style="padding: 1rem" src="/assets/AboutUs.png" height="25%" width="25%"/>
        </div>
    </div>
</div>

---

<h1>快速链接</h1>

<div class="button-box">
    <button class="main-button" onClick="window.location.href='{{ site.baseurl }}/2021/06/17/General-Solution-Index.html'"> 打卡文件汇总 </button>
    <button class="main-button" onClick="window.location.href='{{ site.baseurl }}/2021/03/04/algorithm-home.html'"> 算法笔记 </button>
    <button class="main-button" onClick="window.location.href='{{ site.baseurl }}/2021/06/11/yaml-generator.html'"> 打卡文件生成器 </button>
    <button class="main-button" onClick="window.location.href='{{ site.baseurl }}/2021/07/30/online-editor.html'"> 即时预览编辑器 </button>
</div>

---

<h1>最近更新</h1>

<div class="horizontal-flex-box" style="flex-wrap:nowrap; padding: 2rem; overflow-x: auto">
{% assign new_posts = site.posts | slice: 0, 5 %}
{% assign c = 0 %}
{% for p in new_posts %}
    {% if p.Author == empty %}
        {% assign author = p.Author %}
    {% else %}
        {% assign author = "undefined" %}
    {% endif %}
    {% unless c == 0 %}
        <div 
            class="flex-page-card pop-card {% if c > 2 %}only-display-at-large{% endif %}" 
            onClick="window.location.href='{{ site.baseurl }}{{ p.url }}'" 
            style="margin-left: -15rem;">
            <h3>{{p.title}}</h3>
            <blockquote>
                {% if p.Author != nil %}
                {% include fn/icon.html type="people" size="1.5rem" %}
                {{ p.Author | join: ', '}} | 
                {% endif %}
                {% include fn/icon.html type="calander" size="1.5rem" %}
                {{ p.date | date_to_string }}
            </blockquote>
            <p>{{ p.content | strip_html | escape | slice: 0, 200 }} ...</p>
        </div>
    {% else %}
        <div 
            class="flex-page-card pop-card"
            onClick="window.location.href='{{ site.baseurl }}{{ p.url }}'" >
            <h3>{{p.title}}</h3>
            <blockquote>
                {% if p.Author != nil %}
                {% include fn/icon.html type="people" size="1.5rem" %}
                {{ p.Author | join: ', '}} | 
                {% endif %}
                {% include fn/icon.html type="calander" size="1.5rem" %}
                {{ p.date | date_to_string }}
            </blockquote>
            <p>{{ p.content | strip_html | escape | slice: 0, 200}} ...</p>
        </div>
    {% endunless %}
    {% assign c = c | plus: 1 %}
{% endfor %}
</div>
