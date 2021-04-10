---
layout: usaco-post
title: USACO 2017 Feb Silver P2
tags: USACO-analysis
status: OK
Author: 杨菲凡
time: 2017
group: Silver
question: Feb 2
---

## 题目

有 n 个连续的红绿灯，其中 b 个是坏的。求至少要修好多少个红绿灯才能使至少 k 个没坏的红绿灯是连续的

## 思路

用一个数组装每两个坏的红绿灯的间距，并用二分法求出需要修好红绿灯的数量

## 复杂度分析

将 b 个坏的路灯的坐标排序的复杂度为 $O(b logb)$，对 n 个路灯使用二分法的复杂度为 $O(logn)$，由于 $n ≥ b$，总复杂度最坏为 $O(n logn)$，不会超时

## 代码

```python
def valid(count):
	if count >= b: return True
	for i in range(len(intervals) - count):
		
		if sum(intervals[i:i + count + 1]) + count >= k:
			print(sum(intervals[i:i + count + 1]) + count)
			return True
	print(sum(intervals[i:i + count + 1]) + count)
	return False



lines = open('maxcross.in').read().strip().split('\n')
data = list(map(int, lines[0].split(' ')))
n, k, b = data
brokens = [] 
intervals = []
for i in range(1, b + 1):
	brokens.append(int(lines[i]))

brokens.sort()

for i in range(len(brokens) - 1):
	intervals.append(brokens[i + 1] - brokens[i] - 1)
#print(intervals)

file = open('maxcross.out', 'w')
if len(intervals) == 0: 
	file.write('0')
	file.close()

else:
	
	low = -1
	high = 100000
	while high - low > 1:
		mid = (low + high) // 2
		judge = valid(mid)
		print(mid, judge)
		if judge: high = mid
		else: low = mid
	
	print(high)
	
	file.write(str(high))
	file.close()
		
		
```