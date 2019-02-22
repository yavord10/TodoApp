var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos = [];
        var todoTextInput = document.getElementById('todoTextInput');
        todoText = todoTextInput.value;
        if (todoTextInput.value === '') {
            alert('Please write something!')
        } else {
            this.todos.push({
                todoText: todoText,
                completed: false
            });
        }
        view.displayTodos();
        todoTextInput.value = "";
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        view.displayTodos();
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
        view.displayTodos();
    },
    toggleComplete: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    }
};


var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li');
            var todoText = document.createElement('p');
            var todo = todoList.todos[i];
            var todoTextWithCompletion = todo.todoText;

            todoLi.id = i;
            todoText.textContent = todoTextWithCompletion;
            todoLi.appendChild(todoText);
            todoLi.appendChild(this.createDeleteButton());
            todoLi.appendChild(this.createChangeButton());
            todoLi.appendChild(this.createToggleButton());
            todosUl.appendChild(todoLi);
        }
    },
    
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        var deleteIcon = document.createElement('i');
        deleteIcon.className = "fas fa-trash";
        deleteButton.className = 'deleteButton btn-danger';
        deleteButton.appendChild(deleteIcon);
        return deleteButton;
    },
    createToggleButton: function() {
        var toggleButton = document.createElement('button');
        var toggleIcon = document.createElement('i');
        toggleIcon.className = "fas fa-check";
        toggleButton.className = 'toggleButton btn-success';
        toggleButton.appendChild(toggleIcon);
        return toggleButton;
    },
    createChangeButton: function() {
        var changeButton = document.createElement('button');
        var changeIcon = document.createElement('i');
        changeIcon.className = "fas fa-edit";
        changeButton.className = 'changeButton btn-warning';
        changeButton.appendChild(changeIcon);
        return changeButton;
    }, 
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;
        
            if (elementClicked.className === 'deleteButton btn-danger') {
                elementClicked.parentNode.parentNode.removeChild(elementClicked.parentNode);
            }   
             
            if (elementClicked.className === 'toggleButton btn-success') {
                elementClicked.parentNode.classList.toggle('checked');
                todoList.toggleComplete(parsenint(elementClicked.parentNode.id));

            }

            if (elementClicked.className === 'changeButton btn-warning') {
                var retVal = prompt("Enter changed todo here: ", "text");
                elementClicked.parentNode.children[0].textContent = retVal;
            }
        });
    }    
};

view.setUpEventListeners();