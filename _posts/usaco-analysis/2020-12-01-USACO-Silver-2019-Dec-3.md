---
layout: usaco-post
title: USACO 2019 Dec Silver P3
tags: [ USACO analysis ]
status: OK
Author: wwddddnnn
year: 2019
group: Silver
season: Dec
question: 3
---
### 描述
农场主有n个农场，每个农场有一只H牛或一只G牛，农场中间有n-1条路连接。农场主有m个朋友来拜访，每个朋友有自己偏好的奶牛（H或G的一种）。给出n，m，每个农场中的牛的种类，每两个相邻的农场，每个来拜访的朋友的拜访起点农场和终点农场和他偏好的奶牛，问能让哪些朋友来到自己偏好奶牛的农场？（来到了输出1，否则输出0）。

### 思路
ufds，将每两个能由一条路相连且奶牛种类相同的农场记为相连，没有直接的路相连或奶牛种类不同的农场记为不相连。当给出起点农场和终点农场时，判断这两个农场是否相连，若不相连返回1，若相连，判断这两个相连的农场的奶牛种类是否和朋友的偏好相同，若相同返回1，否则返回0。

### 复杂度

$O(n+m)$

### 实现
```java
import java.io.*;
import java.util.*;
public class milkVisits{
  
  public static void connect(int a,int b){
    if(isH[a]==isH[b]){
      if(findAnc(a)==a) anc[a]=findAnc(b);
      else if(findAnc(b)==b) anc[b]=findAnc(a);
      else anc[findAnc(a)]=findAnc(b);
    }
  }
  
  public static int findAnc(int a){
    if(anc[a]==a) return a;
    anc[a]=findAnc(anc[a]);
    return anc[a];
  }
  
  static int n;
  static int m;
  static boolean[] isH;
  static int[] anc;
  public static void main (String[] args)throws IOException{
    BufferedReader bf = new BufferedReader(new FileReader("milkvisits.in"));
    PrintWriter pr = new PrintWriter(new FileWriter("milkvisits.out"));
    StringTokenizer st = new StringTokenizer(bf.readLine());
    n=Integer.parseInt(st.nextToken());
    m=Integer.parseInt(st.nextToken());
    String a=bf.readLine();
    isH=new boolean[n+1];
    anc=new int[n+1];
    for(int i=1;i<=a.length();i++){
      if(a.substring(i-1,i).equals("H")) isH[i]=true;
      anc[i]=i;
    }
    for(int i=0;i<n-1;i++){
      st = new StringTokenizer(bf.readLine());
      connect(Integer.parseInt(st.nextToken()),Integer.parseInt(st.nextToken()));
    }
    for(int i=0;i<m;i++){
      st = new StringTokenizer(bf.readLine());
      int b=Integer.parseInt(st.nextToken());
      int c=Integer.parseInt(st.nextToken());
      boolean likeH=false;
      if(st.nextToken().equals("H")) likeH=true;
      if(findAnc(b)!=findAnc(c)) pr.print(1);
      else if(isH[findAnc(b)]==likeH) pr.print(1);
      else pr.print(0);
    }
    pr.close();
  }
}
```



