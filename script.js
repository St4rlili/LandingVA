// Redirección

const botonSecreto = document.getElementById('secreto');

if (botonSecreto) {
    botonSecreto.addEventListener('click', function() {
        window.location.href = 'index.html?startTour=true';
    });
}

// Configuración de sprites y pasos del tour

const sprites = {
    saludando: 'img/saludando.png',
    alegre: 'img/alegre.png',
    triste: 'img/triste.png',
    enfadada: 'img/enfadada.png',
};

const pasos = [
    {
        elemento: '#inicio',
        texto: '¡Bienvenido a VA-11 HALL-A! Encantada de conocerte soy Dorothy Haze y seré la encargada de hacer el tour por la web que Pedro ha diseñado inspirandose en mi bar favorito.',
        sprite: sprites.saludando
    },
    {
        elemento: '#inicio',
        texto: 'El porqué de un botón para hacer un tour en una página así y que además ya debes haber utilizado previamente para desbloquearlo es un misterio, así que mejor pregúntale a el.',
        sprite: sprites.enfadada
    },
    {
        elemento: '#bienvenida',
        texto: 'En Glitch City no hay ningún lugar dónde tomar un buen trago ¿verdad? Pues estás de suerte porque VA-11 HALL-A ofrece justo lo que buscas, un buen ambiente, servicio excelente y bebidas de todo tipo.',
        sprite: sprites.alegre
    },
    {
        elemento: '#bebidas',
        texto: 'Explora nuestra selección de bebidas más populares. Desde cócteles clásicos hasta creaciones exclusivas, tenemos algo para todos los gustos y la bartender es la mar de maja.',
        sprite: sprites.alegre
    },
    {
        elemento: '#contacto',
        texto: '¿Te gustaría alquilar nuestro espacio para un evento especial? Podemos contactar a través de este sencillo formulario.',
        sprite: sprites.alegre
    },
    {
        elemento: '#contacto',
        texto: 'Úsalo mucho, así podrás volver a ejecutar el tour y hablar conmigo de nuevo. Aunque técnicamente no estamos hablando y de hecho mis líneas ya están escritas, pero algo de compañía nunca está mal.',
        sprite: sprites.alegre
    },
    {
        elemento: '',
        texto: 'Bueno creo que eso ha sido todo, si a Pedro le apetece trabajar más conmigo nos volveremos a ver en sus próximos proyectos. Y en el caso contrario...',
        sprite: sprites.alegre
    },
    {
        elemento: '',
        texto: '...',
        sprite: sprites.enfadada
    },
    {
        elemento: '',
        texto: 'Gracias por visitar VA-11 HALL-A. Esperamos verte pronto para disfrutar de más momentos inolvidables.',
        sprite: sprites.saludando
    }
];

let pasoActual = 0;
let elementoResaltadoAnterior = null;

// Definimos contenedores de VN

const contenedor = document.getElementById('dorothy-vn-container');
const spriteBox = document.getElementById('dorothy-sprite');
const textBox = document.getElementById('vn-text-box');
const btnAvanzar = document.getElementById('vn-btn-avanzar');
const overlay = document.getElementById('custom-overlay');

// Función para VN

function ejecutarPaso() {

  // Si el paso actual es igual o mayor a la cantidad de pasos se termina

  if (pasoActual < pasos.length) {
    const datos = pasos[pasoActual];

    // Si se resalto algo con el overlay se quita

    if (elementoResaltadoAnterior) {
      elementoResaltadoAnterior.classList.remove('driver-highlighted-element');
    }

    // Si hay un contenedor de texto lo rellena con sus datos correspondientes

    if (textBox) textBox.innerText = datos.texto;

    // Si hay un contenedor para el sprite lo cambia al correspondiente

    if (spriteBox) {
        spriteBox.style.backgroundImage = `url('${datos.sprite}')`;
        spriteBox.innerText = ""; 
    }

    // Busca el elemento en la página que debe ser resaltado, lo resalta, hace scroll hasta ahí y lo guarda como elementeo resaltado anterior

    const target = document.querySelector(datos.elemento);
    if (target) {
      target.classList.add('driver-highlighted-element');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      elementoResaltadoAnterior = target;
    }

    // Si es el último paso cambia el texto del botón

    if (btnAvanzar) {
        if (pasoActual === pasos.length - 1) {
          btnAvanzar.innerText = "Cerrar x";
        } else {
          btnAvanzar.innerText = "Siguiente";
        }
    }
  } else {

    // Desactiva el contenedor y el overlay de VN

    if (contenedor) {
        contenedor.classList.remove('active');
    }
    if (overlay) {
        overlay.style.opacity = "0";
        setTimeout(() => { overlay.style.pointerEvents = "none"; }, 300);
    }

    if (elementoResaltadoAnterior) {
      elementoResaltadoAnterior.classList.remove('driver-highlighted-element');
    }
    pasoActual = 0;
  }
}

// Si se pulsa el botón lanza la función ejecutarPaso()

if (btnAvanzar) {
    btnAvanzar.addEventListener('click', () => {
      pasoActual++;
      ejecutarPaso();
    });
}

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Si recibe el parámetro startTour (se activa con el botón en la otra web a través de una redirección) empieza el tour desde 0.

  if (urlParams.get('startTour') === 'true') {
    pasoActual = 0;
    
    // Si existen el overlay y el contenedor se desactivan los clicks en el resto de la página (fuera del overlay y el contendor) se le baja la opacidad y le da la clase active al contenedor

    if (overlay && contenedor) {
      overlay.style.pointerEvents = "auto";
      overlay.style.opacity = "0.7";
      
      contenedor.classList.add('active');
      
      setTimeout(() => {
        ejecutarPaso();
      }, 400);
    }
  }
});
