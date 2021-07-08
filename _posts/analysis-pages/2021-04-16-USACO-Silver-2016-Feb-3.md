---
layout: post
title: USACO 2016 Feb Silver 3
tags: [ USACO analysis ]
status: OK
Author: 吹风哥
year: 2016
group: Silver
season: Feb
question: 3
---

### 题目大意

分别有两个桶，两个桶的最大容量分别为x与y，然后一共要m的牛奶，且最多可以做k步。每一步都可以进行三种操作中的一种，分别为：加满，倒掉和互相到。求在桶内最接近m的是差值的绝对值。

### 思路

利用DFS进行每一步的搜索，然后对DFS进行优化（优化：如果有重复的情况且深度大于以前搜索过的则不进行搜索）

### 代码实现

```java
import java.util.*;
import java.io.*;
import java.nio.ShortBuffer;
public class S320162{
	static HashMap<String ,Integer> dupli = new HashMap<String, Integer>();
	static HashSet < Integer> fianlly = new HashSet<Integer>();
	//every two pail has six next situation which is diffferent(maybe not in result but in process)
	public static int addup(int [] arr){
		int result = 0;
		result = arr[0]+arr[2];
		return result;
	}
	public static int[][] nextSitu (int [] pailsys) {
		//0----xfilled
		//1----xtotal
		//2----yfilled
		//3----ytotal
		//4----depth
		int [][] ini = new int [6][5];
		//the first is filled x
		ini[0][0] = pailsys[1];
		ini[0][2] = pailsys[2];

		//the second is filled y
		ini[1][2] = pailsys[3];
		ini[1][0] = pailsys[0];

		//the third is pour x
		ini[2][0] = 0;
		ini[2][2] = pailsys[2];

		//the  fourth is pour y
		ini[3][2] = 0;
		ini[3][0] = pailsys[0];

		//the fifth is pour x to y
		if ( pailsys[0]>pailsys[3]-pailsys[2]){
			ini[4][2] = pailsys[3];
			ini[4][0] = pailsys[0]-(pailsys[3]-pailsys[2]);
		}else{
			ini[4][0] = 0;
			ini[4][2] = pailsys[2]+pailsys[0];
		}

		//the sixth is pouy y to x
		if ( pailsys[2]>pailsys[1]-pailsys[0]){
			ini[5][0] = pailsys[1];
			ini[5][2] = pailsys[2]-(pailsys[1]-pailsys[0]);
		}else{
			ini[5][2] = 0;
			ini[5][0] = pailsys[0] + pailsys[2];
		}

		// fill the rest x and y 
		for (int i = 0; i < ini.length; i++) {
			ini[i][1] = pailsys[1];
			ini[i][3] = pailsys[3];
			ini[i][4] = pailsys[4]+1;
		}
		return ini;
	}
	public static void DFS(int []arr,int steps) {
		Stack < int [] > dfs = new Stack<int []>();

		dfs.push(arr);
		
		dupli.put(Arrays.toString(arr),arr[4]);
		
		while(!dfs.isEmpty()){
			
			int [] temp= dfs.pop();
			fianlly.add(addup(temp));
			int [][] allMethod = nextSitu(temp);
			
			for (int[] is : allMethod) {
				
				if ( is[4]<=steps){
					
					if ( dupli.containsKey(Arrays.toString(is))){
						if(dupli.get(Arrays.toString(is))<is[4]){
						dfs.push(is);
						}
					}else{
						dfs.push(is);
					}
					dupli.put(Arrays.toString(is), is[4]);	
				}
			}
			
		}
		
		
	}

	public static int cloest(int []arr,int m) {
		int cloest = (int)Math.abs(m-arr[0]);
		for ( int i = 0;i<arr.length;i++){
			if( cloest>(int)Math.abs(m-arr[i])) cloest = (int)Math.abs(m-arr[i]);
		}
		return cloest;
	}
	public static void main(String[] args)throws IOException {
		
	
		BufferedReader br = new BufferedReader( new FileReader("pails.in"));
		PrintWriter pw = new PrintWriter(new FileWriter("pails.out"));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int x = Integer.parseInt(st.nextToken());
		int y = Integer.parseInt(st.nextToken());
		int steps = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		//0----xfilled
		//1----xtotal
		//2----yfilled
		//3----ytotal
		//4----depth


		int [] pailsys = {0,x,0,y,0};
		
		DFS(pailsys, steps);
		int [] result = new int [fianlly.size()];
		Iterator a = fianlly.iterator();
		int index = 0;
		while(a.hasNext()){
			
			result[index] = (int)(a.next());
			index++;
		}
		pw.println(cloest(result, m));
		pw.close();
	}
}
```



