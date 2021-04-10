---
layout: usaco-post
title: USACO Silver 2019 JAN 1
tags: USACO-analysis
status: OK
Author: 肖肖
time: 2019
group: Silver
question: Jan 1
---
## Grass Planting

### 题目

给出N个点(N小于等于10^5^)组成的树,要求给每个点染色保证相邻节点颜色不同并且相邻的边的点也不同,求出最少要用的颜色.

### 分析

这道题经过翻译后其实就是一个染色问题,我们可以直接求出最多连接最多节点的边数+1

### 复杂度

我们可以在读取边的时候进行记录然后遍历一次数组找到最多的边所以复杂度O(N)

### 代码

```c++
#include <stdlib.h>
#include <stdio.h>
#include <vector>
#include <algorithm>

using namespace std;

int N,grass[200000];

int main(){
	FILE *in = fopen("planting.in","r");
	FILE *out = fopen("planting.out","w");
	fscanf(in,"%d",&N);
	for(int i = 0; i < N-1;i++){
		int s,e;
		fscanf(in,"%d%d",&s,&e);
		grass[s]++;
		grass[e]++;
	}
	int res = 0;
	for(int i = 0; i < N;i++){
		res = max(res,grass[i]);
	}
	fprintf(out,"%d",res+1);
	return 0;
}
```
