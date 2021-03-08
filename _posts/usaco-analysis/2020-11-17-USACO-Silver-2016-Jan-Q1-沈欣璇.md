---
title: USACO 2016 Jan Silver P1
tags: USACO-analysis
status: OK
Author: 沈欣璇
time: 2016
group: Silver
question: Jan 1
---

## 题目大意

在一条数轴上有N个稻草堆，随机分布在各个地方，Bessie可以扔出K头牛，每个牛都有一个power，可以使落地区域内x-power 到x+power的所有稻草爆炸。问如果想用这K头奶牛正好使所有的稻草爆炸，最少的power是多少

## 思路

用二分搜索。

先将稻草的位置排序，然后定义最小power是1，最大power是输入中坐标最大的稻草堆的坐标，先取中间值；判断用当前的power需要多少只牛才能使所有稻草爆炸，如果结果小于等于K，说明power还能再缩小，因此max=mid, mid=(min+max)/2；再次算用当前的power需要多少只牛才能使所有稻草爆炸……然后一直循环，直到max=min或者max-1=min，如果是第一种情况，直接返回答案，如果是第二种情况，返回还没有改编过的mid值。

## 复杂度分析

是很典型的二分搜索题，复杂度为log n。