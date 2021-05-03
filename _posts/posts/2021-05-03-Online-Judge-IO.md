---
layout: post
title: 在线测评(Online Judge)的输入输出
tags: For-Beginners
Author: J
---

大部分的 OJ 都要求从系统的标准输入流获得数据以及将答案写入标准输出流，但在 USACO 和 ACSL 等比赛中，会要求从文件读取数据以及将答案写入到文件中，以文件中的内容进行评分。所以有必要掌握如何读写文件的方法。

### 基本

```python
lines = open("xxx.in", "r").read().strip().split("\n")
out = open("xxx.out", "w")

# do your calculations

out.write("{}\n".format(result))
out.close()
```

`open()` 函数是用来打开一个文件，通常有两种模式，一种是 `read` 模式，一种是 `write` 模式

输入数据的末尾通常会有一些空格制表符或换行符，所以读取数据之后先用 `strip()` 将它们去掉，然后再用 `split("\n")` 来将整个输入数据切分成一行一行的一个 `list`

在使用 `write()` 的时候要注意，它不会像 `print()` 一样自动在末尾添加换行符，所以一定要记得在每一行输出之后加上 `"\n"`，特别是最后一行

### 进阶

所以用这个模版提交的代码会从一个叫 `xxx.in` 的文件中读取数据，将答案写到 `xxx.out` 的文件里。不过这让本地调试变得有点麻烦，因为我需要在本地再创建一个叫 `xxx.in` 的文件，并且修改测试数据的时候需要去修改这个文件。能不能做到一个效果，可以让我方便的切换本地模式和 OJ 模式，在 OJ 的时候用文件输入输出，在本地的时候用标准输入输出，同时要最少化代码的改动，减少低级错误的发生

J 一般会选择使用这种方法:

```python
# 本地测试时用这一段
import sys
lines = sys.stdin.read().strip().split("\n")
out = sys.stdout

# 提交 oj 时用这一段
lines = open("xxx.in", "r").read().strip().split("\n")
out = open("xxx.out", "w")

# do your calculations

out.write("{}\n".format(result))
out.close()
```

我添加了三行代码，给本地测试时使用。在本地时，把提交 oj 的那一段注释掉，而在提交 oj 的时候，把本地测试那一段注释掉。这样的好处是，除了开头这几行，剩余的我的代码的其他部分不用做任何更改，最小化出错的几率。