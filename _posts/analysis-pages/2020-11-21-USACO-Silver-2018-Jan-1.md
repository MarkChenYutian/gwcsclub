---
layout: usaco-post
title: USACO 2018 Jan Silver P1
tags: [ USACO analysis ]
status: OK
Author: bbl
year: 2018
group: Silver
season: Jan
question: 1
---

### Problem1 [Lifeguards](http://www.usaco.org/index.php?page=viewproblem2&cpid=786)

农夫请了n(1<=n<=100,000)个奶牛救生员。每个奶牛救生员的工作时间分别为(a~n~, b~n~)，可能有重复的。将会依次输入每个救生员的工作时间。现在农夫要解雇掉一个救生员。求解雇掉任意一个奶牛后可以得到的所有救生员工作的最大覆盖时长。

思路：将每个救生员工作开始的时间与结束的时间分别储存在两个tuple，用一个2n长度的tuple数组储存。将这些时间排序好后遍历一次，由于救生员的工作时间会有重复并且开除一名要使总有效工作时间损失最小。所以我们只需要遍历一次tuple数组找到单独工作时间最短的救生员。
复杂度分析：计算出所有救生员单独工作的时间O(2*n), 找出单独工作时间最短的救生员O(n), 总复杂度为O(n)可行

```java
import java.io.*;
import java.util.*;
public class lifeguards{
	public static void main(String[] args) throws IOException {
		BufferedReader bf = new BufferedReader(new FileReader("lifeguards.in"));
		PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("lifeguards.out")));
		TreeSet<Integer> set = new TreeSet<Integer>();
		int n = Integer.parseInt(br.readLine());
		State[] l = new State[2*n];
		for(int i = 0; i < n; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			int start = Integer.parseInt(st.nextToken());
			int end = Integer.parseInt(st.nextToken());
			l[2*i] = new State(start, i);
			l[2*i+1] = new State(end, i);
		}
		Arrays.sort(l);
		int actualCover = 0;
		int[] aloneT = new int[n];
		int lastT = 0;
    //计算出每一个单独工作时间
		for(State out: l) {
			if(set.size() == 1) {
				aloneT[set.first()] += out.time - lastT;
			}
			if(!set.isEmpty()) {
				actualCover += out.time - lastT;
			}
			if(set.contains(out.index)) {
				set.remove(out.index);
			}
			else {
				set.add(out.index);
			}
			lastT = out.time;
		}
		int ret = 0;
		for(int out: aloneT) {
			ret = Math.max(ret, actualCover - out);
		}
		out.println(ret);
		out.close();
    bf.close();
	}
	
	static class State implements Comparable<State> {
		public int time, index;
		public State(int a, int b) {
			time=a;
			index=b;
		}
		public int compareTo(State s) {
			return time - s.time;
		}
	}
	
}
```



