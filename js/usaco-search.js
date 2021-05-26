function usaco_selector(year) {
    if (year != "all"){
        let allBox = document.querySelectorAll("div.jsBox");
        for (let i=0; i < allBox.length; i ++){ allBox[i].style.display = "none"; }
        document.querySelector("#box" + year).style.display = "inherit";
    }
    else{
        let allBox = document.querySelectorAll("div.jsBox");
        for (let i=0; i < allBox.length; i ++){ allBox[i].style.display = "inherit"; }
    }
}

function usaco_group_selector(group) {
    console.log(group);
    if (group != "all"){
        let allCards = document.querySelectorAll("div.jsBox div.flex-page-card");
        for (let i=0; i < allCards.length; i ++){ allCards[i].style.display = "none"; }
        let selectCards = document.querySelectorAll("div.jsBox #" + group)
        for (let i=0; i < selectCards.length; i ++){ selectCards[i].style.display = "block"; }
    }
    else{
        let allCards = document.querySelectorAll("div.jsBox div.flex-page-card");
        for (let i=0; i < allCards.length; i ++){ allCards[i].style.display = "block"; }
    }
}