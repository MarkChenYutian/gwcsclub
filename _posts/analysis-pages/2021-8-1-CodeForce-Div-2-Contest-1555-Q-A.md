---
layout: post
title: CodeForce Div 2 Contest 1555 Q-A
tags: ["CodeForce", "Other-analysis"]
division: 2
number: 112
Author: dJw
---

### 题目大意

> 一共有n个朋友要来你家做客，你可以点三种大小的pizza：
>
> 1. 6 slices 要做15分钟      2.  8 slices 要做20分钟     3.  10 slices 要做25分钟
>
> 求用最少的时间，保证一人可以吃到一块pizza

### 思路

> 先找到人数n里有多少个二 （有余数+1，因为要保证一人可以吃到一块pizza），因为可以从题目看出 2块pizza要用五分钟来做。所以二的个数*5就好了。
>
> 复杂度：O(n)

~~~java
import java.util.*;
public class pizzaForces{
    public static void main (String [] args){
        Scanner in = new Scanner (System.in);
        int N = in.nextInt();
        for(int n=0; n<N; n++){
            long num = in.nextLong();
          /**
           * 6-15
           * 8-20
           * 10-25
           */
            if(num <= 6) System.out.println(15);
            else if(num <= 8) System.out.println(20);
            else if(num <= 10) System.out.println(25);
            else{
                //找到人数里面有多少个二
                long num2 = num / 2;
                if(num % 2 != 0) num2 += 1;

                // if(num2 % 3 == 0){
                //     System.out.println(num2 * 5);
                // }else{
                //     if(num2 % 4 == 0) System.out.println(num2 * 5);
                //     else System.out.println(num2 * 5);
                // }
                System.out.println(num2 * 5);
            }
        }
    }
}
~~~

