---
layout: post
title: USACO 2020 Jan Silver Problem 1
tags: [ USACO analysis ]
status: OK
Author: Jczeng
year: 2020
group: Silver
season: Jan
question: 1
---

## 2020 January Silver

### *Problem 1. Berry Picking*

#### 题目大意：

* 给定一N棵树$(1\le N\le1000)$,每棵树上有浆果B个(1 <= B <= 1000)和K个篮子(1\le K \le 1000  K%2==0)$,用K个篮子装浆果，一个篮子只能装一棵树上的任意数量浆果，同时要将K/2个，大的那一部分篮子给别人，求巧妙的分配浆果后，小的一部分篮子里，浆果的最大数量。

#### 题目分析：

* 这题有些像动态规划（大小两个篮子的浆果数量会相互影响），但是想通它的另一种解法——只要另大小两部分的篮子的浆果数量尽量一样，便可达到目的后，可以发现它更适合用贪心:
* 不断取当前的最优情况=>在保证大小尽量相同的同时，取两个篮子果实总数的最大值。

#### 思路：

* 选一个MaxNormal从1开始，但不能大于Max_Of_Trees
* 确定一个所有桶的大小；（用大小来表示桶内的浆果量）
* 算出装完所有桶后，剩下每个trees的浆果数；
* 看是否能将MaxNormal变大；
  * 若能，继续2，3点操作。
* 若不能，对剩下的树进行排序；(令total为当前树上的果实总数)
  * 如果此时total<K/2，直接结束返回，因为无法再给小的一部分分果实；
  * 如果此时 K/2<total<K,那么返回值就是 (total-k/2)*MaxNormal+除去最大的K/2个果实后的前k/2大的果实数;
  * 如果total>k,那么返回值就是MaxNormal*k/2;

#### 复杂度分析：

* 找到最大MaxNormal的最糟时间复杂度是O(B)；
  * 之后每次对Trees排序的最糟时间复杂度是O(logN);
  * 下一步将每个桶尽量填满的最糟时间复杂度是O(N);
* 所以总的复杂度是O(B*NlogN)=>20^6

