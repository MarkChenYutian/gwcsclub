---
layout: usaco-post
title: USACO 2018 Dec Silver P2
tags: USACO-analysis
status: OK
Author: yff
year: 2018
group: Silver
season: Dec
question: 1
---

## 题目

有 $N$ 只奶牛，第 $i$ 头奶牛的到达时间为 $t_i$；有 $M$ 辆大巴，每辆大巴的容量为 $C$，求最优方案中奶牛最长等待时间为多少

## 思路

先将到达时间排序，再用二分法找到能使所有奶牛上车的最短等待时间

## 复杂度分析

将长度为 $N$ 的数组排序的复杂度为 $Nlog(N)$，二分法的复杂度为 $log(N)$，总复杂度为$Nlog(N)$，不会超时

## 代码

```python
def valid(mid):
	global times, n, m, c
	
	index = 0
	bus = 0
	num = 0
	timespan = times[0] + mid
	
	while index < n and bus < m:
		 if num < c and times[index] <=	timespan:
		 	index += 1
		 	num += 1
		 else:
		 	timespan = times[index] + mid
		 	num = 0
		 	bus += 1
		 	
	return index > n - 1
		
	
lines = open('convention.in').read().strip().split('\n')
n, m, c = list(map(int, lines[0].split(' ')))

times = sorted(list(map(int, lines[1].split(' '))))
high = max(times) - min(times)
low = -1
while high - low > 1:
	mid = (high + low) // 2
	if valid(mid): high = mid
	else: low = mid

print(high)
file = open('convention.out', 'w')
file.write(str(high))
file.close()
```
