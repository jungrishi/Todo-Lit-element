import { LitElement, html } from "lit-element";

const Visibilityfilters = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

class TodoView extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      item: { type: String },
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.filter = Visibilityfilters.SHOW_ALL;
    this.item = "";
  }

  addTodo() {
    if (this.item) {
      this.todos = [
        ...this.todos,
        {
          item: this.item,
          complete: false,
        },
      ];
      this.item = "";
    }
  }

  updateTodo(e) {
    this.item = e.target.value;
  }

  submit(e) {
    console.log(e);
    e.preventDefault();
  }

  eListener(e) {
    if (e.key === "Enter") {
      this.addTodo();
    }
  }

  updateTodoStatus(updatedTodo, complete) {
    let filteredTodo = this.todos.map(todo => {
      return todo === updatedTodo ? { ...todo, complete } : todo;
    });
    this.todos = filteredTodo;
  }

  filterChanged(e) {
    console.log(e.target.checked);
    this.filter = e.target.value;
  }

  applyFilter(todos) {
    console.log(this.filter);
    switch (this.filter) {
      case Visibilityfilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      case Visibilityfilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.complete);
  }

  render() {
    return html`
      <div class="input-layout" @keyup="${this.eListener}">
      <input type="text" placeholder="Add TODO" .value="${this.item ||
        ""}" @input="${this.updateTodo}"></input>
      <button type="submit" @click ="${this.addTodo}" >Submit</button>
    </div>

    <ul class="todos-list">
      ${this.applyFilter(this.todos).map(
        todo => html`
          <li class="todo-item">
            <input type="checkbox"
            @change="${e =>
              this.updateTodoStatus(todo, e.target.checked)}"            
            ?checked="${todo.complete}">
            ${todo.item}
          </input>
          </li>
        `
      )}
      </ul>
      <form class="visibility-filter" value=${this.filter} 
      @change=${this.filterChanged}>
      ${Object.values(Visibilityfilters).map(
        filter => html`
        <input type="radio" name="filter" value=${filter}>${filter}</input>
      `
      )}  
      </form>

      <button type="submit" @click="${this.clearCompleted}">
        Clear Completeds
      </button>
    `;
  }
}

customElements.define("todo-view", TodoView);
