---
layout: algo_note
title: 从 nim 看动态规划
tags: Algorithm Notes
Author: ["Mark Chen"]
---

### 问题描述

nim 是一种典型的零和游戏

* 有两个玩家
* 每个玩家只有有限个选择
* 玩家轮流行动
* 游戏会在有限步骤内结束
* 没有平局

现在我们定义一个游戏：有一堆石子（初始状态可能有0个石子）和两个玩家 $A$ 和 $B$。两个玩家轮流行动，每一轮一个玩家可以选择在往石子堆中添加 1 - 3 个石子。现在我们想写一个程序判断在一个特定的游戏状态下$A$是否有必胜策略。

### 题目理解

这个游戏中的状态实际上用两个参数就能够定义了，一个是当前石子堆里有多少个石子，另一个是当前轮到哪位玩家进行操作。只要有了这两个参数，我们就可以定义一个唯一的游戏状态。也就是说，加入最后石子堆的石子上限是 $n$，那么我们可以将所有的游戏必胜状态保存在二维数组 $T$ 中。$T$ 的尺寸是 $n\times 2$。

知道如何表示和存储游戏状态后，我们先在要找到一个动态规划算法的核心：状态转移方程。也就是说我如何从已知的状态中推断出其他游戏状态是否是必胜的。

如果现在游戏轮到 $A$ 进行操作，那么在所有 $A$ 可以到达的状态中，只要有一个状态可以继续让 $A$ 必胜则将当前的状态节点记作 $A$ 的必胜节点。（因为$A$可以自己选择自己的行为，从而选择自己接下来到达的游戏状态）也就是说：

$$
T[x][0] = T[x+1][1] \;\vee\; T[x+2][1] \;\vee\; T[x+3][1]
$$

如果游戏轮到 $B$ 进行操作，则必须在所有当前可达状态都可以让 $A$ 必胜。只有这种情况可以确保 $A$ 必胜，因为 $A$ 无法确定 $B$ 的行动。也就是说：

$$
T[x][1] = T[x+1][0]\;\wedge\; T[x+2][0] \;\wedge\; T[x+3][0]
$$

### 代码实现

<pre>
<code class="python">
FINALNUM = 5
dp = [[None] * (FINALNUM + 1), [None] * (FINALNUM + 1)]	# Initialize a boolean 2d
dp[0][FINALNUM] = False
dp[1][FINALNUM] = True

# Query Function to deal with marginal problems
def query(stoneNum, turn, dpTable):
	global FINALNUM
	if stoneNum < FINALNUM:
		# If the value of specific position is not yet calculated, use getValue to calculate it recursively.
		if dpTable[turn][stoneNum] is None: return getValue(stoneNum, turn, dpTable)
		# If the value is already calculated, return it directly.
		return dpTable[turn][stoneNum]
	elif turn == 0:
		return False    # Base case. If there are more than FINALNUM stones and it's A's turn, then A must lose.
	else:
		return True     # Base case. If there are more than FINALNUM stones and it's B's turn, then B must lose (A must win).

def getValue(stoneNum, turn, dpTable):
	# Calculate the Value on DP Table Recursively.
	if turn == 0:
		# State Transition Function, Situation 1
		dpTable[turn][stoneNum] = query(stoneNum + 1, 1, dpTable) or\
								  query(stoneNum + 2, 1, dpTable) or\
								  query(stoneNum + 3, 1, dpTable)
	else:
		# State Transition Function, Situation 2
		dpTable[turn][stoneNum] = query(stoneNum + 1, 0, dpTable) and\
								  query(stoneNum + 2, 0, dpTable) and\
								  query(stoneNum + 3, 0, dpTable)
	return dpTable[turn][stoneNum]

if __name__ == "__main__": print(query(0, 0, dp))
</code>
<code class="java">
public class nim {
    // use Boolean instead of boolean because we can use null in dpTable to represent "not calculated yet"
    private Boolean[][] dp;
    private final int WINNUM;

    public static void main(String[] args) {
        nim test = new nim(16);
        System.out.println(test.query(0, 0));
    }
    
    public nim(int WinNum){
        this.WINNUM = WinNum;
        this.dp = new Boolean[2][WinNum + 1];
        this.dp[0][this.WINNUM] = false;
        this.dp[1][this.WINNUM] = true;
    }
    
    public boolean query(int stoneNumber, int turn){
        if (stoneNumber < this.WINNUM){
            if (this.dp[turn][stoneNumber] == null){
                getValue(stoneNumber, turn);
            }
            return this.dp[turn][stoneNumber];
        }
        else return turn != 0;
    }
    
    public void getValue(int stoneNumber, int turn){
        if (turn == 0){
            this.dp[turn][stoneNumber] = this.query(stoneNumber + 1, 1) ||
                                        this.query(stoneNumber + 2, 1) ||
                                        this.query(stoneNumber + 3, 1);
        }
        else{
            this.dp[turn][stoneNumber] = this.query(stoneNumber + 1, 0) &&
                                        this.query(stoneNumber + 2 ,0) &&
                                        this.query(stoneNumber + 3, 0);
        }
    }
}
</code>
</pre>

