let slideIndex = 0;
const slides = document.getElementsByClassName("mySlides");
let slideInterval;

// Función para mostrar las diapositivas
function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].style.opacity = 0;
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].classList.add("active");
    slides[slideIndex - 1].style.opacity = 1;
    slideInterval = setTimeout(showSlides, 3000);
}

// Función para cambiar la diapositiva
function changeSlide(n) {
    clearTimeout(slideInterval);
    slideIndex += n - 1; // Ajustamos el índice antes de llamar a showSlides
    if (slideIndex >= slides.length) { slideIndex = 0 }
    if (slideIndex < 0) { slideIndex = slides.length - 1 }
    showSlides();
}

// Función para traducir la página
function translatePage() {
    var selectedLanguage = document.getElementById('languageSelect').value;
    localStorage.setItem('selectedLanguage', selectedLanguage); // Guarda el idioma seleccionado en localStorage

    var elementsToTranslate = document.querySelectorAll('[data-translate-key]');

    elementsToTranslate.forEach(function(element) {
        var key = element.getAttribute('data-translate-key');
        if (translations[selectedLanguage] && translations[selectedLanguage][key]) {
            element.innerHTML = translations[selectedLanguage][key];
        }
    });
}

// Función para cargar el idioma al iniciar la página
function loadLanguage() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'es'; // Obtiene el idioma guardado o usa 'es' por defecto
    document.getElementById('languageSelect').value = selectedLanguage;
    translatePage();
}

// Función para manejar las animaciones al cargar la página
function animateOnLoad() {
    const header = document.querySelector('header');
    const introSection = document.querySelector('#intro');

    header.classList.add('visible');
    introSection.classList.add('visible');
}

// Función para manejar las animaciones al hacer scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animated');
    
    elements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    });
}

// Función para verificar si un elemento está en la pantalla
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para manejar todo lo que debe ocurrir al cargar la página
function onPageLoad() {
    animateOnLoad(); // Animar el header y el primer section al cargar la página
    handleScrollAnimations(); // Verificar animaciones al hacer scroll
    loadLanguage(); // Cargar el idioma
    showSlides(); // Iniciar slideshow de imágenes
}

// Listener para detectar el desplazamiento y activar las animaciones
document.addEventListener('scroll', handleScrollAnimations);

// Llama a onPageLoad() para cargar la página inicialmente
window.onload = onPageLoad;
