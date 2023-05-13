let items = document.querySelectorAll("div.item")
let boardSections = document.querySelectorAll("div.board-section")
var updateForm = document.querySelector("form#update-form")
let inputUpdateSection = document.querySelector("input#input-update-section")

items.forEach(item => {
    item.addEventListener("dragstart", (event) => {
            event.stopPropagation()
            item.classList.add("dragging")
    })

    item.addEventListener("dragend", (event) => {
            event.stopPropagation()
            item.classList.remove("dragging")
    })
})


boardSections.forEach(boardSection => {
    boardSection.addEventListener("dragover", (event) => {
        event.stopPropagation()
        let draggingItem = document.querySelector(".dragging")
        boardSection.appendChild(draggingItem)
        draggingItem.addEventListener("dragend", (event) => {
            event.stopPropagation()
            var updatedSection = ""
            let updateItemStringedID = draggingItem.children[0].getAttribute("data-itemStringedID")
            let updateUserStringedID = draggingItem.children[0].getAttribute("data-userStringedID")
            let updateKanbanStringedID = draggingItem.children[0].getAttribute("data-kanbanStringedID")
            if (boardSection.classList.contains("todo-section")){
                updatedSection = "todo"
            }
            if (boardSection.classList.contains("in-progress-section")){
                updatedSection = "inProgress"
            }
            if (boardSection.classList.contains("done-section")){
                updatedSection = "done"
            }
            console.log(updatedSection)
            updateForm.setAttribute("action", `/user/${updateUserStringedID}/kanban/${updateKanbanStringedID}/item/update/section/${updateItemStringedID}?_method=PATCH`)
            inputUpdateSection.value = updatedSection
            updateForm.submit()
        })
    })
})