---
layout: post
title: Stone Game
tags: ["CodeForce", "Other-analysis"]
division: 3
number: 725
Author: dJw
---

### 题目大意

有一堆石头（每个石头上有一个数字），然后只能从最左，或最右拿走。让你计算拿走这一堆石头里最大 和最小的那一颗的最简步数



### 大概思路

先找到最大和最小的石头，同时找到最大和最小的石头的index
因为就3种情况👇直接列举找最小就好了
1.从左一直往右拿     2.从右一直往左拿    3.左边拿一点 右边拿一点


复杂度

$O(n)$ 
$t (1\leq 𝑡\leq 100)$ t个testcase
$n (2\leq n\leq 100)$ n个石头



代码

```java
import java.util.*;
public class stoneGame{
    public static void main(String [] args){
        Scanner in=new Scanner(System.in);
        int N=Integer.parseInt(in.nextLine());
        for(int n=0;n<N;n++){
            int T=Integer.parseInt(in.nextLine());
            String[] temp=in.nextLine().split(" ");

            int max=Integer.parseInt(temp[0]);
            int mark=0;//maxIndex
            int min=Integer.parseInt(temp[0]);
            int mark2=0;//minIndex
            for(int i=0;i<temp.length;i++){
                int te=Integer.parseInt(temp[i]);
                if(te>max){
                    max=te;
                    mark=i;
                }
                if(te<min){
                    min=te;
                    mark2=i;
                }
            }        

            if(mark>mark2){
                int tem=mark2;
                mark2=mark;
                mark=tem;
            }

            int ans=mark2+1;
            ans=Math.min(ans, T-mark);
            ans=Math.min(ans,mark+1+T-mark2);
            System.out.println(ans);
        }
    }
}
```
