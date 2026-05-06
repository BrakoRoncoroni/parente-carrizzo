
const CONFIG = {
    whatsappNumber: '5491144141491'
};

// ===========================================
// MENÚ MÓVIL
// ===========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ===========================================
// NAVEGACIÓN SUAVE
// ===========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Cerrar menú móvil si está abierto
                const navLinks = document.getElementById('navLinks');
                navLinks.classList.remove('active');
            }
        });
    });
}

// ===========================================
// ANIMACIONES AL SCROLL
// ===========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// ===========================================
// EFECTO HEADER AL SCROLL
// ===========================================
function initHeaderEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// ===========================================
// FORMULARIO WHATSAPP
// ===========================================
function createWhatsAppMessage(formData) {
    let message = `¡Hola! Me contacto desde tu sitio web.\n\n`;
    message += `*Mis datos:*\n`;
    message += `📝 Nombre: ${formData.nombre}\n`;
    message += `📧 Email: ${formData.email}\n`;
    
    if (formData.telefono) {
        message += `📞 Teléfono: ${formData.telefono}\n`;
    }
    
    message += `🛡️ Seguro de interés: ${formData.tipoSeguro}\n`;
    
    if (formData.mensaje) {
        message += `\n💬 Mensaje adicional:\n${formData.mensaje}`;
    }
    
    message += `\n\n¡Espero tu respuesta!`;
    
    return message;
}

function initWhatsAppForm() {
    const form = document.getElementById('whatsappForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            tipoSeguro: document.getElementById('tipoSeguro').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        // Crear el mensaje para WhatsApp
        const whatsappMessage = createWhatsAppMessage(formData);
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Crear URL de WhatsApp
        const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');

        form.reset();
    });
}

// ===========================================
// INICIALIZACIÓN
// ===========================================
function initWebsite() {
    // Verificar que el DOM esté cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWebsite);
        return;
    }
    
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderEffect();
    initWhatsAppForm();
    
    console.log('✅ Sitio web inicializado correctamente');
}

// Inicializar el sitio web
initWebsite();