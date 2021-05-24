---
layout: algo_note
title: 最小生成树 Min-Span Tree
tags: Algorithm Notes
Author: J
---


### 最小生成树

假设要在国际部的每个教室间接网线，每条网线只能直接连接两间教室，如何才能用最少的网线，让所有的教室都连通？

这是一个很典型的最小生成树问题。对于一个图，你需要找到一组 edge, 使得所有的 vertex 都连通，同时 cost 最少。解决这个问题通常会使用 Kruskal 或者 Prim 算法。

Prim 算法的思路是这样的，我把所有的节点分成两个部分，一部分是已经在最小生成树上的节点，一部分是还没添加的节点。当我需要添加一个节点时，我要找出剩下的节点中，离已有的书直接相连并且 cost 最低的点。不断重复这个过程直到所有的点都添加到了树上。

### 伪代码

```
T = {s}
将 s 的所有 edge 都添加到优先队列 PQ 中
当 PQ 不为空时:
  v, cost = PQ.pop()
  如果 v 不在 T 中:
    将 v 加入 T
    将所有 v 的 edge 都加入到 PQ
T
```

### 代码实现

<pre>
<code class="python">
def prim(graph, start=0):
  """ 
  生成 graph 的 prim

    参数:
      graph: 你要处理的图
      start: 表示从哪个 vertex 开始生成，对于一般情况来说，从哪个 vertex 开始都一样，默认从 0 号开始
  """
  MAX_INT = 9999999
  distance = [MAX_INT] * graph.getNumVertices() # distance 表示的是所有 vertex 到最小生成树任意节点的最小 cost，初始化为正无穷
  isInTree = [False] * graph.getNumVertices() # isInTree 表示 vertex 是否在树上

  vertex = start # vertex 表示当前要添加进树的节点
  distance[vertex] = 0
  while not isInTree[vertex]:
    isInTree[vertex] = True

    # 枚举 vertex 的所有邻居，如果需要的话更新它们到树的距离
    for (neighbor, cost) in graph.getNeighbors(vertex):
      if not isInTree(neighbor):
        distance[neighbor] = min(distance[neighbor], cost)

    # 找出下一个要添加的 vertex
    minCost, minVertex = MAX_INT, 0
    for (v, cost) in enumerate(distance):
      if (not isInTree[v]) and cost < minCost:
        minCost, minVertex = cost, v

    vertex = minVertex
</code>
<code class="java">
    Not Implemented Yet
</code>
</pre>

### 题目

<ul class="time-vertical" style="margin-left: 32px;">
    <li><online></online><a href="https://vjudge.net/problem/UVA-1174">UVA-1174 标准 MST 题目，只需要把名字转换成序号就可以了</a></li>
    <li><online></online><a href="https://vjudge.net/problem/UVA-1208">UVA-1208 标准 MST 题目，注意输出要求顺序</a></li>
    <li><online></online><a href="https://vjudge.net/problem/UVA-908">UVA-908 多加一点分析就可以把题目转化成基本的 MST</a></li>
</ul>
