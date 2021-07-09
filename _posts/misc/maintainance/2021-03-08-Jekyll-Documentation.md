---
layout: page
comment: true
title: 网站维护文档 - Jekyll 服务篇
tags: Miscellaneous
Author: ["Mark Chen", "Marcus"]
---

> 最近一次 update - 2021/6/25

<div class="info" markdown=1>
如果你想提交自己的打卡记录，建议使用一站式自动工具 - [打卡文件自动生成器]({{ site.baseurl }}/2021/06/11/yaml-generator.html)
</div>

<div class="notification">
    <h4 class="toc_ignore">如果你只是想在这个网站上添加页面……</h4>
    <p>
        这篇文章中涉及很多技术细节，如果你只是希望能够将自己写的页面添加到该网站，而不进行具体的样式，结构修改，你可以选择跳过所有标题末尾是*号的部分。
    </p>
</div>

## 网站技术环境\*

<div class="info">
    <p>
        需要的前置技能：Git 的 add, commit, 分支, merge, push, pull, clone 等基本操作
    </p>
</div>

GW Computer Science 的网站是使用 Jekyll 自动构建的**静态页面**网站。

在进行结构与样式上的改动时，**强烈推荐**在自己本地安装 Jekyll 服务端，这样就可以在本地实时预览自己修改的样式结果。具体安装方法见以下链接：

[Jekyll Installation](https://jekyllrb.com/docs/installation/)

安装成功后，在命令行中 `cd` 到网页源代码的根目录上，输入

```bash
$ bundle exec jekyll serve
```

或

```bash
$ jekyll serve
```

如果 jekyll 安装成功，应该出现以下内容

```
Configuration file: D:/.../gwcsclub/_config.yml
       Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `plugins: [jekyll-paginate]` in your 
configuration file.
            Source: D:/.../gwcsclub
       Destination: D:/.../gwcsclub/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 1.28 seconds.
 Auto-regeneration: enabled for '...'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

这时候访问 localhost:4000 或 http://127.0.0.1:4000/ 就可以看见实时更新的网页了。

## 自动构建原理

在网站源代码目录下，可以看到以下几个目录：
```
/gwcsclub
  |- _includes
  |- _layouts
  |- _posts
  |- _data
  |- _sass
  |- assets
  |- css
  |- js
```
这些目录在自动构建网页时的作用各不相同，下面我会详细介绍每个目录的作用。

## _includes\*

这个文件夹中可以定义一些 `html` 代码模块。这些模块可以在不同的 `layout` 中复用。通过这样的设定，我们可以最大程度的提取模板之间的相同模块，从而达到 “改一处” 模块，所有相同的模块都同步变化。

例子：在 `_include/nav-bar.html` 中，我们定义了网站的顶部导航栏。其中的代码如下：

```html
<section class="top-nav-box">
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/31/To-Beginners.html'">初学者指南</div>
    ...
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
    ...
    <div class="nav-button" onClick="window.location.href='{{ site.baseurl }}/secondary-pages/2021/01/26/About-Us.html'">关于我们</div>
</section>
<!-- some content below -->
```

现在这个网站里面的 `_include` 组件包括以下内容：

| _include 组件      | 组件描述                                                  |
| ------------------ | --------------------------------------------------------- |
| head.html          | 统一所有页面引入的 CSS 样式表，引入 Javascript 文件        |
| nav-bar.html       | 网页的顶部导航栏                                         |
| page-footer.html   | 网页的页脚（此网站由……维护）那一部分                       |
| page-header.html   | **除了首页以外** 网页的页眉（ GW Computer Science Club ） |
| schedule.html                    | 网站 “日程安排” 中的 timeline 由这个组件通过引入 `_data/schedule.json` 来自动生成 |
| article-head.html           | 页面的标题，tags，作者栏和返回/主页按钮                   |
| algorithmLangSelector.html | `layout: algo_note` 的语言选择器 |
|                             |                                                           |
| thirdParty/mathJax.html | 基于 mathJax 的数学公式渲染服务 |
| thirdParty/baidu-Statistics.html | 【已停用】百度网站统计服务 *停用原因：严重影响网站加载速度* |
| thirdParty/comment.html       | 基于 valine + leancloud 的评论区                         |
| thirdParty/page-toc.html | 使用 Javascript 自动生成的页面目录 |
|  |  |
| fn/usaco_analysis_card.html | 自动生成 USACO Analysis Page 中卡片内容的**函数** |
| fn/icon.html | 自动生成行内图标，具体描述见 [网站图标系统](/2021/06/05/Webpage-Feature.html#h1) |
| fn/image_flow.html | 对于 _data 中 image_flow.json 中记录的 img 元素进行自动分配，形成响应式照片流 |
| fn/general_card_generator.html | 自动生成竞赛打卡卡片中内容的**函数** |
|  |  |
| component/fancy-back.html | [Andd54 (github.com)](https://github.com/Andd54) 创建的动态 "back" 按钮特效 |
| component/report-problem.html | 页面中右下角“报告错误”按钮按下后的弹窗 |

## _layouts\*

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

## _posts

#### 命名规则

`_posts` 中存储的都是 markdown 文件或 html，也就是网站的内容页面了。所有 markdown 与 html 的命名**必须遵循以下规则**

```
yyyy-mm-dd-name-of-file.md
```




```
yyyy-mm-dd-name-of-file.html
```

文件名中所有空格使用`-`替代，并且在最前面加上`yyyy-mm-dd`的前缀。<mark>没有前缀的文件可能无法被 jekyll 渲染</mark>。

#### Markdown文件 YAML 头

<mark>每一个要被渲染的 markdown 文件都<b>必须</b>添加 yaml 文件头</mark>，这个文件头中会包括一些键值对，用来配置 markdown 的渲染过程。yaml 的格式如下:

```
---
key1: value1
key2: value2
key3: value3
---
# Example Markdown Page

example content
```
其中 `---` 之间的三个键值对就是 yaml 文件头的内容，通过这些键值对我们可以控制渲染的页面结果，具体的 key-value 见下表：

| Key           | Value                                      | 解释                                                         |
| ------------- | ------------------------------------------ | ------------------------------------------------------------ |
| layout        | page, post, usaco-post, algo-note, default | **【必须】** markdown 的渲染模板，模板间的具体区别见上一部分`_layout`末尾的表格 |
| title         | 字符串（直接输入即可，不需要引号）         | **【必须】**页面的标题 - 下图中框出的地方<br /><img src="https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413080321.png" alt="image-20210413080321816" style="zoom: 25%;" /> |
| tags          | 一个或多个字符串，多个字符串用空格隔开     | **【必须】**文章的 tag，用来搜索/整理文件，一些自动生成的页面（如USACO解析）依靠 tag 进行链接，如果页面没有 tag 则不会被加入页面汇总中 |
| Author        | 字符串                                     | **【必须】**文章的作者，在 post, usaco-post, algo-note 模板中会被显式在标题下方，网站贡献者自动更新的时候依赖这里的信息 |
|               |                                            |                                                              |
| useTOC        | true / false                               | **【可选】**当前页面是否开启自动生成目录 - 默认为 true，如果要禁用需要显式声明 `useTOC: false` |
| comment       | true / false                               | **【可选】**当前页面是否开启底部评论区 - 默认为 true，如果需要禁用需要显式声明`comment: false`<br />注意：评论区 feature 只在`algo-note`, `page`, `post` 三个模板中开启了 |
|               |                                            |                                                              |
| search_ignore | true / false                               | **【可选】**当前页面是否会被站内搜索收录。设置为 False 则该页面不会被站内搜索数据库收录。（注意：页面依然可以在所有页面中看到）*（一般不用设置）* |
| category      | 字符串                                     | **【可选】** *一般不会用到，不用设置这个 key-value pair，用默认值（空）即可* |

还有一些在特定模板中才会用到的 yaml 文件头 或 特性……

***usaco-post***

| key      | value                             | 解释                                                         |
| -------- | --------------------------------- | ------------------------------------------------------------ |
| status   | OK / NA                           | **【必须】**当前页面是否可展示（如果是 NA 不会被展示到自动生成的 USACO Solution Page 上） |
| year     | yyyy                              | **【必须】**四位数的年份，用于自动分类题目的展示位置         |
| group    | Bronze / Silver / Gold / Platnium | **【必须】**USACO 题目组别                                   |
| season   | {Jan  /Feb /  Dec / Open}         | **【必须】**USACO 赛季，例如 `season: Jan` 表示一月月赛的题目 |
| question | {1 / 2 / 3}                       | **【必须】**USACO 题号，例如 `question: 1` 表示第一题        |

***algo-note***

这个模板可以用来展示同时有 `Java` 代码 和 相同意思的 `Python` 代码 的页面。页面最上方会生成一个语言选择器（默认选择 Python，如下图）。

![image-20210625233249784](http://markdown-img-1304853431.cosgz.myqcloud.com/20210625233249.png)

当选择 Java 时，所有 `class` 为 `"python"` 的html标签都会被隐藏，所有 `class` 为 `"java"` 的标签都会被显式出来，反之亦然。因为这个特性，我们在 algo-note 模板中写代码的时候需要遵循以下格式：

```html
<pre>
	<code class="python">
print("test")	# Some Python Code Here
	</code>
	<code class="java">
System.out.println("test");	// Some Java Code Here
	</code>
</pre>
```

当显式的时候，如果选择 python 就只会看到 `print("test") # Some Python Code Here`，选择 Java 的时候也只能看到 `System.out.println("test"); ...` 这一行。

## assets

这里存放了网站的图片资源，当然，你也可以将图片资源存放在其他在线存储，然后以链接的形式引用图片

<div class="notification" markdown=1>
我们非常强烈的建议使用第三方服务，除了 svg 图标以外其他内容**不要**放在 assets 文件夹中。因为这会显著的增加网站运营成本。
</div>

## _data\*

在网页的首页，有一个section叫做“日程安排”。这里的内容由 `_data\shcedule.json` 中的内容决定。

`schedule.json` 中的内容验证由 `scheduleSchema.json` 定义，当你使用 VS Code 等现代编辑器时，可以看到每个 field 的具体描述与 值域（如果存在）。

<img src="http://markdown-img-1304853431.cosgz.myqcloud.com/20210525151049.png" alt="image-20210525151048950" style="zoom: 67%;" />

## _sass\*

这里面存放了网站的 `sass` 样式文件，当运行 `jekyll serve` 或 `jekyll build` 时，jekyll 会自动编译 `css/main.sass` 文件。`main.sass` 文件通过引用` @import` 的方式导入这里的 `sass` 样式文件。

使用这样的方式，我们可以在保留样式文件可阅读性（sass 文件）的同时尽可能压缩网站本身的样式文件，从而提高访问速度。

**这里的内容不会直接出现在生成的 _site 中**

> 编译过程详解：
>
> ![image-20210606004700075](http://markdown-img-1304853431.cosgz.myqcloud.com/20210606004707.png)

## css\*

这里存放了网站的层叠样式表 (CSS)

<div class="error">
    如果你不确定你在做什么，<b>不要</b>修改已有的 CSS 样式表，需要新的样式自己在 personalize.css 文件尾部添加样式文件。
</div>

## js\*

这里存放了网站的 Javascript 文件，用于网站动效，网页动画和页面控件（例如 algo-note 模板的语言选择器 和 页面搜索栏的搜索脚本）。
