---
layout: usaco-post
title: USACO 2018 Bronze Jan 2
tags: USACO-analysis
status: OK
author: 杨菲凡
time: 2018
group: Bronze
question: Jan 2
---
## 题目

给出 $N$ 个范围，求出去掉一个范围后剩下范围覆盖的最大值

## 思路

用一个数组表示所有范围中的每个值出现的次数，遍历每个范围并求出去掉这个范围后剩下覆盖的值，再求最大值

## 复杂度分析

过程中一共需要遍历两次数组，总复杂度为 $O(n)$

## 代码

```python
lines = open('lifeguards.in').read().strip().split('\n')
n = int(lines[0])
shifts = []
times = [0] * 1000

for i in range(1, n + 1):
	line = tuple(map(int, lines[i].split(' ')))
	shifts.append(line)
	for j in range(line[0], line[1]):
		times[j] += 1
#print(times)
max_count = 0
for shift in shifts:
	count = 0
	temp = times.copy()	
	for i in range(shift[0], shift[1]):
		temp[i] -= 1
	for i in temp:
		if i > 0: count += 1
	max_count = max(count, max_count)
print(max_count)

file = open('lifeguards.out', 'w')
file.write(str(max_count))
file.close()
```