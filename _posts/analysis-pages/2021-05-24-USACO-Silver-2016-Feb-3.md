---
layout: usaco-post
title: USACO 2016 Feb Silver 3
tags: [ USACO analysis ]
status: OK
Author: djw
year: 2016
group: Silver
season: Feb
question: 3
---

题目大意

> 有两个桶，容量分别是X,Y。一共有6种操作（每个操作算一步）：1.倒掉X 2.倒掉Y 3.装满X 4.装满Y 5. 把X里的水倒到Y里 6.把Y里的水倒到X里。在规定步数K内找到桶里的水量和给定水量M最小的差的绝对值。

思路

> 利用优化（看过的不用再看一遍）后的BFS（保证相同水量但步数小的先看）模拟每一步后的水量

代码

~~~java
import java.util.*;
import java.util.Stack;
import java.io.*;
public class milkPails{
    public static void main (String [] args) throws IOException{
        BufferedReader br = new BufferedReader ( new FileReader("pails.in"));
        PrintWriter pr = new PrintWriter(new FileWriter("pails.out"));
        String[] items=br.readLine().split(" ");
        int X=Integer.parseInt(items[0]);
        int Y=Integer.parseInt(items[1]);
        int K=Integer.parseInt(items[2]);
        int M=Integer.parseInt(items[3]);
        Queue<Milk> que=new LinkedList<Milk>();
        que.add(new Milk(0,0,0));
        boolean[][] again=new boolean[1000][1000];


        int min=Integer.MAX_VALUE;
        while(que.size()>0){
            Milk now=que.poll();

            if(now.time>K || again[now.x][now.y]) continue;
            
            min=Math.min(min,Math.abs(M-(now.x+now.y)));
            again[now.x][now.y]=true;
            que.add(now.pushX());
            que.add(now.pushY());
            que.add(now.pullX(X));
            que.add(now.pullY(Y));
            que.add(now.X_Y(X,Y));
            que.add(now.Y_X(X,Y));
        }
        pr.println(min);
        pr.close();
    }
}
class Milk{
    int x;
    int y;
    int time;
    public Milk(int x, int y, int time){
        this.x=x;
        this.y=y;
        this.time=time;
    }
    public Milk pushX(){
        Milk b=new Milk(0,this.y,this.time+1);
        return b;
    }
    public Milk pushY(){
        Milk b=new Milk(this.x,0,this.time+1);
        return b;
    }
    public Milk pullX(int xAmount){
        Milk b=new Milk(xAmount,this.y,this.time+1);
        return b;
    }
    //装满X
    public Milk pullY(int yAmount){
        Milk b=new Milk(this.x,yAmount,this.time+1);
        return b;
    }
    //装满Y
    public Milk X_Y(int xAmount, int yAmount){
        Milk b=new Milk(0,this.y+this.x,this.time+1);
        if(this.x+this.y>yAmount) b=new Milk(this.x+this.y-yAmount,yAmount,this.time+1); 
        return b;
    }
    //从X倒到Y
    public Milk Y_X(int xAmount, int yAmount){
        Milk b=new Milk(this.x+this.y,0,this.time+1);
        if(this.x+this.y>xAmount) b=new Milk(xAmount,this.y+this.x-xAmount,this.time+1); 
        return b;
    }
    //从Y倒到X
}
~~~



