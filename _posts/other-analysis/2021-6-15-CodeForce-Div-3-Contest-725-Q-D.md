---
layout: post
title: CodeForce Div 3 Contest 725 Q-D
tags: ["CodeForce","Other-analysis"]
Author: ["Leon"]
group: 3
question: D
number: 725
---
### 题目描述

输入三个整数分别是a，b，k，然后每一步可以执行以下两种操作中的一种：

任意整数c（c>1且a应该能整除c）然后使得a = a/c;

任意整数c（c>1且b应该能整除c）然后使得b = b/c。

问能不能再准确的k步之后使得a=b？

若可以则打印“YES”，反之则打印“NO”

例子：

a=36，b=48，k=4

1.b=b/6=8

2.a=a/2=18

3.a=a/9=2

4.b=b/4=2

a=2=b

### 思路

将a，b两数分解因数，获得a，b的因数数量分别为f(a)&f(b)，若f(a)+f(b)>=k，则打印“YES”，反之则打印“NO”。

如果直接分解质因数会超时，复杂度为O(N)

##### 直接分解的代码

```java
 public static int numbersOfFactor(int nums){
        if (nums==1){
            return 0;
        }else{
            int result = 0;
            for ( int i = 2;i*i<=nums;i++){
                if(nums%i==0){
                    while(nums%i==0){
                        nums/=i;
                        result++;
                    }
                }
            }
            if(nums>1) result++;
            return result;
        }
    }
```



可以先将数字中的偶数因数给直接给试出来，这样就可以省去循环中一般的时间，这样就不会超时。复杂度O(N)

##### 优化后的代码

```java
    public static int numbersOfFactor(int nums){
        if (nums==1){
            return 0;
        }else{
            int result = 0;
            while(nums%2==0){
                result++;
                nums/=2;
            }
            for ( int i = 3;i*i<=nums;i++){
                while(nums%i==0){
                    result++;
                    nums/=i;
                }
            }
            if(nums>1) result++;
            return result;
        }
```



### 完整的代码

```java
import java.util.*;
import java.io.*;
public class dividingNumber{
    public static void main ( String [] args){
        Scanner in = new Scanner(System.in);
        int t = in.nextInt();
        while(t-->0){
            int a = in.nextInt();
            int b = in.nextInt();
            int k = in.nextInt();
            System.out.println(answer(a, b, k));

        }
    }
    public static String answer( int a, int b, int k){
        if(k==1){
            if(a==b) return "NO";
            if(a%b==0||b%a==0) return "YES";
            else return "NO";
        }
        int result = 0;
        result+=numbersOfFactor(a);
        result+=numbersOfFactor(b);
        if(result>=k) return "YES";
        else return "NO";

    }

    public static int numbersOfFactor(int nums){
        if (nums==1){
            return 0;
        }else{
            int result = 0;
            while(nums%2==0){
                result++;
                nums/=2;
            }
            for ( int i = 3;i*i<=nums;i++){
                while(nums%i==0){
                    result++;
                    nums/=i;
                }
            }
            if(nums>1) result++;
            return result;
        }
    }
}
```

