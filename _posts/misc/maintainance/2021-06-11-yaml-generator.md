---
title: 打卡文件生成器
layout: page
tags: [Page, Tools, Miscellaneous]
Author: [Marcus, Mark Chen]
useTOC: false
---
<script src="{{ site.baseurl }}/js/file-generator.js"></script>

{% assign allAuthor = site.posts | map: "Author" %}
{% assign authorList = "" | split: ","%}
{% for postAuthor in allAuthor %}
    {% for author in postAuthor %}
        {% assign authorList = authorList | push: author %}
    {% endfor %}
{% endfor %}
{% assign uniqAuthor = authorList | uniq %}

<datalist style="display: none;" id="siteAuthor">
    {% for author in uniqAuthor %}
    <option>{{author}}</option>
    {% endfor %}
</datalist>

## STEP 1. 选择打卡文件

{% include fn/icon.html type="upload" size="2rem" %}上传你想发布的打卡文件（格式支持 `markdown`, `md`）

<input type='file' accept=".md,.markdown" onchange='openFile(event)'><br>

文件预览：

<pre style="max-height: 15rem; overflow-y: auto;">
<code id="inFileContent">
暂无内容
</code>
</pre>

## STEP 2. 选择打卡类型
<div class="button-box" id="selectors">
    <div class="main-button" id="usacoSelector" onclick="chooseSelector('usaco')" style="margin-right: 0; border-radius: 24px 0 0 24px;">
        USACO
    </div>
    <div class="main-button" id="codeforceSelector" onclick="chooseSelector('codeforce')" style="margin-right: 0; margin-left: 0;border-radius: 0;">
        CodeForce
    </div>
    <div class="main-button" id="atcoderSelector" onclick="chooseSelector('atcoder')" style="margin-right: 0; margin-left: 0;border-radius: 0;">
        AtCoder
    </div>
    <div class="main-button" id="otherSelector" onclick="chooseSelector('other')" style="margin-left: 0; border-radius: 0 24px 24px 0;">
        其他
    </div>
</div>

## STEP 3. 填入相关信息

<div>
    <div id="usaco" class="input">
        <input type="text" value="" id="utitle" placeholder="标题">
        <input type="text" value="" id="uauthor" placeholder="作者" list="siteAuthor">
        <input type="text" value="" id="uyear" placeholder="年份：四位，纯数字（例：2020）">
        <select id="ugroup">
            <option value=""> 选择组别 </option>
            <option value="Platinum"> Platinum </option>
            <option value="Gold"> Gold </option>
            <option value="Silver"> Silver </option>
            <option value="Bronze"> Bronze </option>
        </select>
        <select id="uquestion">
            <option value=""> 选择题号 </option>
            <option value="1"> Question 1 </option>
            <option value="2"> Question 2 </option>
            <option value="3"> Question 3 </option>
        </select>
        <select id="useason">
            <option value=""> 选择赛季 </option>
            <option value="Jan"> January </option>
            <option value="Feb"> February </option>
            <option value="Dec"> December </option>
            <option value="Open"> Open Contest </option>
        </select>
        <h2>STEP 4. 生成！</h2>
        <button class="main-button" onclick="downloadClockInFile(generateU)">生成</button>
    </div>
    <div id="codeforce" class="input">
        <input type="text" value="" id="ctitle" placeholder="标题" >
        <input type="text" value="" id="cauthor" placeholder="作者" list="siteAuthor">
        <select id="cgroup">
            <option value=""> 选择组别 </option>
            <option value="1"> Division 1 </option>
            <option value="2"> Division 2 </option>
            <option value="3"> Division 3 </option>
        </select>
        <input type="text" value="" id="cquestion" placeholder="题号：纯数字" >
        <h2>STEP 4. 生成！</h2>
        <button class="main-button" onclick="downloadClockInFile(generateC)">生成</button>
    </div>
    <div id="atcoder" class="input">
        <input type="text" value="" id="atitle" placeholder="标题" >
        <input type="text" value="" id="aauthor" placeholder="作者" list="siteAuthor">
        <input type="text" value="" id="anumber" placeholder="Contest Number：三位数字 （例：240）">
        <select id="aquestion">
            <option value=""> 选择 Task </option>
            <option value="A"> Task A </option>
            <option value="B"> Task B </option>
            <option value="C"> Task C </option>
            <option value="D"> Task D </option>
            <option value="E"> Task E </option>
        </select>
        <h2>STEP 4. 生成！</h2>
        <button class="main-button" onclick="downloadClockInFile(generateA)">生成</button>
    </div>
    <div id="other" class="input">
        <input type="text" value="" id="otitle" placeholder="标题" >
        <input type="text" value="" id="oauthor" placeholder="作者" list="siteAuthor">
        <h2>STEP 4. 生成！</h2>
        <button class="main-button" onclick="downloadClockInFile(generateO)">生成</button>
    </div>
</div>

## STEP 5. 结果预览

<pre style="max-height: 15rem; overflow-y: auto;">
<code id="outPreview">
暂无内容
</code>
</pre>

## STEP 6. 下载并发布

<p>
{% include fn/icon.html type="download" size="2rem" %} 下载 markdown 文件，然后将文件用 {% include fn/icon.html type="wechat" size="2rem" %} 微信发送给我们吧！我们会第一时间将它们更新在网站上！
</p>

<script>
    var title="";
    if (document.readyState !== 'loading') {
        chooseSelector("usaco");
    } else {
        document.addEventListener('DOMContentLoaded', chooseSelector("usaco"));
    }
    function generateU(){
        title=document.getElementById("utitle").value;
        let author=document.getElementById("uauthor").value;
        let year=document.getElementById("uyear").value;
        let group=document.getElementById("ugroup").value;
        let question=document.getElementById("uquestion").value;
        let season=document.getElementById("useason").value;
        return("---\nlayout: usaco-post\ntitle: " + title +"\ntags: [\"USACO analysis\"]\nAuthor: [\"" + author + "\"]\nyear: " + year + "\ngroup: " + group + "\nseason: " + season + "\nquestion: " + question + "\n---");
    }
    function generateC(){
        title=document.getElementById("ctitle").value;
        let author=document.getElementById("cauthor").value;
        let group=document.getElementById("cgroup").value;
        let question=document.getElementById("cquestion").value;
        return("---\nlayout: post\ntitle: " + title + "\ntags: [\"CodeForce\",\"Other-analysis\"]\nAuthor: [\""+ author + "\"]\ngroup: "+ group +"\nquestion: " + question + "\n---");
    }
    function generateA(){
        title=document.getElementById("atitle").value;
        let author=document.getElementById("aauthor").value;
        let contestID = document.getElementById("anumber").value;
        let task = document.getElementById("aquestion").value;
        return("---\nlayout: post\ntitle: "+ title +"\ntags: [\"AtCoder\", \"Other-analysis\"]\nAuthor: [\""+ author +"\"]\ntestID: "+ contestID + "\ntask: " + task + "\n---");
    }
    function generateO(){
        title=document.getElementById("otitle").value;
        let author=document.getElementById("oauthor").value;
        return("---\nlayout: post\ntitle: "+ title +"\ntags: [\"Other-analysis\"]\nAuthor: [\""+ author +"\"]\n---");
    }
    function deselect(target){
        target.style.backgroundColor = "rgb(243, 247, 255)";
        target.style.color = "black";
    }
    function select(target){
        target.style.backgroundColor = "#015d9b";
        target.style.color = "ghostwhite";
    }
    function chooseSelector(target){
        document.getElementById("selectors").childNodes.forEach(function(each){
            try{deselect(each);}
            catch{;}
        });
        select(document.getElementById(target+"Selector"));
        document.querySelectorAll(".input").forEach(function(each){
            each.style.display="none";
        });
        document.getElementById(target).style.display="";
    }
    function downloadClockInFile(yamlGenerator){
        let yamlHead = yamlGenerator();
        let date = new Date();
        let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let content = document.getElementById("inFileContent").innerText;
        let result = yamlHead + "\n" + content;
        title = title.replaceAll("_", "-").replaceAll(" ", "-");
        document.getElementById("outPreview").innerText = result;
        if(content!="\n暂无内容\n") download(dateString + "-" + title + ".md", result);
    }
</script>