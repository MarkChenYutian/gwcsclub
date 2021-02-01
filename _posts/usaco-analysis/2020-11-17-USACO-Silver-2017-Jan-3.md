---
layout: usaco-post
title: USACO 2017 Jan 3
status: OK
author: Marcus
time: 2017
group: Silver
question: Jan 3
tags: USACO-analysis
---

## 1703s3 Secret Cow Code

> 题目大意：有一种“牛密码”，这种密码是一个无限长度的字符串，这个字符串由一个最初的字符串key，然后每后半部分，是由前半部分的最后一个字符挪到第一个得到的。例子：key为”cow“，得到”cowwco“、”cowwcoocowwc“。请求出某个特定key的第某个字符

#### 分析：

这种密码的后一半由前一半得到，前一半由前一半的前一半得到，显而易见是递归的方法得到的。因此，可以从其定义出发，后一半的第一个=前一半的最后一个，后一半第n个为前一半第n-1个，一半一半地分割，直到求回最开始的key，然后输出对应字符即可

#### 复杂度：

每次递归小一半，为O(log(n))

#### 实现：

```java
import java.io.*;
import java.util.*;
public class SecretCowCode1701s3{
    static String s;
    public static char get(long i,long l){
        if(i<s.length()) return s.charAt((int)i-1);
        while(l/2>=i) l/=2;
        if(i==l/2+1) return get(l/2,l/2);
        if(i==s.length()) return s.charAt((int)i-1);
        return get(i-l/2-1,l/2);
    }
    public static void main(String[]args)throws IOException{
        BufferedReader in=new BufferedReader(new FileReader("cowcode.in"));
        PrintWriter out=new PrintWriter(new BufferedWriter(new FileWriter("cowcode.out")));
        StringTokenizer st=new StringTokenizer(in.readLine());
        in.close();
        s=st.nextToken();
        long n=Long.parseLong(st.nextToken());
        long l=s.length();
        while(l<n){
            l*=2;
        }
        out.println(get(n,l));
        out.close();
    }
}
```

