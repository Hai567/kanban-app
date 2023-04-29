var updateForm = document.querySelector("form#update-form")
let inputUpdateContent = document.querySelector("input#input-update-content")
document.querySelectorAll(".board-container .board-section .item p").forEach(function(event){
	event.ondblclick = function(){
		let givenValue = this.textContent
		let editingItem = document.createElement("div")
        editingItem.setAttribute("contenteditable", "true")
        editingItem.classList.add("editing-field")
		editingItem.textContent = givenValue
        editingItem.addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                editingItem.blur()
            }
        })
		editingItem.onblur = function(){
            // If Nothing Has Been Changed Or The Update Field Is Empty, Do Nothing
            if (editingItem.textContent === "" || editingItem.textContent === givenValue){
                    this.parentNode.innerHTML = givenValue;
            }
            // If User Changed Sth, Update It
            else{
                let updatedContent = this.textContent
                let updateItemStringedId = event.getAttribute("data-itemStringedID")
                updateForm.setAttribute("action", `/item/update/content/${updateItemStringedId}?_method=PATCH`)
                inputUpdateContent.value = updatedContent
                updateForm.submit()
            }
		}
		this.textContent = ""
		this.appendChild(editingItem)
		editingItem.focus()
	}
})