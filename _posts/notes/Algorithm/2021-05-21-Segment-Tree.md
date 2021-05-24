---
layout: post
title: Segment Tree 线段树
tags: [Algorithms, Notes]
Author: Mark
---

### 使用场景

线段树的应用场景与二进制索引树相似，当我们需要多次查询数组子区间的特性/数据并同时高效修改数组内容的时候，我们可以使用线段树。

线段树并不是一种单一的数据结构 - 它代表了一类具有相同思想方法的数据结构 - 通过二叉树做到区间内容的高效查询，这里的内容可以是区间最大/最小值，区间和，等等 。

### 数据结构

线段树是一个**二叉树**，线段树中的每一个节点代表序列中的一个区间。假设对于 长度为 $N$ 的 array $A$，我们有对应的线段树 $T$，那么……

* $T$ 的根节点代表整个 array $A$
* $T$ 的每个叶子节点都代表 array $A$ 中的一个值 $A[i]$，$0\leq i\lt N$
* $T$ 中的每一个非叶节点都代表 array $A$ 的一个子序列 $A[i:j]$，$0\leq i\lt j \lt N$

<img src="http://markdown-img-1304853431.cosgz.myqcloud.com/20210524105215.jpg" alt="c8def3486964f5c15f15ac41ecacbc0" style="zoom: 33%;" />

> 在一个线段树中，所有的叶子节点**一定**代表原数组中的一个值
>
> 注意线段树不一定是满二叉树

### Java实现

一个线段树有三个主要的方法：

* 初始化（Constructor）- 给定一个 Array，构建这个 Array 对应的线段树
* 查询 （Query）- 给定一个区间范围 $[l, r]$，返回这个区间的信息（最大值，最小值，和 etc）
* 更新 （Update）- 给定 index $i$ 与新的值 $v$，更新线段树

下面，我们会实现一个基于 [范型 (Generic Type)](https://docs.oracle.com/javase/tutorial/java/generics/types.html) 的最小线段树。对于任意实现了 `Comparable` 接口的类型 `T` 的 `ArrayList<T>`，我们都可以使用这个线段树来求出区间 $[l, r]$ 中的最小对象 $T$。

#### Helper Functions

在正式实现线段树前，我们先写一些后面可以用到的 Helper Functions。 

* `genericMin` 函数通过比对 `T.compareTo` 的值来返回两个 `T` 对象中较小的一个对象
* `getLChild` 计算出当前节点的左子节点的 index
* `getRChild` 计算出当前节点的右子节点的 index
* `inInterval` 计算出区间 $[l1, r1]$ 和 $[l2, r2]$ 之间的关系

```java
public class SegmentTree <T extends Comparable<T>>{
    private ArrayList<T> tree;
    private T[] value;
    
	private int getLChild(int index){ return index * 2 + 1; }
    private int getRChild(int index){ return index * 2 + 2; }
    private T genericMin(T o1, T o2){
        if (o1.compareTo(o2) > 0){ return o2; }
        return o1;
    }
    private int inInterval(int l1, int r1, int l2, int r2){
        if (r2 < l1 || l2 > r1){ return 0; }        // Intervals do not have any intersection
        else if (l2 >= l1 && r2 <= r1){ return 1; } // Interval 2 complete in Interval 1
        else{ return 2; }                           // Interval 2 partially intersect with Interval 1
    }
}
```

> 注意我们的 tree 属性使用的是 ArrayList 而不是 array
>
> 这是因为 Java 中不能创造 Generic Type Array

#### Construct Segment Tree

我们使用递归的方法来构建线段树 - 根节点的范围是 $[0, arr.length - 1]$，计算出中间的节点 $mid = (arr.length - 1) / 2$，左节点的范围就是 $[0, mid]$，右节点的范围是 $[mid + 1, arr.length - 1]$。

当节点的范围是 $[l, r]$ 且 $l = r$ 时，节点的值就是 Array 中对应元素的值 - 此时这个节点时叶子节点。

```java
public SegmentTree(T[] values){
    this.tree = new ArrayList<>(Collections.nCopies(values.length * 2 + 1, null));
    this.value = values;
    this.constructTree(0, 0, values.length - 1);
}

private void constructTree(int node, int l, int r) {
    if (l == r) {
        tree.set(node, value[l]);
    } else {
        int mid = (l + r) / 2;
        this.constructTree(this.getLChild(node), l, mid);
        this.constructTree(this.getRChild(node), mid + 1, r);
        tree.set(node, this.genericMin(tree.get(this.getLChild(node)), tree.get(this.getRChild(node))));
    }
}
```

####  Update Segment Tree

类似的，我们在更新 Segment Tree 时也使用递归的方法更新 - 如果要修改的 index 在当前节点的范围内，我们就递归的修改下一层，最后再 bottom-up 的更新整条路径上的 $O(\log{n})$ 个节点

```java
public void updateTree(int index, T val){
    this.updateTree(0, 0, this.value.length - 1, index, val);
}

private void updateTree(int node, int l, int r, int index, T val){
    if (l == r){
        this.tree.set(node, val);
        this.value[l] = val;
    }
    else{
        int mid = (l + r) / 2;
        if (l <= index && index <= mid){ this.updateTree(this.getLChild(node), l, mid, index, val); }
        else{ this.updateTree(this.getRChild(node), mid + 1, r, index, val); }
        this.tree.set(node, this.genericMin(this.tree.get(this.getLChild(node)), this.tree.get(this.getRChild(node))));
    }
}
```

#### Query Interval Minimum

在查询线段树中的区间最小值时，我们把所有情况分为三种：

* 当前节点代表的区间完全在查询的区间内
* 当前节点代表的区间部分在查询的区间内
* 当前节点代表的区间完全不在查询的范围内

对这三种情况，我们采取不同的动作

| 情况                       | 操作                                           |
| -------------------------- | ---------------------------------------------- |
| 节点区间完全在查询区间内   | 返回当前节点的值                               |
| 节点区间部分在查询区间内   | 继续向下递归，返回左节点与右节点返回值的较小值 |
| 节点区间完全不在查询区间内 | 返回 `null`                                    |

```java
public T queryMin(int l, int r){
    return queryMin(0, 0, this.value.length - 1, l, r);
}

private T queryMin(int node, int start, int end, int l, int r){
    if (this.inInterval(l, r, start, end) == 0){ return null; }
    else if (this.inInterval(l, r, start, end) == 1){ return this.tree.get(node); }
    int mid = (start + end) / 2;
    T leftInterval = this.queryMin(this.getLChild(node), start, mid, l, r);
    T rightInterval = this.queryMin(this.getRChild(node), mid + 1, end, l, r);
    if (leftInterval == null){ return rightInterval; }
    else if (rightInterval == null){ return leftInterval; }
    else{ return this.genericMin(leftInterval, rightInterval); }
}
```

对于基于数组

```java
Integer[]{1, 2, 3, 4, 5, 6}
```

的线段树，我们执行 `queryMin(2, 3)` 时函数的递归情况如下

<img src="http://markdown-img-1304853431.cosgz.myqcloud.com/20210524115756.jpg" alt="fb5b1012c2c20d4f2ab433ad800d475" style="zoom:33%;" />

<details>
<summary><h3>Click to see Java Full Code</h3></summary>
    <pre>
        <code class="java">
 /* Segment Tree, Java */

import java.util.*;

public class SegmentTree &lt;T extends Comparable&lt;T&gt;&gt;{

    public static void main(String[] args) {
        SegmentTree&lt;Integer&gt; test = new SegmentTree&lt;&gt;(new Integer[]{1, 2, 3, 4, 5, 6});
        System.out.println(test.dumpTree());
        // test.updateTree(0, 7);
        // System.out.println(test.dumpTree());
        System.out.println(test.queryMin(2, 5));
    }
    
    private ArrayList&lt;T&gt; tree;
    private T[] value;
    
    public SegmentTree(T[] values){
        this.tree = new ArrayList&lt;&gt;(Collections.nCopies(values.length * 2 + 1, null));
        this.value = values;
        this.constructTree(0, 0, values.length - 1);
    }
    
    public void updateTree(int index, T val){
        this.updateTree(0, 0, this.value.length - 1, index, val);
    }
    
    public T queryMin(int l, int r){
        return queryMin(0, 0, this.value.length - 1, l, r);
    }
    
    public ArrayList&lt;T&gt; dumpTree(){
        return this.tree;
    }
    
    private T queryMin(int node, int start, int end, int l, int r){
        if (this.inInterval(l, r, start, end) == 0){ return null; }
        else if (this.inInterval(l, r, start, end) == 1){ return this.tree.get(node); }
        int mid = (start + end) / 2;
        T leftInterval = this.queryMin(this.getLChild(node), start, mid, l, r);
        T rightInterval = this.queryMin(this.getRChild(node), mid + 1, end, l, r);
        if (leftInterval == null){ return rightInterval; }
        else if (rightInterval == null){ return leftInterval; }
        else{ return this.genericMin(leftInterval, rightInterval); }
    }
    
    private void updateTree(int node, int l, int r, int index, T val){
        if (l == r){
            this.tree.set(node, val);
            this.value[l] = val;
        }
        else{
            int mid = (l + r) / 2;
            if (l &lt;= index && index &lt;= mid){ this.updateTree(this.getLChild(node), l, mid, index, val); }
            else{ this.updateTree(this.getRChild(node), mid + 1, r, index, val); }
            this.tree.set(node, this.genericMin(this.tree.get(this.getLChild(node)), this.tree.get(this.getRChild(node))));
        }
    }
    
    private void constructTree(int node, int l, int r) {
        if (l == r) {
            tree.set(node, value[l]);
        } else {
            int mid = (l + r) / 2;
            this.constructTree(this.getLChild(node), l, mid);
            this.constructTree(this.getRChild(node), mid + 1, r);
            tree.set(node, this.genericMin(tree.get(this.getLChild(node)), tree.get(this.getRChild(node))));
        }
    }
    
    private int getLChild(int index){ return index * 2 + 1; }
    private int getRChild(int index){ return index * 2 + 2; }
    private T genericMin(T o1, T o2){
        if (o1.compareTo(o2) &gt; 0){ return o2; }
        return o1;
    }
    private int inInterval(int l1, int r1, int l2, int r2){
        if (r2 &lt; l1 || l2 &gt; r1){ return 0; }        // Intervals do not have any intersection
        else if (l2 &gt;= l1 && r2 &lt;= r1){ return 1; } // Interval 2 complete in Interval 1
        else{ return 2; }                           // Interval 2 partially intersect with Interval 1
    }
}
        </code>
    </pre>
</details>

### 问题练习

<ul class="time-vertical" style="margin-left: 32px;">
	<li><online></online><a href="https://leetcode.com/problems/range-sum-query-mutable/">Leetcode 307. Range Sum Query - Mutable</a> 非常 straight-forward 的 Segment Tree 问题</li>
	<li><online></online><a href="https://leetcode.com/problems/the-skyline-problem/">Leetcode 218. The Skyline Problem</a></li>
    <li><online></online><a href="https://leetcode.com/problems/count-of-smaller-numbers-after-self/">Leetcode 318. Count of Small Numbers After Self</a></li>
</ul>