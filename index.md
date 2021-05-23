---
layout: home_page
title: {{ site.name }}
useTOC: false
---

<h1>快速链接</h1>
<div class="horizontal-flex-box">
    <div 
        class="flex-page-card"
        onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/31/To-Beginners.html'"
    >
        <h2>初学者指南</h2>
        <div class="horizontal-flex-box">
            <p>如果你刚刚接触CS，看看这里吧！这里罗列了一些初学者常常遇到的问题 - 例如 “如何应对程序报错？” 等。</p>
            <img class="mainPage-img" src="/assets/compass.png" height="20%" width="20%"/>
        </div>
    </div>
    <div class="flex-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/03/04/notes.html'">
        <h2>笔记</h2>
        <div class="horizontal-flex-box">
            <p>这里是学长学姐们写的一些关于CS的专题笔记，如果你自己有一些专题的笔记，也可以发给我们挂到这里分享给大家一起看</p>
            <img class="mainPage-img" src="/assets/notes.png" height="20%" width="20%"/>
        </div>
    </div>
    <div class="flex-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Competitions.html'">
        <h2>竞赛</h2>
        <div class="horizontal-flex-box">
            <p>计算机有许多相关的竞赛，我们收集整理了其中比较有含金量的部分的比赛简介，赛制和时间以及一些准备建议</p>
            <img class="mainPage-img" src="/assets/competition.png" height="20%" width="20%"/>
            <p>目前，我们提供 USACO 的历年真题解析与 ACSL 讲义</p>
        </div>
    </div>
    <div class="flex-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Schedule.html'">
        <h2>日程安排</h2>
        <div class="horizontal-flex-box">
            <p>这里记录了最近的比赛日程。如果你想预约TA也可以在这里预约。</p>
            <img class="mainPage-img" src="/assets/schedule.png" height="20%" width="20%"/>
        </div>
    </div>
    <div class="flex-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Computer-Science+.html'">
        <h2>Computer Science +</h2>
        <div class="horizontal-flex-box">
            <p>CS当然不止有竞赛！这里罗列了一些学长学姐们自己做的一些project，例如小游戏，小工具和科研结果，有空的时候可以在这里看看，拓宽一下视野。这里还有学长学姐们博客的链接🔗，有空可以来串串门哦 ：）</p>
            <img class="mainPage-img" src="/assets/cs+.png" height="20%" width="20%"/>
        </div>
    </div>
    <div class="flex-page-card" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/About-Us.html'">
        <h2>关于我们</h2>
        <div class="horizontal-flex-box">
            <p>关于广外 CS 社的一切</p>
            <img class="mainPage-img" src="/assets/cs+.png" height="20%" width="20%"/>
        </div>
    </div>
</div>

---

<h1>最近更新</h1>

> Jekyll 动态生成的网页最新页面汇总，点击卡片查看原文

<div class="horizontal-flex-box">
{% assign new_posts = site.posts | slice: 0, 3 %}
{% for p in new_posts %}
    {% if p.Author %}
        {% assign author = p.Author %}
    {% else %}
        {% assign author = "undefined" %}
    {% endif %}
    <div class="flex-page-card" onClick="window.location.href='{{ site.baseurl }}{{ p.url }}'">
        <h3>{{p.title}}</h3>
        <blockquote>作者：{{author}}, {{ p.date | date: "%Y/%m/%d"}}</blockquote>
        <p>{{ p.content | strip_html | escape | slice: 0, 150}} ...</p>
    </div>
{% endfor %}
</div>

---

<h1>日程安排</h1>

{% include schedule.html %}