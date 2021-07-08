---
layout: post
title: USACO 2019 Feb Silver P1
tags: [ USACO analysis ]
status: OK
Author: bbl
year: 2019
group: Silver
season: Feb
question: 1
---
### Problem1 [sleepy cow herding](http://www.usaco.org/index.php?page=viewproblem2&cpid=918)

#### 描述
农场有一列N头(3<=N<=10^5^)正在睡觉的牛，我们会得到每个奶牛的初始位置。现在农夫需要移动奶牛使奶牛群的位置是连续的(e.g. Positions 3,4,5,6,7)。规则是：农夫只能移动处在边缘位置的奶牛以及奶牛不能从一个边缘位置到另一个边缘位置。
求农夫至少跟至多需要多少个这样的操作能使这个队列所有奶牛位置连续。

#### 思路
最小：把奶牛的位置排序好后，找到size最小的empty space，就是答案
** 这里有个特殊情况，当只有一头奶牛处在队列外时(e.g. 2,3,4,5,10)答案为2，可是我们正常使用的判断会出现错误。所以我在函数最前面加了个判断的补丁。


最大：由于每次只能移动边缘位置的奶牛，而且这个奶牛不能到另一个边缘位置，所以当我们移动一个side的奶牛时。为了使总体步骤最大而且保证结果是连续的，我们要将这个奶牛放在离他最近的奶牛旁边，以此往复。因此我们有两种可能，以右极点为心和以左极点为心的结果。所以当我们要取cows[n-1]-cows[1]跟cows[n-2]-cows[0]中最大的(操作空间)。并且，由于极点的操作空间中会有n-1个点占了位置，我们最终结果要减去n-2

#### 复杂度分析
排序一次O(nlogn), 遍历一次O(n), 总复杂度为O(nlogn)

#### 代码实现

```java
import java.io.*;
import java.util.*;
public class herding{
    public static int getMin(){
        if(cows[cows.length-2]-cows[0] == cows.length-2 && cows[cows.length-1]-cows[cows.length-2]>2) return 2;
        else if(cows[cows.length-1]-cows[1] == cows.length-2 && cows[1]-cows[0]>2) return 2;
        int j = 0; int ret = 0;
        for(int i = 0;i<cows.length;i++){
            while(j<cows.length-1 && cows[j+1]-cows[i]<=cows.length-1) j++;
            ret = Math.max(ret,j-i+1);
        } 
        return cows.length-ret;
    }
    public static int getMax(){
        return Math.max(cows[cows.length-2]-cows[0],cows[cows.length-1]-cows[1])-(cows.length-2);
    }
  	static int[] cows;
    public static void main(String[] args)throws IOException{
        BufferedReader bf = new BufferedReader(new FileReader("herding.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("herding.out")));

     	int amount = Integer.parseInt(bf.readLine());
      	cows = new int[amount];
      	for(int i = 0;i<amount;i++){
            cows[i] = Integer.parseInt(bf.readLine());
        }
        Arrays.sort(cows);
        out.println(getMin());
        out.println(getMax());
        bf.close();
        out.close();//一定要close
    }
}
```



