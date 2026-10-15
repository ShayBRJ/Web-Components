# Web-Components
Práctica 2 de Tecnologías Web: Cliente 

## Ejercicio 1
**Crear una página con un Web Component simple que permita verificar el ciclo de vida de una web component a través de la consola. En cada estado del web component mostrará un mensaje en consola cuando se active la función de callback pertinente: Creado, Adjuntado al DOM, Separado del DOM, cambio en los atributos.**

### Web Components
Los web components son un conjunto de estándares de la plataforma web que permiten crear etiquetas HTML personalizadas, reutilizables y con su funcionalidad y estilos encapsulados, sin depender de librerías o frameworks externos.

![Estructura Web Components](imgs/estandarWebComponent.png)

### Ciclo de vida de Web Components

Los WebComponent pasan por una serie de fases que se conocen como el ciclo de vida del WebComponent. 

Conociendo este ciclo y las fases que lo componen, es mucho más fácil predecir el funcionamiento de los WebComponents y trabajar con ellos.

![Ciclo de Vida Web Component](imgs/cicloVidaWebComponents.png)

Los métodos del ciclo de vida de un WebComponent que podemos escribir en una clase, serían los siguietes:

| Característica               | ¿Cuándo se ejecuta?                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `constructor()`              | Cuando se crea el custom element, y previamente ha sido definido en el registro.                                                                        |
| `connectedCallback()`        | Cuando el custom element se ha insertado en el documento HTML (DOM).                                                                                    |
| `disconnectedCallback()`     | Cuando el custom element se ha eliminado del documento HTML (DOM).                                                                                      |
| `adoptedCallback()`          | Cuando el custom element se ha movido a un nuevo documento (ej.: `iframes`).                                                                            |
| `attributeChangedCallback()` | Cuando se ha modificado un atributo observado del componente. [Ver atributos](https://lenguajejs.com/webcomponents/componentes/atributos-webcomponent/) |

### Aplicación del ciclo de vida en un Web Component

En nuestro caso, hemos creado un componente propio llamado `Error` para mostrar notificaciones de errores en la aplicación. Para desarrollarlo, hemos utilizado los distintos ciclos de vida de los Web Components, que nos permiten controlar qué ocurre en cada momento con el componente.

En el `constructor()`, inicializamos el componente y creamos su Shadow DOM, donde se encapsula su contenido.

Con `connectedCallback()`, detectamos cuándo se añade el componente al DOM y llamamos a `render()` para mostrar la notificación.

Por otro lado, `disconnectedCallback()` nos permite saber cuándo se elimina el componente del DOM, por si necesitamos realizar alguna tarea de limpieza.

Por último, utilizamos `attributeChangedCallback()` para detectar cambios en el atributo `error-id` y actualizar la notificación cuando sea necesario. Para ello, indicamos en `observedAttributes` que queremos observar dicho atributo.

Aclara cómo funciona \`Error\`Explica mejor \`observedAttributes\`


### Resultado del ejercicio

Finalmente, como resultado tenemos la siguiente página web que incorpora el Web Component insertado.

![Error Component](imgs/error.png)


## Ejercicio 2

**Sobre el ejemplo de WebComponents de especies autóctonas Canarias, explicado en clase, agregar un componente que actualice las valoraciones obtenidas por la especie. Cada valoración se obtiene cuando el usuario hace click en el botón like del panel donde se muestra la información extendida.**

### Web Components creados para la realización del ejercicio

LikeButton (like-button) es un componente interactivo que representa un botón de "me gusta" con forma de corazón. Usa Shadow DOM para encapsular su plantilla y estilos, y guarda internamente el estado del like (_liked) y la especie asociada (_especie). Al hacer clic en el corazón, alterna su estado, actualiza el contador y emite un evento like-update. Expone setters y getters como valoracion, especie y liked.

ScoreBox (score-box) es un componente más simple que muestra una puntuación numérica. También usa Shadow DOM, y observa el atributo score, de modo que cualquier cambio dispara attributeChangedCallback y actualiza el elemento .amount dentro de su Shadow DOM.

## Comunicación entre componentes

La comunicación se basa en dos vías: eventos hacia arriba y atributos o propiedades hacia abajo. LikeButton emite el CustomEvent like-update con detail (liked, likeAmount, especie), y lo hace con bubbles: true y composed: true para que pueda capturarse fuera del Shadow DOM.

EspecieCard se suscribe al evento like-update que emite el LikeButton para mantenerse sincronizada con él. Cuando lo recibe, comprueba que el id de la especie del evento coincide con el de su propia especie y, de ser así, actualiza su valoración y su estado liked con los datos recibidos en e.detail, para finalmente refrescar la puntuación mostrada en la tarjeta.

El componente contenedor (score-box) escucha ese evento, lee e.detail y propaga el nuevo valor al ScoreBox mediante setAttribute('score', ...). Así, ScoreBox reacciona al cambio de atributo y refresca su vista automáticamente.

De este modo, los componentes no se conocen entre sí: se comunican por eventos que suben y datos que bajan, manteniendo bajo acoplamiento.


![Comunicación entre Componentes](imgs/comunicacion1.png)

![Comunicación entre Componentes](imgs/comunicacion2.png)