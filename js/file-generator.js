function generateU(){
    let title=document.getElementById("utitle").value;
    let author=document.getElementById("uauthor").value;
    let year=document.getElementById("uyear").value;
    let group=document.getElementById("ugroup").value;
    let question=document.getElementById("uquestion").value;
    let season=document.getElementById("useason").value;
    return("---\nlayout: usaco-post\ntitle: " + title +"\ntags: [\"USACO analysis\"]\nAuthor: [\"" + author + "\"]\nyear: " + year + "\ngroup: " + group + "\nseason: " + season + "\nquestion: " + question + "\n---");
}
function generateC(){
    let title=document.getElementById("ctitle").value;
    let author=document.getElementById("cauthor").value;
    let group=document.getElementById("cgroup").value;
    let question=document.getElementById("cquestion").value;
    return("---\nlayout: post\ntitle: " + title + "\ntags: [\"CodeForce\",\"Other-analysis\"]\nAuthor: [\""+ author + "\"]\ngroup: "+ group +"\nquestion: " + question + "\n---");
}
function generateO(){
    let title=document.getElementById("otitle").value;
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
function openFile(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    var node = document.getElementById('inFileContent');
    node.innerText = text;
  };
  reader.readAsText(input.files[0]);
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
function generateFile(yamlGenerator){
    let yamlHead = yamlGenerator();
    // Ugly implementation to get title, what if user enter value in USACO first then jump to Others?
    let title = document.getElementById("ctitle").value || document.getElementById("utitle").value || document.getElementById("otitle").value;
    let content = document.getElementById("inFileContent").innerText;
    let result = yamlHead + "\n" + content;
    if (encodeURIComponent(result).length > 65000){
        warning = document.createElement("div");
        warning.setAttribute("class", "error");
        warningHead = document.createElement("h2");
        warningHead.innerText = "⚠ File Size reach Maximum, Please check if the file is cropped";
        warningCont = document.createElement("p");
        warningCont.innerText = "The file size exceed 65000 after base64 compression, This indicates that the file may overflow with current URI Data protocal, please check the end of file in the preview window to see if the file is damaged.";
        warning.appendChild(warningHead);
        warning.appendChild(warningCont);
        document.getElementsByClassName("main-content")[0].appendChild(warning);
    }
    title = title.replaceAll("_", "-").replaceAll(" ", "-");
    console.log(title);
    document.getElementById("outPreview").innerText = result;
    download(title + ".md", result);
}