---
layout: algo_note
title: 优先队列 Priority Queue
tags: Algorithm Notes
Author: Mark
---

<div class="error">
    <h3>这个页面还没完成，内容会在未来发生变化</h3>
</div>

### 代码实现

在 Python 中，我们可以用 `heapq` 库实现 `Priority Queue`。`heapq` 对于优先队列的实现与大部分数据结构不同 - `heapq` 会使用一个 list 来存放优先队列的内容，每次用

* `heapq.heappush(arr: list, element: Comparable) -> None` 来向优先队列 `arr` 添加元素
* `heapq.heappop(arr: list) -> element` 从优先队列`arr`中取出元素
* `heapq.heapify(arr: list) -> None` 对 `list arr` 中的元素重新排序，使 `arr` 中的元素排序符合最小二分堆的要求。