---
layout: page
comment: true
title: 网站维护文档 - Jekyll 服务篇
tags: Miscellaneous
Author: ["Mark Chen", "Marcus"]
---

> 最近一次 update - 2021/8/4

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
| thirdParty/microsoft-clarity.html | 微软的 Clarity 服务，可以统计网站访问和页面热力图 |
|  |  |
| fn/usaco_analysis_card.html | 自动生成 USACO Analysis Page 中卡片内容的**函数** |
| fn/icon.html | 自动生成行内图标，具体描述见 [网站图标系统](/2021/06/05/Webpage-Feature.html#h1) |
| fn/image_flow.html | 对于 _data 中 image_flow.json 中记录的 img 元素进行自动分配，形成响应式照片流 |
| fn/general_card_generator.html | 自动生成竞赛打卡卡片中内容的**函数** |
|  |  |
| component/fancy-back.html | [Andd54 (github.com)](https://github.com/Andd54) 创建的动态 "back" 按钮特效 |
| component/report-problem.html | 页面中右下角“报告错误”按钮按下后的弹窗 |
| component/textarea_placeholder.html | [在线编辑器](https://gwcs.xyz/2021/07/30/online-editor.html) 的初始内容 |

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

### 命名规则

`_posts` 中存储的都是 markdown 文件或 html，也就是网站的内容页面了。所有 markdown 与 html 的命名**必须遵循以下规则**

```
yyyy-mm-dd-name-of-file.md
```




```
yyyy-mm-dd-name-of-file.html
```

文件名中所有空格使用`-`替代，并且在最前面加上`yyyy-mm-dd`的前缀。<mark>没有前缀的文件可能无法被 jekyll 渲染</mark>。

### YAML 头文件

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
其中 `---` 之间的三个键值对就是 yaml 文件头的内容，通过这些键值对我们可以控制渲染的页面结果，具体的 key-value 见下表

| Key           | Value                                      | 解释                                                         |
| ------------- | ------------------------------------------ | ------------------------------------------------------------ |
| layout        | page, post, usaco-post, algo-note, default | **【必须】** markdown 的渲染模板，模板间的具体区别见上一部分`_layout`末尾的表格 |
| title         | 字符串（直接输入即可，不需要引号）         | **【必须】**页面的标题 - 下图中框出的地方<br /><img src="https://markdown-img-1304853431.file.myqcloud.com/mark-markdown-imagebed-master/20210413080321.png" alt="image-20210413080321816" style="zoom: 25%;" /> |
| tags          | 一个或多个字符串，多个字符串用空格隔开     | **【必须】**文章的 tag，用来搜索/整理文件，一些自动生成的页面（如USACO解析）依靠 tag 进行链接，如果页面没有 tag 则不会被加入页面汇总中 |
| Author        | 字符串                                     | **【必须】**文章的作者，在 post, usaco-post, algo-note 模板中会被显式在标题下方，网站贡献者自动更新的时候依赖这里的信息 |
|               |                                            |                                                              |
| onRSS         | true / false                               | **【可选】**当前页面是否出现在 RSS 推送上 - 默认为 false，如果是笔记等内容可以手动设置为 true |
| useTOC        | true / false                               | **【可选】**当前页面是否开启自动生成目录 - 默认为 true，如果要禁用需要显式声明 `useTOC: false` |
| comment       | true / false                               | **【可选】**当前页面是否开启底部评论区 - 默认为 true，如果需要禁用需要显式声明`comment: false`<br />注意：评论区 feature 只在`algo-note`, `page`, `post` 三个模板中开启了 |
|               |                                            |                                                              |
| search_ignore | true / false                               | **【可选】**当前页面是否会被站内搜索收录。设置为 False 则该页面不会被站内搜索数据库收录。（注意：页面依然可以在所有页面中看到）*（一般不用设置）* |
| category      | 字符串                                     | **【可选】** *一般不会用到，不用设置这个 key-value pair，用默认值（空）即可* |

### algo-note 的语言选择器

`algo-note` layout 可以用来展示同时有 `Java` 代码 和 相同意思的 `Python` 代码 的页面。页面最上方会生成一个语言选择器（默认选择 Python，如下图）。

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

这里存放了网站常用的矢量图标(svg)资源，png 或 jpg 图片**不要存储在这里**

png 或 jpg 图片请使用第三方图床，以链接形式引入到网站内容中

<div class="notification" markdown=1>
我们非常强烈的建议使用第三方服务，除了 svg 图标以外其他内容**不要**放在 assets 文件夹中。因为这会显著的增加网站运营成本。
</div>
## _data\*

<div class="info" markdown=1>
Jekyll 可以接收 `json`, `csv`, `yaml` 等类型的数据并在 liquid 模板语言中调用这些数据文件的内容（只要数据文件在 `_data` 中）    
</div>

这个特性让我们可以做到真正意义上的 “不写代码，修改页面”

目前，`_data` 中的内容只用在了四个方面：

### 日程安排

在网页的首页，有一个section叫做“日程安排”。这里的内容由 `_data\shcedule.json` 中的内容决定。

<img src="http://markdown-img-1304853431.cosgz.myqcloud.com/20210525151049.png" alt="image-20210525151048950" style="zoom: 67%;" />

在 `schedule.json` 中输入新日程的名字，时间，类型 和 重要性，网页 “日程安排”页面中的对应部分就会自动修改。

*这个 json 文件的格式在 scheduleSchema.json 中规定，现代编辑器（如 VS Code）在修改时会提示各个属性的值域 / 类型* 

### 照片墙

照片墙由四列照片构成，如果不适用 liquid 模板语言必须手动分配照片到每一列。为了解决这个问题，我们使用 liquid 模板语言。想添加照片到照片墙只需要在 `_data/image_flow.json` 中输入对应的 HTML 图片标签即可，jekyll 会自动将这些照片尽可能平均的分配到四个 column 上。

### 图标系统

图标系统通过 `icon_db.json` 来对应图标 svg 文件的实际路径与图标的“名称”

详见[网站图标系统]({{ site.baseurl }}/2021/06/05/Webpage-Style.html#h2)

### 竞赛打卡系统

竞赛打卡系统通过 `analysis-setup.json` 来控制以下两个部分：

* 打卡文件在“打卡文件生成器”中自动生成的 YAML 头和所有的信息输入框
* 打卡文件搜索汇总中所有文件的搜索框和竞赛类型

通过设置 `analysis-setup.json`，可以做到 0 代码修改为网站添加新的竞赛类型。

每个竞赛的信息由以下格式的 JSON 定义：

```json
{
    "ShowName": "CodeForce",	// 比赛的显示名称，显示在搜索选择器，打卡生成器的按钮上
    "ValueName": "codeforce",	// 比赛的程序内名称，使用在函数头命名等位置
    "TagName": "CodeForce",		// 比赛打卡的 tag，所有这个比赛的打卡文件一定要由这个 tag 才能被识别到
    "CardGenerator": "fn/general_card_generator.html",	// 在搜索时显示打卡的卡片模板，具体模板在 _include 里面
    "RewriteTitle": true,		// 自动生成打卡时是否重写用自动生成的标题覆盖原标题
    "Fields":{					// 竞赛的属性
        "group":{				// 第一个属性：group
            "Label": "组别",		// 显示名称：组别
            "Type":"Option",	// 类型：选项（不是文本输入框）
            "Options": {
                "选择组别": "undefined",	// 选项，'显示的选项'：'实际的 option value'
                "Division 1": "1",
                "Division 2": "2",
                "Division 3": "3"
            }
        },
        {
        	...		// 省略
	    }
        ,
        "number":{				// 最后一个属性：比赛编号
            "Label": "比赛编号",	// 显示名称：“比赛编号”
            "Type" :"Input",	// 类型：文本框（支持任意输入）
            "Placeholder": "比赛编号（三位数字）"	// 文本框空时的占位符
        }
    }
}
```

## _sass\*

这里面存放了网站的 `sass` 样式文件，当运行 `jekyll serve` 或 `jekyll build` 时，jekyll 会自动编译 `css/main.sass` 文件。`main.sass` 文件通过引用` @import` 的方式导入这里的 `sass` 样式文件。

使用这样的方式，我们可以在保留样式文件可阅读性（sass 文件）的同时尽可能压缩网站本身的样式文件，从而提高访问速度。

**这里的内容不会直接出现在生成的 _site 中**

> 编译过程详解：
>
> ![image-20210606004700075](http://markdown-img-1304853431.cosgz.myqcloud.com/20210606004707.png)

关于 Sass 本身的更多信息：[Sass 中文网](https://www.sass.hk/)

### Sass 编写指北

为了统一网站显示样式，编写 Sass 时请遵守这里的规则

**1. 所有的颜色和尺寸都在 `variables.sass` 中有定义，如果需要使用，请直接调用这里的变量名**

例子 1：如果要使用一个比较淡的主题色 - `#3398aa`，那么可以直接在 Sass 文件中写 `$theme-3` （因为 `variables.sass` 中声明了变量 `$theme-3 = #3398aa`）

例子 2：如果要让自己定义的一个 HTML 元素有一个 *大的* padding，那么可以在 Sass 中这样写：`padding: $padding-l`，因为在 `variables.sass` 中声明了变量 `$padding-l = 2rem`

**2. 如果你想让自己的 HTML 元素随着页面尺寸的变化而变化（例如适配移动端的页面），请在 `reactive-layout.sass` 中添加相应规则**

`reactive-layout.sass` 中有三种尺寸 - `screen width > $screen-l`，`\$screen-l > width > \$screen-s` 和 `\$screen-s > screen width`

## css\* 

这里只有 `main.sass` 一个文件，所有 `_sass` 中的文件都会被编译到 `css/main.css` 中。

<div class="notification" markdown=1>
注意！网站的 `main.css` 是自动生成的编译结果，如果需要增加 CSS 规则，请到 `_sass/personalize.sass` 中添加
</div>
## js\*

这里存放了网站的 Javascript 文件，用于网站动效，网页动画和页面控件（例如 algo-note 模板的语言选择器 和 页面搜索栏的搜索脚本）。具体文件和作用见下表：

| 文件                    | 作用                                                         |
| ----------------------- | ------------------------------------------------------------ |
| jekyll-search.js        | 网站搜索脚本                                                 |
| jquery.min.js           | 首页动态文字使用的第三方依赖                                 |
| markdown-parse.js       | 网页实时渲染 markdown，用于打卡文件生成预览和实时编辑        |
| search-style-control.js | 网站搜索栏动画                                               |
| util.js                 | 网站的通用函数库，包括 `select` 与 `deselect` 按钮的效果，下载内容，打开本地文件 |

## 其它零散的文件…

| 文件                        | 作用                                                         |
| --------------------------- | ------------------------------------------------------------ |
| _config.yml                 | 网站的 Jekyll 设置项                                         |
| .gitignore                  | 描述被 Git 忽略的本地临时文件，这些文件不在 Git 版本控制的范围内 |
| 404.html                    | 网站 404 时显示的页面                                        |
| favicon.ico                 | 网站标签页图标                                               |
| feed.xml                    | 网站 RSS Feed 生成                                           |
| Gemfile                     | Jekyll 依赖项（插件，第三方库）描述文件                      |
| google0431ac67849d2ad1.html | 向 Google 验证网站管理员身份的文件，用于搜索优化（SEO），不要删除 |
| index.md                    | 网站首页                                                     |
| jekyll-cayman-theme.gemspec | 是的，这个网站是 GitHub Cayman 主题魔改而来的（你可以看看原来的 Cayman 主题就知道这个魔改的程度有多大了……） |
| LICENSE                     | 网站的版权©描述                                              |
| README.md                   | 显示在 Github Repo 上的网页描述                              |
| robots.txt                  | 用于搜索引擎爬取优化的文件，规定爬虫爬取范围                 |
| search.json                 | 网站搜索的数据库                                             |
