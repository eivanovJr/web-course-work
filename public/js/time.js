

window.onload = function () {
    var time = new Date(performance.timeOrigin);
    let curTime = new Date();
    let timer = document.getElementById("timer");
    timer.innerText = "client: " + (curTime - time).toString() + "ms";

    let navElements = document.getElementsByClassName("nav-element");
    for (let i = 0; i < navElements.length; i++) {
        if (navElements[i].href === window.location.href)
            navElements[i].classList.add("selected");
    }
}
