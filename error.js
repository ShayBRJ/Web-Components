import styles from "./index.css" with { type: "css"};

// ATRIBUTOS CONSTANTES DE PROPIEDADES POR DEFECTO.
const DEFAULT_VALUE = "400";

class Error extends HTMLElement {
  constructor () {
    super();
    console.log("Creado: Se ha creado un elemento Error");
    // Se crea un Shadow DOM activado en el DOM principal.
    this.attachShadow({mode: "open"}); 
  }

  connectedCallback() {
    console.log("Adjuntado: Adjuntando el Web Component al DOM principal.");
    this.render();
  }

  disconnectedCallback() {
    console.log("Se ha desacoplado el elemento del DOM principal.")
  }

  attributeChangedCallback(attr, new_value, old_value) {
    console.log("Atributo modificado.");
    if (attr === "error-id" && old_value !== new_value) {
      // Obtenemos el valor del atributo del props con identificador name.
      this.error_id = this.getAttribute("error-id"); 
      this.render();
    }
  }

  static get observedAttributes() {
    return ['error-id'];
  }

  render() {
  this.shadowRoot.replaceChildren();

  const container = document.createElement("div");
  container.classList.add("error");

  const img = document.createElement("img");
  img.src = "./error.png";
  img.alt = "icono de error";

  const h1 = document.createElement("h1");
  h1.textContent = "¡Ha surgido un problema!";

  const p = document.createElement("p");
  p.innerHTML = `
    ERROR ${this.error_id ?? DEFAULT_VALUE}: 
    El servidor no responde. Pruebe mas tarde.
  `;

  container.appendChild(img);
  container.appendChild(h1);
  container.appendChild(p);

  this.shadowRoot.appendChild(container);

  this.shadowRoot.adoptedStyleSheets = [styles];
}

  HTMLrender() {
    // Incorporamos la estructura de la etiqueta con Template String
    this.innerHTML = `
      <div class=error>
        <img src="./error.png" alt="icono de error">
        <h1>¡Ha surgido un problema!</h1>
        <p>ERROR ${this.error_id ?? DEFAULT_VALUE}: No se ha podido establecer la comunicación con el <strong> servidor </strong>. Prueba a intentarlo más adelante.</p>
      </div>
      `;
  }

}
// Asociamos el elemento con una etiqueta HTML.
// customElements.define("error-box", Error)
window.customElements.define('error-box' , Error);