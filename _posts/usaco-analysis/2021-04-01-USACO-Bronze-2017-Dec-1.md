---
layout: usaco-post
title: USACO 2017 Dec Bronze P1
tags: USACO-analysis
status: OK
Author: djw
time: 2017
group: Bronze
question: Dec 1
---

### Problem 1. Blocked Billboard

题目大意

> 原来有两个billboard，可能会被一辆卡车挡住。我们需要找出没有被挡住的面积。

解题思路

> 先用题目给的对角的坐标 算出原来两个billboard的总面积all。再利用 Math.min() 和 Math.max() 算出重复的面积 overlap1 && overlap2 ，最后相减。

时间复杂度

> O(1)

代码实现

~~~java
import java.util.*;
import java.io.*;
public class  Blocked{
    public static void main (String [] args) throws IOException{
        BufferedReader br = new BufferedReader ( new FileReader("billboard.in"));
        PrintWriter pr = new PrintWriter(new FileWriter("billboard.out"));
        String[] item=br.readLine().split(" ");
        String[] ite=br.readLine().split(" ");
        String[] it=br.readLine().split(" ");

        int x1=Integer.parseInt(item[0]);
        int y1=Integer.parseInt(item[1]);
        int x2=Integer.parseInt(item[2]);
        int y2=Integer.parseInt(item[3]);
        
        int x3=Integer.parseInt(ite[0]);
        int y3=Integer.parseInt(ite[1]);
        int x4=Integer.parseInt(ite[2]);
        int y4=Integer.parseInt(ite[3]);

        int xpl=Integer.parseInt(it[0]);
        int ypl=Integer.parseInt(it[1]);
        int xpr=Integer.parseInt(it[2]);
        int ypr=Integer.parseInt(it[3]);

        int all=(Math.max(x1,x2)-Math.min(x1,x2))*(Math.max(y1,y2)-Math.min(y1,y2))+(Math.max(x3,x4)-Math.min(x3,x4))*(Math.max(y3,y4)-Math.min(y3,y4));
        int overlap1=Math.max(0,Math.min(xpr,x2)-Math.max(x1,xpl))*Math.max(0,Math.min(ypr,y2)-Math.max(y1,ypl));
        int overlap2=Math.max(0,Math.min(xpr,x4)-Math.max(x3,xpl))*Math.max(0,Math.min(ypr,y4)-Math.max(y3,ypl));

        pr.print(all-overlap1-overlap2);

        pr.close();
    }
}
~~~

