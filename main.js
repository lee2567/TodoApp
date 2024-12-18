const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(), 
        text: "", 
        complete: false
    }


//배열 처음에 새로운 아이템을 추가
    todos.unshift(item);

//요소 생성하기
    const { itemEl, inputEl } = createTodoElement(item);

//리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl);

    inputEl.removeAttribute("disabled");

    inputEl.focus();

    saveToLocalStorage();
}


function createTodoElement(item){
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("material-icons");
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("icons", "remove-btn");
    removeBtnEl.innerText = "circle";

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkbox);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    



    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if(item.complete) {
            itemEl.classList.add("complete");
        } else {
            itemEl.classList.remove("complete");
        }

        saveToLocalStorage();
    });

    inputEl.addEventListener("input", () => {
        item.text = inputEl.value;
    });

    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");

        saveToLocalStorage();
    });

    editBtnEl.addEventListener("click", () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
        
    });

    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);
        itemEl.remove();

        saveToLocalStorage();
    });

    return { itemEl, inputEl, editBtnEl, removeBtnEl }
}
    



function displayTodos() {
    loadFromLocalStorage();
    
    for(let i = 0; i < todos.length; i++) {
        const item = todos[i];

        const { itemEl } = createTodoElement(item);
        
        list.append(itemEl);
    }
}

displayTodos();

function saveToLocalStorage() {
    const data = JSON.stringify(todos);

    localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("my_todos");

    if(data) {
        todos = JSON.parse(data);
    }
}