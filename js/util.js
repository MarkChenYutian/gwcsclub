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
    if (encodeURIComponent(text).length > 65000){
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
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
function deselect(target){
  target.style.background = "white";
  target.style.color = "#333c3d";
}
function select(target){
    target.style.background = "no-repeat linear-gradient(to left, #3398aa 0%, #005766 100%)";
    target.style.color = "ghostwhite";
}