---
layout: usaco-post
title: USACO 2016 Dec Silver P2
tags: USACO-analysis
status: OK
Author: 曾老城
year: 2016
group: Silver
season: Dec
question: 2
---

### *Problem 2. Cities and States*

**题目大意：**

* 给定N(1≤N≤2·10^5)个城市以及它们的州；
* 当一个城市名字的前两个字母和另外一个城市的州同名，且反之亦然；
  * 这两个城市配对；
* 求有多少对城市。

**题目分析：**

* 这道题思路很直接，找每个城市的对象便是；
* 但N的数值刚好卡在10^5，明示不能穷尽枚举；
* 所以用hashmap来代替找对象的N次方枚举便是。

**解题思路：**

* 将所有输入简化成四个字母，前两个是城市名首字母，后两个是州名；
* 将它们放入hashmap，key为后两个字母；
* 遍历所有城市节点：
  * 找key为节点城市名的州，看其城市名是否等于当前节点的州名，若相等，count加一；
* 遍历完所有节点后，打印count/2即可。

**复杂度分析：**

* 输入处理复杂度是O(N),遍历所有城市的复杂度也是O(1)；
* 所以总的复杂度就是O(N).
