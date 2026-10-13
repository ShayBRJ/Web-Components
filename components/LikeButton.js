import styles from "../index.css" with { type: "css" };

class LikeButton extends HTMLElement {

  constructor () {
    super();
    const template = document.getElementById('tpl-like-button');
    this.attachShadow({mode : "open"})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.liked = false;
    this._especie = null;
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets.push(styles);
    const heartIcon = this.shadowRoot.querySelector(".casilla .heart-icon");
    const likesAmountLabel = this.shadowRoot.querySelector(".casilla .likes");
    
    heartIcon.addEventListener("click", () => {
  console.log("1. Se ha pulsado el corazón");

  heartIcon.classList.toggle("liked");

  let likeAmount = Number(likesAmountLabel.innerHTML);

  if (heartIcon.classList.contains("liked")) {
    likeAmount++;
    this.liked = true;
  } else {
    likeAmount--;
    this.liked = false;
  }

  likesAmountLabel.innerHTML = likeAmount;

  console.log("2. Voy a emitir like-update");

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
  disconnectedCallback() {}
  attributeChangedCallback(nombre, newval, oldval) {
    console.log(nombre)
    if(nombre === "valoracion" && newval !== oldval) {
      
    }

  };
  static get observedAttributes() {
    return [""];
  };

  set valoracion(valoracion) {
    this.shadowRoot.querySelector(".casilla .likes").innerHTML = Number(valoracion);
  }

  set especie(value) {
  this._especie = value;
}

get especie() {
  return this._especie;
}
};


window.customElements.define("like-button", LikeButton);