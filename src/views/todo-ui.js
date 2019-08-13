import { LitElement, html } from "lit-element";

class TodoUi extends LitElement {
  render() {
    return html`
      <div class="input-layout">
        <input type="text" placeholder="Add TODO" value="${value}"></input>
        <button type="submit" >Submit</button>
      </div>
    `;
  }
}

customElements.define("todo-ui", TodoUi);
