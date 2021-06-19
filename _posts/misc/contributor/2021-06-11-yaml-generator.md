---
title: 打卡文件生成器
layout: page
tags: [Tools, Miscellaneous]
Author: [Marcus, Mark Chen]
useTOC: false
---
<!-- This is the liquid template for dynamic file generator, detailed setup is in _data/analysis-setup.json -->
<script src="{{ site.baseurl }}/js/util.js"></script>
<script src="{{ site.baseurl }}/js/markdown-parse.js"></script>

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

文件预览（检查编码是否正确，文件内容显示是否正常）：

<pre style="max-height: 15rem; overflow-y: auto;">
<code id="inFileContent">
暂无内容
</code>
</pre>

## STEP 2. 选择打卡类型

<div class="button-box" id="selectors">
{% for contest in site.data.analysis-setup %}
<button class="main-button" id="{{ contest.ValueName }}Selector" onclick="chooseSelector('{{ contest.ValueName }}')">
{{ contest.ShowName }}
</button>
{% endfor %}
</div>

## STEP 3. 填入相关信息

<div>
<input type="text" value="" id="title" placeholder="标题">
<input type="text" value="" id="author" placeholder="作者" list="siteAuthor">
{% for contest in site.data.analysis-setup %}
<div id="{{ contest.ValueName }}Input" class="input">
    {% for field in contest.Fields %}
        {% if field[1].Type == "Input" %}
            <input type="text" value="" id="{{ contest.ValueName }}{{ field[0] }}" placeholder="{{ field[1].Placeholder }}">
        {% elsif field[1].Type == "Option" %}
            <select id="{{ contest.ValueName }}{{ field[0] }}">
                {% for option in field[1].Options %}
                <option value={{option[1]}}> {{option[0]}} </option>
                {% endfor %}
            </select>
        {% else %}
            <div class="error">
Unrecognized `field.Type` {{ field[1].Type }} in `analysis-setup.json`. Please check the setup file.
            </div>
        {% endif %}
    {% endfor %}
    <h2> STEP 4. 生成！</h2>
    <button class="button-base gradient-button" onclick="downloadClockInFile(generate{{ contest.ValueName }})">开始自动生成</button>
</div>
{% endfor %}
</div>

## STEP 5. 结果预览

<div class="horizontal-flex-box" style="height: 35rem; flex-wrap: nowrap;">
<div markdown="1" style="padding: 0 1rem; margin-right: 0; border-right: 0.4rem solid #dce6f0; ">
#### 说明

渲染预览可能与实际渲染结果有细微偏差

当前预览界面暂不支持:
* MathJax 数学公式渲染
* 代码高亮渲染
</div>
    <div class="main-content" id="outPreview" style="max-height: 35rem; overflow-y: auto; max-width: none; margin-left: 2rem; margin-right: 2rem; flex-grow: 2;">
    暂无内容
    </div>
</div>

## STEP 6. 下载并发布

<p>
{% include fn/icon.html type="download" size="2rem" %} 下载 markdown 文件，然后将文件用 {% include fn/icon.html type="wechat" size="2rem" %} 微信发送给我们吧！我们会第一时间将它们更新在网站上！
</p>

<script>
    if (document.readyState !== 'loading') {
        chooseSelector("usaco");
    } else {
        document.addEventListener('DOMContentLoaded', chooseSelector("usaco"));
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
        document.getElementById(target+"Input").style.display="";
    }
{% for contest in site.data.analysis-setup %}
    function generate{{ contest.ValueName }}(){
        let author = document.getElementById("author").value;
        {% for field in contest.Fields %}
        let {{ field[0] }} = document.getElementById("{{contest.ValueName}}{{ field[0] }}").value;
        {% endfor %}
        {% if contest.RewriteTitle == true %}
        let title = "{{ contest.ShowName }}";
            {% for field in contest.Fields %}
            title += " " + document.getElementById("{{ contest.ValueName }}{{ field[0] }}").value;
            {% endfor %}
        document.getElementById("title").value = title;
        {% else %}
        let title = document.getElementById("title").value;
        {% endif %}
        let yamlHead = `---\nlayout: post\ntitle: ${title}\ntags: ["`+ "{{contest.TagName}}" + `"]\nAuthor: [\"${author}\"]`;
        {% for field in contest.Fields %}
        yamlHead += "\n{{field[0]}}: " + {{ field[0] }};
        {% endfor %}
        yamlHead += "\n---"
        return yamlHead
    }
{% endfor %}
    function downloadClockInFile(yamlGenerator){
        let yamlHead = yamlGenerator();
        let date = new Date();
        let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let content = document.getElementById("inFileContent").innerText;
        let result = yamlHead + "\n" + content;
        let title = document.getElementById("title").value
        title = title.replaceAll("_", "-").replaceAll(" ", "-");
        document.getElementById("outPreview").innerHTML = marked(content);
        if(content!="\n暂无内容\n"){download(dateString + "-" + title + ".md", result)};
    }
</script>