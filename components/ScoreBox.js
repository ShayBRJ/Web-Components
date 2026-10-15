import styles from '../index.css' with {type : "css"};
class ScoreBox extends HTMLElement {

  constructor(){
    super();
    // Obtenemos la plantilla HTML del componente.
    const template = document.getElementById('tpl-score-box');
    // Creamos el Shadow DOM para encapsular el contenido del componente.
    this.attachShadow({mode: 'open'})
    // Clonamos la plantilla y la añadimos al Shadow DOM.
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Una vez se incluya en el DOM principal.
  connectedCallback() {
    // Aplicamos los estilos CSS al Shadow DOM.
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  // En caso de desacoplarse del DOM.
  disconnectedCallback() {}

  // Se ejecutaría cuando cambie alguno de los atributos observados.
  attributeChangedCallback(nombre, newval, oldval){
    // Actualizamos la puntuación mostrada con el valor anterior del atributo.
    this._puntuacion(oldval)

  }

  // Indicamos los atributos que queremos observar en el componente.
  static get observedAttributes() {
    return ['score']
  }
  // Método interno para actualizar la puntuación mostrada en el componente.
  _puntuacion(value) {
  // Obtenemos el elemento donde se muestra la cantidad.
  const amount = this.shadowRoot.querySelector(".amount");

  // Si el elemento existe, actualizamos su contenido con el valor numérico.
  if (amount) {
    amount.textContent = Number(value);
  }
}

}

window.customElements.define('score-box', ScoreBox);