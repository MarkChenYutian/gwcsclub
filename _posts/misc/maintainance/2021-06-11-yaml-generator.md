---
title: 打卡文件生成器
layout: page
tags: [Page, Tools, Miscellaneous]
Author: [Marcus, Mark Chen]
useTOC: false
---
<script src="{{ site.baseurl }}/js/file-generator.js"></script>


## STEP 1. 选择打卡文件

<input type='file' accept=".md,.markdown" onchange='openFile(event)'><br>

文件预览：

<pre style="max-height: 15rem; overflow-y: auto;">
<code id="inFileContent">
暂无内容
</code>
</pre>

## STEP 2. 选择打卡类型
<div class="button-box" id="selectors">
    <div 
        class="main-button" id="usacoSelector" onclick="chooseSelector('usaco')"
        style="margin-right: 0; border-radius: 24px 0 0 24px;"
    >
        USACO
    </div>
    <div
        class="main-button" id="codeforceSelector" onclick="chooseSelector('codeforce')"
        style="margin-right: 0; margin-left: 0; border-radius: 0;"
    >
        CodeForce
    </div>
    <div
        class="main-button" id="otherSelector" onclick="chooseSelector('other')"
        style="margin-left: 0; border-radius: 0 24px 24px 0;"
    >
        其他
    </div>
</div>

## STEP 3. 填入相关信息

<div>
    <div id="usaco" class="input">
<input type="text" name="firstname" value="" id="utitle" placeholder="标题">
<input type="text" name="firstname" value="" id="uauthor" placeholder="作者">
<input type="text" name="firstname" value="" id="uyear" placeholder="年份：四位，纯数字（例：2020）">
<input type="text" name="firstname" value="" id="ugroup" placeholder="组别：[ Platinum | Gold | Silver | Bronze ]" >
<input type="text" name="firstname" value="" id="uquestion" placeholder="题号：[ 1 | 2 | 3 ]">
<input type="text" name="firstname" value="" id="useason" placeholder="赛季：[ Jan | Feb | Dec | Open ]">
<h2>STEP 4. 生成！</h2>
<button class="main-button" onclick="generateFile(generateU)">生成</button>
    </div>
    <div id="codeforce" class="input">
<input type="text" name="firstname" value="" id="ctitle" placeholder="标题" >
<input type="text" name="firstname" value="" id="cauthor" placeholder="作者" >
<input type="text" name="firstname" value="" id="cgroup" placeholder="组别：[ 1 | 2 | 3 ]" >
<input type="text" name="firstname" value="" id="cquestion" placeholder="题号：纯数字" >
<h2>STEP 4. 生成！</h2>
<button class="main-button" onclick="generateFile(generateC)">生成</button>
    </div>
    <div id="other" class="input">
<input type="text" name="firstname" value="" id="otitle" placeholder="标题" >
<input type="text" name="firstname" value="" id="oauthor" placeholder="作者" >
<h2>STEP 4. 生成！</h2>
<button class="main-button" onclick="generateFile(generateO)">生成</button>
    </div>
</div>

## STEP 5. 结果预览

<pre style="max-height: 15rem; overflow-y: auto;">
<code id="outPreview">
</code>
</pre>

<script>
    if (document.readyState !== 'loading') {
        chooseSelector("usaco");
    } else {
        document.addEventListener('DOMContentLoaded', chooseSelector("usaco"));
    }
</script>
