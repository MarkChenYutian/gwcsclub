---
layout: post
title: USACO 2018 Feb Silver P1
tags: [ USACO analysis ]
status: OK
Author: bbl
year: 2018
group: Silver
season: Feb
question: 1
---



#### 2018 Feb Silver

###### Problem1[Rest Stops](http://www.usaco.org/index.php?page=viewproblem2&cpid=810&lang=en)

农夫与教练登一座高度为L(1<=L<=10^6^)的山。在登山的过程中，农夫以 R~F~ 的速度登山且中途不会停下，而教练可以在途中的休息站停下吃东西。一共有N个(1<=N<=10^5^)休息站，我们有每个休息站的相对位置以及每个休息站东西好吃的程度c~i~, 教练在一个休息站享受到的美味等于c~i~*t。当教练不在休息时，始终以R~B~ 的速度登上。求在教练始终在农夫前面的情况下，登山前教练能享受到的最大美味值

思路：教练在每个休息站的停留时间是可选择的。当教练到达一个休息站时，如果这个休息站右边有一个更加美味的休息站时，教练就没有比较在这个休息站多做停留。因此，教练应该呆在一个右边最美味的休息站尽可能久的时间直到农夫追上。然后她再继续前进。
我们需要遍历两次休息站的数值，从右到左找到右边美味值最大休息站。从左到右记录农夫与教练的进程。

复杂度分析：遍历两次，总复杂度为O(n)

```java
import java.util.*;
import java.io.*;
public class reststops{
  public static void main(String[]args)throws IOException{
    BufferedReader bf = new BufferedReader(new FileReader("reststops.in"));
    PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("reststops.out")));
    String[] items = bf.readLine().split(" ");
    int height = Integer.parseInt(items[0]);
    int amount = Integer.parseInt(items[1]);
    long f_speed = Long.parseLong(items[2]);
    long b_speed = Long.parseLong(items[3]);
    int[] x = new int[100000];
    int[] t = new int[100000];
    boolean[] isMax = new boolean[100000];
    
    for(int i = 0;i<amount;i++){
      items = bf.readLine().split(" ");
      x[i] = Integer.parseInt(items[0]);
      t[i] = Integer.parseInt(items[1]);
    }
    //get largest tasty
    int max = 0;
    for(int i = amount-1;i>=0;i--){
      //如果current的tasty比后面的大，那么这个位置就是localMaximum
      if(t[i]>max){
        isMax[i] = true;
        max = t[i];
      }
    }
    //这里需要用到long，要不然会过界
    long ret = 0;
    long xf = 0;long xb = 0;
    int lastx = 0;
    for(int i = 0;i<amount;i++){
      if(isMax[i]){
        xf+=(x[i]-lastx)*f_speed;
        xb+=(x[i]-lastx)*b_speed;
        ret+=(xf-xb)*t[i];
        xb = xf;
        lastx = x[i];
      }
    }
    out.println(ret);
    bf.close();
    out.close();
  }
}
```



