class InformationTodoList {
  constructor(title) {
    this.titlee = title;
    this.saved = false;
  }
}

class Todolists {
  constructor(boxTodolist) {
    this.containerTodolist = boxTodolist;
    this.arreyTodoList = JSON.parse(localStorage.getItem("todos")) || [];
    this.todoInputElement = document.querySelector("input");
    this.buttonAddTodoList = document.querySelector("#addButton");
    this.buttonClearAllTodolist = document.querySelector("#clearButton");
    this.render();
  }

  render() {
    window.addEventListener("load", (event) => {
      this.todoInputElement.focus();
    });
    this.containerTodolist.innerHTML = "";

    this.buttonAddTodoList.addEventListener("click", () => {
      this.addTodoList(this.todoInputElement.value);
    });

    this.todoInputElement.addEventListener("keypress", (event) => {
      if (event.code === "Enter") {
        this.addTodoList(this.todoInputElement.value);
      }
    });

    this.buttonClearAllTodolist.addEventListener("click", () => {
      this.clearAllTodoList();
    });

    this.newAddTodoListDom();
    this.saveTodoListLocalStorage();
  }

  newAddTodoListDom() {
    this.containerTodolist.innerHTML = "";
    this.arreyTodoList.forEach((keyArrey, todoIndex) => {
      let elementLi = document.createElement("li");
      elementLi.className = "completed well";

      let elementLabel = document.createElement("label");
      elementLabel.innerHTML = keyArrey.titlee;
      if (keyArrey.saved) {
        elementLabel.classList.add("todo-completed");
      } else {
        null;
      }

      let elementButton = document.createElement("button");
      elementButton.className = "btn btn-success";
      elementButton.innerHTML = "Complete";
      elementButton.addEventListener("click", (event) => {
        event.target.previousSibling.classList.toggle("todo-completed");
        keyArrey.saved = !keyArrey.saved;
        this.saveTodoListLocalStorage();
        this.newAddTodoListDom();
      });

      let elementButton1 = document.createElement("button");
      elementButton1.className = "btn btn-danger";
      elementButton1.innerHTML = "remove";
      elementButton1.addEventListener("click", () => {
        this.containerTodolist.removeChild(elementLi);
        let mainTodoIndex = this.arreyTodoList.findIndex(
          (todo, index) => index === todoIndex
        );
        console.log(mainTodoIndex);
        this.arreyTodoList.splice(mainTodoIndex, 1);
        this.saveTodoListLocalStorage();
        this.newAddTodoListDom();
      });

      elementLi.append(elementLabel, elementButton, elementButton1);
      this.containerTodolist.append(elementLi);
    });
  }

  addTodoList(newTodoListTitle) {
    if (newTodoListTitle.trim()) {
      this.arreyTodoList.push(new InformationTodoList(newTodoListTitle));
      this.saveTodoListLocalStorage();
      this.newAddTodoListDom();
      this.todoInputElement.value = "";
    }
  }

  clearAllTodoList() {
    this.arreyTodoList = [];
    this.render();
    this.saveTodoListLocalStorage();
  }

  saveTodoListLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.arreyTodoList));
  }
}

new Todolists(document.querySelector("#todoList"));
