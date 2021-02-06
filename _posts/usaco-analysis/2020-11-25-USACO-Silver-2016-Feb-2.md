---
layout: usaco-post
title: USACO 2016 Feb Silver P2
tags: USACO-analysis
status: OK
author: Marcus
time: 2016
group: Silver
question: Feb 2
---

## 1602s2 Load Balancing

> 题目大意：有一些牛站在一个平面上，已知这些牛的坐标。现在过一个点水平、竖直地画两条线（不会有牛站在线上），把平面分成4份。求当这个平面最“平衡”时（即平面的四个部分中，牛最多的部分的牛数最小），牛最多的部分的牛的数量。

#### 思路：

用一个二维数组装所有牛的位置（先将牛的位置“转义”一下，使得牛的位置的x、y坐标转换成第几大的x/y，可以用sort和hashmap来实现），然后遍历这个二维数组，使得arr\[x][y]表示从（0，0）到（x，y）的矩形的所有牛的数量。
此时，平面四个部分的牛的数量都可以从这个二维数组中得到。遍历这个二维数组，求出最小的结果即可。

#### 复杂度：

sort部分是O(n log(n))，“转义”部分是2n次O(1)，遍历二维数组每次为O(n^2)
总的是O(n^2)

实现：

```java
import java.util.*;
import java.io.*;
public class LoadBalancing1602s2{
    static int[][]cows;
    static int[]xs;
    static int[]ys;
    static int[][]cowmap;
    static int xmax,ymax;
    public static HashMap<Integer,Integer> dic(int[]to){
        HashMap<Integer,Integer>dic=new HashMap<>();
        int c=0;
        for(int num:to){
            if(!dic.containsKey(num)){
                dic.put(num,c);
                c++;
            }
        }
        return dic;
    }
    public static void trans(){
        HashMap<Integer,Integer>dicx=dic(xs);
        HashMap<Integer,Integer>dicy=dic(ys);
        for(int i=0;i<xs.length;i++){
            cows[i][0]=dicx.get(cows[i][0]);
            cows[i][1]=dicy.get(cows[i][1]);
            xs[i]=dicx.get(xs[i]);
            ys[i]=dicy.get(ys[i]);
        }
    }
    public static int get(int x,int y){
        int aa=cowmap[x][y];
        int ab=cowmap[xmax][y]-cowmap[x][y];
        int ba=cowmap[x][ymax]-cowmap[x][y];
        int bb=cowmap[xmax][ymax]-aa-ab-ba;
        return Math.max(aa,Math.max(ab,Math.max(ba,bb)));
    }
    public static void main(String[]args)throws IOException{
        BufferedReader in=new BufferedReader(new FileReader("balancing.in"));
        int n=Integer.parseInt(in.readLine());
        xs=new int[n];
        ys=new int[n];
        cows=new int[n][2];
        for(int i=0;i<n;i++){
            String[]sp=in.readLine().split(" ");
            xs[i]=Integer.parseInt(sp[0]);
            ys[i]=Integer.parseInt(sp[1]);
            cows[i][0]=xs[i];
            cows[i][1]=ys[i];
        }
        in.close();
        Arrays.sort(xs);
        Arrays.sort(ys);
        trans();
        int possible=(int)Math.ceil(n/4);
        int min=Integer.MAX_VALUE;
        xmax=xs[n-1];
        ymax=ys[n-1];
        cowmap=new int[xs[n-1]+1][ys[n-1]+1];
        for(int[]cow:cows) cowmap[cow[0]][cow[1]]=1;
        for(int i=1;i<xmax+1;i++) for(int ii=0;ii<ymax+1;ii++) cowmap[i][ii]+=cowmap[i-1][ii];
        for(int i=1;i<ymax+1;i++) for(int ii=0;ii<xmax+1;ii++) cowmap[ii][i]+=cowmap[ii][i-1];
        boolean bo=true;
        for(int i=1;i<xmax+1&&bo;i++){
            for(int ii=1;ii<ymax;ii++){
                int temp=get(i,ii);
                min=Math.min(temp,min);
                if(min==possible){
                    bo=false;
                    break;
                }
            }
        }
        PrintWriter out=new PrintWriter(new BufferedWriter(new FileWriter("balancing.out")));
        out.println(min);
        out.close();
    }
}
```

