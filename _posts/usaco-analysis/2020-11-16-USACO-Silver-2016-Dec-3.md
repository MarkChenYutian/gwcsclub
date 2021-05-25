---
layout: usaco-post
title: USACO 2016 Dec Silver P3
tags: USACO-analysis
status: OK
Author: yff
year: 2016
group: Silver
season: Dec
question: 3
---
## 题目

一共有 $n$ 头奶牛，每头奶牛站在不同的位置 $(x, y)$，并拥有一个广播半径为 $p$ 的对讲机（每只奶牛的 $p$ 不一定相同）。求从某只奶牛开始能联系到最多的奶牛数是多少（单向）

## 思路

将奶牛坐标装进一个数组中，将每只奶牛的 $p$ 装进另一个 $index$ 都一一对应的数组。遍历装坐标的数组，利用递归计算当前奶牛能联系到的所有奶牛数，并得出最大值

## 复杂度分析

遍历长度为 $n$ 数组的复杂度为 $O(n)$，其中每个元素递归最坏的复杂度也为 $O(n)$，总复杂度为 $O(n^2)$。$n$ 最大为 200，不会超时

## 代码

```python
def distance(p1, p2):
	return ((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2) ** 0.5
	
def neighbors(pos):
	global poses, powers
	
	result = set()
	for i in range(len(poses)):
		if i == pos: continue
		if distance(poses[pos], poses[i]) <= powers[pos]: result.add(i)
	return result

def process(pos):
	global poses, visited
	
	visited.add(pos)
	neighbor_pos = neighbors(pos)
	#print(neighbor_pos)
	if len(neighbor_pos) == 0: return
	for neighbor in neighbor_pos:
		if neighbor not in visited: process(neighbor)

lines = open('moocast.in').read().strip().split('\n')
n = int(lines[0])
poses = []
powers = []

for i in range(1, n + 1):
	line = list(map(int, lines[i].split(' ')))
	pos = (line[0], line[1])
	power = line[2]
	poses.append(pos)
	powers.append(power)

max_size = 0
for i in range(len(poses)):
	visited = set()
	process(i)
	max_size = max(len(visited), max_size)

print(max_size)
file = open('moocast.out', 'w')
file.write(str(max_size))
file.close()
```
