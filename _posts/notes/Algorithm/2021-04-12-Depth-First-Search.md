---
layout: algo_note
title: 深度优先搜索 Depth First Search
tags: Algorithm Notes
Author: Mark
---

### 前置条件

在学习这个知识点前，你应该先学习……

<ul class="time-vertical" style="margin-left: 32px;">
    <li><online></online><a href="{{ site.baseurl }}/2021/03/02/Time-Complexity.html">理论基础：时间复杂度 Time Complexity</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/05/10/Queue.html">数据结构：队列 Queue</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/04/15/Stack.html">数据结构：栈 Stack</a></li>
    <li><offline></offline><a href="">理论知识：图的表达 How to Represent a Graph</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/04/12/Breadth-First-Search.html">算法：广度优先算法 Breadth First Search</a></li>
</ul>

### 深度优先算法

搜索实际上可以看作遍历图的所有节点，直到遇到目标节点为止的过程。深度优先搜索在遍历的过程中遵循这样的规则：

**在所有待遍历的节点中，最深的节点最先被探索**

这里的“深”指的是节点到开始探索的节点的距离（边的数量）。注意：与[广度优先算法]({{ site.baseurl }}/2021/04/12/Breadth-First-Search.html)不同的地方在于<mark>深度优先算法不能保证找到的目标节点是最浅（最优）的</mark>。

### 深度优先算法的实现

与 BFS 不同，在 DFS 中我们要维护一个 `queue` 来作为 Fringe 存储待探索的节点。

<pre>
<code class="python">
def depthFirstSearch(initialState, getSuccessor, getValidActions):
    """
    :param initialState: The Initial State of problem (sometimes the 'current state')
    :param getSuccessor: The State Transition Function that return the successors given the current state and action
    :param getValidActions: A function that takes current state and return a list of valid actions under current state
    """
    fringe = queue()    # The only difference between BFS and DFS
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
Not Implemented Yet. See Python Version.
</code>
</pre>

### 深度优先算法的复杂度

#### 时间复杂度

深度优先算法的时间复杂度与广度优先算法的时间复杂度相同 - 是 $O(E + V)$，具体的解释和广度优先搜索的基本一致（使用 双向链表`deque` 实现的 queue 在取出节点时的时间复杂度也是 $O(1)$），所以直接 quote 过来。

> 假设我们要在图 $G(V, E)$ （图 $G$ 有 $V$ 个节点，$E$ 条边）上使用广度优先算法进行遍历，算法最多只会遍历所有节点*1次*（不会出现重复查看的情况），如果 Fringe 的 Stack 是用双头链表 `deque` 实现的，那么每次从 Fringe 中取出节点的时间复杂度是 $O(1)$。这总共贡献了 $O(V)$ 的时间复杂度。因为每一条边只会在一端的节点被探索到时被查看一次，所以边最多被探索 $2E$ 次。每次探索一条边（因为是从 dictionary 中取出）只会有 $O(1)$ 的时间复杂度，所以探索边的总时间复杂度是 $O(2E) = O(E)$。
> 
> 综上所述，BFS 的时间复杂度是 $O(V + E)$

#### 空间复杂度

假设我们在图 $G$ 上运行DFS，在 $G$ 中平均每个节点有 $\alpha$ 个子节点，目标节点在第 $n$ 层，那么当探索到目标节点时，算法的空间复杂度应该是 $Space(\alpha, n) = n \times (\alpha - 1)$，也就是 $O(n\alpha)$。

注意到这个空间复杂度比 BFS 的 $O(\alpha^n)$ 要好非常多倍，我们在已知目标节点深度较深或者图的 $\alpha$ 值较大时应该优先选择 DFS。

### 练习


<ul class="time-vertical" style="margin-left: 32px;">
        <li><online></online><a href="https://leetcode.com/problems/maximum-depth-of-n-ary-tree/">[Easy] LeetCode Problem 559. Maximum Depth of N-ary Tree</a></li>
        <li><online></online><a href="https://leetcode.com/problems/path-sum/">[Easy] LeetCode Problem 112. Path Sum</a></li>
        <li><online></online><a href="https://leetcode.com/problems/find-largest-value-in-each-tree-row/">[Medium] LeetCode Problem 515. Find Largest Value in Each Tree Row</a></li>
        <li><online></online><a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=944">[Medium] USACO 2019 Silver, Open P3 Fence Planning</a></li>
</ul>
