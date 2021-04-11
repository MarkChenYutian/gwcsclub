---
layout: usaco-post
title: USACO 2017 Jan Silver P2
tags: USACO-analysis
status: OK
Author: djw
time: 2017
group: Silver
question: Jan 2
---

### Problem 2. Hoof, Paper, Scissors

题目大意

> “石头 剪刀 布”-Bessie可以在FJ做出动作之前预测每个动作。但是她倾向于连续多次玩相同的手势。在整个游戏中她最多会切换一次手势。求Bessie可以赢得的最大游戏数。

思路

> (1≤N≤100,000)如果直接模拟，复杂度是O(n^2)，所以我们可以用前缀和数组，尝试每一个可能的组合PS SP HP PH SH HS。在前x步出一个，再在后N-x步换一个出。

复杂度

> O(n)

~~~java
import java.util.*;
import java.io.*;
public class hoofPaperScissors{
    public static int findMax(int[] a,int[] b){
        int max=0;
        for(int i=0;i<a.length;i++){
            max=Math.max(max,a[i]+b[b.length-1]-b[i]);
        }
        return max;
    }
    public static void main (String [] args) throws IOException{
        BufferedReader br = new BufferedReader(new FileReader("hps.in"));
        PrintWriter pr = new PrintWriter(new FileWriter("hps.out"));
        int N=Integer.parseInt(br.readLine());
        int[] P=new int[N];
        int[] S=new int[N];
        int[] H=new int[N];
        
        int pi=0;
        int si=0;
        int hi=0;
        for(int l=0;l<N;l++){
            String word=br.readLine();
            if(word.equals("P")) pi++;
            P[l]=pi;

            if(word.equals("H")) hi++;
            H[l]=hi;

            if(word.equals("S")) si++;
            S[l]=si;
        }        
        //System.out.println(Arrays.toString(P));
        //System.out.println(Arrays.toString(H));
        //System.out.println(Arrays.toString(S));
        

        int[] maximum={findMax(P,S),findMax(S,P),findMax(H,P),findMax(P,H),findMax(S,H),findMax(H,S)};
        //PS SP HP PH SH HS
        Arrays.sort(maximum);
        //System.out.println();
        /*
        System.out.println(findMax(P,S));
        System.out.println(findMax(S,P));
        System.out.println(findMax(H,P));
        System.out.println(findMax(P,H));
        System.out.println(findMax(S,H));
        System.out.println(findMax(H,S));   
        */     
        pr.println(maximum[5]);
        pr.close();
    }
}
~~~

