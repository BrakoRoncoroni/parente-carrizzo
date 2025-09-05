
        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                }
            });
        });

        // Scroll animations
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

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Form submission to WhatsApp
        document.getElementById('whatsappForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const tipoSeguro = document.getElementById('tipoSeguro').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Crear el mensaje para WhatsApp
            let whatsappMessage = `¡Hola! Me contacto desde tu sitio web.\n\n`;
            whatsappMessage += `*Mis datos:*\n`;
            whatsappMessage += `📝 Nombre: ${nombre}\n`;
            whatsappMessage += `📧 Email: ${email}\n`;
            if (telefono) {
                whatsappMessage += `📞 Teléfono: ${telefono}\n`;
            }
            whatsappMessage += `🛡️ Seguro de interés: ${tipoSeguro}\n`;
            if (mensaje) {
                whatsappMessage += `\n💬 Mensaje adicional:\n${mensaje}`;
            }
            whatsappMessage += `\n\n¡Espero tu respuesta!`;
            
            // Codificar el mensaje para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // REEMPLAZA [NUMERO_WHATSAPP] por tu número real (ej: 5491123456789)
            const whatsappURL = `https://wa.me/5491161504507?text=${encodedMessage}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Mostrar mensaje de confirmación y limpiar formulario
            alert('¡Perfecto! Se abrirá WhatsApp con tu mensaje preparado.');
            this.reset();
        });
