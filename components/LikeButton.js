import styles from "../index.css" with { type: "css" };

class LikeButton extends HTMLElement {
  // Método constructor de LikeButton.
  constructor () {
    super();
    // Obtenemos la plantilla HTML del componente.
    const template = document.getElementById('tpl-like-button');
    // Creamos el Shadow DOM para encapsular el contenido del componente.
    this.attachShadow({mode : "open"})
    // Clonamos la plantilla y la añadimos al Shadow DOM.
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // Inicializamos el estado del like como desactivado.
    this._liked = false;
    // Inicializamos la especie asociada al botón.
    this._especie = null;
  }

  // Una vez se incluya en el DOM principal.
  connectedCallback() {
    // Aplicamos los estilos CSS al Shadow DOM.
    this.shadowRoot.adoptedStyleSheets.push(styles);
    // Obtenemos el icono del corazón y la etiqueta con el número de likes.
    const heartIcon = this.shadowRoot.querySelector(".casilla .heart-icon");
    const likesAmountLabel = this.shadowRoot.querySelector(".casilla .likes");

    // Añadimos un evento para detectar los clics sobre el corazón.
    heartIcon.addEventListener("click", () => {
      // Cambiamos el estado del like al contrario del estado actual.
      this._liked = !this._liked;
      // Activamos o desactivamos la clase CSS según el estado del like.
      heartIcon.classList.toggle("liked", this._liked);
      // Obtenemos el número actual de likes.
      let likeAmount = Number(likesAmountLabel.innerHTML);

      // Si el like está activado, incrementamos el contador.
      if (heartIcon.classList.contains("liked")) {
        likeAmount++;
        this._liked = true;

      // Si el like está desactivado, decrementamos el contador.
      } else {
        likeAmount--;
        this._liked = false;
      }

      // Actualizamos el número de likes mostrado en pantalla.
      likesAmountLabel.innerHTML = likeAmount;

      // Lanzamos un evento personalizado para comunicar el cambio del like.
      this.dispatchEvent(new CustomEvent("like-update", {
        // Enviamos el estado del like, el contador y la especie asociada.
        detail: {
          liked: this.liked,
          likeAmount: likeAmount,
          especie: this._especie
        },
        // Permitimos que el evento se propague por el DOM.
        bubbles: true,
        // Permitimos que el evento atraviese los límites del Shadow DOM.
        composed: true
      }));
    });
  }

  // En caso de desacoplarse del DOM.
  disconnectedCallback() {}


  // Se ejecutaría cuando cambie alguno de los atributos observados.
  attributeChangedCallback(nombre, newval, oldval) {};


  // Indicamos los atributos que queremos observar en el componente.
  static get observedAttributes() {
    return [""];
  };

  // SETTERS de los atributos.
  // Actualizamos el número de likes mostrado en el componente.
  set valoracion(valoracion) {
    this.shadowRoot.querySelector(".casilla .likes").innerHTML = Number(valoracion);
  }

  // Asociamos una especie al componente.
  set especie(value) {
    this._especie = value;
  }

  // Actualizamos el estado del like y su apariencia visual.
  set liked(value) {
    this._liked = Boolean(value);
    const heartIcon = this.shadowRoot.querySelector(".heart-icon");

    // Aplicamos la clase CSS si el elemento existe.
    if (heartIcon) {
      heartIcon.classList.toggle("liked", this._liked);
    }
  }

  // GETTERS de los atributos.
  // Devolvemos el estado actual del like.
  get liked() {
    return this._liked;
  }

  // Devolvemos la especie asociada al componente.
  get especie() {
    return this._especie;
  }
};


window.customElements.define("like-button", LikeButton);