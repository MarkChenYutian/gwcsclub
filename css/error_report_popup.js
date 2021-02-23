function showErrorReport(){
    let background = document.getElementById("popup_01");
    let window = document.getElementById("popup_02");
    background.style.display = "";
    window.style.display = "";
}

function hideErrorReport(){
    let background = document.getElementById("popup_01");
    let window = document.getElementById("popup_02");
    background.style.display = "none";
    window.style.display = "none";
}