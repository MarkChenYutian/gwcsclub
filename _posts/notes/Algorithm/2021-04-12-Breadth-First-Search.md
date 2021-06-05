---
layout: algo_note
title: 广度优先搜索 Breadth First Search
tags: Algorithm Notes
Author: ["Mark Chen"]
---

### 前置条件

在学习这个知识点前，你应该先学习……

<ul class="time-vertical" style="margin-left: 32px;">
    <li><online></online><a href="{{ site.baseurl }}/2021/03/02/Time-Complexity.html">理论基础：时间复杂度 Time Complexity</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/05/10/Queue.html">数据结构：队列 Queue</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/04/15/Stack.html">数据结构：栈 Stack</a></li>
    <li><offline></offline><a href="">理论知识：图的表达 How to Represent a Graph</a></li>
</ul>

### 广度优先搜索策略

搜索实际上可以看作遍历图的所有节点，直到遇到目标节点为止的过程。广度优先搜索在遍历的过程中遵循这样的规则：

**在所有待遍历的节点中，最浅的节点最先被探索**

这里的“浅”指的是节点到开始探索的节点的距离（边的数量）。 因为广度优先搜索总是优先探索浅的节点，如果算法正在探索深度为 $h$ 的节点，那么所有深度小于 $h$ 的节点都*一定已经被探索了*。

也就是说，<mark>如果整个图中存在多个目标节点，那么BFS找到的第一个目标节点<b>一定</b>是距离初始节点最近的节点。</mark>

### 广度优先搜索的实现

在广度优先搜索的过程中，我们需要维护一个 Stack，其中保存着所有与已探索节点相邻但是还没有探索的节点，这样的一个数据结构被称作 Fringe （已探索部分的边缘）。在探索 $h-1$ 层节点的时候， $h$ 层的节点会被放入 Fringe 中，只有在探索完 $h-1$ 层的节点以后才会探索 $h$ 层的节点。这时候，所有 $h$ 层的节点都已经被探索或者在 Fringe 中了，所以后面压入栈的 $h+1$ 层节点一定会比 $h$ 层节点更晚被探索。

<pre>
<code class="python">
def breadthFirstSearch(initialState, getSuccessor, getValidActions):
    """
    :param initialState: The Initial State of problem (sometimes the 'current state')
    :param getSuccessor: The State Transition Function that return the successors given the current state and action
    :param getValidActions: A function that takes current state and return a list of valid actions under current state
    """
    fringe = stack()
    exploredStates = set()
    
    # Add the Initial State into the Fringe before Searching Actually Start.
    fringe.push(initialState)
    while len(fringe) > 0:
        currState = fringe.pop()
        exploredState.add(currState)
            
        # Do Something Here
        
        for action in getValidActions(currState):
            # Add Successor States into the fringe
            successor = getSuccessor(currState, action)
            if successor not in exploredStates: fringe.push(successor)
</code>
<code class="java">
    Not Implemented Yet. See Python Version of BFS.
</code>
</pre>

### 广度优先算法的复杂度

#### 时间复杂度

假设我们要在图 $G(V, E)$ （图 $G$ 有 $V$ 个节点，$E$ 条边）上使用广度优先算法进行遍历，算法最多只会遍历所有节点*1次*（不会出现重复查看的情况），如果 Fringe 的 Stack 是用双头链表 `deque` 实现的，那么每次从 Fringe 中取出节点的时间复杂度是 $O(1)$。这总共贡献了 $O(V)$ 的时间复杂度。因为每一条边只会在一端的节点被探索到时被查看一次，所以边最多被探索 $2E$ 次。每次探索一条边（因为是从 dictionary 中取出）只会有 $O(1)$ 的时间复杂度，所以探索边的总时间复杂度是 $O(2E) = O(E)$。

综上所述，BFS 的时间复杂度是 $O(V + E)$

#### 空间复杂度

假设图 $G$ 中平均一个节点会连接到 $\alpha$ 个子节点，目标节点在第 $n$ 层，那么BFS的空间复杂度会是 $O(\alpha^n)$。

从这里我们也可以看出 BFS 并 **不适合在目标节点很深的情况下使用**，如果目标节点在 28 层，即使 $\alpha = 2$，每个节点只占一个 32 位 int 的大小，内存也会占用 $1G$ 的大小来存放 Fringe，而 USACO 等算法竞赛的内存上限一般是 $256M$。

### 练习

<ul class="time-vertical" style="margin-left: 32px;">
        <li><online></online><a href="https://leetcode.com/problems/minimum-depth-of-binary-tree/">[Easy] LeetCode Problem 111. Minimum Depth of Binary Tree</a></li>
        <li><online></online><a href="https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/">[Medium] LeetCode Problem 1161. Maximum Level Sum of a Binary Tree</a></li>
        <li><online></online><a href="https://leetcode.com/problems/number-of-islands/">[Medium] LeetCode Problem 200. Number of Islands</a></li>
        <li><online></online><a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=620">[Medium] USACO 2016 Feb Silver P3 - Milk Pails</a></li>
        <li><online></online><a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=671">[Hard] USACO 2016 December Contest, Gold Problem 3. Lasers and Mirrors</a></li>
        <li><online></online><a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=695">[Hard] USACO 2017 January Contest, Gold Problem 3. Cow Navigation</a></li>
</ul>

### 参考书目

《算法导论》Chapter 22.2 Breadth First Search