---
layout: post
title: Friends and Candies
tags: ["CodeForce", "Other-analysis"]
division: 3
number: 725
Author: dJw
---

### 题目大意

要平均的分配糖果的数量，可以选择K个朋友 把他们的糖果重新分配，求K的最小值

### 大概思路

先判断能不能平均分完，能的话直接计算比平均值大的个数就好了，因为那些多出糖果肯定要被分出去
复杂度 ：O(n)  1≤𝑛≤2105

### 代码

```java
import java.util.*;
public class friends{
    public static void main(String [] args){
        Scanner in=new Scanner(System.in);
        int N=Integer.parseInt(in.nextLine());
        for(int n=0;n<N;n++){
            int num=Integer.parseInt(in.nextLine());
            String[] temp=in.nextLine().split(" ");
            int[] fri=new int[num];
            int sum=0;
            for(int i=0;i<temp.length;i++){
                fri[i]=Integer.parseInt(temp[i]);
                sum+=Integer.parseInt(temp[i]);
            }

            int answer=0;
            if(sum%num==0){
                int standard=sum/num;
                
                for(int j=0;j<fri.length;j++){
                    if(fri[j]==standard) continue;
                    if(fri[j]>standard) answer++;
                }
                System.out.println(answer);
            }else{
                System.out.println(-1);
            }
        }
    }
}
```
