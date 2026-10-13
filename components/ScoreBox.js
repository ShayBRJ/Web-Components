import styles from '../index.css' with {type : "css"};
class ScoreBox extends HTMLElement {

  constructor(){
    super();
    const template = document.getElementById('tpl-score-box');
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  disconnectedCallback() {}

  attributeChangedCallback(nombre, newval, oldval){
    this._puntuacion(oldval)

  }

  static get observedAttributes() {
    return ['score']
  }
  _puntuacion(value) {
  const amount = this.shadowRoot.querySelector(".amount");

  if (amount) {
    amount.textContent = Number(value);
  }
}

}

window.customElements.define('score-box', ScoreBox);