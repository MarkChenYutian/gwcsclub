---
layout: usaco-post
title: USACO Silver 2019 JAN 2
tags: [ USACO analysis ]
status: OK
Author: 肖肖
year: 2019
group: Silver
season: Jan
question: 2
---
## Icy Perimeter

### 题目

给出一个N*N(N小于等于1000)矩阵由两种字符(定义为0和1)组成,其中1号字符会被切分成几个部分,求出面积最大,周长最小的部分

### 分析

这题我们可以使用fluidfill的思路来找出所有的1号字符的坐标,每个部分存进一个list,其中list的长度即为面积,然后通过遍历整个list查看每个坐标周围是否为0或者越界来计算面积

### 复杂度

fluidfill的算法需要遍历所有的点复杂度为O(N*N),计算面积即获取list长度复杂度O(1),然后取出了一个list,遍历list,查看一个点周围来计算周长复杂度O(4N),所以总共的复杂度O(N^2^),N的大小为1000,所以最大运算为10^6^左右

### 代码

```c++
#include <stdio.h>
#include <stdlib.h>
#include <stack>
#include <vector>

using namespace std;

int N,ice[2000][2000],isVisit[2000][2000];
int change[4][2] = { {1,0},{-1,0},{0,1},{0,-1} };
int maxA = 0,MaxP = 0;
struct point{
	int x;
	int y;
};

int getlength(vector<point> v){
	int count = 0;
	for(int i = 0; i < v.size();i++){
		for(int j = 0; j < 4; j++){
			int x = v[i].x+change[j][0];
			int y = v[i].y+change[j][1];
			if(x >= 0 && x < N && y >= 0 && y < N && ice[x][y] == 0){
				count+=1;
			}
			if(x < 0 || x >= N){
				count+=1;
				
			}
			if(y < 0 || y >= N){
				count+=1;
				
			}
			
		}
	}
	return count;
}
void floodfill(){
	for(int i = 0;i < N;i++){
		for(int j = 0; j < N; j++){
			if(isVisit[i][j] == 0 && ice[i][j] == 1){
				vector<point> biggest;
				point curr;
				curr.x = i;
				curr.y = j;
				stack<point> s;
				biggest.push_back(curr);
				s.push(curr);
				isVisit[i][j] = 1;
				while(!s.empty()){
					point now = s.top();
					s.pop();
					for(int a = 0; a < 4; a++){
						int x = now.x+change[a][0];
						int y = now.y+change[a][1];
						if(x<0 || x >= N || y < 0 || y >= N || isVisit[x][y] == 1 || ice[x][y] == 0){
							continue;
						}
						point temp;
						temp.x = x;
						temp.y = y;
						s.push(temp);
						biggest.push_back(temp);
						isVisit[x][y] = 1;
						
					}
				}
				int area = biggest.size();
				int p = getlength(biggest);
				if(area > maxA){
					maxA = area;
					MaxP = p;
				}else if(area == maxA){
					if(p < MaxP){
						MaxP = p;
					}
				}
			}
		}
	}
}
void process(int line, char* temp){
	for(int i = 0; i < N;i++){
		if(temp[i] == '#'){
			ice[line][i] = 1;
		}
	}
}
int main(){
	FILE* in = fopen("perimeter.in","r");
	FILE* out = fopen("perimeter.out","w");
	fscanf(in,"%d",&N);
	for(int i = 0 ;i < N; i++){
		char temp[N];
		fscanf(in,"%s",temp);
		process(i,temp);
	}
	printf("\n");
	floodfill();
	fprintf(out, "%d %d",maxA,MaxP);
	return 0;
}
```

