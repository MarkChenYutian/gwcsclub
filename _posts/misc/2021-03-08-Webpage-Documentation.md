---
layout: page
comment: true
title: 广州外国语学校计算机科学社团官网维护指南与文档
tags: Miscellaneous
Author: Mark
---

> 最近一次 update - 2021/5/10

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

或

```bash
$ jekyll serve
```

如果 jekyll 安装成功，应该出现以下内容

```
Configuration file: D:/.../gwcompsci/_config.yml
       Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `plugins: [jekyll-paginate]` in your 
configuration file.
            Source: D:/.../gwcompsci
       Destination: D:/.../gwcompsci/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 1.28 seconds.
 Auto-regeneration: enabled for '...'
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

#### _includes\*

这个文件夹中可以定义一些 `html` 代码模块。这些模块可以在不同的 `layout` 中复用。通过这样的设定，我们可以最大程度的提取模板之间的相同模块，从而达到 “改一处” 模块，所有相同的模块都同步变化。

例子：在 `_include/nav-bar.html` 中，我们定义了网站的顶部导航栏。其中的代码如下：

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
| article-head.html  | 页面的标题，tags，作者栏和返回/主页按钮                    |

#### _layouts\*

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

**命名规则**

`_posts` 中存储的都是 markdown 文件，也就是网站的内容页面了。所有 markdown 的命名**必须遵循以下规则**
```
yyyy-mm-dd-name-of-file.md
```
文件名中所有空格使用`-`替代，并且在最前面加上`yyyy-mm-dd`的前缀。<mark>没有前缀的文件可能无法被 jekyll 渲染</mark>。

**Markdown文件 YAML 头**

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

| Key      | Value                                      | 解释                                                         |
| -------- | ------------------------------------------ | ------------------------------------------------------------ |
| layout   | page, post, usaco-post, algo-note, default | **【必须】** markdown 的渲染模板，模板间的具体区别见上一部分`_layout`末尾的表格 |
| title    | 字符串（直接输入即可，不需要引号）         | **【必须】**页面的标题 - 下图中框出的地方<br /><img src="https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413080321.png" alt="image-20210413080321816" style="zoom: 25%;" /> |
| tags     | 一个或多个字符串，多个字符串用空格隔开     | **【必须】**文章的 tag，用来搜索/整理文件，一些自动生成的页面（如USACO解析）依靠 tag 进行链接，如果页面没有 tag 则不会被加入页面汇总中 |
| Author   | 字符串                                     | **【必须】**文章的作者，在 post, usaco-post, algo-note 模板中会被显式在标题下方，网站贡献者自动更新的时候依赖这里的信息 |
|          |                                            |                                                              |
| useTOC   | true / false                               | **【可选】**当前页面是否开启自动生成目录 - 默认为 true，如果要禁用需要显式声明 `useTOC: false` |
| comment  | true / false                               | **【可选】**当前页面是否开启底部评论区 - 默认为 true，如果需要禁用需要显式声明`comment: false`<br />注意：评论区 feature 只在`algo-note`, `page`, `post` 三个模板中开启了 |
|          |                                            |                                                              |
| category | 字符串                                     | **【可选】** *一般不会用到，不用设置这个 key-value pair，用默认值（空）即可* |

还有一些在特定模板中才会用到的 yaml 文件头 或 特性……

***usaco-post***

| key      | value                                  | 解释                                                         |
| -------- | -------------------------------------- | ------------------------------------------------------------ |
| status   | OK / NA                                | **【必须】**当前页面是否可展示（如果是 NA 不会被展示到自动生成的 USACO Solution Page 上） |
| time     | yyyy                                   | **【必须】**四位数的年份，用于自动分类题目的展示位置         |
| group    | Bronze / Silver / Gold / Platnium      | **【必须】**USACO 题目组别                                   |
| question | {Jan / Feb / Dec / Open} + {1 / 2 / 3} | **【必须】**USACO 题号，例如 `question: Jan 1` 表示一月月赛第一题，`question: Open 2` 表示 USACO Open 第二题 |

***algo-note***

这个模板可以用来展示同时有 `Java` 代码 和 相同意思的 `Python` 代码 的页面。页面最上方会生成一个语言选择器（默认选择 Python，如下图）。

<img src="https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413082559.png" alt="image-20210413082559146" style="zoom: 67%;" />

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

#### assets

这里存放了网站的图片资源，当然，你也可以将图片资源存放在其他在线存储，然后以链接的形式引用图片

#### css\*

这里存放了网站的层叠样式表 (CSS)

<div class="error">
    如果你不确定你在做什么，<b>不要</b>修改已有的 CSS 样式表，需要新的样式自己在 personalize.css 文件尾部添加样式文件。
</div>

#### js\*

这里存放了网站的 Javascript 文件，用于网站动效，网页动画和页面控件（例如 algo-note 模板的语言选择器 和 页面搜索栏的搜索脚本）。

### 页面样式

在 markdown 中，你可以在任意位置插入 HTML 元素来达到你想要的效果。为了统一网站的设计风格，我们在 `personalize.css` 中定义了一些通用的样式。

#### 强调文字

##### 蓝色衬底文字样式

效果：

![image-20210413090028577](https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413090028.png)


代码:

```html
<div class="info">
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h5>五级标题</h5>
    <p>正文，注意在 markdown 中嵌入的 HTML 元素内部时<b>不能</b>使用 markdown 语法的，例如 **这个** 就不会变成加粗效果，要使用`<b></b>` 标签达到加粗的效果。</p>
</div>
```

##### 黄色衬底文字样式

效果：

![image-20210413090010340](https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413090010.png)


代码:

```html
<div class="notification">
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h5>五级标题</h5>
    <p>正文，注意在 markdown 中嵌入的 HTML 元素内部时<b>不能</b>使用 markdown 语法的，例如 **这个** 就不会变成加粗效果，要使用`<b></b>` 标签达到加粗的效果。</p>
</div>
```

##### 红色衬底文字样式

效果：

![image-20210413085948892](https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413085948.png)


代码:

```html
<div class="error">
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h5>五级标题</h5>
    <p>正文，注意在 markdown 中嵌入的 HTML 元素内部时<b>不能</b>使用 markdown 语法的，例如 **这个** 就不会变成加粗效果，要使用`<b></b>` 标签达到加粗的效果。</p>
</div>
```

##### **荧光笔高亮**

<div class="error">
⚠ 注意：这一部分包含可能出现实际表现与预期不符的情况。
</div>

注意，在 Typora 等支持 Github 风格 Markdown 的软件中可以使用 `==` 来括起来文字达到高亮效果，但是在 Jekyll 的自动渲染流程中，这个语法是**不被支持的**。

<mark>如果想在网站中实现荧光笔高亮的效果，你需要将 <code>==</code> 替换为 HTML 元素。</mark>

上面那一行荧光高亮的源代码：

```html
<mark>如果想在网站中实现荧光笔高亮的效果，你需要将<code>==</code>替换为 HTML 元素。</mark>
```

#### 数学公式

网站使用 `MathJax`，全站支持 $\LaTeX$ 风格的数学公式。如果页面中有数学公式，尽量使用 $\LaTeX$ 数学公式以达到最好的显示效果。

##### 行内公式

使用单个 `$` 将 LaTeX 内容括起来，在 Jekyll 渲染过程中，LaTeX内容会被识别并转换为公式的矢量图。

效果：

假设图 $G$ 中平均一个节点会连接到 $\alpha$ 个子节点，目标节点在第 $n$ 层，那么BFS的空间复杂度会是 $O(\alpha^n)$。

代码（markdown 内容，不是 html 内容）：

```markdown
假设图 $G$ 中平均一个节点会连接到 $\alpha$ 个子节点，目标节点在第 $n$ 层，那么BFS的空间复杂度会是 $O(\alpha^n)$。
```

##### **多行公式**

<div class="error">
⚠ 注意：这一部分包含可能出现实际表现与预期不符的情况。
</div>

使用两个 `$` 将 LaTeX 内容括起来，在 Jekyll 渲染过程中，LaTeX内容会被识别并转换为公式的矢量图。

效果：

calculate through the whole table using these equations:

$$
\begin{aligned}
T[g][n][k] = \max{\left( T[g][n-1][k]+ isWin(g, n),\;\\
T[(g+1)\%3][n-1][k-1]+ isWin(g, n),\;\\
T[(g + 2)\%3][n-1][k-1]+ isWin(g, n) \right)} 
\end{aligned}
$$

If either $n$ or $k$ is out of bound (not in 3D array $T$, return 0.

代码（markdown 内容，不是 html 内容）：

```
calculate through the whole table using these equations:

$$
\begin{aligned}
T[g][n][k] = \max{\left( T[g][n-1][k]+ isWin(g, n),\;\\
T[(g+1)\%3][n-1][k-1]+ isWin(g, n),\;\\
T[(g + 2)\%3][n-1][k-1]+ isWin(g, n) \right)} 
\end{aligned}
$$

If either $n$ or $k$ is out of bound (not in 3D array $T$, return 0.
```

<div class="notification">
<h5>⚠Typora 换行规则导致的样式异常</h5>
<p>在 Typora 中，你可以通过按 `ctrl + shift + m` 快速创建代码块（也就是这里的多行公式）。然而，Typora默认只会在多行公式前进行*一次换行*。在 Typora 中，这样做是没有问题的，但是在 Jekyll 渲染的过程中，这回让 Jekyll 将多行公式和前文识别为同一段内容并放入同一个 `&lt;p&gt;` 标签中并渲染到同一行。</p>
<p><b>例子</b></p>
<p>
    <img src="https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413094119.png"/>
    可以很明显的看到这里的多行公式被挤在一堆文字之间了。
</p>
<p>
    源代码:
    <pre>
We can solve this problem recursively. Let $f(n, c)$ represent the number of possible valid solutions of painting on a subtree with root $n$ and color $c$ on root, we can represent this function recursively.
$$
\begin{aligned}
&U = \left\{n' \mid n' \text{ is child of }n\right\}\\
&f(n, c) = \prod_{u\in U}\left({\sum_{c'\in C}{f(u, c')}}\right)
\end{aligned}
$$
When we meet a node that is already been painted, we let $f(node, c) = 0$ if $c$ is not the color that is painted.
    </pre>
</p>
<p>
    像这种情况我们就需要手动在 <code>$$</code> 前多加一个回车即可。
    <pre>
We can solve this problem recursively. Let $f(n, c)$ represent the number of possible valid solutions of painting on a subtree with root $n$ and color $c$ on root, we can represent this function recursively.

$$
\begin{aligned}
&U = \left\{n' \mid n' \text{ is child of }n\right\}\\
&f(n, c) = \prod_{u\in U}\left({\sum_{c'\in C}{f(u, c')}}\right)
\end{aligned}
$$

When we meet a node that is already been painted, we let $f(node, c) = 0$ if $c$ is not the color that is painted.
    </pre>
    <img src="https://gitee.com/MarkYutianChen/mark-markdown-imagebed/raw/master/20210413094534.png"/>
</p>
</div>


#### 按钮

在一些情况下你可能需要按钮控件来突出显示超链接等页面元素，我们提供了 `main-button` 元素 和 允许并排展示按钮的 flex 容器 `button-box` 元素，可以在页面中使用。

##### 使用单个按钮

效果：

<button class="main-button">示例按钮</button>

代码：

```html
<button class="main-button">示例按钮</button>
```

如果你想为按钮添加超链接的话，可以通过在外层嵌套 `<a href="...."></a>` 实现。

效果：

<a href="https://www.example.com"><button class="main-button">点我转到 example.com </button></a>

代码：

```html
<a href="https://www.example.com"><button class="main-button">点我转到 example.com </button></a>
```

##### 同时展现多个按钮

同时展现多个按钮的时候，我们可以使用 `button-box` 元素将他们容纳在同一行。这样在手机等宽度较小的设备上显式效果也不会收到过多影响。

效果：

<div class="button-box">
    <button class="main-button">example btn 1</button>
    <button class="main-button">example btn 2</button>
    <button class="main-button">example btn 3</button>
</div>

代码：

```html
<div class="button-box">
    <button class="main-button">example btn 1</button>
    <button class="main-button">example btn 2</button>
    <button class="main-button">example btn 3</button>
</div>
```