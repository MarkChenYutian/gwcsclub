---
layout: usaco-post
title: USACO 2020 Open Contest Silver 1
tags: [ USACO analysis ]
status: OK
Author: bbl
year: 2020
group: Silver
season: Open
question: 1
---

### Problem1 [social distance](http://www.usaco.org/index.php?page=viewproblem2&cpid=1038)

由于新冠疫情爆发，奶牛们需要相互隔离(相同的距离)。现在农场里有$n$ ($2\leq n\leq 10^5$)头奶牛，农场里有$M$ ($1\leq M \leq 10^5$)个互不相交的草地，奶牛们只能待在草地上。求出奶牛们之间的能够到达的最大距离D。

思路：由于答案是处在一个连续区间的，所以我们使用二分搜索来找到最优解。初始最大值high为有效区间中最大值，初始最小值low为1。每次以(low+high)/2的值将奶牛进行隔离，当奶牛的位置超出了current的区间，current区间变为下一个区间。如果奶牛超出了区间范围那么mid为新的high值，反之为新的low值。直到high-low == 1

复杂度分析：二分搜索O(logC,C为区间最大值), 每次验证需要O(n)，总复杂度为O(nlogC), 可行

```java
import java.util.*;
import java.io.*;
public class socdist{
    public static boolean isValid(int dist){
        int index = 0;
        int cur = is[index].u;//cow position
        for(int i = 1;i<n;i++){
            cur+=dist;
            while(cur>is[index].v){
                index++;
                if(index>=is.length) return false;
            }
            if(cur<is[index].u) cur = is[index].u;
        }
        return true;
    }
    public static int dfs(int low,int high){
        while(high-low!=1){
            int mid = (high+low)/2;
            if(isValid(mid)) low = mid;
            else high = mid;
        }
        return low;
    }
    static int n;
    static interval[] is;//intervals
    public static void main(String[] args)throws IOException{
        BufferedReader bf = new BufferedReader(new FileReader("socdist.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("socdist.out")));
        String[] items = bf.readLine().split(" ");
        n = Integer.parseInt(items[0]);
        int amount = Integer.parseInt(items[1]);
        is = new interval[amount];
        for(int i = 0;i<amount;i++){
            items = bf.readLine().split(" ");
            int start = Integer.parseInt(items[0]);
            int end = Integer.parseInt(items[1]);
            is[i] = new interval(start,end);
        }
        Arrays.sort(is);
        out.println(dfs(1,is[amount-1].v));
        bf.close();
        out.close();
    }
}
class interval implements Comparable<interval>{
    public int u,v;
    public interval(int a,int b){
        this.u = a;
        this.v = b;
    }

    @Override
    public int compareTo(interval o) {
        // TODO Auto-generated method stub
        return Integer.compare(this.u,o.u);
    }
}
```

