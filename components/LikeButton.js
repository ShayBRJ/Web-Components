import styles from "../index.css" with { type: "css" };

class LikeButton extends HTMLElement {
  // Método constructor de LikeButton.
  constructor () {
    super();
    const template = document.getElementById('tpl-like-button');
    this.attachShadow({mode : "open"})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._liked = false;
    this._especie = null;
  }
   // Una ves se incluya al DOM principal.
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets.push(styles);
    const heartIcon = this.shadowRoot.querySelector(".casilla .heart-icon");
    const likesAmountLabel = this.shadowRoot.querySelector(".casilla .likes");

    heartIcon.addEventListener("click", () => {
      this._liked = !this._liked;
      heartIcon.classList.toggle("liked", this._liked);
      let likeAmount = Number(likesAmountLabel.innerHTML);

      if (heartIcon.classList.contains("liked")) {
        likeAmount++;
        this._liked = true;

      } else {
        likeAmount--;
        this._liked = false;
      }

      likesAmountLabel.innerHTML = likeAmount;
      this.dispatchEvent(new CustomEvent("like-update", {
        detail: {
          liked: this.liked,
          likeAmount: likeAmount,
          especie: this._especie
        },
        bubbles: true,
        composed: true
      }));
    });
  }

  // En caso de descoplarse del DOM.
  disconnectedCallback() {}


  attributeChangedCallback(nombre, newval, oldval) {};


  static get observedAttributes() {
    return [""];
  };

  // SETTERS de los atributos.
  set valoracion(valoracion) {
    this.shadowRoot.querySelector(".casilla .likes").innerHTML = Number(valoracion);
  }


  set especie(value) {
  this._especie = value;
  }


  set liked(value) {
    this._liked = Boolean(value);
    const heartIcon = this.shadowRoot.querySelector(".heart-icon");

    if (heartIcon) {
      heartIcon.classList.toggle("liked", this._liked);
    }

  }

  // GETTERS de los atributos.
  get liked() {
    return this._liked;
  }


  get especie() {
    return this._especie;
  }
};


window.customElements.define("like-button", LikeButton);