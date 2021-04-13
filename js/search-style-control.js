function addAnimationDelay(){
    box = document.getElementById("results-container");
    showSuccess = document.createElement("li");
    showSuccess.innerHTML = "Successfully Load Database";
    showSuccess.style.animation = "0.3s ease-in 0s 1 fadeIn, empty 5s infinite, 2s ease-out 0.5s 1 forwards fadeOut";
    showSuccess.style.color = "rgb(76, 165, 76)";
    box.appendChild(showSuccess);
}

