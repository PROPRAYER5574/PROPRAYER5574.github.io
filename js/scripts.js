// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los enlaces de navegación
    const navLinks = document.querySelectorAll('nav ul li a');

    // Agrega un evento de clic a cada enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Previene el comportamiento predeterminado del enlace (navegar a la sección)
            event.preventDefault();
            // Elimina la clase 'active' de todos los enlaces de navegación
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Agrega la clase 'active' al enlace que fue clicado
            this.classList.add('active');
            // Obtiene el ID de la sección objetivo del atributo 'href' del enlace
            const targetId = this.getAttribute('href').substring(1);
            // Selecciona la sección objetivo por su ID
            const targetSection = document.getElementById(targetId);
            // Desplaza suavemente la ventana hasta la sección objetivo
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});

// Función para mostrar u ocultar una sección
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// Función para validar el formulario de contacto
function validateForm(event) {
    event.preventDefault(); // Previene el envío tradicional del formulario

    // Obtiene los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Verifica si algún campo está vacío
    if (name === '' || email === '' || message === '') {
        // Muestra una alerta si algún campo está vacío
        alert('Por favor, completa todos los campos.');
        return false;
    }

    // Enviar los datos del formulario al servidor
    fetch('http://localhost:5500/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => {
        alert('Formulario enviado correctamente.');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario.');
    });

    return false; // Evita que el formulario se envíe de la manera tradicional
}

// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el contenedor principal del contenido
    let content = document.getElementById('content');

    // Agrega un evento de desplazamiento a la ventana
    window.addEventListener('scroll', function() {
        // Verifica si el usuario ha llegado al final de la página
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // Carga más contenido si el usuario ha llegado al final de la página
            loadMoreContent();
        }
    });

    // Función para cargar más contenido dinámicamente
    function loadMoreContent() {
        // Crea y agrega 5 nuevas secciones al contenedor principal
        for (let i = 0; i < 5; i++) {
            let newSection = document.createElement('div');
            newSection.className = 'section';
            newSection.innerHTML = `
                <h2>Sección Adicional</h2>
                <p>Esta es una sección adicional cargada dinámicamente.</p>
            `;
            content.appendChild(newSection);
        }
    }
});