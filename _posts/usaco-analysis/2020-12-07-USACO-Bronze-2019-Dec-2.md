---
layout: usaco-post
title: USACO 2019 Bronze Dec 2
tags: USACO-analysis
status: OK
Author: 杨菲凡
time: 2019
group: Bronze
question: Dec 2
---
## 问题

在一个长度为 $N$ 的字符串中找出最短不重复的子字符串（连续）

## 思路

二分法找出最短长度

## 复杂度分析

二分法的复杂度为 $O(\log N)$，每次二分检查的复杂度为 $O(N)$，总复杂度为 $O(N \log N)$

## 代码

```python
def valid(mid):
	global n, letters
	visited = set()
	for i in range(n - mid + 1):
		if letters[i:i + mid] not in visited:
			visited.add(letters[i:i + mid])
		else: return False
	return True
	
lines = open('whereami.in').read().strip().split('\n')
n, letters = int(lines[0]), lines[1]

high = 100
low = 0
while high - low > 1:
	mid = (high + low) // 2
	if valid(mid): high = mid
	else: low = mid
print(high)

file = open('whereami.out', 'w')
file.write(str(high))
file.close()
```