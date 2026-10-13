import styles from "../index.css" with { type: "css" };

class LikeButton extends HTMLElement {

  constructor () {
    super();
    const template = document.getElementById('tpl-like-button');
    this.attachShadow({mode : "open"})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    let likeAmount = 0;
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets.push(styles);
    const heartIcon = this.shadowRoot.querySelector(".casilla .heart-icon");
    const likesAmountLabel = this.shadowRoot.querySelector(".casilla .likes");
    
    heartIcon.addEventListener("click", () => {
      heartIcon.classList.toggle("liked");
      let likeAmount = Number(likesAmountLabel.innerHTML);
      console.log(likeAmount)
      if(heartIcon.classList.contains("liked")) {
        likeAmount++
      }
      else {
        likeAmount--;
      }
      likesAmountLabel.innerHTML = likeAmount;
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
};


window.customElements.define("like-button", LikeButton);