---
layout: post
title: CodeForce Div 3 Contest 725 Q-F
tags: ["CodeForce","Other-analysis"]
Author: ["Leon"]
group: 3
question: F
number: 725
---
## 2021-6-11CodeForce-F

### 题目描述

题目给两个数，分别为l，r(r>l)，求出从l到r所有数位变动的次数。

### 思路

每一个数位的变动次数都是这一位及更其更高位的差值。因为每一位的变动都是因为比自己更低的位置出现了变动，就像如果百位变动一次(100,200)，则个位要变动一百次（0-9)*10，十位要变动十次（0-9）。

如

113 227

个位数的变动次数为227-113；

十位数的变动次数为22-11；

百位数的变动为2-1；

然后将这些全部加起来即可获得答案。

复杂度O(logN)；

### 代码实现

```java
import java.util.*;
import java.io.*;
public class InFunction{
    public static void main ( String [] args){
        Scanner in = new Scanner (System.in);
        int t = in.nextInt();
        while(t>0){
            long change = 0L;
            int l = in.nextInt();
            int r = in.nextInt();
            change += r-l;
            while(r>0){
                l/=10;
                r/=10;
                change += r-l;
            }
            System.out.println(change);
            t--;
        }   
    }
}
```

