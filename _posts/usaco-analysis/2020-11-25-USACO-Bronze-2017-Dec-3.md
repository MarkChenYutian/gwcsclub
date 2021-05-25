---
layout: usaco-post
title: USACO 2017 Bronze Dec 3
tags: USACO-analysis
status: OK
Author: Marcus
year: 2017
group: Bronze
season: Dec
question: 3
---

> 题目大意：有三头奶牛，农场主在某些日期（范围为(1,100)）记下某一头的产奶量变化（和上一次记录时比较），并表彰全部产奶量最高的奶牛（们），把它（们）的照片张贴起来。已知一些乱序的记录，请求出农场主需要改变张贴的照片的次数。

#### 思路：

将记录全部装入数组中，因为是乱序的，首先需要排序。由于日期范围小，使用计数排序。然后遍历数组即可。

#### 复杂度：

计数排序和遍历都是O(n)

#### 实现：

```java
import java.io.*;
import java.util.*;
public class MilkMeasurement1712b3{
    static change[]changes;
    static int[]now;
    public static change[] sorting(change[]changes){
        change[]temp=new change[100];
        for(int i=0;i<changes.length;i++) temp[changes[i].date-1]=changes[i];
        change[]after=new change[changes.length];
        int index=0;
        for(int i=0;i<temp.length;i++){
            if(temp[i]!=null){
                after[index]=temp[i];
                index++;
            }
        }
        return after;
    }
    public static ArrayList<Integer> getGreatest(int i){
        now[changes[i].code]+=changes[i].change;
        ArrayList<Integer> greatest=new ArrayList<>();
        greatest.add(0);
        for(int ind=1;ind<3;ind++){
            if(now[ind]==now[greatest.get(0)]) greatest.add(ind);
            else if(now[ind]>now[greatest.get(0)]){
                greatest.clear();
                greatest.add(ind);
            }
        }
        return greatest;
    }
    public static boolean compare(ArrayList<Integer>a,ArrayList<Integer>b){
        if(a.size()!=b.size()) return false;
        for(int i=0;i<a.size();i++) if(a.get(i)!=b.get(i)) return false;
        return true;
    }
    public static void main(String[]args)throws IOException{
        BufferedReader in=new BufferedReader(new FileReader("measurement.in"));
        PrintWriter out=new PrintWriter(new BufferedWriter(new FileWriter("measurement.out")));
        int n=Integer.parseInt(in.readLine());
        changes=new change[n];
        for(int i=0;i<n;i++){
            StringTokenizer st=new StringTokenizer(in.readLine());
            changes[i]=new change(Integer.parseInt(st.nextToken()),st.nextToken(),Integer.parseInt(st.nextToken()));
        }
        in.close();
        changes=sorting(changes);
        now=new int[3];
        for(int i=0;i<3;i++) now[i]=7;
        ArrayList<Integer>greatest=new ArrayList<>();
        int count=0;
        for(int i=0;i<n;i++){
            ArrayList<Integer> temp=getGreatest(i);
            if(!compare(greatest,temp)) count++;
            greatest=temp;
        }
        out.println(count);
        out.close();
    }
}
class change{
    public int date;
    public int change;
    public int code;
    public change(int dateOfThis,String nameOfThis,int changeOfThis){
        date=dateOfThis;
        change=changeOfThis;
        if(nameOfThis.equals("Bessie")) code=0;
        else if(nameOfThis.equals("Elsie")) code=1;
        else code=2;
    }
}
```
