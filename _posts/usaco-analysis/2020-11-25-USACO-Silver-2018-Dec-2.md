---
layout: usaco-post
title: USACO 2018 Dec Silver P2
tags: USACO-analysis
status: OK
author: zys
time: 2018
group: Silver
question: Dec 2
---
### 题目大意

一共有 N（1 ≤ N ≤ 10<sup>5</sup>）头牛，每头牛都有到达时间，自己吃草的时间，以及吃草的优先级（input 的输入顺序即优先级）。现在，这些牛要吃草，但是只有一个草地，每次只能一头牛吃。所以，每头牛只能按顺序吃，因此，肯定有牛需要等待一定的时间才能吃到草，找出所有牛中等待的最长时间。吃草的顺序：

1. 如果一头牛在到达草地的时候没有牛在吃草，那么它就可以直接吃
2. 如果有多头牛到达草地，优先级高的先吃



### 思路

根据题意，牛吃草的顺序有两种：到达的时间 & 优先级。用一个 `Cow` 类来代表一头牛，类里面的属性分别是牛的优先级、到达时间和吃草的时间，然后用一个 `ArrayList<Cow>`  来装所有的牛。用 `time` 表示当前的时间；用`waitTime ` 表示当前最大的等待时间；`wait` 表示 priority queue

1. **到达时间**可以用**排序**来实现。在排序的时候，如果多头牛的到达时间相同，那么优先级高的排在前面。

2. **优先级**可以用 **priority queue**，**每次弹出优先级最高的那头牛**。

循环整个 ArrayList，每次判断 `time` 是否比当前牛的到达时间要大：

1. 是：把这头牛加到 `wait` 中，循环的 index 加一。 

2. 否：

   ​	a. `wait` 的长度等于 0（即没有牛在等待）：如果`time` - 当前牛的到达时间的差小于 0，`time` = 当前牛的到达时间；否则，取 		`time` - 当前牛的到达时间的差和 `waitTime` 中较大的值作为新的`waitTime`。更新 `time`： `time` = `time` + 当前这头牛的吃草时		间；循环的 index 加一。

   ​	b. `wait` 的长度不等于 0：从 `wait` 中弹出一头牛，如果`time` - 当前牛的到达时间的差小于 0，`time` = 当前牛的到达时间；否		则，取这头牛的到达时间的差和 `waitTime` 中较大的值作为新的`waitTime`。更新 `time`： `time` = `time` + 当前这头牛的吃草时		间。

直到 index = ArrayList 的长度 && `wait` 的长度等于 0，循环结束



### 复杂度

1. 排序可以用 Collections.sort()，复杂度为 O(NlogN)
2. 因为循环内部只是 if 判断，而且 priority queue 每次也只是加一个数，或者弹出一个数，所以每次都是 O(log N)，循环 N 次，那么就是 O(NlogN)。

因为排序是在循环外面，所以是 O(2NlogN)。因为系数可以忽略，总的复杂度为 **O(NlogN)**。