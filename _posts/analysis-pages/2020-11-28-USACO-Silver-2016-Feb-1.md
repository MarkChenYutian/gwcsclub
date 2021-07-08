---
layout: post
title: USACO 2016 Feb Silver P1
tags: [ USACO analysis ]
status: OK
Author: 沈欣璇
year: 2016
group: Silver
season: Feb
question: 1
---

## 题目大意

一共有n个房间，每个房间都有c头牛，农场主希望每个房间有且只有一头牛，所以他要求每头牛可以顺时针走到一个房间，经过d个门需要花费d^2的能量，问将所有的牛按要求一个房间一头牛需要花费的能量最小是多少

## 思路

用一个数组arr表示每个房间拥有的牛的数量。从头开始找，找到第一个拥有牛的数量大于1的房间，记录为indexA，往后找到第一个没有牛的房间，记录为indexB，如果找到尾巴了还是没有找到，就转到arr[0]（因为只能顺时针找，arr[0]是第一个房间，接着后面的房间是顺时针方向的下一个房间，最后一个房间连着第一个房间，形成一个圈）,arr[indexA]--，arr[indexB]++，花费的能量就是(indexB-indexA)\^2，当然这里要判断indexB有没有在indexA的下一圈，即indexB是不是在indexA前面，因为它是从最后的房间又回到了第一个房间然后到了indexA后面，这样的话花费的能量就是(n-indexA+indexB)\^2。接下来再从indexA开始往后找下一个牛的数量大于1的房间，重复上面的步骤。

## 复杂度分析

O(n^2)

