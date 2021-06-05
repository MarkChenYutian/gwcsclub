---
layout: algo_note
title: 找质数
tags: Algorithm Notes
Author: ["Mark Chen"]
---

### 前置要求

在学习这个页面的内容前，你应该掌握这些知识……

<ul class="time-vertical" style="margin-left: 32px;">
    <li><offline></offline><a href="">数据结构：列表 Array (List) and ArrayList</a></li>
    <li><online></online><a href="{{ site.baseurl }}/2021/03/02/Time-Complexity.html">理论基础：时间复杂度 Time Complexity</a></li>
    <li><offline></offline><a href="">算法：暴力枚举 Complete Search</a></li>
</ul>

### 找质数 Version 1. 暴力枚举

如果我们想找到100以内的所有质数，一个显而易见的方法是一个个尝试2 - 100 之间的数字能不能被除了1和它本身以外的数字整除。如果都不能整除我们正在检测的数字说明这个数字是一个质数，就把它添加进列表中。这是一种最基本的暴力枚举方法。

<pre>
    <code class="python">
primes = []

for num in range(2, 100000):
    isPrime = True
    for factor in range(2, num):
        if num % factor == 0:
            # num can be divided by number that is neither 1 nor itself, so num is not a prime
            isPrime = False
    if isPrime:
        primes.append(num)
    </code>
    <code class="java">
import java.util.ArrayList;

public class findPrimeV1 {
    public static void main(String[] args) {
        System.out.println(findPrimes(2, 100000));
    }

    public static ArrayList&lt;Integer&gt; findPrimes(int start, int end){
        ArrayList&lt;Integer&gt; primes = new ArrayList&lt;&gt;();
        for (int num = 2; num &lt;= end; num ++){
            boolean isPrime = true;
            for (int factor = 2; factor &lt; num; factor ++){
                if (num % factor == 0) { isPrime = false; }
            }
            if (isPrime){
                primes.add(num);
            }
        }
        return primes;
    }
}
    </code>
</pre>

这个程序的时间复杂度是 $O(n^2)$ 因为我们有 $n$ 个数字要判断素性（判断是不是素数，质数），每个数字我们要尝试 $n$ 次除法进行判断。

我们可以记录一下这段代码的运行时间（每个人的电脑配置不同，所以运行时间可能会存在差异）

<pre>
Python: 447364 ms
Java: 13017ms
</pre>

虽然我们的这个程序确实可以直接找到指定范围内的质数，但是这并不是一个高效的程序，因为我们其实还有很多优化可以做：

**如果我们试到一个数字可以整除当前的数字，我们其实可以立刻判定当前的数字不是质数而不用继续尝试后面的factor了（可以直接从尝试 factor 的循环中 break 出来）**

<pre>
    <code class="python">
primes = []

for num in range(2, 10000):
    isPrime = True
    for factor in range(2, num):
        if num % factor == 0:
            # num can be divided by number that is neither 1 nor itself, so num is not a prime
            isPrime = False
            break
    if isPrime:
        primes.append(num)
    </code>
    <code class="java">
import java.util.ArrayList;

public class findPrimeV1 {
    public static void main(String[] args) {
        System.out.println(findPrimes(2, 10000));
    }

    public static ArrayList&lt;Integer&gt; findPrimes(int start, int end){
        ArrayList&lt;Integer&gt; primes = new ArrayList&lt;&gt;();
        for (int num = 2; num &lt;= end; num ++){
            boolean isPrime = true;
            for (int factor = 2; factor &lt; num; factor ++){
                if (num % factor == 0) { isPrime = false; }
            }
            if (isPrime){
                primes.add(num);
                break;
            }
        }
        return primes;
    }
}
    </code>
</pre>

现在我们再来看看这两个程序寻找 2 - 100000 之间质数的速度

<pre>
Python: 41280ms
Java: 1137ms
</pre>

仅仅是加入了一行代码就让程序的运行速度提升了6倍左右！但是算法的时间复杂度并没有降低。虽然在大部分的情况下我们判断一个数字的素性判断到一半会从循环中 break 出来，但是循环的循环次数上限依然是 $O(n)$，所以程序的时间复杂度依然是 $O(n^2)$。

### 找质数 Version 2. 优化的暴力枚举

在之前的代码中，我们提到如果当前正在判断素性的数字可以被不是1和本身的因子整除，我们可以立刻推断出当前数字不是素数并退出循环。从这里，我们可以发现一个比较大的可优化的点：实际上我们尝试的因数并不需要从 $2$ 试到 $n$，我们只用从 $2$ 试到 $\sqrt{n}$ 就行了。

如果对于所有小于 $\sqrt{n}$ 的数字都无法整除 $n$，那么所有大于 $\sqrt{n}$ 的数字也一定无法整除 $n$。

<pre>
    <code class="python">
import math

primes = []

for num in range(2, 10000):
    isPrime = True
    for factor in range(2, int(math.sqrt(num)) + 1):
        if num % factor == 0:
            # num can be divided by number that is neither 1 nor itself, so num is not a prime
            isPrime = False
            break
    if isPrime:
        primes.append(num)
    </code>
    <code class="java">
import java.util.ArrayList;

public class findPrimeV1 {
    public static void main(String[] args) {
        System.out.println(findPrimes(2, 10000));
    }

    public static ArrayList&lt;Integer&gt; findPrimes(int start, int end){
        ArrayList&lt;Integer&gt; primes = new ArrayList&lt;&gt;();
        for (int num = 2; num &lt;= end; num ++){
            boolean isPrime = true;
            for (int factor = 2; factor &lt; (int)Math.sqrt(num) + 1; factor ++){
                if (num % factor == 0) { isPrime = false; }
            }
            if (isPrime){
                primes.add(num);
                break;
            }
        }
        return primes;
    }
}
    </code>
</pre>

进行了这个优化后，我们再看看程序的运行时间

<pre>
Python: 259ms
Java: 16ms
</pre>

这次优化在上一次的基础上又将运行时间缩短到了最开始的 $1/100$！这次优化我们成功的将算法的时间复杂度从 $O(n^2)$ 缩小到了 $O(n\sqrt{n})$。
