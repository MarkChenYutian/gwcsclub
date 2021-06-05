---
layout: page
comment: true
title: 第三方服务维护指南
tags: [Page, Miscellaneous]
Author: Mark
---

## 评论区

网页的评论区基于 `Valine` 与 `lean cloud` 搭建

```html
{% include thirdParty/comment.html %}
```

<div class="button-box">
    <button class="main-button" onclick="window.location.href='https://valine.js.org/'">Valine JS Documentation</button>
    <button class="main-button" onclick="window.location.href='https://www.leancloud.cn/'">Lean Cloud Homepage</button>
    <button class="main-button" onclick="window.location.href='https://console.leancloud.cn/apps'">Lean Cloud Console</button>
</div>

## 百度统计

百度统计的代码在源文件中的 `./_includes/thirdParty/baidu-Statistics.html` 中

```html
{% include thirdParty/baidu-Statistics.html %}
```

<div class="button-box">
    <button class="main-button" onclick="window.location.href='https://tongji.baidu.com/web/10000346490/overview/index?siteId=16567903'">Baidu Statistics Site</button>
</div>
