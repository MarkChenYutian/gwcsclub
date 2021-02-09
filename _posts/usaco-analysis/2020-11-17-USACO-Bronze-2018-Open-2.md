---
layout: usaco-post
title: USACO 2018 Open Bronze P2
tags: USACO-analysis
status: OK
author: yff
time: 2018
group: Bronze
question: Open 2
---



[题目链接](http://www.usaco.org/index.php?page=viewproblem2&cpid=832&lang=zh)

## 题目

给 $N$ 头奶牛按以下规则排序：
1. 有些奶牛要按给定顺序排序
2. 有些奶牛只能排在某个位置
3. 满足前两个规则的前提下，奶牛 1 要尽量往前排。

求出奶牛 1 在队伍中出现的最早位置

## 思路

按题目给的规则排序

## 复杂度分析

$O(n^2)$

## 代码

```python
lines = open('milkorder.in').read().strip().split('\n')
n, m, k = list(map(int, lines[0].split(' ')))
order = list(map(int, lines[1].split(' ')))
pos_cow = {}
for i in range(2, k + 2):
	line = list(map(int, lines[i].split(' ')))
	pos_cow[line[0]] = line[1]

pos = [0] * (n + 1)

for i in pos_cow:
	pos[pos_cow[i]] = i

if 1 in order:
	cur = 1
	for num in range(0, len(order)):
		if order[num] in pos:
			cur = pos.index(order[num]) + 1
		else:
			for i in range(cur, len(pos)):
				if pos[i] == 0:
					pos[i] = order[num]
					cur = i + 1
					break
else:
	cur = len(pos) - 1
	for num in range(len(order) - 1, -1, -1):
		if order[num] in pos:
			cur = pos.index(order[num]) - 1
		else: 
			for i in range(cur, 0, -1):
				if pos[i] == 0: 
					pos[i] = order[num] 
					cur = i - 1
					break

file = open('milkorder.out', 'w')
if 1 in pos: 
	file.write(str(pos.index(1)))
	print(pos.index(1))
else:
	for i in range(1, len(pos)):
		if pos[i] == 0:
			print(i)
			file.write(str(i))
			break

file.close()

```