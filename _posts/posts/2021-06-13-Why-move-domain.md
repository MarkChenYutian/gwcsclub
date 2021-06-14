---
layout: post
title: 为什么我们更换域名？
tags: ["Site Blog"]
Author: ["Mark Chen"]
---

广外计算机社的网站于 2021 年 6 月 13 日从 [gwcompsci.gitee.io](gwcompsci.gitee.io) 迁移到了 [gwcs.xyz](gwcompsci.gitee.io)。下面我会简单介绍本次迁移的原因和长期利益。

## 放弃使用 Gitee 的原因

### 网站域名过长，不方便记忆

虽然我们通过注册账号 `gwcompsci` 已经尽可能的压缩了网址的长度，但是原本的网站域名 gwcompsci.gitee.io 还是太长了，不适合记忆。Gitee Pages 不支持绑定自定义域名，必须花钱购买付费企业版后才能使用这个功能。

### Gitee 仓库风险较高

我们的仓库在 5 月 25 日被 Gitee 官方以仓库大小超过 1 GB 为由“冻结”了两天。事发时，仓库实际大小只有 40 MB。 我们第一时间向 Gitee 官方发送了邮件进行询问，没有得到任何反馈。两天的时间内无法进行任何 push / pull 操作。如果将所有源代码托管在 Gitee 上，未来可能还会发生类似的仓库冻结事件。

![image-20210613193814020](http://markdown-img-1304853431.cosgz.myqcloud.com/20210613193814.png)

### Gitee Pages 服务稳定性逐渐降低

在 2021 年 1 月网站刚刚上线时，Gitee Pages 的稳定性非常好。但是在 5 月 28 号 到 6 月 10 号这段时间，Gitee Pages 的服务稳定性逐渐下降。最差时一度连续停摆 6 小时。同样的，Gitee 官方没有给出任何解释或者后续维护的计划。出于发展的考量，我们认为 Gitee Pages 并不能稳定的支持我们的网站。

![image-20210613193638398](http://markdown-img-1304853431.cosgz.myqcloud.com/20210613193638.png)

### Gitee Pages 文档不详细，依赖版本过旧

Gitee Pages 完全没有自己的文档体系，[唯一的文档](https://gitee.com/help/articles/4136)也十分简略。这十分不利于我们的维护……当 Gitee Pages 部署失败时也很少返回失败原因。这让我们很难部署 jekyll 插件和改善网站体验的其它功能。Gitee 使用的 Jekyll 版本也过于陈旧，无法使用很多方便的 Jekyll 插件。

### Gitee Pages 自动化构建过程不透明

Gitee Pages 在 6 月7 号无法部署我们的 [Commit#f1217b5b7ef52919188218e9a72e62a0a7415e0d](https://gitee.com/gwcompsci/gwcompsci/commit/f1217b5b7ef52919188218e9a72e62a0a7415e0d)。我们在本地可以正常的运行这个版本的 jekyll build，但是 Gitee Pages 无法部署这个版本。当我们试图使用较老的版本紧急恢复网站时，发现曾经可以正常部署的版本也无法部署。

>  我们向 Gitee 官方发送电子邮件进行询问，无果

这个事件直接促使我们将网站迁移到新的技术栈上。

## 新的网站技术栈

![image-20210613212611468](http://markdown-img-1304853431.cosgz.myqcloud.com/20210613212611.png)

## 新技术栈的优势

### 完全可控的构建过程

使用 GitHub Action，我们可以完全的控制所有的环境，包括 ruby 版本，jekyll 版本，第三方包与插件（gems）

同时，所有的 GitHub Action 都会存储终端的输出，使得 debug 变得十分方便

### 更加高效的交流

使用 Github Project 等功能，我们可以更加高效的展示和规划网站各项工作。

![image-20210613235825734](http://markdown-img-1304853431.cosgz.myqcloud.com/20210613235825.png)

### 灵活的技术架构

在新的技术栈下我们可以使用各种 jekyll plugin 与 AWS 服务。例如使用 AWS Cloudfront CDN 来加速我们的站点，AWS Lambda 来部署一系列 serverless 服务……