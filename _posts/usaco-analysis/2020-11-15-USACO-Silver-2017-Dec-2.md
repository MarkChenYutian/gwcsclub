---
layout: usaco-post
title: USACO 2017 Dec Silver P2
tags: USACO-analysis
status: OK
Author: Marcus
year: 2017
group: Silver
season: Dec
question: 2
---

## 1712s2 Milk Measurement

> 题目大意：有很多头奶牛，农场主在某些日期（范围为(1,000,000)）记下某一头的编号、产奶量变化（和上一次记录时比较），并表彰全部产奶量最高的奶牛（们），把它（们）的照片张贴起来。已知一些乱序的记录，请求出农场主需要改变张贴的照片的次数。

#### 思路：

将记录全部装入数组changes中，因为是乱序的，首先需要排序。节省时间起见，使用计数排序。用一个数组now记录现在每头牛的产奶量，然后遍历数组changes，每次使now的某个值变化，并得到now的全部最大值的index，并和上一次得到的indexes比较，最后输出index的变化次数即可。

#### 复杂度：

计数排序为O(n)
每次得到最大值，执行一下逻辑：
1、如果新变化的值比上次最大的值更大，更新最大值的indexes为新变化的index，并返回；
2、如果新变化的index不在原最大值的indexes中，且新变化的值等于原最大值，新变化的index扩充进最大值的indexes中，并返回；
3、如果新变化的index在原indexes中，（既然不是更大，那么是更小）：
	3.1、如果indexes的数量大于1，移除新变化的index，并返回；
	3.2、否则，重新遍历数组，并返回得到的最大值的indexes
4、以上均不符合，则最大值没有任何变化，返回原indexes。
其中，3的复杂度为O(n)，其余为O(1)。最坏情况是n次O(n)，即O(n^2)
总的为O(n^2)
tips: 实际情况不会全部都是最坏情况，因此还是比一律遍历快很多很多的，并不会白优化。

#### 实现：

```python
def sorting(before):#计数排序
    global count
    dict={}
    for i in range(0,n):
        temp=changes[i][1]
        if temp not in dict:
            dict[temp]=count
            count+=1
    for change in changes:
        change[1]=dict[change[1]]
    temp=[]
    for i in range(0,1000000):
        temp.append(-1)
    for change in before:
        temp[change[0]-1]=change
    after=[]
    for value in temp:
        if(value!=-1):
            after.append(value)
    return after
def isSame(a,b):
    if(len(a)!=len(b)):
        return False
    for i in range(0,len(a)):
        if(a[i]!=b[i]):
            return False
    return True
def getMax(to):
    temp=[]
    temp.append(0)
    for i in range(1,len(to)):
        value=to[i]
        if(value>to[temp[0]]):
            temp=[]
            temp.append(i)
        elif(value==to[temp[0]]):
            temp.append(i)
    return temp
def delvalue(value,to):
    i=0
    while(to[i]!=value):
        i+=1
    temp=[]
    temp.extend(to[0:i])
    temp.extend(to[i+1:len(to)])
    return temp
def copy(to):
    temp=[]
    for value in to:
        temp.append(value)
    return temp
def getChange(i,max):
    if(now[i]>now[max[0]]):
        return copy([i])
    c=max.count(i)
    if(now[i]==now[max[0]]and c==0):
        temp=copy(max)
        temp.append(i)
        return temp
    if(c!=0):
        if(len(max)>1):
            return delvalue(i,max)
        return getMax(now)
    return max
inp=open("measurement.in")
st=inp.readline().split()
n=int(st[0])
g=int(st[1])
changes=[]
for i in range(0,n):
    st=inp.readline().split()
    for i2 in range(0,3):
        st[i2]=int(st[i2])
    changes.append(st)
count=0
changes=sorting(changes)
out=open("measurement.out","w")
now=[]
for i in range(0,count):
    now.append(g)
max=getMax(now)
count=0
for change in changes:
    now[change[1]]+=change[2]
    temp=getChange(change[1],max)
    if(not isSame(temp,max)):
        count+=1
    max=temp
if(count==0):
    count=1
out.write("%d\n"%count)
out.close()
l=[]
```


