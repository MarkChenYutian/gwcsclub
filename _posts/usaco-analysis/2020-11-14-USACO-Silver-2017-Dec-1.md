---
layout: usaco-post
title: USACO 2017 Dec Silver P1
tags: USACO-analysis
status: OK
author: Marcus
time: 2017
group: Silver
question: Dec 1
---

## 1712s1 My Cow Ate My Homework

> 题目大意：作业的评分标准，是去掉最低分后，剩下的成绩取平均分。不幸的是，你的牛吃掉了你前n份作业，所以你的分数是不算前n(n取[1,总份数-2])份作业，剩下的作业去掉最低分后，取平均分。请求出能使你分数最高的全部n值

#### 思路：

吃掉n份作业后，分数=(剩下的总分-剩下的最低分)/(剩下的数量-1)
剩下的总分可以从后往前求全部元素之和，剩下的最低分可以从后往前，通过比较剩下的最低分[n+1]和分数[n]得到。
然后依次求出分数，能使分数最高的n值用list记录，每次比较是否分数更高/分数同为最高，然后更新list。最后输出这个list即可

#### 复杂度：

求剩下的总分和剩下的最低分均为n次O(1)；算分数也是n次O(1)
总的是O(n)

#### 实现：

```python
inp=open("homework.in","r")
n=int(inp.readline())
scores=[]
str=inp.readline()
st=str.split()
for i in range(0,n):
    scores.append(int(st[i]))
inp.close()
del str,st,inp
mins=[]
mins.append(scores[n-1])
sums=[]
sums.append(scores[n-1])
for i in range(1,n):
    if(scores[-i-1]<mins[-1]):
        mins.append(scores[-i-1])
    else:
        mins.append(mins[-1])
    sums.append(scores[-i-1]+sums[-1])
answers=[]
answer=-1.0
for i in range(1,n-1):
    temp=1.0*(sums[-i-1]-mins[-i-1])/(n-i-1)
    if(temp>answer):
        answers=[]
        answers.append(i)
        answer=temp
    elif(temp==answer):
        answers.append(i)
out=open("homework.out","w")
for i in range(0,len(answers)):
    out.write(str(answers[i])+"\n")
out.close()
```

