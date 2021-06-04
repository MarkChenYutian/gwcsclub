function selectPython() {
    let pyButton = document.getElementById("pySelector");
    let javaButton = document.getElementById("javaSelector");

    /* Python Button Selected */
    pyButton.style.backgroundColor = "#015d9b";
    pyButton.style.color = "ghostwhite";

    /* Java Button Deselected */
    javaButton.style.backgroundColor = "rgb(243, 247, 255)";
    javaButton.style.color = "black";

    /* Show all the Python Code Block */
    let pyCodeBlocks = document.getElementsByClassName("python")
    for (let i = 0; i < pyCodeBlocks.length; i ++){
        pyCodeBlocks[i].style.display="";
    }

    /* Hide all the Java Code Block */
    let javaCodeBlocks = document.getElementsByClassName("java")
    for (let i = 0; i < javaCodeBlocks.length; i ++){
        javaCodeBlocks[i].style.display="none";
    }
}

function selectJava(){
    let pyButton = document.getElementById("pySelector");
    let javaButton = document.getElementById("javaSelector");

    /* Python Button Deselected */
    pyButton.style.backgroundColor = "rgb(243, 247, 255)";
    pyButton.style.color = "black";

    /* Java Button Selected */
    javaButton.style.backgroundColor = "#015d9b";
    javaButton.style.color = "ghostwhite";

    /* Hide all the Python Code Block */
    let pyCodeBlocks = document.getElementsByClassName("python")
    for (let i = 0; i < pyCodeBlocks.length; i ++){
        pyCodeBlocks[i].style.display="none";
    }

    /* Show all the Java Code Block */
    let javaCodeBlocks = document.getElementsByClassName("java")
    for (let i = 0; i < javaCodeBlocks.length; i ++){
        javaCodeBlocks[i].style.display="";
    }
}