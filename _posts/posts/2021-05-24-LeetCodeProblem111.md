---
layout: post
title: LeetCode Problem 111. Minimum Depth of Binary Tree
tags: other-analysis
Author: djw
---

题目大意

> 给定一个二叉树，找出其最小深度
>
> 最小深度是从根节点到最近叶子节点的最短路径上的节点数量
>
> 叶子节点是指没有子节点的节点

思路

> 如果用BFS一层一层地看，第一个遇到的叶子结点的层数就是最小深度。

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
    public int minDepth(TreeNode root) {
        if (root==null) return 0;
        int layer=0;
        
        Queue<TreeNode> que=new LinkedList<TreeNode>();
        que.add(root);
        
        while(que.size()>0){
            layer++;
            int size=que.size();
            for(int i=0;i<size;i++){
                root=que.poll();
                if(root.right==null && root.left==null) return layer;
                if (root.left!=null) que.add(root.left);
                if (root.right!=null) que.add(root.right);
            }    
        }
        return layer;
    }
}
~~~

