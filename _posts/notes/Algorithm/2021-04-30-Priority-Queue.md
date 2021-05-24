---
layout: algo_note
title: 优先队列 Priority Queue
tags: Algorithm Notes
Author: Mark
---

### 前置条件

<ul class="time-vertical" style="margin-left: 32px;">
    <li><online></online><a href="{{ site.baseurl }}/2021/03/02/Time-Complexity.html">理论基础：时间复杂度 Time Complexity</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/05/10/Queue.html">数据结构：队列 Queue</a></li>
    <li><offline></offline><a href="">数据结构：最大堆，最小堆 Min/Max Heap</a></li>
</ul>

### 优先队列

在日常生活中，大家也许遇到过下面这些情景 - 在堵车的时候，救护车和消防车可以优先通过拥堵路段；在排队的时候，一些人的优先级比别人的高…… 在这些情景中，我们既希望可以维持一个类似队列的结构，也希望能够为这个队列提供一定的灵活性 - 一些优先级高的内容可以优先出队列。

优先队列就是专门设计用来解决这些问题的一种数据结构。正如他的名字所言，优先队列就是一个有优先级规则的队列。

### 数据结构实现

一般我们会使用最小堆来实现优先队列。如果你还记得，一个最小堆实际上是一颗二叉树 - 在根节点处的值总是整个堆中的最小值，每个父节点都一定大于等于自己的子节点们。如果我们按照内容的优先级做排序就可以保证优先级最高的项目无论什么时候加入优先队列都会排在优先队列的第一位。


### 代码实现

<pre>
	<code class="python">
# Suppose we have the minHeap class already
class PriorityQueueItem:
	def __init__(self, priority, value):
		self.priority = priority
		self.val = value

	def __lt__(self, other):
		return self.priority < other.priority

	def __eq__(self, other):
		return self.priority == other.priority

	def __gt__(self, other):
		return self.priority > other.priority


class PriorityQueue:
	def __init__(self):
		self.heap = minHeap()

	def pushItem(value, priority=0):
		"""
		put Priority Queue Item into the Priority Queue, with default priority 0.
		"""
		self.heap.push(PriorityQueueItem(priority, value))

	def popItem():
		"""
		get item from Priority Queue
		"""
		return self.heap.pop().val

	def isEmpty():
		return self.heap.isEmpty()
	</code>
	<code class="java">
Not Implemented Yet. See Python Version.
	</code>
</pre>

### 实际使用

在实际的竞赛中，我们出于对速度和 debug 方面的考虑一般不会使用自己实现的 `Priority Queue`，而是会使用官方实现好的内置 `Priority Queue` 实现。 下面我们会介绍一下各个语言中 Priority Queue 的实际用法。

#### Python - heapq 内置库

在 Python 中，我们可以用 `heapq` 库实现 `Priority Queue`。`heapq` 对于优先队列的实现与大部分数据结构不同 - 一般我们实现一个数据类型的时候，我们都会单独定义一个 class 来实现我们的数据结构，每次需要的时候对数据结构进行实例化。

然而，在 heapq 中，Priority Queue 的实现使用了一种类似于函数式编程的思想 - 这个库并没有实现`class PriorityQueue`，而是设计了三个函数来对 `list` 进行操作来“模拟”一个 Priority Queue。

下面是三个非常常用的函数：

* `heapq.heappush(arr: list, element: Comparable) -> None` 来向优先队列 `arr` 添加元素
* `heapq.heappop(arr: list) -> element` 从优先队列`arr`中取出元素
* `heapq.heapify(arr: list) -> None` 对 `list arr` 中的元素重新排序，使 `arr` 中的元素排序符合最小二分堆的要求

#### Java - java.util.PriorityQueue<E>

[Oracle Java.util.PriorityQueue 官方文档](https://docs.oracle.com/javase/7/docs/api/java/util/PriorityQueue.html)

**Priority Queue 实例化方法**

* `PriorityQueue<T> a = new PriorityQueue<>();` - 生成一个优先队列，其中的元素都是 `class T` 或者 `class T` 的子类。
* `PriorityQueue<T> a = new PriorityQueue<>(ComparatorT)` - 实例化一个优先队列，使用 `ComparatorT` 对优先队列中的元素进行排序。

<div class="info">
	Java 中的 Priority Queue 默认是使用 <code>NaturalOrder</code> 对队列中的元素进行排序的，如果需要使用自定义的比较器，需要在实例化 Priority Queue 的时候将比较器实例作为参数传入构造函数。
</div>

**Priority Queue 常用函数**

* `add(E object)` - 添加一个元素到 Priority Queue 中
* `peek()` - 在**不将队列底部元素（下一个被 pop 出来的元素）移出** Priority Queue 的前提下查看队列底部。
* `poll()` - 返回 Priority Queue 的底部元素并同时在 Priority Queue 内删除该元素
