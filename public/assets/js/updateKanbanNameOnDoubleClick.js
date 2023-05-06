var updateForm = document.querySelector("form#update-form")
let inputUpdateKanbanName = document.querySelector("input#input-update-kanban-name")
let userStringedID = document.querySelector("h2.heading-kanban-name").getAttribute("data-userStringedID")
let kanbanStringedID = document.querySelector("h2.heading-kanban-name").getAttribute("data-kanbanStringedID")

// Update Kanban
document.querySelector("h2.heading-kanban-name").ondblclick = function(event){
    let givenKanbanName = this.textContent
    let editingItem = document.createElement("div")
    editingItem.setAttribute("contenteditable", "true")
    editingItem.classList.add("editing-field")
    editingItem.textContent = givenKanbanName
    editingItem.addEventListener("keypress", function(event){
        if (event.key === "Enter"){
            editingItem.blur()
        }
    })
    editingItem.onblur = function(){
        // If Nothing Has Been Changed Or The Update Field Is Empty, Do Nothing
        if (editingItem.textContent === "" || editingItem.textContent === givenKanbanName){
                this.parentNode.innerHTML = givenKanbanName;
        }
        // If User Changed Sth, Update It
        else{
            let updatedKanbanName = this.textContent
            updateForm.setAttribute("action", `/user/${userStringedID}/kanban/${kanbanStringedID}/update/name?_method=PATCH`)
            inputUpdateKanbanName.value = updatedKanbanName
            updateForm.submit()
        }
    }
    this.textContent = ""
    this.appendChild(editingItem)
    editingItem.focus()
}

// Update Item
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
                let itemStringedID = event.getAttribute("data-itemStringedID")
                updateForm.setAttribute("action", `/user/${userStringedID}/kanban/${kanbanStringedID}/item/update/content/${itemStringedID}?_method=PATCH`)
                inputUpdateContent.value = updatedContent
                updateForm.submit()
            }
		}
		this.textContent = ""
		this.appendChild(editingItem)
		editingItem.focus()
	}
})