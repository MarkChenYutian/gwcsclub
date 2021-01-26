---
layout: usaco-post
title: USACO 2020 Feb Silver P2
tags: USACO-analysis
status: OK
author: 李若谷
time: 2020
group: Silver
question: Feb 2
---



### USACO 2020 Feb Silver 2

##### 题目大意：
给定n个点，求这n个点组成的一条与x轴平行，一条与y轴平行的直角三角形的面积总和的两倍。
##### 思路：
Step 1: 假设点$p(x,y)$是一个直角边。可以发现，以它为直角边的所有可能的点的面积就是 和他在一条x轴上的点的距离总和乘上和他在一条y轴上的点的距离总和。也就是 $\Sigma$$x$<sub>$i$</sub>-x$ $ $*$ $\Sigma$$y$<sub>$i$</sub>-y$ $ 其中$x$<sub>$i$</sub>$ $的y轴和y相同，$y$<sub>$i$</sub>$ $ 的x轴和x相同。
Step 2: 
优化求 $ \Sigma $  $x$<sub>i</sub>-x$ $。
对于同样一个$y$，假设以$x $<sub>$i$</sub>$ $为直角边的所有x的离它的距离的总和算出来了，并且就等于sum。那么考虑$x $<sub>$i+1$</sub>$ $。假设$x $<sub>$i+1$</sub>$ $ 和 $x $<sub>$i$</sub>$ $之间的距离为dis，那么这时，从1到i的所有点的距离都会加一个dis，因为直角边忘后移了一个dis。而从i到n，每个点的距离都会减一个dis。对于求y同理。
那么，就可以在$O(n)$时间内算完所有点的x,y总和了。
但是，给定的数据不是排好序的。所以要先排序。以x为第一关键字，y为第二关键字可以算y的总和。再以y为第一关键字，x为第二关键字算x的总和。

##### 时间复杂度：
$O(nlogn)$

##### 代码：

```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <algorithm>
using namespace std;
const int N = 1e5+5;
const int Range = 2*1e4+5;
const long long mod = 1e9+7;
struct Point{
	int x;
	int y;
	long long sumx;
	long long sumy;
	int no;
}p[N];
bool cmp(Point x,Point y)
{
	if(x.x == y.x) return x.y<y.y;
	else return x.x<y.x;
}
bool cmp2(Point x,Point y)
{
	if(x.y==y.y) return x.x<y.x;
	else return x.y<y.y;
}
int main()
{
	int n;
	cin>>n;
	for(int i=1;i<=n;i++){
		cin>>p[i].x>>p[i].y;
		p[i].no = i;
		p[i].sumx = p[i].sumy = 0;
	}
	long long ans = 0;
	sort(p+1,p +n+1,cmp);
	long long sum = 0;
	int pre = 1;
	for(int i=1;i<=n+1;i++)
	{
		if(p[i].x!=p[i-1].x||i==n+1)
		{
			p[pre].sumy = sum;
			for(int j=pre+1;j<i;j++)
			{
				long long dis = p[j].y - p[j-1].y;
				p[j].sumy = sum;
				p[j].sumy = (p[j].sumy + (j-pre) * dis) % mod;
				p[j].sumy = (p[j].sumy - (i-j) * dis) % mod;
				sum = p[j].sumy % mod;
			}
			pre = i;
			sum = 0;
		}
		sum = (sum + abs((p[i].y - p[pre].y))) % mod;
 	}
	sort(p+1,p+n+1,cmp2);
	sum = 0;
	pre = 1;
	for(int i=1;i<=n+1;i++)
	{
		if(p[i].y!=p[i-1].y||i==n+1)
		{
			p[pre].sumx = sum;
			for(int j=pre+1;j<i;j++)
			{
				long long dis = p[j].x - p[j-1].x;
				p[j].sumx = sum;
				p[j].sumx = (p[j].sumx + (j-pre) * dis) % mod;;
				p[j].sumx = (p[j].sumx - (i-j) * dis) % mod;
				sum = p[j].sumx;
			}
			pre = i;
			sum = 0;
		}
		sum = (sum + abs((p[i].x - p[pre].x))) % mod;
 	}
 	for(int i=1;i<=n;i++)
 	{
 		ans = (ans + (p[i].sumx*p[i].sumy)%mod)%mod;;
 	}
	cout<<ans<<endl;
	return 0;
}
```