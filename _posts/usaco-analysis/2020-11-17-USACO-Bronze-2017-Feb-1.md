---
layout: usaco-post
title: USACO 2017 Bronze Feb 1
tags: USACO-analysis
status: OK
Author: cm
time: 2017
group: Bronze
question: Feb 1
---

## Question Summary

Cows from neighboring farms are trying to entry the gate of farm to visit Farmer John's cows. The gate allows exactly one cow to entry after answering the quesition each time. The arrival time of cows and their time to answer the question are given. Determine the earliest possible time by which all cows are able to enter the farm.

## Proposed Solution

Use a class cow to record the input—arrival time and answering time—as attribute for each cow. Use an array of cow to store the cows and sort the array by their arrival time. Call a method and traverse the array to implement and update the current time for each cow. If the current time is less than or equal to the next arrival time of the cow, then update the current time as next cow's arrival time incrementing by its answering time, else increment the current time by the next cow's anserwing time directly.

## Time Complexity Analysis

Traversing the queue array requries O(n) while sorting the array requires O(nlogn).  So complexity is O(nlogn), n<=1,000,000

## 代码

```
import java.io.*;
import java.util.*;
public class cowqueue{

  public static cow[] queue;
  public static int current;
  
  public static int process(){
    current=queue[0].time+queue[0].stay;
    for(int i=1;i<queue.length;i++){
      if(current<=queue[i].time){
        current=queue[i].time+queue[i].stay;
      }else{
        current+=queue[i].stay;
      }
    }
    return current;
  }
  
  public static void main(String[]args)throws IOException{
BufferedReader bf=new BufferedReader(new FileReader("cowqueue.in"));
  PrintWriter pr=new PrintWriter(new BufferedWriter(new FileWriter("cowqueue.out")));
  StringTokenizer st=new StringTokenizer(bf.readLine());
    int n=Integer.parseInt(st.nextToken());
    queue=new cow[n];
    for(int i=0;i<n;i++){
      StringTokenizer st1=new StringTokenizer(bf.readLine());
      int a=Integer.parseInt(st1.nextToken());
      int b=Integer.parseInt(st1.nextToken());
      queue[i]=new cow(a,b);
    }
    Arrays.sort(queue);
    pr.println(process());
    bf.close();
  pr.close();
  
  }
}
class cow implements Comparable<cow>{
  public int time;
  public int stay;
  public cow(int time,int stay){this.time=time;this.stay=stay;}
  public int compareTo(cow o){
    return Integer.compare(this.time,o.time);
  }
}
```
