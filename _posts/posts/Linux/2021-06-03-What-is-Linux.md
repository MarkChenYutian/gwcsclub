---
layout: post
title: Linux小常识
tags: Linux
Author: sqz

---

## What is Linux

广义上来讲：一个类型的操作系统

狭义上来讲：一个软件，一个核心，和外围的一套软件组合起来的一套系统

## 由谁创造

Linux 是由一个叫Linus Torvalds的神级程序员在1991年构思而成的, 他想基于Unix系统来设计一个免费的开源系统. Macos相当于unix的魔改版本(为了更符合个人使用,我们可以看到macos下面的/etc/shadow已经没有了,反而在linux中,里面存储了用户的密码.)

##  应用在什么地方

Linux现在主要应用于服务器中 而且在超级电脑中也使用的为Linux系统,

## 好处

1. 开源
2. 有很好的多人协作方式(用户组之间分的十分明确)
3. 有十分便携的ssh链接
4. 每个软件都把作用发挥到极致
5. 如果只开操作系统, Linux资源占用是最低的
6. 几十年前的思想放到今天,仍然光彩夺目
7. 如何设置都可以用命令行配置,方便程序化配置环境

## 我们为什么不用

看我吹了这么久, 你们肯定要问我们电脑干嘛不用啊,我给你们举几个例子你们就明白了.

1.Linux一般为服务器上用的, 所以图形化界面会十分简陋,甚至没有(就类似于你一开机就是命令行)

2.很多软件在Linux上并没有适配(office 全家桶)

3.装了你拿什么打游戏[Doge]

当然如果是要体验的话我们并不反对,熟悉Linux对以后专业为cs的学生有着巨大的帮助.

## 用windows电脑的同学如何体验Linux

首先在windows上体验Linux我们可以用wsl(Windows Subsystem for Linux)

wsl有两个版本分别是wsl1 和 wsl 2

wsl1:原名(bash on Linux on window)是直接将bash的命令转译到nt5的内核中,支持大部分的bash命令,而且文件系统可以快速相互操作

wsl2:由于有些指令无法转译,就使用Hyper-V整了个真正的和nt5内核并列的linux的内核,但文件传输会很慢

所以如果大家是打算体验一下linux的话,本人在这里是建议大家使用wsl1的因为我们其实用不到那么多linux命令,而且使用wsl1的话平常处理一些文件效率也可以稍微提高一点.



具体安装方法的话可以点这个[链接](https://blog.miniasp.com/post/2019/02/01/Useful-tool-WSL-Windows-Subsystem-for-Linux)

或者微软[官方指南](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

|                           Feature                            | WSL 1 | WSL 2 |
| :----------------------------------------------------------: | :---- | :---- |
|            Integration between Windows and Linux             | ✅     | ✅     |
|                       Fast boot times                        | ✅     | ✅     |
| Small resource foot print compared to traditional Virtual Machines | ✅     | ✅     |
|     Runs with current versions of VMware and VirtualBox      | ✅     | ✅     |
|                          Managed VM                          | ❌     | ✅     |
|                      Full Linux Kernel                       | ❌     | ✅     |
|                Full system call compatibility                | ❌     | ✅     |
|              Performance across OS file systems              | ✅     | ❌     |

(表格来源于[这里](https://docs.microsoft.com/en-us/windows/wsl/compare-versions),更多资料也可以看那个链接)

## 在mac上体验linux

1. 按住 command + space

2. 输入终端

3. 开始体验和linux一样的终端!