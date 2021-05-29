---
layout: usaco-post
title: USACO 2017 Dec Silver p3
tags: [ USACO analysis ]
status: OK
Author: Marcus
year: 2017
group: Silver
season: Dec
question: 3
---

## 1712s3 The Bovine Shuffle

> 题目大意：一群牛按以下规则跳舞：每一次移动，位置i上的牛移动到位置next(i)，如果有多头牛移动到同一个位置，下一次移动时这些牛一起移动。已知所有的f(i)，请求出无论怎么移动都有牛的位置的数量。

#### 思路：

用一个数组记录下次会移动到每一个i的位置数量count(i)，如果没有位置将移动到这个位置(也就是count(i)=0)，那么下次移动后这里将没有牛。特殊标记这个位置，并使next(i)的count数-1（因为从下次起，会移动到这里的位置数量少了1），并检查这个位置的count是否为0，如果为0，重复这句话的操作。每次遍历数组，找出count(i)为0的i就可以了，直到没有为0的i就可以了。
为了更快地找出count(i)为0的i，可以先将所有count(i)为0的i装进一个栈，每次从中pop出一个值即可。

#### 复杂度：

遍历数组，找出count(i)为0的点，并装进栈里，为O(n)
每次pop出一个i，如果count(i)没有被特殊标记，则使count(next(i))--，并push进next(i)，为O(1)，最多n次。
总的为O(n)

#### 实现：

```java
import java.util.*;
import java.io.*;
public class TheBovineShuffle1712s3{
    static int[]counts;
    static int count;
    static int[]nexts;
    public static void main(String[]args)throws IOException{
        BufferedReader in=new BufferedReader(new FileReader("shuffle.in"));
        PrintWriter out=new PrintWriter(new BufferedWriter(new FileWriter("shuffle.out")));
        int n=Integer.parseInt(in.readLine());
        count=n;
        StringTokenizer st=new StringTokenizer(in.readLine());
        nexts=new int[n];
        for(int i=0;i<n;i++) nexts[i]=Integer.parseInt(st.nextToken())-1;
        counts=new int[n];
        for(int i=0;i<n;i++) counts[nexts[i]]++;
        Stack<Integer>to=new Stack<>();
        for(int i=0;i<n;i++) if(counts[i]==0) to.push(i);
        if(!to.isEmpty()){
            int ind=to.pop();
            while(ind!=-2){
                if(counts[ind]==0){
                    counts[ind]=-1;
                    count--;
                    counts[nexts[ind]]--;
                    if(counts[nexts[ind]]==0){
                        ind=nexts[ind];
                        continue;
                    }
                    if(to.isEmpty()) break;
                    ind=to.pop();
                }
            }
        }
        in.close();
        out.println(count);
        out.close();
    }
}
```



