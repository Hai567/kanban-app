let updateForm = document.querySelector("form#update-form")
let inputUpdateContent = document.querySelector("input#input-update-content")
document.querySelectorAll(".board-container .board-section .item p").forEach(function(event){
	event.ondblclick = function(){
		let givenValue = this.textContent
		let editingItem = document.createElement("div")
        editingItem.setAttribute("contenteditable", "true")
        editingItem.classList.add("editing-field")
		editingItem.textContent = givenValue
		this.textContent = ""
		this.appendChild(editingItem)
		editingItem.focus()
        editingItem.addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                editingItem.blur()
            }
        })
		editingItem.onblur = function(){
            // If User Changed Sth, Update It
            if (editingItem.textContent != ""){
                let updatedContent = this.textContent
                let updateItemStringedId = event.getAttribute("data-itemStringedID")
                this.parentNode.textContent = updatedContent
                updateForm.setAttribute("action", `/item/update/${updateItemStringedId}?_method=PUT`)
                inputUpdateContent.value = updatedContent
                updateForm.submit()
            }
            //
            // If Nothing Has Been Changed Or The Update Field Is Empty, Do Nothing
            else{
                editingItem.textContent = givenValue
            }
		}
	}
})