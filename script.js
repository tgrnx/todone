var todoList = {
	todo:[],
	addTodo:function(newItem){
		this.todo.push({
			todoText : newItem.value,
			todoCompleted : false
		});
	},
	changeTodo:function(position,newItem){
		this.todo[position].todoText = newItem;
	},
	toggleCompleted:function(position){
		this.todo[position].todoCompleted = !this.todo[position].todoCompleted;
	},
	toggleAll:function(){
		var completed = 0;
		var totalTodos = this.todo.length;

		for(var i=0;i<totalTodos;i++){
			if(this.todo[i].todoCompleted===true) completed++;
		}
		for(var i=0;i<totalTodos;i++){
			if(totalTodos === completed ){
				this.todo[i].todoCompleted = false;
			}else{
				this.todo[i].todoCompleted = true;
			}			
		}
	},
	deleteItem:function(position){
		this.todo.splice(position,1);
		view.displayTodos();
	}
};

var handlers = {
	addTodo:function(){
		var newItem = document.getElementById("newTodo");
		todoList.addTodo(newItem);
		view.displayTodos();
	},
	changeTodo:function(){
		var changePosition = document.getElementById("changePosition").valueAsNumber;
		var changeText = document.getElementById("changeText").value;
		todoList.changeTodo(changePosition,changeText);
		view.displayTodos();
	},
	toggleCompleted:function(){
		var togglePosition = document.getElementById("toggleCompleted").valueAsNumber;
		todoList.toggleCompleted(togglePosition);
		view.displayTodos();
	},
	toggleAll:function(){
		todoList.toggleAll();
		view.displayTodos();
	}
};

var view = {
	displayTodos:function(){
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML='';
		for(var i=0;i<todoList.todo.length;i++){
			var todosLi = document.createElement('li');
			var todosLine ='';
			
			if(todoList.todo[i].todoCompleted === true){
				todosLine = "(X) "+todoList.todo[i].todoText;
			}else{
				todosLine = "( ) "+todoList.todo[i].todoText;
			}
			todosLi.id=i;
			todosLi.textContent = todosLine;
			todosLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todosLi);	
		}

	},
	createDeleteButton:function(){
		var deleteButton = document.createElement('button');
		deleteButton.className="deleteButton";
		deleteButton.textContent = 'Delete';
		return deleteButton;
	},
	setEventListener:function(){
		var todosUl = document.querySelector('ul');
		todosUl.addEventListener('click',function(event){
			if(event.target.className === 'deleteButton'){
				todoList.deleteItem(parseInt(event.target.parentNode.id));				
			}

		})
	}
};

view.setEventListener();

