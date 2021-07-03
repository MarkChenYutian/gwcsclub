---
layout: post
title: USACO 2020 Jan Bronze P2
tags: [ USACO analysis ]
status: OK
Author: yff
year: 2020
group: Bronze
season: Jan
question: 2
---



[Link to the Problem](http://www.usaco.org/index.php?page=viewproblem2&cpid=988)

## Problem Description

Sequence $a$ contains numbers from 1 to $N$ ($2 ≤ N ≤ 10^3$) in no order, and sequence $b$ contains $N-1$ numbers that satisfied $b_i = a_i + a_{i + 1}$. Given sequence $b$, find the “minimum” sequence $a$

## Proposed Solution

If we know the first number of sequence $a$, we can construct the whole sequence with sequence $b$. Therefore we will try to guess the first number from 1 to $N$

## Time Complexity Analysis

Guessing the first number of sequence $a$ and constructing the whole sequence $a$ both have a time complexity of $O(N)$, so the total time complexity is $O(N^2)$

## Code

```python
def valid(start):
	global bcows
	visited = set()
	acows = [start]
	for i in range(len(bcows)):
		next = bcows[i] - acows[i]
		if next in visited: return False, acows
		visited.add(next)
		acows.append(next)
	return True, acows
		
lines = open('photo.in').read().strip().split('\n')
n, bcows = int(lines[0]), list(map(int, lines[1].split(' ')))

result = ''
for i in range(1, n + 1):
	test = valid(i)
	if test[0]: 
		acows = test[1]
		for acow in acows: result += str(acow) + ' '
		break

print(result)
file = open('photo.out', 'w')
file.write(result.strip())
file.close()
```

