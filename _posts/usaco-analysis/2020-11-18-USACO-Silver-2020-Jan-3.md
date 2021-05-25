---
layout: usaco-post
title: USACO-2020-Jan-Silver-3
status: OK
Author: 李若谷
tags: USACO-analysis
year: 2020
group: Silver
season: Jan
question: 3
---
### USACO 2020 Jan Silver T3
##### Problem summary:
There are n cows unordered in a row, and m wormholes. Each wormhole has a width and it connects 2 cows. cows can swap places in wormhole. Find the maximum value of the minimum width cows needed to pass through wormhole to sort themselves.
##### Proposed solution:
Binary search the maximum value of the mininum width. Call it x. 
Therefore, we only need to figure out can only using wormholes that has width greater than x sort the cows. 
If we know x, we could basically ignore the wormholes that have a width less than x.
So the only problem to solve is to figure out if a particular graph is able to sort the cows. 
Say cow i is now positioned at p<sub>i</sub>, if for any i can go to p<sub>i</sub> by a series of swaps, the graph is solvable. 

##### Proof: 

View the whole as a graph. Assume that all the vertexes in a subgraph is connect or semi-connected (which means every cow can get to a place by several moves). Then the graph must contain at least n-1 edges. In this graph, there must be some vertexes that, if deleted, won't affect the cows going to other vertexes. Because if a vertex only has one edge, it will be that case. And for a n-1 edge sgraph, n-1 vertex only has 1 edge. If these vertex got match up by the cows, the rest of the cows can move to their places without moving these cows, since we can assume we deleted these cows and vertexes. If a subgraph has more than n-1 edges, some edges are basically useless. So definitely, it will also work. 

To achieve determining whether i and p<sub>i</sub> is connected. We could use union-find sets. 

######Time complexity:
Binary search: $O(log$ $max(t$<sub>i</sub>$))$
Union-find set: Almost $O(n)$

Therefore the time complexity is $O(log$ $max(t$<sub>i</sub>$)*n)$


