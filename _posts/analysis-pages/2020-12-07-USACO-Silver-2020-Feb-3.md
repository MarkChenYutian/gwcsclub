---
layout: post
title: USACO 2020 Feb Silver T3
status: OK
Author: 李若谷
tags: [ USACO analysis ]
year: 2020
group: Silver
season: Feb
question: 3
---
##### 题目大意：
n个点n-1条边的联通图，每个点上都有一个时钟。每经过一个点，这个点的时间就会+1。求总共有多少个点能从此开始最终全部时间调为12。
##### 思路：
由于是n个点n-1条边的连通图，那么肯定是一颗树。
固定一个根节点。
考虑叶子节点。叶子节点只能到它的父节点。所以想要将叶子节点调为12，必须要在叶子节点和父节点中来回移动。事实上，如果叶子节点要调为12，那么父节点中的时钟肯定也会调叶子节点的变化量，或者变化量-1（如果最后一次留在叶子节点不回到父节点）。

设$dp[i]$ 代表以i为根节点的树将所有子节点都调为12后再回到i跟节点上所指的数。
$dp[i]  = (12-\Sigma dp[j])$ $mod$ $12$
其中j是i的子节点。
 设root为根节点。
 
 如果最后$dp[root] = 0$ 也就是12，那么肯定这个根节点是可以的。
 但是不一定最后会回到root，可能会在中间停。
 对于这种情况，设j为停在的点，i为j的父节点。
 那么对于i这颗树来说，最终不用回到i，$dp[i]$肯定会比不停在i的+1
 那么从i在推回root，发现root也会+1
 
 所以如果最后$dp[root] = 1$也是可行的。
##### 代码：
 
```cpp
#include <iostream>
#include <cstring>
#include <vector>
using namespace std;
const int N = 2500 + 5;
int a[N];
vector <int> p[N];
int n;
int dp[N];
int dfs(int root,int fa)
{
	dp[root] = a[root];
	for(int i = 0;i<p[root].size();i++)
	{
		int son = p[root][i];
		if(son!=fa)
			dp[root] += (12-dfs(son,root)) % 12;
	}
	return dp[root]%12;
}
int main()
{
	int cnt = 0;
	int n;
	cin>>n;
	for(int i=1;i<=n;i++) cin>>a[i];
	for(int i=1;i<=n-1;i++)
	{
		int x,y;
		cin>>x>>y;
		p[x].push_back(y);
		p[y].push_back(x);
	}
	for(int i=1;i<=n;i++)
	{
		// for(int j=1;j<=n;j++) dp[j] = a[j];
		int k = dfs(i,i);
		if(k == 0||k == 1) cnt++;
	}
	cout<<cnt<<endl;
	return 0;
}
```
 
##### 时间复杂度：
 $O(n^2)$

