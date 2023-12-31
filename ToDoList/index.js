/**
 * 할일
 * - id
 * - label
 * - completed
 */
let todoList = [
    { id: 1, label: "Wake up", completed: false, midEdit: false }, 
    { id: 2, label: "Eat breakfast", completed: false, midEdit: false },
    { id: 3, label: "Go to school", completed: false, midEdit: false },  
];
const addTodo = (label) => {
    const todo = { 
        id: new Date().getTime(), //current time
        label, //<=> label: label
        completed: false, 
        midEdit: false
    };
    todoList = [...todoList, todo];
    return todo;
}

const editTodo = (targetId) => {
    const newTodoList = todoList.map((todo) => {
        if(todo.id === targetId) {
            return {...todo, midEdit: !todo.midEdit}
        } 
        return {...todo, midEdit: false}
    });
    todoList = newTodoList;
}

const setLabel = (targetId, newlabel) => {
    const newTodoList = todoList.map((todo) => {
        if(todo.id === targetId) {
            return {...todo, label: newlabel, midEdit: false}
        } 
        return todo
    });
    todoList = newTodoList;
}

const deleteTodo = (targetid) => {
    const newTodoList = todoList.filter(({ id }) => id !== targetid);
    todoList = newTodoList;
};

const completeTodo = (targetId) => {
    const newTodoList = todoList.map((todo) => {
        if(todo.id === targetId) {
            return {...todo, completed: !todo.completed}
        }
        return todo;
    });
    todoList = newTodoList;
}

const addButton = document.getElementById("add-action");
addButton.onclick = () => {
    const newTodo = addTodo("New Task");
    editTodo(newTodo.id);
    renderTodoList();
};

const renderTodo = ( todo ) => {
    const todoLabel = document.createElement("button");
    todoLabel.classList.add("todo-label", "action-complete");
    todoLabel.innerText = todo.label;

    // const completeButton = document.createElement("button");
    // completeButton.classList.add("todo-action");
    // completeButton.innerText = "✓";
    
    if(todo.completed) {
        todoLabel.style = "text-decoration: line-through; color: #d9d9d9";
        // completeButton.classList.add("inactive-action");
    } 
    
    todoLabel.onclick = () => {
        completeTodo(todo.id);
        renderTodoList();
    };
    
    const editButton = document.createElement("button");
    editButton.className = "todo-action";
    editButton.innerText = "✎";
    editButton.onclick = () => {
        editTodo(todo.id);
        renderTodoList();
    }
    
    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-action";
    deleteButton.innerText = "🗑";
    deleteButton.onclick = () => {
        deleteTodo(todo.id);
        renderTodoList();
    };

    const todoActionWrapper = document.createElement("div");
    todoActionWrapper.className = "todo-action-wrapper";
    // todoActionWrapper.appendChild(completeButton);
    todoActionWrapper.appendChild(editButton);
    todoActionWrapper.appendChild(deleteButton);

    const todoWrapper = document.createElement("div");
    todoWrapper.className = "todo-wrapper";
    todoWrapper.appendChild(todoLabel); 
    // todoWrapper.addEventListener('mouseover', function () {
    //     todoWrapper.appendChild(todoActionWrapper);
    // })
    // todoWrapper.addEventListener('mouseout', function () {
    //     todoWrapper.removeChild(todoActionWrapper);
    // })
    todoWrapper.appendChild(todoActionWrapper);

    const content = document.getElementById("content");
    content.appendChild(todoWrapper);

    if(todo.midEdit) {
        content.removeChild(todoWrapper);
        getTodoInput(todo);
    }
};

const getTodoInput = ( todo ) => {
    const todoInput = document.createElement("input");
    todoInput.setAttribute("type", "text");
    todoInput.className = "todo-input";
    
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("todo-action", "action-confirm");
    confirmButton.innerText = "✓";
    todoInput.value = todo.label;
    
    confirmButton.onclick = () => { 
        setLabel(todo.id, todoInput.value);
        renderTodoList();
    }
    
    const cancelButton = document.createElement("button");
    cancelButton.className = "todo-action";
    cancelButton.innerText = "🛇";
    cancelButton.onclick = () => {
        editTodo(todo.id);
        renderTodoList();
    }
    
    const newTodoActionWrapper = document.createElement("div");
    newTodoActionWrapper.className = "todo-action-wrapper";
    newTodoActionWrapper.appendChild(confirmButton); 
    newTodoActionWrapper.appendChild(cancelButton);

    const newTodoWrapper = document.createElement("div");
    newTodoWrapper.className = "todo-wrapper";
    newTodoWrapper.appendChild(todoInput); 
    newTodoWrapper.appendChild(newTodoActionWrapper); 

    const content = document.getElementById("content");
    content.appendChild(newTodoWrapper);
}

const renderTodoList = () => {
    const content = document.getElementById("content");
    content.innerHTML = "";
    todoList.forEach((todo) => {
        renderTodo(todo);
    });
};

renderTodoList();
