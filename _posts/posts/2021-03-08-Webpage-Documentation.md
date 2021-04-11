---
layout: page
comment: false
title: 广州外国语学校计算机科学社团官网维护指南与文档
tags: Miscellaneous
Author: Mark
---

<div class="error">
    <h4>尚未编写完成的页面……</h4>
    <p>这个页面内容正在编写中，可能会随时更新</p>
</div>

<div class="notification">
    <h4>如果你只是想在这个网站上添加页面……</h4>
    <p>
        这篇文章中涉及很多技术细节，如果你只是希望能够将自己写的页面添加到该网站，而不进行具体的样式，结构修改，你可以选择跳过所有标题末尾是*号的部分。
    </p>
</div>



### 网站技术环境\*

<div class="info">
    <p>
        需要的前置技能：Git 的 add, commit, 分支, merge, push, pull, clone 等基本操作
    </p>
</div>

GW Computer Science 的网站是使用 Jekyll 自动构建的**静态页面**网站。网站由 Gitee Pages 提供托管服务。网站的源代码存储在码云(Gitee) 的远程 Git 代码仓库（链接：https://gitee.com/gwcompsci/gwcompsci）中。每次更新完源代码，push 到远程仓库并且与 `gh-pages` 分支合并后，点击 “服务 > Gitee Pages > 更新” 网站就会自动更新并部署在 http://gwcompsci.gitee.io 上。

在进行结构与样式上的改动时，**强烈推荐**在自己本地安装 Jekyll 服务端，这样就可以在本地实时预览自己修改的样式结果。具体安装方法见以下链接：

https://jekyllrb.com/docs/installation/

安装成功后，在命令行中 `cd` 到网页源代码的根目录上，输入

```bash
$ bundle exec jekyll serve
```

如果 jekyll 安装成功，应该出现以下内容

```
Configuration file: D:/GZFLS CS Club/gwcompsci/_config.yml
       Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `plugins: [jekyll-paginate]` in your 
configuration file.
            Source: D:/GZFLS CS Club/gwcompsci
       Destination: D:/GZFLS CS Club/gwcompsci/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 1.28 seconds.
 Auto-regeneration: enabled for 'D:/GZFLS CS Club/gwcompsci'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

这时候访问 localhost:4000 或 http://127.0.0.1:4000/ 就可以看见实时更新的网页了。

### 自动构建原理

在网站源代码目录下，可以看到以下几个目录：
```
root
  |- _includes
  |- _layouts
  |- _posts
  |- assets
  |- css
```
这些目录在自动构建网页时的作用各不相同，下面我会详细介绍每个目录的作用。

#### _includes

这个文件夹中可以定义一些 `html` 代码模块。这些模块可以在不同的 `layout` 中复用。通过这样的设定，我们可以最大程度的提取模板之间的相同模块，从而达到 “改一处” 模块，所有相同的模块都同步变化。

例子：在 `_include/nav-bar.html" 中，我们定义了网站的顶部导航栏。其中的代码如下：

```html
<section class="top-nav-box">
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/31/To-Beginners.html'">初学者指南</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/03/04/notes.html'">笔记</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Competitions.html'">竞赛</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/All-Posts.html'">页面汇总</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/About-Us.html'">关于我们</div>
</section>
```

当我们想在 `_layouts` 中的模板里加入顶部导航栏时，我们只需要这样写：

```html
<!-- import the top-navigation bar -->
{% raw %}{% include nav-bar.html %}{% endraw %}
<!-- some content below -->
```

Jekyll 构建网站的时候就会自动帮我们把上面的代码转化为这样……

```html
<!-- import the top-navigation bar -->
<section class="top-nav-box">
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/31/To-Beginners.html'">初学者指南</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/03/04/notes.html'">笔记</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/Competitions.html'">竞赛</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/All-Posts.html'">页面汇总</div>
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/About-Us.html'">关于我们</div>
</section>
<!-- some content below -->
```

现在这个网站里面的 `_include` 组件有以下几个：

| _include 组件      | 组件描述                                                  |
| ------------------ | --------------------------------------------------------- |
| head.html          | 统一所有页面引入的 CSS 样式表，引入 Javascript 文件        |
| nav-bar.html       | 网页的顶部导航栏                                         |
| page-footer.html   | 网页的页脚（此网站由……维护）那一部分                       |
| page-header.html   | **除了首页以外** 网页的页眉（ GW Computer Science Club ） |
| page-toc.html      | 使用 Javascript 自动生成的页面目录                        |
| report-problem.html| 页面左下角悬浮按钮，点击后弹出“汇报错误”窗口                |
| comment.html       | 基于 valine + leancloud 的评论区                         |

#### _layouts

`_layouts` 文件夹中定义了网站各个网页的“模板”，在自动构建的过程中，Jekyll 会将模板中的 `{% raw %}{{ content }}{% endraw %}` 这一行替换为 markdown 文件解析后产生的 html。

一个 markdown 文件要通过配置 yaml 文件头 `layout: layout_name` 的方式指定使用哪个模板。如果没有显式的指定模板，Jekyll会自动将markdown渲染到 `default.html` 这个模板上。

> 例子 - 假如我的 markdown 文件是这样的：
> ```markdown
> ---
> layout: exampleLayout
> ---
> # Hello World!
> ```
> 
> 在 _layouts 文件夹中，有一个模板 `exampleLayout.html`，其中是这样定义的：
> ```html
> <body>
>   <p>This is the example layout.</p>
>   <section class="main">
>       {% raw %}{{ content }}{% endraw %}
>   </section>
> </body>
> ```
> 
> 那么 Jekyll 就会在自动构建的时候：
> 
> Step 1. 将 markdown 文件先解析成 html 文件
> 
> ```html
> <h2>Hello World!</h2>
> ```
> 
> Step 2. 将解析后的 html 套入模板，生成 html 文件
> 
> ```html
> <body>
>   <p>This is the example layout.</p>
>   <section class="main">
>       <h2>Hello World!</h2>
>   </section>
> </body>
> ```

目前网站上使用的 _layout 有以下几种：

| _layout 模板      | 模板描述                                                     | 使用场景                                              |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| default.html      | 定义了最基础的网页样式，包括引入样式表，JS，页眉页脚，*自动生成的目录* | （无）                                                |
| home_page.html    | 主页的模板，页面最顶部有覆盖整个屏幕的 `main-page-header` 元素。 | 网站主页                                              |
| page.html         | 网页的一般页面模板，**“继承”自 default.html**，在 default.html 的基础上增加了页面的标题，创作时间，返回上一页和回到主页按钮 | 一系列 post 的汇总页面                                |
| post.html         | 文章的一般页面模板，**”继承“自 default.html**，在 default.html 的基础上增加了页面的标题，创作时间，作者，返回上一页和回到主页按钮，”报告错误“悬浮按钮 和 底部的评论区。 | 文章内容                                              |
| algo_note.html    | **继承自 default.html**，在页面顶部添加了一个选择器，可以单选 Java / Python，选择 Java 时，所有 className 为 "python" 的 html 元素会隐藏，反之亦然。默认选择 Python。 | 算法笔记等需要分开展示 Java / Python 代码的页面模板。 |
| *usaco-post.html* | *现在与 post 没有区别，除了 usaco solution 以外的其他页面不建议（也不应该）使用。* | USACO 题目分析                                        |


#### _posts

#### assets

#### css
