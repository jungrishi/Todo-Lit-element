import { LitElement, html } from "lit-element";
import store from "../redux/store";
import { Visibilityfilters } from "../redux/reducer/reducer";
import {
  addTodo,
  updateTodoStatus,
  updateFilter,
  clearCompleted,
} from "../redux/action";

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

    store.subscribe(() => {
      let data = store.getState();
      console.log(data);
      this.todos = data.todos.todos;
      this.filter = data.todos.filter;
    });
  }

  addTodo() {
    if (this.item.trim().length > 1) {
      store.dispatch(addTodo(this.item));
      this.item = "";
    }
  }

  inputHandler(e) {
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
  /**
   *
   * @param {Number} id
   * @param {Boolean} complete checked value
   */
  updateTodoStatus(id, complete) {
    store.dispatch(updateTodoStatus(id, complete));
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.target.value));
  }

  applyFilter(todos) {
    switch (this.filter) {
      case Visibilityfilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.isCompleted);
      case Visibilityfilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.isCompleted);
      default:
        return todos;
    }
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }

  render() {
    return html`
      <div class="input-layout" @keyup="${this.eListener}">
      <input type="text" placeholder="Add TODO" .value="${this.item ||
        ""}" @input="${this.inputHandler}"></input>
      <button type="submit" @click ="${this.addTodo}" >Submit</button>
    </div>

    <ul class="todos-list">
      ${this.applyFilter(this.todos).map(
        todo => html`
          <li class="todo-item">
            <input type="checkbox"
            @change="${e => {
              this.updateTodoStatus(todo.id, e.target.checked);
            }}"            
            ?checked="${todo.isCompleted}">
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
