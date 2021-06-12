---
title: YAML 头文件生成器
layout: page
tags: [Page, Tools, Miscellaneous]
Author: [Marcus]
useTOC: false
---
<blockquote>
    <p>选择post类型</p>
    <div class="button-box">
        <div 
            class="main-button" id="usacoSelector" onclick="selectU()"
            style="margin-right: 0; border-radius: 24px 0 0 24px;"
        >
            USACO
        </div>
        <div
            class="main-button" id="codeforceSelector" onclick="selectC()"
            style="margin-right: 0; margin-left: 0; border-radius: 0;"
        >
            CodeForce
        </div>
        <div
            class="main-button" id="otherSelector" onclick="selectO()"
            style="margin-left: 0; border-radius: 0 24px 24px 0;"
        >
            其他
        </div>
    </div>
</blockquote>
<div>
    <div id="usaco" class="input">
<input type="text" name="firstname" value="" id="utitle" placeholder="标题"><br>
<input type="text" name="firstname" value="" id="uauthor" placeholder="作者"><br>
<input type="text" name="firstname" value="" id="uyear" placeholder="年份：四位，纯数字（例：2020）"><br>
<input type="text" name="firstname" value="" id="ugroup" placeholder="组别：[ Platinum | Gold | Silver | Bronze ]" ><br>
<input type="text" name="firstname" value="" id="uquestion" placeholder="题号：[ 1 | 2 | 3 ]"><br>
<input type="text" name="firstname" value="" id="useason" placeholder="赛季：[ Jan | Feb | Dec | Open ]"><br>
<button class="main-button" onclick="generateU()">生成</button>
    </div>
    <div id="codeforce" class="input">
<input type="text" name="firstname" value="" id="ctitle" placeholder="标题" ><br>
<input type="text" name="firstname" value="" id="cauthor" placeholder="作者" ><br>
<input type="text" name="firstname" value="" id="cgroup" placeholder="组别：[ 1 | 2 | 3 ]" ><br>
<input type="text" name="firstname" value="" id="cquestion" placeholder="题号：纯数字" ><br>
<button class="main-button" onclick="generateC()">生成</button>
    </div>
    <div id="other" class="input">
<input type="text" name="firstname" value="" id="otitle" placeholder="标题" ><br>
<input type="text" name="firstname" value="" id="oauthor" placeholder="作者" ><br>
<button class="main-button" onclick="generateO()">生成</button>
    </div>
</div>
<br>

## 生成结果

<div>
<p>把以下内容添加到markdown文件的最前面：</P>
<pre>
<code id="output"></code>
</pre>
</div>
<script>
    if (document.readyState !== 'loading') {
        selectU();
    } else {
        document.addEventListener('DOMContentLoaded', selectU);
    }
    function generateU(){
        var title=document.getElementById("utitle").value;
        var author=document.getElementById("uauthor").value;
        var year=document.getElementById("uyear").value;
        var group=document.getElementById("ugroup").value;
        var question=document.getElementById("uquestion").value;
        var season=document.getElementById("useason").value;
        document.getElementById("output").innerHTML=`---<br>layout: usaco-post<br>title: ${title}<br>tags: [\"USACO analysis\"]<br>Author: [\"${author}\"]<br>year: ${year}<br>group: ${group}<br>season: ${season}<br>question: ${question}<br>---`;
    }
    function generateC(){
        var title=document.getElementById("ctitle").value;
        var author=document.getElementById("cauthor").value;
        var group=document.getElementById("cgroup").value;
        var question=document.getElementById("cquestion").value;
        document.getElementById("output").innerHTML=`---<br>layout: post<br>title: ${title}<br>tags: [\"CodeForce\",\"Other-analysis\"]<br>Author: [\"${author}\"]<br>group: ${group}<br>question: ${question}<br>---`;
    }
    function generateO(){
        var title=document.getElementById("otitle").value;
        var author=document.getElementById("oauthor").value;
        document.getElementById("output").innerHTML=`---<br>layout: post<br>title: ${title}<br>tags: [\"Other-analysis\"]<br>Author: [\"${author}\"]<br>---`;
    }
    function deselect(target){
        target.style.backgroundColor = "rgb(243, 247, 255)";
        target.style.color = "black";
    }
    function select(target){
        target.style.backgroundColor = "#015d9b";
        target.style.color = "ghostwhite";
    }
    function selectU(){
        select(document.getElementById("usacoSelector"));
        deselect(document.getElementById("codeforceSelector"));
        deselect(document.getElementById("otherSelector"));
        document.querySelectorAll(".input").forEach(function(each){
            each.style.display="none";
        });
        document.getElementById("usaco").style.display=""
        document.getElementById("output").innerHTML="还没有输入";
    }
    function selectC(){
        deselect(document.getElementById("usacoSelector"));
        select(document.getElementById("codeforceSelector"));
        deselect(document.getElementById("otherSelector"));
        document.querySelectorAll(".input").forEach(function(each){
            each.style.display="none";
        });
        document.getElementById("codeforce").style.display=""
        document.getElementById("output").innerHTML="还没有输入";
    }
    function selectO(){
        deselect(document.getElementById("usacoSelector"));
        deselect(document.getElementById("codeforceSelector"));
        select(document.getElementById("otherSelector"));
        document.querySelectorAll(".input").forEach(function(each){
            each.style.display="none";
        });
        document.getElementById("other").style.display=""
        document.getElementById("output").innerHTML="还没有输入";
    }
</script>