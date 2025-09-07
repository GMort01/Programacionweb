// Objeto que define las rutas y los archivos de vista correspondientes
const routes = {
    '/': '/Principal/Views/home.html',
    '/about': '/Principal/Views/about.html',
    '/contact': '/Principal/Views/contact.html',
    '/services': '/Principal/Views/services.html'
};

// Función para cargar el contenido del archivo de vista
const loadContent = async (path) => {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Error al cargar la página: ${response.statusText}`);
        }
        return response.text();
    } catch (error) {
        console.error(error);
        return '<h1>Error 404: Página no encontrada</h1>';
    }
};

// Función principal del router que maneja la navegación
const handleRouting = async () => {
    const path = window.location.pathname;
    const pagePath = routes[path] || routes['/'];
    const content = await loadContent(pagePath);
    document.querySelector('.section').innerHTML = content;
};

// Maneja los clics en los enlaces de la navegación
document.querySelector('.nav').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        history.pushState({}, '', href);
        handleRouting();
    }
});

// Escuchamos los eventos para que el router funcione al cargar la página y al usar el botón de retroceso del navegador
window.addEventListener('popstate', handleRouting);
document.addEventListener('DOMContentLoaded', handleRouting);