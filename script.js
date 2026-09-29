// Formulario

const formulario = document.getElementById('form'); 

if (formulario) {
    formulario.addEventListener('submit', function() {
        const nombre = document.getElementById('name')?.value || '???';
        const email = document.getElementById('email')?.value || '???';

        sessionStorage.setItem('vn_nombre', nombre);
        sessionStorage.setItem('vn_email', email);
    });
}

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
      texto: '¡Bienvenido a VA-11 HALL-A! Encantada de conocerte soy Dorothy Haze y seré la encargada de hacer el tour por la web que Pedro ha diseñado inspirándose en mi bar favorito.',
      sprite: sprites.saludando
    },
    {
      elemento: '',
      texto: 'El porqué de un botón para hacer un tour en una página así y que además ya debes haber utilizado previamente para desbloquearlo es un misterio, así que mejor pregúntale a el.',
      sprite: sprites.enfadada
    },
    {
      elemento: '',
      texto: 'El nombre que has puesto en el formulario es algo raro... {{nombre}}... Vaya nombre más extraño, supongo que es uno de esos nombres que se han perdido con el tiempo...',
      sprite: sprites.alegre
    },
    {
      elemento: '',
      texto: 'No se puede decir lo mismo de "{{email}}", hahaha parece el correo de un adolescente sin vergüenza. ',
      sprite: sprites.alegre
    },
      {
      elemento: '',
      texto: 'En fin, a lo que vamos...',
      sprite: sprites.enfadada
    },
    {
      elemento: '#bienvenida',
      texto: 'En Glitch City no hay ningún lugar dónde tomar un buen trago ¿verdad? Pues estás de suerte porque VA-11 HALL-A ofrece justo lo que buscas, un buen ambiente, servicio excelente y bebidas de todo tipo.',
      sprite: sprites.alegre
    },
    {
      elemento: '#bebidas',
      texto: 'Explora nuestra selección de bebidas más populares. Desde cócteles clásicos hasta creaciones exclusivas, tenemos algo para todos los gustos y una bartender que es la mar de maja.',
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
      texto: 'Bueno creo que eso ha sido todo, si a Pedro le apetece trabajar más conmigo nos volveremos a ver en sus próximos proyectos. Y en caso contrario...',
      sprite: sprites.alegre
    },
    {
      elemento: '',
      texto: '...',
      sprite: sprites.enfadada
    },
    {
      elemento: '',
      texto: '¡No quiero que me deje tirada para siempre!',
      sprite: sprites.triste
    },
    {
      elemento: '',
      texto: 'En fin... Perdóname por eso.',
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
  
  if (urlParams.get('startTour') === 'true') {
    pasoActual = 0;
    
    // Recuperamos los datos que guardamos en la página del formulario

    const nombreUsuario = sessionStorage.getItem('vn_nombre') || '???';
    const emailUsuario = sessionStorage.getItem('vn_email') || '???';

    // Reemplazamos los placeholders {{nombre}} y {{email}} en los pasos
    pasos.forEach(paso => {
        paso.texto = paso.texto
            .replace('{{nombre}}', nombreUsuario)
            .replace('{{email}}', emailUsuario);
    });

    // Limpiamos la memoria para que quede vacío para la próxima vez

    sessionStorage.removeItem('vn_nombre');
    sessionStorage.removeItem('vn_email');

    if (overlay && contenedor) {
      overlay.style.pointerEvents = "auto";
      overlay.style.opacity = "0.7";
      contenedor.classList.add('active');
      setTimeout(() => { ejecutarPaso(); }, 400);
    }
  }
});