function usaco_selector(year) {
    let allBox = document.querySelectorAll("div.jsBox");

    // Reset all other buttons
    let allYearBtn = document.querySelectorAll("button[id^=btnYear]");
    for (let i=0; i < allYearBtn.length; i ++){
        allYearBtn[i].style.background = "rgb(243, 247, 255)";
        allYearBtn[i].style.color = "black";
    }

    if (year != "all"){
        let btn = document.getElementById("btnYear" + year);
        btn.style.background = "linear-gradient(to right, #1c63a5, #3a88d1)";
        btn.style.color = "ghostwhite";
        for (let i=0; i < allBox.length; i ++){ allBox[i].style.display = "none"; }
        document.querySelector("#box" + year).style.display = "inherit";
    }
    else{
        let btn = document.getElementById("btnYearAll");
        btn.style.background = "linear-gradient(to right, #1c63a5, #3a88d1)";
        btn.style.color = "ghostwhite";
        for (let i=0; i < allBox.length; i ++){ allBox[i].style.display = "inherit"; }
    }
}

function usaco_group_selector(group) {
    
    // Reset all other buttons
    let allYearBtn = document.querySelectorAll("button[id^=btnGroup]");
    for (let i=0; i < allYearBtn.length; i ++){
        allYearBtn[i].style.background = "rgb(243, 247, 255)";
        allYearBtn[i].style.color = "black";
    }

    if (group != "all"){
        console.log("btnGroup" + group);
        let btn = document.getElementById("btnGroup" + group);
        btn.style.background = "linear-gradient(to right, #1c63a5, #3a88d1)";
        btn.style.color = "ghostwhite";

        let allCards = document.querySelectorAll("div.jsBox div.flex-page-card");
        for (let i=0; i < allCards.length; i ++){ allCards[i].style.display = "none"; }
        let selectCards = document.querySelectorAll("div.jsBox #" + group)
        for (let i=0; i < selectCards.length; i ++){ selectCards[i].style.display = "block"; }
    }
    else{
        let btn = document.getElementById("btnGroupAll");
        btn.style.background = "linear-gradient(to right, #1c63a5, #3a88d1)";
        btn.style.color = "ghostwhite";

        let allCards = document.querySelectorAll("div.jsBox div.flex-page-card");
        for (let i=0; i < allCards.length; i ++){ allCards[i].style.display = "block"; }
    }
}