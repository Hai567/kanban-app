let passwordField = document.querySelector("input[name='password']")
let rePasswordField = document.querySelector("input[name='rePassword']")
let submitButton = document.querySelector("button[type='submit']")
let passwordInstruction = document.querySelector("div.instruction p")

rePasswordField.addEventListener("blur", function(event){
    if (passwordField.value.length > 3 && rePasswordField.value.length > 3 && passwordField.value === rePasswordField.value){
        submitButton.classList.remove("disabled-button")
        submitButton.removeAttribute("disabled")
        passwordInstruction.classList.add("none-display")
    }else{
        submitButton.classList.add("disabled-button")
        submitButton.setAttribute("disabled", "")
        passwordInstruction.classList.remove("none-display")
    }
})
passwordField.addEventListener("blur", function(event){
    if (passwordField.value.length > 3 && rePasswordField.value.length > 3 && passwordField.value === rePasswordField.value){
        submitButton.classList.remove("disabled-button")
        submitButton.removeAttribute("disabled")
        passwordInstruction.classList.add("none-display")
    }else{
        submitButton.classList.add("disabled-button")
        submitButton.setAttribute("disabled", "")
        passwordInstruction.classList.remove("none-display")
    }
})
passwordField.addEventListener("keyup", function(event){
    if (passwordField.value.length > 3 && rePasswordField.value.length > 3 && passwordField.value === rePasswordField.value){
        submitButton.classList.remove("disabled-button")
        submitButton.removeAttribute("disabled")
        passwordInstruction.classList.add("none-display")
    }else{
        submitButton.classList.add("disabled-button")
        submitButton.setAttribute("disabled", "")
        passwordInstruction.classList.remove("none-display")
    }
})
rePasswordField.addEventListener("keyup", function(event){
    if (passwordField.value.length > 3 && rePasswordField.value.length > 3 && passwordField.value === rePasswordField.value){
        submitButton.classList.remove("disabled-button")
        submitButton.removeAttribute("disabled")
        passwordInstruction.classList.add("none-display")
    }else{
        submitButton.classList.add("disabled-button")
        submitButton.setAttribute("disabled", "")
        passwordInstruction.classList.remove("none-display")
    }
})
