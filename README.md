# 算法笔记编写指南

## 如何上传我的文件到网站上？

方法1：在 Gitee 上直接创建新的分支（推荐）【⚠ 如果你不熟悉 Git 的操作，请忽略此条】
为了让更新更加方便，你可以在 Gitee 上为这个仓库创建一个新的分支，在代码仓库的 _posts/notes/algorithm 文件夹中创建并编写你的 markdown 文件。在完成自己的部分后在代码仓库中创建一个 Pull Request 即可。

方法2：自己新建一个 Markdown 文件，编写完成后发给 Mark
以这样的名字命名文件
```
yyyy-mm-dd-title-of-document.md
```

其中 yyyy-mm-dd 是文件的创建日期，文件名中的空格全部使用“-”代替。
在文件第一行输入下列信息
```
---
layout: algo_note
title: 这里填写你的笔记标题，推荐使用算法的中文名+英文名
tags: Algorithm Notes
Author: 你的笔名（空着会在网页上显示 Anonymous）
---
```

（三个横杠也要写到文件开头里）这部分信息会在自动构建网页时用到，不要修改 layout，tags 这两栏，注意冒号后面一定要有一个空格。

---

## 文件规范和注意事项
1 在上文中的
```
title: 这里写标题
```
已经设置了网页的标题，所以在Markdown中无需再添加一级标题，不然网页中会显示两个标题

2 原则上不要用一级标题，一级标题不会被收录到网页侧边自动生成的目录中

3 网页自动渲染工具不支持 Typora Markdown 中 "==文字==" 表示高亮文字的语法，如果需要高亮文字直接使用html语法

```
效果：<mark> 这里是一些你想高亮的文字 </mark> 即可
```

效果：<mark> 这里是一些你想高亮的文字 </mark> 即可

4 网页支持MathJax，并且强烈推荐所有与数学有关的部分使用 MathJax 语法书写，直接用两个\$括住数学公式代码即可
行内公式样例
（markdown代码）
```
这是一个例子 $f(n) \geq 0$，可以看到Mathjax的数学表达比手打的好看很多 f(n) >= 0
```

（渲染结果）

这是一个例子 $f(n) \geq 0$，可以看到Mathjax的数学表达比手打的好看很多 f(n) >= 0

大公式块样例

（markdown代码）

```
这是一个例子

$$
\left[\begin{matrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9\\
\end{matrix}\right]\times 1
$$

例子结束
```

（渲染结果）

这是一个例子

$$
\left[\begin{matrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9\\
\end{matrix}\right]\times 1
$$

例子结束

注意：在 Typora 中如果使用 ctrl + shift + M 创建公式块，Typora默认的创建方法会导致公式块在网页结果中粘在上一行，上传前建议手动打开源代码模式在公式块 $$ 前后单独加一个空行以确保公式在单独一行。

5 网页提供以下三种特殊的样式用来强调一些特殊的点，如果想使用这样的样式可以直接在 markdown 中打样式对应的代码（文字替换成自己想写的文字）
样式1

代码：
```
<div class="error">
在一些情况下，即使解答的时间复杂度是符合计算限时的也有可能导致TLE。这种情况下你应该考虑降低算法的时间复杂度常数项。
</div>
```

样式2

代码
```
<div class="notification">
如果你不认识下面的这些算法，没关系，后面我们会介绍这些算法
</div>
```

样式3

代码
```
<div class="info">
如果你想看更多关于渐进分析的知识，例如 $\Theta(f(n))$, $\Omega(f(n))$ 等的话可以在这里看看。 【<a href="https://markyutianchen.gitee.io/react-app-test/#/posts/TimeComplexityIntro">链接</a>】
</div>
```

注意：在 Typora 中，这些代码块是无法显示成图片中的样式的，这是因为Typora本地并没有加载网站的样式文件，在网站自动构建的过程中这些样式会被加载，从而展现出图片中的样子

6 网站提供了选择惯用语言的选项，访问者可以选择自己是用 Python 还是 Java 的，默认	选择Python（选择完后，所有的代码示例只会显示选择的语言版本）

具体效果可以参考这个网页：CHGZFLS Computer Science Club (gitee.io)

为了实现这个功能，所有的代码块按照这个格式书写（可以复制底下的例子当作模板）
```
<pre>
<code class="python">
# Here are your Python Code.
</code>
<code class="java">
// Here are your Java Code
</code>
</pre>
```

---
## 文件结构

一个笔记一般分为四个部分 - 这个笔记的前置条件，文字介绍，代码实现，相关题目

前置条件 - 学习这个算法/数据结构前必须先看过的东西，例如学优先队列前先学习二分堆（因为PQ是通过二分堆实现的）

文字介绍 - 介绍这个算法，越初级的算法反而要解释的越清楚，因为他们还不知道怎么自己去研究算法。

代码实现 - 这个算法的 Python / Java 实现

相关题目 - 可以参考 https://usaco.guide/ 相关知识点的习题，个人感觉这里的习题可以包括 Leetcode, Coding Bat, DMOJ, USACO 的题目
