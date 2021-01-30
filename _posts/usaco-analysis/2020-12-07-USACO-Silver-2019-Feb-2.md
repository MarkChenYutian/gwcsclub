---
layout: usaco-post
title: USACO 2019 Feb Silver P2
tags: USACO-analysis
status: OK
author: bbl
time: 2019
group: Silver
question: Feb 2
---

### Problem2 [Painting the Barn](http://www.usaco.org/index.php?page=viewproblem2&cpid=919)

#### 题目描述
农夫要在农场的一个二维平面涂漆，每次农夫会涂出来一个矩阵，他一共会涂N(1<=N<=10^5^)个矩阵。我们会获得这个矩阵的左下跟右上坐标，这些矩阵可能有地方是重叠的。给定k(k<=N)，求当农夫将所有的油漆矩阵完成后，平面上有k层油漆的总面积

#### 思路
我们可以跟踪每一个点又多少的油漆层，但这时我们复杂度最大为10^5^ * 10^6^ = 10^11^ 必然会超。但是转换一下思路，我们只记录每一个矩阵的左右两边的竖线记录这个地方的层数，在最后计算总面积的时候再进行操作。

> e.g. 下面的图形中有两片油漆，分别是[(1,0),(3,2)]跟[(2,0),(4,2)]
> 我们标记处在x=1跟x=3的竖边上所有点都为1，另外两条竖边上的点为-1 。在最后记录的时候，假设我们想要层数为2的面积。
>
> 我们只需要遍历整一个数组，并在每一个点做如下操作:
>
> - if `map[i][j]`==2 : ret++
>
> - `map[i][j+1]`+=`map[i][j]`
>
> 我们就会发现只有在x=2跟x=3的六个点满足2的值，答案为6
>
> ![截屏2020-12-09 下午6.59.14](/Users/bblzuiqiang/Library/Application Support/typora-user-images/截屏2020-12-09 下午6.59.14.png)

复杂度分析：每次标记竖边最多遍历2,000个点，复杂度为O(2,000*N)->O(N), 计算总面积复杂度为O(1,000^2^)。总复杂度为O(N)

#### 代码实现

```java
import java.util.*;
import java.io.*;
public class paintbarn{
    public static void main(String[] args)throws IOException{
        BufferedReader bf = new BufferedReader(new FileReader("paintbarn.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("paintbarn.out")));
        String[] items = bf.readLine().split(" ");
        int amount = Integer.parseInt(items[0]);
        int k = Integer.parseInt(items[1]);

        int[][] map = new int[1000][1000];
        for(int i = 0;i<amount;i++){
            items = bf.readLine().split(" ");
            int a = Integer.parseInt(items[0]);
            int b = Integer.parseInt(items[1]);
            int c = Integer.parseInt(items[2]);
            int d = Integer.parseInt(items[3]);
            for(int j = a;j<c;j++){
                map[j][b]+=1;
                map[j][d]-=1;
            }
        }

        int ret = 0;
        for(int i = 0;i<map.length;i++){
            for(int j = 0;j<map.length;j++){
                if(map[i][j] == k) ret++;
                if(j!=map.length-1)map[i][j+1]+=map[i][j];
            }
        }
        
        out.println(ret);

        bf.close();
        out.close();
    }
}
```

