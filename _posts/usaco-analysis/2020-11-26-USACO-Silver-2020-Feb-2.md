---
layout: usaco-post
title: USACO 2020 Feb Silver P2
tags: USACO-analysis
status: OK
author: Marcus
time: 2020
group: Silver
question: Feb 2
---
### Rectangular Pasture

> 题目大意：有n头牛待在一个二维平面，已知每头牛的x，y坐标，且x、y坐标分别的唯一的。现定义：一个矩形（四条边分别与x轴、y轴平行）所包含的牛称为一个子集。请求出有多少个不同的子集（只包含一头牛也算子集，空集也算一个子集）。

#### 思路：

一个矩形的四条边中任意一条边的平移，如果多包含了一个点/少包含了一个点，就是一个新的子集。
选择两头牛，以这两个点为对角线，得到一个矩形，固定其左、右两条边。上面的边可以先上平移、下面的边可以向下平移，包含更多的点以产生新的子集。
虽然上面的边向下、下面的边向上平移，也能少包含点而得到新的子集，但是往内平移后的左右两条边也会产生一样的子集，即会产生重复，因此不把上边往下平移/下边往上平移。
假设上面的边之上有n1个点，下面的边之下有n2个点。通过平移这两条边，上面的边可以多包含0（可以不包含），1，2，……，n1个点，n1+1个选项，下面同理有n2+1个选项，相乘得(n1+1)\*(n2+1)，就是这个矩形的上下两条边平移可以得到的子集的数量
![1](https://tva1.sinaimg.cn/mw690/0085ShT8gy1glwweqwyqdj307609paad.jpg)上面可以选择包含0, 1, 2, 3个点，下面可以选择0, 1, 2个点，有12个选择
用嵌套循环来选择两个点，用这两个点构造上述的矩形，每个矩形计算(n1+1)\*(n2+1)，其总和+n+1（只包含一头牛的子集和空集）就是答案。

创建一个二维前缀和数组，就可以O(1)地得到n1、n2。
为了节省前缀和数组的空间，x、y坐标分别用一个数组存储、排序这个数组，然后使用两个dictionary，key是x(y)值，value是排序后的x(y)值数组的index，即有几个x(y)值比其小，然后用这两个dictionary将每个点的x、y坐标替换成“有几个x(y)值比其小”。这样，二维前缀和的大小就只需要n\*n。

#### 复杂度：

将x、y替换成“有几个x(y)值比其小”中需要排序，O(n*log(n))。
创建二维前缀和数组，需要遍历每个位置，O(n\^2)。
嵌套循环，O(n\^2)，每次的两个点用O(1)计算子集数量。
总的是O(n\^2)。

#### 实现：

> Note that due to the low speed of python program, although the python program's code is nearly the same meaning (the same effect) as java program, java program can pass through time limit but python program cannot. 

```java
import java.util.*; import java.io.*;
public class rec{
    public static void main(String[]args)throws IOException{
        BufferedReader in=new BufferedReader(new InputStreamReader(System.in));
        int n=Integer.parseInt(in.readLine());
        long[][]cows=new long[n][2];
        long[]xs=new long[n];
        long[]ys=new long[n];
        HashMap<Long,Integer>mapx=new HashMap<>();
        HashMap<Long,Integer>mapy=new HashMap<>();
        for(int i=0;i<n;i++){
            String[]st=in.readLine().split(" ");
            long[]temp={Long.parseLong(st[0]),Long.parseLong(st[1])};
            cows[i]=temp;
            xs[i]=temp[0];
            ys[i]=temp[1];
        }
        Arrays.sort(xs); Arrays.sort(ys);
        for(int i=0;i<n;i++) mapx.put(xs[i],i);
        for(int i=0;i<n;i++) mapy.put(ys[i],i);
        for(long[]cow:cows){
            cow[0]=mapx.get(cow[0]);
            cow[1]=mapy.get(cow[1]);
        }
        long[][]map=new long[n][n];
        for(long[]cow:cows){
            int x=(int)cow[0];
            int y=(int)cow[1];
            map[x][y]=1;
        }
        for(int x=1;x<n;x++) for(int y=0;y<n;y++) map[x][y]+=map[x-1][y];
        for(int x=0;x<n;x++) for(int y=1;y<n;y++) map[x][y]+=map[x][y-1];
        long count=n+1;
        for(long[]line:map){
            System.out.println(Arrays.toString(line));
        }
        for(int a=0;a<n;a++){
            long[]cow1=cows[a];
            int x1=(int)cow1[0];
            int y1=(int)cow1[1];
            for(int b=a+1;b<n;b++){
                long[]cow2=cows[b];
                int x2=(int)cow2[0];
                int y2=(int)cow2[1];
                int x_g=Math.max(x1,x2);
                int x_s=Math.min(x1,x2);
                int y_g=Math.max(y1,y2);
                int y_s=Math.min(y1,y2);
                long above=map[x_g][n-1]-map[x_s][n-1]-map[x_g][y_g]+map[x_s][y_g];
                long below;
                if(y_s-1>-1) below=map[x_g][y_s-1]-map[x_s][y_s-1];
                else below=0;
                count+=(above+1)*(below+1);
            }
        }
        System.out.println(count);
    }
}
```