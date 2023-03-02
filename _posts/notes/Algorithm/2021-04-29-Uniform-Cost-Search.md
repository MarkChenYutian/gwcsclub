---
layout: algo_note
title: 代价统一搜索 Uniform Cost Search
tags: Algorithm Notes
Author: ["Mark Chen"]
onRSS: true
---

### 前置条件

<ul class="time-vertical" style="margin-left: 32px;">
    <li><online></online><a href="{{ site.baseurl }}/2021/03/02/Time-Complexity.html">理论基础：时间复杂度 Time Complexity</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/05/10/Queue.html">数据结构：队列 Queue</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/04/30/Priority-Queue.html">数据结构：优先队列 Priority Queue</a></li>
    <li><offline></offline><a href="">理论知识：图的表达 How to Represent a Graph</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/04/12/Breadth-First-Search.html">算法：广度优先算法 Breadth First Search</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/04/12/Depth-First-Search.html">算法：深度优先算法 Depth First Search</a></li>
</ul>

### 代价统一搜索策略

在之前的[深度优先搜索]({{ site.baseurl }}/2021/04/12/Depth-First-Search.html)和[广度优先搜索]({{ site.baseurl }}/2021/04/12/Breadth-First-Search.html)中，我们一般都只考虑目标节点与出发节点之间的**图上距离**[^1]而非**真实距离**[^2] - 这在一些简单的场景下没有什么问题，但是在一些情况下图上的距离与真实距离并不一致。例如下图：


<img src="https://markdown-img-1304853431.file.myqcloud.com/mark-markdown-imagebed-master/20210319224716.jpg" alt="6e5f63b38286cc81fc07f61886fabb9" style="zoom:33%; display: block; margin: 0 auto" />

在下面这张图中， $G$ 与 $S$ 之间的图上距离最小路径应该是直线 $A$。但是，如果我们要看 $G$ 和 $S$ 之间的路径权重之和最小的话我们会发现最优路径并不是 $A$ 而是 $A*$，因为 $A$ 的路径权重之和为 $10 + 5 = 15$ 而 $A\*$ 的路径权重之和为 $1 + 2 + 1 + 1 = 5$。

为了找到实际距离最短的路径而不是图上距离最短的路径，人们在 BFS 的基础上做出了改动，产生了更加准确的 **UCS 代价统一搜索策略**。在 BFS 中，`Queue` 的性质距离初始节点图上距离最小的节点会优先被展开，而在 UCS 中，<mark>我们用 <code>Priority Queue</code> 实现 Fringe，这个优先队列对待探索节点的排序是基于初始节点到待探索节点的实际距离决定的</mark>。

<img src="https://markdown-img-1304853431.file.myqcloud.com/mark-markdown-imagebed-master/20210430075002.png" style="zoom:50%;" />

> 一张图的 “等 Cost 线“

在 UCS 对图像进行遍历的过程中，如果在 Fringe 中 Actual Cost 最小的节点的 Actual Cost 为 $C$，则所有已探索的节点的 Actual Cost 都**一定$\leq C$**。通过这个性质，我们可以轻易证明<mark>UCS找到的第一个目标节点一定是距离初始节点实际距离最小的目标节点（即最优解）</mark>。

### 代价统一算法的实现

<pre>
    <code class="python">
import heapq    # The Python Module for Priority Queue

def uniformCostSearch(initialState, getSuccessor, getValidActions, getActionCost):
    """
    :param initialState: The Initial State of problem (sometimes the 'current state')
    :param getSuccessor: The State Transition Function that return the successors given the current state and action
    :param getValidActions: A function that takes current state and return a list of valid actions under current state
    :param getActionCost: A function that will return cost of action given action and current state
    """
    fringe = []    # The only difference between BFS and DFS
    exploredStates = set()
    
    # Add the Initial State into the Fringe before Searching Actually Start.
    # Instead of storing state directly in the fringe, we will use a tuple to store state, where the 
    # 0th param of tuple is cumulative cost
    # 1th param of tuple is the state
    
    heapq.heappush(fringe, (0, initialState))	# The initial cost is 0
    while len(fringe) > 0:
    	cost, currState = heapq.heappop(fringe)
        if currState in exploredStates: continue
        else: exploredState.add(currState)
            
        # Do Something Here
        
        for action in getValidActions(currState):
            # Add Successor States into the fringe
            successor = getSuccessor(currState, action)
            if successor not in exploredStates:
                deltaCost = getActionCost(currrState, action)
                heapq.heappush((cost + deltaCost, successor))
    </code>
    <code class="java">
Not Implemented Yet, see Python Version
    </code>
</pre>

### 练习

<div class="notification">暂无练习 （一般与其他算法搭配使用，很少有单独的练习出现，思考一下之前做过的一些 BFS / DFS 题目有没有可能用 UCS 取代原来的算法来优化？）</div>

[^1]: 图上距离指节点之间的边的数量
[^2]: 真实距离指节点之间的边的权重之和

---