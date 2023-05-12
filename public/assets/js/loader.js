document.onreadystatechange = function() {
    if (document.readyState != "complete") {
        document.querySelector("#container-all").classList.add("none-display")
        document.querySelector("#loader").classList.remove("none-display")
    } else {
        document.querySelector("#loader").classList.add("none-display")
        document.querySelector("#container-all").classList.remove("none-display")
    }
}