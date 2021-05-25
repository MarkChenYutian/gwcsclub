---
layout: post
title: LeetCode Problem 1161. Maximum level sum of Binary Tree
tags: Other-analysis
Author: djw
---

题目大意

> 给你一个二叉树的根节点 root，请你找出同一层内元素之和 **最大** 的层号，如果有多个最大返回其中层数 **最小** 的那个。

思路

> 用BFS把每一层加在一起，然后比较大小

代码

~~~java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxLevelSum(TreeNode root) {
        if(root==null) return 0;
        int maxVal=Integer.MIN_VALUE;
        int minLayer=10000;
        int layer=0;
        Queue<TreeNode> que=new LinkedList<>();
        que.add(root);

        while(que.size()>0){
            layer++;
            int size=que.size();
            int all=0;
            for(int i=0;i<size;i++){
                root=que.poll();
                all+=root.val;
                if (root.left!=null) que.add(root.left);
                if (root.right!=null) que.add(root.right);
            }
            if(all>maxVal){
                minLayer=layer;
                maxVal=Math.max(maxVal,all);
            }
        }
        return minLayer;
    }
}
~~~

