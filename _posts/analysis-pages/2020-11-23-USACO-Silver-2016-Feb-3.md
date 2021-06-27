---
layout: usaco-post
title: USACO 2016 Feb Silver P3
tags: [ USACO analysis ]
status: OK
Author: Marcus
year: 2016
group: Silver
season: Feb
question: 3
---

> 题目大意：有两个桶用于装牛奶，容量分别为x、y个单位，（x,y<=100）目标是尽量装m个单位的牛奶（m<=200）。每次可以执行如下操作：清空任一桶，倒满任一桶，将任一桶的牛奶倒到另一个桶（可能会装满这个桶，而使原桶剩一定量牛奶）。牛奶有足够多，但是最多只能执行k次操作（k<=100）。请求出k次操作内，两个桶的牛奶总和与要求的m个单位的牛奶的最小的差值（差值取绝对值）。

### 思路：

每步模拟上述的操作，得到k步操作内，可能的全部的两个桶内的牛奶的值。然后遍历这些值，得到最小的差值即可。

### 复杂度：

k次操作，每次操作遍历上一次操作后的全部可能的牛奶量，复杂度为O(n^2)

### 实现：

```java
import java.io.*;
import java.util.*;
public class MilkPails{
    static int m,x,y;
    static HashMap<Integer,Boolean>map=new HashMap<>();//to avoid duplicate value
    public static void nextStep(){
        HashMap<Integer,Boolean>newmap=new HashMap<>();
        Set<Integer>keys=map.keySet();
        for(int key:keys){
            doNextStep(key,newmap);
        }
        map=newmap;
    }
    public static int getAnswer(int val){
        int inx=val%1000;
        int iny=val/1000;
        return Math.abs(m-inx-iny);
    }
    public static void doNextStep(int situ,HashMap<Integer,Boolean>newmap){
        //situ=aaabbb,inx=bbb,iny=aaa
        int inx=situ%1000;
        int iny=situ/1000;
        newmap.put(inx+y*1000,true);//fill y
        newmap.put(x+iny*1000,true);//fill x
        newmap.put(inx+0,true);//empty y
        newmap.put(0+iny*1000,true);//empty x
        if(inx+iny>x) newmap.put(x+(inx+iny-x)*1000,true);//pour y into x
        else newmap.put(iny+inx+0,true);
        if(inx+iny>y) newmap.put((inx+iny-y)+y*1000,true);//pour x into y
        else newmap.put(0+(inx+iny)*1000,true);
    }
    public static void main(String[]args)throws IOException{
        BufferedReader in=new BufferedReader(new FileReader("pails.in"));
        PrintWriter out=new PrintWriter(new BufferedWriter(new FileWriter("pails.out")));
        StringTokenizer st=new StringTokenizer(in.readLine());
        in.close();
        x=Integer.parseInt(st.nextToken());
        y=Integer.parseInt(st.nextToken());
        int k=Integer.parseInt(st.nextToken());
        m=Integer.parseInt(st.nextToken());
        map.put(0,true);
        for(int t=0;t<k;t++) nextStep();
        int answer=Integer.MAX_VALUE;
        for(int key:map.keySet()) answer=Math.min(answer,getAnswer(key));
        out.println(answer);
        out.close();
    }
}
```



