---
layout: post
title: 如何阅读报错
tags: For-Beginners
Author: Mark
---

### 简介

许多初学者都十分惧怕自己编写的程序报错 - 确实，当自己花费了大量精力思考写出的程序却只给出了一大堆鲜红的报错时，人难免会感到沮丧。不过，沮丧归沮丧，最终还是要自己 debug 自己的程序。这篇文章会简要的介绍一些阅读和应对报错的方法，希望看完这篇文章以后当你面对报错的时候不再惊慌失措，而是开始冷静分析自己的代码并且快速解决问题。

### 为什么程序会报错

一个程序会在两个阶段内报错 - 程序可能在真正开始运行前就报错（编译/语法检查报错），或者当程序运行到一半时再报错（运行时报错），在不同的情况下，程序会因为不同的原因报错

#### 0. 编译 / 语法检查报错

如果你用的是 `Java`，每次运行程序前你都要点"Compile"键来编译你的程序 - 把你能看懂的代码转换为电脑能看懂并执行的代码。有时候在你点"Run"前程序就会报错 - 这时候一般有两种情况：

1. 你的代码**语法有错误** - 典型的错误包括漏掉分号，在行尾使用中文分号，括号没有结尾（有左括号`(`漏了右括号`)`）
2. 你的代码里面有**电脑无法解释的部分** - 例如在声明 `int a;` 前就对 `a` 进行赋值操作，当电脑翻译你的程序时，因为没有声明“ `a` 是一个存储整数的变量”，电脑不知道 `a = 10` 中的 `a` 是什么意思，于是报错。即使你使用的是python，没有编译的步骤，你还是会遇到编译/语法检查报错。只有当 Python 理解你的代码后才会运行代码，如果代码中有语法错误，Python 因为无法理解代码而在执行前报错，这时候你会看到报错的名字叫做 SyntaxError （语法错误） - 典型的错误括号包括没有结尾（有左括号(漏了右括号)） 等



即使你使用的是`python`，没有编译的步骤，你还是会遇到编译/语法检查报错。只有当 Python 理解你的代码后才会运行代码，如果代码中有**语法错误**，Python 因为无法理解代码而在执行前报错，这时候你会看到报错的名字叫做 `SyntaxError` （语法错误） - 典型的错误括号包括没有结尾（有左括号`(`漏了右括号`)`） 等

#### 1. 运行时报错

在编译 / 语法检查后，你的代码会被执行。这时候代码的报错是出于另一个动机 - 为了保护你而报错。

当程序的行为可能造成不可预测的后果或者收到设计功能之外的输入时，程序会报错。一个典型的例子是除0错误。当设计除法的代码时，我们明确的知道除数必须时一个非0的数字，如果程序收到“除0”的指令，它会立刻报错。通过这种机制，你的代码可以告诉你它遇到了无法执行的问题 / 继续执行会产生不确定的结果（例如从一个长度为 4 的数组中取 index 为 4 的元素如果不报错我们无法预测返回值）

### 报错中有什么信息

当程序报错时，它会同时给出一定的信息帮助你找到错误进行 debug。下面我们用Java和Python的两个例子来举例如何阅读报错。

```java
class RTErrorDemo { 
    public static void main(String args[]) 
    { 
        int arr[] = new int[5]; 
        arr[9] = 250; 
  
        System.out.println("Value assigned! "); 
    } 
} 
----
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 9
    at RTErrorDemo.main(File.java:10)
```

```python
def addIntToString(integer: int, string: str):
    return integer + string

addIntToString(2, "Hello")

----
mark@DESKTOP-8T8N5K5:/mnt/c/Users/28698/Desktop$ python3 Example.py
Traceback (most recent call last):
  File "Example.py", line 4, in <module>
    addIntToString(2, "Hello")
  File "Example.py", line 2, in addIntToString
    return integer + string
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

以上面两个 Java 和 Python 的报错为例子，一般一个报错分为三个部分：

1. **报错类型**

   Java - `java.lang.ArrayIndexOutOfBoundsException`，数组索引越界异常

   Python - `TypeError`，类型错误

2. **报错信息**

   这里Java没有给出报错信息，因为报错类型的名称已经非常明显的说明了报错的原因 - 我们的索引超过了数组的长度。（我们正在试图赋值给一个不存在的位置）

   Python 给出的报错信息在报错类型后面

   ```
   unsupported operand type(s) for +: 'int' and 'str'
   ```

   翻译过来：“整数和字符串之间不能用加号计算” - 简单来说，Python不知道一个数字加上字符串应该返回什么，于是报告类型错误 `TypeError`

3. **Traceback**

   Java

   ```
   at RTErrorDemo.main(File.java:10)
   ```

   可以看到程序在 `File.java` 中的第十行报错 （`class RTErrorDemo` 的 `main` 函数中）

   Python

   ```
   Traceback (most recent call last):
     File "Example.py", line 4, in <module>
       addIntToString(2, "Hello")
     File "Example.py", line 2, in addIntToString
       return integer + string
   ```

   这里我们的Traceback里面有两个位置，程序具体是从哪里开始报错的呢？在这种情况下我们要从下往上阅读代码 - 我们在把变量 `integer` 与 `String`  相加时发生了错误，那么程序是从哪里执行（调用）到这一行的呢？我们往上读一层，看到了一个程序的第四行 - `addIntToString(2, "Hello")`。在执行这一行的时候调用了我们写的函数 `addIntToString` 内的代码。

### 怎么 debug?

有了这三个信息，你可以

1 自己检查一下报错的代码附近的代码是否有明显的逻辑问题

2 试着使用“小黄鸭调试法”，一步一步的解释自己的代码是在做什么 [什么是小黄鸭调试法？](https://baike.baidu.com/item/%E5%B0%8F%E9%BB%84%E9%B8%AD%E8%B0%83%E8%AF%95%E6%B3%95/16569594)

3 在 Python Tutor / Java Tutor 上试着逐行可视化运行一下自己的代码，仔细检查自己的指针和变量值是否符合预期 [Python Tutor 链接](http://www.pythontutor.com/)

> Python Tutor / Java Tutor 是一款可以可视化运行 Python / Java 程序的网站
<iframe width="100%" height="500" frameborder="0" src="http://pythontutor.com/iframe-embed.html#code=def%20listSum%28numbers%29%3A%0A%20%20if%20not%20numbers%3A%0A%20%20%20%20return%200%0A%20%20else%3A%0A%20%20%20%20%28f,%20rest%29%20%3D%20numbers%0A%20%20%20%20return%20f%20%2B%20listSum%28rest%29%0A%0AmyList%20%3D%20%281,%20%282,%20%283,%20None%29%29%29%0Atotal%20%3D%20listSum%28myList%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=10&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>

4 在网上搜索一下这个报错的可能原因 [如何运用互联网查找资料？]({{ site.baseurl }}/2021/03/01/How-to-find-info.html)

5 如果上面的方法都解决不了这个报错，重新回到第一步，除非真的解决不掉的问题**不要找人帮忙 debug**，debug能力是编程能力的重要一环，只有自己debug才能练习这种能力