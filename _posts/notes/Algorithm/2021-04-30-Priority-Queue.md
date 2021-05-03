---
layout: algo_note
title: 优先队列 Priority Queue
tags: Algorithm Notes
Author: Mark
---

### 前置条件

<ul class="time-vertical" style="margin-left: 32px;">
    <li><online></online><a href="{{ site.baseurl }}/2021/03/02/Time-Complexity.html">理论基础：时间复杂度 Time Complexity</a></li>
    <li><offline></offline><a href="">数据结构：队列 Queue</a></li>
    <li><offline></offline><a href="">数据结构：最大堆，最小堆 Min/Max Heap</a></li>
</ul>

### 优先队列

在日常生活中，大家也许遇到过下面这些情景 - 在堵车的时候，救护车和消防车可以优先通过拥堵路段；在排队的时候，一些人的优先级比别人的高…… 在这些情景中，我们既希望可以维持一个类似队列的结构，也希望能够为这个队列提供一定的灵活性 - 一些优先级高的内容可以优先出队列。

优先队列就是专门设计用来解决这些问题的一种数据结构。正如他的名字所言，优先队列就是一个有优先级规则的队列。

### 数据结构实现

一般我们会使用最小堆来实现优先队列。如果你还记得，一个最小堆实际上是一颗二叉树 - 在根节点处的值总是整个堆中的最小值，每个父节点都一定大于等于自己的子节点们。如果我们按照内容的优先级做排序就可以保证优先级最高的项目无论什么时候加入优先队列都会排在优先队列的第一位。


### 代码实现



### 库调用

在 Python 中，我们可以用 `heapq` 库实现 `Priority Queue`。`heapq` 对于优先队列的实现与大部分数据结构不同 - `heapq` 会使用一个 list 来存放优先队列的内容，每次用

* `heapq.heappush(arr: list, element: Comparable) -> None` 来向优先队列 `arr` 添加元素
* `heapq.heappop(arr: list) -> element` 从优先队列`arr`中取出元素
* `heapq.heapify(arr: list) -> None` 对 `list arr` 中的元素重新排序，使 `arr` 中的元素排序符合最小二分堆的要求