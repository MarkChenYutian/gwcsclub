---
layout: post
title: USACO 2016 Dec Silver P1
tags: [ USACO analysis ]
status: OK
Author: wzy
year: 2016
group: Silver
season: Dec
question: 1
---

### 打卡#2016 December Contest Silver Problem 1

#### 题目解析：

FJ有N个干草垛拍成一队，在一条直线上，==1<=N<=100,000==, 我们需要帮助他完成Q个问题， ==1<=Q<=100,000==， 每一个问题都是关于在某一个范围==(0<=A<=B<=1,000,000,000)==内有多少个干草垛。

#### 解析：

在N个干草垛中，因为它最大的坐标值可以到**1,000,000,000**，因此我们不需要使用`BigInteger`或者类型`long`来操作这些数，因为`Java`中，`Integer`的值的范围最大已经可以达到这个数，又因为Java中，array的最长状况有**2,147,483,647**，这个时候就可以十分自由的把所有的N都存入这个array中，之后让这个Array进行排序，最好使用`mergeSort`，这样复杂度就可以是O(nlogN)，之后，再利用`Binary Search`，找出第一个比B大的数在数组中所对应的index，之后再找出第一个比A小的数的index，之后拿那个比B大的数减去比A小的数得到正确答案

#### 复杂度分析:

由于使用的排序法为`mergeSort`，并且用`Binary Search`来进行搜索，所以就可以达到O(nlogn)的复杂度

```java
package practices;
import java.io.*;
import java.util.*;
public class Haybale {
	static int []haybales;
public static void main(String[]args)throws IOException{
	/*BufferedReader bf=new BufferedReader(new InputStreamReader(System.in));
	*/
	BufferedReader bf=new BufferedReader(new FileReader("haybales.in"));
	PrintWriter pt=new PrintWriter(new BufferedWriter(new FileWriter("haybales.out")));
	StringTokenizer st=new StringTokenizer(bf.readLine());
	int N=Integer.parseInt(st.nextToken());
	int Q=Integer.parseInt(st.nextToken());
	String[]bales=bf.readLine().split(" ");
	String[]Questions=new String[Q];
	for(int j=0;j<Q;j++) {
		Questions[j]=bf.readLine();
	}
	haybales=new int[N];
	for(int j=0;j<N;j++) {
		haybales[j]=Integer.parseInt(bales[j]);
	}
	sort(haybales,0,N-1);
	for(String quest:Questions) {
		int A=Integer.parseInt(quest.substring(0,quest.indexOf(" ")));
		int B=Integer.parseInt(quest.substring(quest.indexOf(" "))+1);
		int j=findValue(haybales,B)-findValue(haybales,A);
		pt.println(j);
	}
	pt.close();
	bf.close();
}
public static int findValue(int[] bale, int limit) {
	if(bale[0] > limit) {
		return 0;
	}
	int min = 0;
	int max = bale.length-1;
	while(min != max) {
		int mid = (min+max+1)/2;
		if(bale[mid] <= limit) {
			min = mid;
		}
		else {
			max = mid-1;
		}
	}
	return min + 1;
}
public static void merge(int arr[], int l, int m, int r) 
{ 
    int n1 = m - l + 1; 
    int n2 = r - m; 
    int L[] = new int[n1]; 
    int R[] = new int[n2]; 
    for (int i = 0; i < n1; ++i) 
        L[i] = arr[l + i]; 
    for (int j = 0; j < n2; ++j) 
        R[j] = arr[m + 1 + j]; 
    int i = 0; 
    int	j = 0; 
    int k = l; 
    while (i < n1 && j < n2) { 
        if (L[i] <= R[j]) { 
            arr[k] = L[i]; 
            i++; 
        } 
        else { 
            arr[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 
    while (i < n1) { 
        arr[k] = L[i]; 
        i++; 
        k++; 
    } 
    while (j < n2) { 
        arr[k] = R[j]; 
        j++; 
        k++; 
    } 
} 


public static void sort(int arr[], int l, int r) 
{ 
    if (l < r) {  
        int m = (l + r) / 2;  
        sort(arr, l, m); 
        sort(arr, m + 1, r);  
        merge(arr, l, m, r); 
    } 
} 

}

```





