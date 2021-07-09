---
layout: page
comment: true
title: 网站样式指南
tags: [Page, Miscellaneous]
Author: ["Mark Chen"]
---
## 网站色卡

<div class="horizontal-grid-box">
    <div style="background-color: #333c3d; height: 6rem; color: ghostwhite; text-align: center;"><p>#333C3D</p></div>
    <div style="background-color: #abb9ba; height: 6rem; color: ghostwhite; text-align: center;"><p>#ABB9BA</p></div>
    <div style="background-color: #d1e2e3; height: 6rem; color: #333c3d; text-align: center;"><p>#D1E2E3</p></div>
    <div style="background-color: #daeced; height: 6rem; color: #333c3d; text-align: center;"><p>#DAECED</p></div>
    <div class="only-display-at-large"></div>
    <div class="only-display-at-large"></div>
    <div style="background-color: #005766; height: 6rem; color: ghostwhite; text-align: center;"><p>#005766</p></div>
    <div style="background-color: #00798f; height: 6rem; color: ghostwhite; text-align: center;"><p>#00798F</p></div>
    <div style="background-color: #3398aa; height: 6rem; color: ghostwhite; text-align: center;"><p>#3398AA</p></div>
    <div style="background-color: #95ecf0; height: 6rem; color: #333c3d; text-align: center;"><p>#95ECF0</p></div>
    <div class="only-display-at-large"></div>
    <div class="only-display-at-large"></div>
    <div style="background-color: #bd0055; height: 6rem; color: ghostwhite; text-align: center;"><p>#BD0055</p></div>
    <div style="background-color: #ffd4e7; height: 6rem; color: #333c3d; text-align: center;"><p>#FFD4E7</p></div>
    <div class="only-display-at-large"></div>
    <div style="background-color: #c5b100; height: 6rem; color: ghostwhite; text-align: center;"><p>#C5B100</p></div>
    <div style="background-color: #ffe564; height: 6rem; color: #333c3d; text-align: center;"><p>#FFE564</p></div>
    <div style="background-color: #fff7d2; height: 6rem; color: #333c3d; text-align: center;"><p>#FFF7D2</p></div>
</div>

## HTML + Markdown Hybrid

当你想在一个 HTML 元素中使用 Markdown 语法时，在 HTML 标签上添加 `markdown=1` 即可。

**例子：**

代码

```html
<div>
This is a simple HTML Tag **WITHOUT** Markdown Hybrid Support
</div>
<div markdown=1>
This is an HTML Tag **WITH** Markdown *Hybrid* Support
</div>
```

结果

<div>
This is a simple HTML Tag **WITHOUT** Markdown Hybrid Support
</div>
<div markdown=1>
This is an HTML Tag **WITH** Markdown *Hybrid* Support
</div>

## 图标系统

网站使用 `liquid` 模板语法制作了图标系统。当你想在文本中插入图标时，使用

```
{% raw %}{% include fn/icon.html type="icon-type" size="1.5rem" %}{% endraw %}
```

即可在渲染出的 HTML 网页中看到 svg 图标被渲染在文字中。

<blockquote>
    <b>例子</b>
    <p>
        假如我想在 {% include fn/icon.html type="java" size="2rem" %}Java 前面插入图标……
    </p>
    <pre>
    <code>{% raw %}假如我想在 {% include fn/icon.html type="java" size="2rem" %}Java 前面插入图标……{% endraw %}</code>
    </pre>
</blockquote>

在正常的使用中，如果你希望图标大小与文字大小相匹配，我们也建议你使用 `size="1.5rem"`。

{% include fn/icon.html type="star" size="1.5rem" %} 这是一个 1.5rem 大小的图标例子。

```
{% raw %}{% include fn/icon.html type="star" size="1.5rem" %} 这是一个 1.5rem 大小的图标例子。{% endraw %}
```

当前网页支持的图标类型

<table>
    <thead><tr><th>Type</th><th>Sample (size=2rem)</th></tr></thead>
    <tbody>
{% for t in site.data.icon_db %}
        <tr>
            <td>{{t[0]}}</td>
            <td><img src="{{ t[1] }}" style="display: inline-block; height: 2rem; width: 2rem; margin-bottom: -0.3rem;"> This is Inline Icon called {{t[0]}}!</td>
        </tr>
{% endfor %}
    </tbody>
</table>

> 所有图标的 svg 代码来源与[这里](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=9402)

## Tricks of Beautiful Layout
### `no-decoration` 取消超链接装饰

在网站的正文中，所有的超链接都会像 [这样](example.com) 有一个🔗的标志和下划线。在大部分情况中，这样的样式可以丰富文章内容的视觉效果。然而，在个别情况中，我们并不希望这样的装饰出现，因为这会破坏原有的样式。

为了解决这样的问题，我们特别设计了 `no-decoration` 类型。当你有一个部分的内容不希望其中的 `<a>` 被渲染出装饰，请将它们囊括在 `<div class="no-decoration">` 中。

<blockquote>
    <b>例子</b>
    <p>
        这是一行正常的内容，<a>链接</a>有装饰。
    </p>
    <div class="no-decoration">
    <p>
        这是一行在<code>no-decoration</code>中的内容，<a>链接</a>没有装饰。
    </p>
    </div>
</blockquote>

```html
<p>
    这是一行正常的内容，<a>链接</a>有装饰。
</p>
<div class="no-decoration">
<p>
    这是一行在<code>no-decoration</code>中的内容，<a>链接</a>没有装饰。
</p>
</div>
```

### `toc_ignore` 取消侧边目录收录

有的时候我们不希望一个 heading （如`h2`, `h3`, `h4`, etc.）被自动添加到页面左侧的目录中。通过在不想被收录的标题 HTML Tag 中添加 `class="toc_ignore"` 即可防止自动生成目录收录这个标题。

> 例子：注意观察左侧 TOC

<h4>被 TOC 收录的例子</h4>
<h4 class="toc_ignore">不被 TOC 收录的例子</h4>

```html
<h4>被 TOC 收录的例子</h4>
<h4 class="toc_ignore">不被 TOC 收录的例子</h4>
```
## 页面样式

在 markdown 中，你可以在任意位置插入 HTML 元素来达到你想要的效果。为了统一网站的设计风格，我们在 `personalize.css` 中定义了一些通用的样式。

### 强调文字

#### 蓝色衬底文字样式

效果：

<div class="info">
    <h2 class="toc_ignore">二级标题</h2>
    <h3 class="toc_ignore">三级标题</h3>
    <h4 class="toc_ignore">四级标题</h4>
    <h5 class="toc_ignore">五级标题</h5>
    <p>正文，注意在 markdown 中嵌入的 HTML 元素内部时<b>不能</b>使用 markdown 语法的，例如 **这个** 就不会变成加粗效果，要使用`<b></b>` 标签达到加粗的效果。</p>
</div>

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

#### 黄色衬底文字样式

效果：

<div class="notification">
    <h2 class="toc_ignore">二级标题</h2>
    <h3 class="toc_ignore">三级标题</h3>
    <h4 class="toc_ignore">四级标题</h4>
    <h5 class="toc_ignore">五级标题</h5>
    <p>正文，注意在 markdown 中嵌入的 HTML 元素内部时<b>不能</b>使用 markdown 语法的，例如 **这个** 就不会变成加粗效果，要使用`<b></b>` 标签达到加粗的效果。</p>
</div>

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

#### 红色衬底文字样式

效果：

<div class="error">
    <h2 class="toc_ignore">二级标题</h2>
    <h3 class="toc_ignore">三级标题</h3>
    <h4 class="toc_ignore">四级标题</h4>
    <h5 class="toc_ignore">五级标题</h5>
    <p>正文，注意在 markdown 中嵌入的 HTML 元素内部时<b>不能</b>使用 markdown 语法的，例如 **这个** 就不会变成加粗效果，要使用`<b></b>` 标签达到加粗的效果。</p>
</div>

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

#### **荧光笔高亮**

<div class="error">
⚠ 注意：这一部分包含可能出现实际表现与预期不符的情况。
</div>

注意，在 Typora 等支持 Github 风格 Markdown 的软件中可以使用 `==` 来括起来文字达到高亮效果，但是在 Jekyll 的自动渲染流程中，这个语法是**不被支持的**。

<mark>如果想在网站中实现荧光笔高亮的效果，你需要将 <code>==</code> 替换为 HTML 元素。</mark>

上面那一行荧光高亮的源代码：

```html
<mark>如果想在网站中实现荧光笔高亮的效果，你需要将<code>==</code>替换为 HTML 元素。</mark>
```

### 数学公式

网站使用 `MathJax`，全站支持 $\LaTeX$ 风格的数学公式。如果页面中有数学公式，尽量使用 $\LaTeX$ 数学公式以达到最好的显示效果。

#### 行内公式

使用单个 `$` 将 LaTeX 内容括起来，在 Jekyll 渲染过程中，LaTeX内容会被识别并转换为公式的矢量图。

效果：

假设图 $G$ 中平均一个节点会连接到 $\alpha$ 个子节点，目标节点在第 $n$ 层，那么BFS的空间复杂度会是 $O(\alpha^n)$。

代码（markdown 内容，不是 html 内容）：

```markdown
假设图 $G$ 中平均一个节点会连接到 $\alpha$ 个子节点，目标节点在第 $n$ 层，那么BFS的空间复杂度会是 $O(\alpha^n)$。
```

#### **多行公式**

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
<div markdown=1>
<h2 class="toc_ignore">Example Text</h2>
We can solve this problem recursively. Let $f(n, c)$ represent the number of possible valid solutions of painting on a subtree with root $n$ and color $c$ on root, we can represent this function recursively.
$$
\begin{aligned}
&U = \left\{n' \mid n' \text{ is child of }n\right\}\\
&f(n, c) = \prod_{u\in U}\left({\sum_{c'\in C}{f(u, c')}}\right)
\end{aligned}
$$
When we meet a node that is already been painted, we let $f(node, c) = 0$ if $c$ is not the color that is painted.
</div>
<p>
    可以很明显的看到这里的多行公式被挤在一堆文字之间了。
</p>
<p>
    源代码:
    <pre>
<h2 class="toc_ignore">Example Text</h2>
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

<p><u>像这种情况我们只需要手动在 <code>$$</code> 前后多加一个回车即可。</u></p>

<div markdown=1>
<h2 class="toc_ignore">Example Text</h2>
We can solve this problem recursively. Let $f(n, c)$ represent the number of possible valid solutions of painting on a subtree with root $n$ and color $c$ on root, we can represent this function recursively.

$$
\begin{aligned}
&U = \left\{n' \mid n' \text{ is child of }n\right\}\\
&f(n, c) = \prod_{u\in U}\left({\sum_{c'\in C}{f(u, c')}}\right)
\end{aligned}
$$

When we meet a node that is already been painted, we let $f(node, c) = 0$ if $c$ is not the color that is painted.
</div>

<pre>
<h2 class="toc_ignore">Example Text</h2>
We can solve this problem recursively. Let $f(n, c)$ represent the number of possible valid solutions of painting on a subtree with root $n$ and color $c$ on root, we can represent this function recursively.

$$
\begin{aligned}
&U = \left\{n' \mid n' \text{ is child of }n\right\}\\
&f(n, c) = \prod_{u\in U}\left({\sum_{c'\in C}{f(u, c')}}\right)
\end{aligned}
$$

When we meet a node that is already been painted, we let $f(node, c) = 0$ if $c$ is not the color that is painted.
</pre>
</div>


### 按钮

在一些情况下你可能需要按钮控件来突出显示超链接等页面元素，我们提供了 `main-button` 元素 和 允许并排展示按钮的 flex 容器 `button-box` 元素，可以在页面中使用。

#### 使用单个按钮

效果：

<button class="main-button">示例按钮</button>

代码：

```html
<button class="main-button">示例按钮</button>
```

如果你想为按钮添加超链接的话，可以通过在外层嵌套 `<a href="...."></a>` 实现。

效果：

<button class="main-button" onclick="window.location.href='https://www.example.com'">点我转到 example.com </button>

代码：

```html
<button class="main-button" onclick="window.location.href='https://www.example.com'">点我转到 example.com </button>
```

#### 同时展现多个按钮

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