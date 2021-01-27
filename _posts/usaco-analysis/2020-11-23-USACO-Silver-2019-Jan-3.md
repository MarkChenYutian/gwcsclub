---
layout: usaco-post
title: USACO Silver 2019 JAN 3
tags: USACO-analysis
status: OK
author: wwddddnnn
time: 2019
group: Silver
question: Jan 3
---
### 题目描述
贝西看山。每一座山都是底角为45°的等腰三角形，底边在x轴。当一座山的山峰在别的山的山体内或者边缘上，这座山的山峰就会被挡住给出山峰的总数量，每座山的山峰的坐标，求出贝西能看到的（未被遮挡的）山峰的个数。

### 思路
由于每一座山都是底角为45°的等腰三角形，如果一座山的山峰是（x，y），则这座山的底边就是从x-y到x+y之间。将每座山按照左端点（x-y）从小到大进行排序。从第一座山开始看其右端点（x+y），同时记录目前看到的最大的右端点。最大右端点更新次数加1（最大右端点的初始值）就是贝西能看得到的山峰。

### 复杂度
$O(n+nlogn) = O(n\log{n})$

### 实现

```java
import java.io.*;
import java.util.*;
public class mountainView{
  
  public static int solve(){
    int maxRight=mountain.get(0).right;
    int count=1;
    for(int i=1;i<n;i++){
      if(mountain.get(i).right>maxRight){
        maxRight=mountain.get(i).right;
        count++;
      }
    }
    return count;
  }
  
  static int n;
  static ArrayList<Base> mountain=new ArrayList<>();
  public static void main (String[] args)throws IOException{
    BufferedReader bf = new BufferedReader(new FileReader("mountains.in"));
    PrintWriter pr = new PrintWriter(new FileWriter("mountains.out"));
    n=Integer.parseInt(bf.readLine());
    for(int i=0;i<n;i++){
      StringTokenizer st = new StringTokenizer(bf.readLine());
      int x=Integer.parseInt(st.nextToken());
      int y=Integer.parseInt(st.nextToken());
      mountain.add(new Base(x-y,x+y));
    }
    Collections.sort(mountain);
//    System.out.println(mountain);
//    System.out.println(solve());
    pr.println(solve());
    pr.close();
  }
}
class Base implements Comparable<Base>{
  int left;
  int right;
  public Base(int l,int r){
    left=l;
    right=r;
  }
  public int compareTo(Base b){
      if(this.left<b.left) return -1;
    else if(this.left>b.left) return 1;
    else if(this.right<b.right) return 1;
    else if(this.right>b.right) return -1;
    return 0;
  }
  public String toString(){
    return "("+left+","+right+")";
  }
}
```

