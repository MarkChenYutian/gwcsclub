---
layout: post
title: USACO 2017 Dec Bronze P2
tags: [ USACO analysis ]
status: OK
Author: djw
year: 2017
group: Bronze
season: Dec
question: 2
---

### Problem 2. The Bovine Shuffle

题目大意

> input可以知道shuffle的方法，和牛被shuffle过三次后的位置。要我们反推出牛的初始位置。

解题思路

> 做模拟，如果是把0号位的牛移到1号位，那么就把1号位的牛再挪回0号位。

时间复杂度

> O(n) 0<n<100

~~~java
import java.util.*;
import java.io.*;
public class shuffle{
    public static void main (String [] args) throws IOException{
        BufferedReader br = new BufferedReader ( new FileReader("shuffle.in"));
        PrintWriter pr = new PrintWriter(new FileWriter("shuffle.out"));
       
        int N=Integer.parseInt(br.readLine());
        String[] orders=br.readLine().split(" ");
        int[] order=new int[N];
        for(int k=0;k<N;k++){
            order[k]=Integer.parseInt(orders[k])-1;
        }
        String[] cows=br.readLine().split(" ");

        String[] arr=new String[N];
        for(int j=0;j<N;j++){
            arr[j]=cows[order[j]];
        }

        String[] num=new String[N];
        for(int f=0;f<N;f++){
            num[f]=arr[order[f]];
        }

        String[] nu=new String[N];
        for(int w=0;w<N;w++){
            nu[w]=num[order[w]];
        }
        
        for(int u=0;u<N;u++){
            pr.println(nu[u]);
        }
        


        pr.close();
    }
}
~~~



