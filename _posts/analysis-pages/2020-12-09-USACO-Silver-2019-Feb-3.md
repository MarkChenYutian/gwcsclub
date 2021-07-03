---
layout: post
title: USACO 2019 Feb Silver P3
tags: [ USACO analysis ]
status: OK
Author: 肖肖
year: 2019
group: Silver
season: Feb
question: 3
---
<div class="notification">
    <h3>⚠ 该解析描述需要进一步细化和具体实现</h3>
    我们认为这条解析不够完善，如果你有更好的解析/更加详细的思路欢迎用微信发给mark或者以"USACO Solution"为主题发送到 {{ site.email }}
</div>

### 题目

给出N个草地以及M头牛和每头牛的要求(某两块草地的品种相同或者不同),然后计算有多少种种植草地的方法

### 分析

我们可以使用两个UFDS分别记录相连的和不能相连的草地,接着将这两个UFDS合并,然后判断有多少个块是相互连接的方案数就是2^块数^

### 复杂度

O(n)首先合并所有的点需要分别遍历每个UFDS,最后求出一共有多少个块数就是枚举有多少个点复杂度O(n)



