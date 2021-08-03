---
layout: post
title: CodeForce Div 2 Contest 1555 Q-B
tags: ["CodeForce", "Other-analysis"]
division: 2
number: 112
Author: dJw
---

### 题目大意

> 有一个长W 高H的房间，里面有两张桌子
>
> 题目给出了第一张桌子的左下角 (x1,y1) 和右上角 (x2,y2) 
>
> 第二张桌子的长和宽 (w,h)
>
> 问最少把第一个桌子移多少距离才能使两个桌子不重合？

### 思路

> 先判断这个房间是否装得下两个不重叠的桌子
>
> 如果装得下，再列出每一种移动的可能，找出最小值
>
> 复杂度：O(1)

### 代码

~~~java
import java.util.*;
public class twoTables{
    public static void main (String [] args){
        Scanner in = new Scanner (System.in);
        int T = in.nextInt();
        for(int t=0; t<T; t++){
            int W = in.nextInt();
            int H = in.nextInt();
            int x1 = in.nextInt();
            int y1 = in.nextInt();
            int x2 = in.nextInt();
            int y2 = in.nextInt();
            int w = in.nextInt();
            int h = in.nextInt();

            int flag = 0;//不可以
            int ans = 100000000;
            if(x2 - x1 + w <= W){
                flag = 1;
                ans = Math.min(ans, Math.max(w - x1, 0));
                ans = Math.min(ans, Math.max(x2 - W + w, 0));
            }

            if(y2 - y1 + h <= H){
                flag = 1;
                ans = Math.min(ans, Math.max(h - y1, 0));
                ans = Math.min(ans, Math.max(y2 - H + h, 0));
            }
            if(flag == 0) System.out.println(-1);
            else System.out.println(ans);
        }
    }
}
~~~

