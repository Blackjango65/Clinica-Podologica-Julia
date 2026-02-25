document.addEventListener('DOMContentLoaded', () => {
    // 1. Star & Particle System
    const createStars = () => {
        const container = document.getElementById('stars-container');
        const starCount = 150;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Random size 1-3px
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Random position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';

            // Random animation delay and duration
            const delay = Math.random() * 10;
            const duration = 3 + Math.random() * 5;
            const maxOpacity = 0.2 + Math.random() * 0.6;

            star.style.setProperty('--duration', `${duration}s`);
            star.style.setProperty('--max-opacity', maxOpacity);
            star.style.animationDelay = `${delay}s`;

            container.appendChild(star);
        }
    };

    const createParticles = () => {
        const container = document.getElementById('particles-container');
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random size 2-6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random horizontal position
            particle.style.left = Math.random() * 100 + '%';

            // Random animation params
            const delay = Math.random() * 20;
            const duration = 10 + Math.random() * 20;
            const drift = (Math.random() - 0.5) * 200 + 'px'; // -100px to 100px drift

            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--drift', drift);
            particle.style.animationDelay = `${-delay}s`; // Negative delay to start mid-animation

            container.appendChild(particle);
        }
    };

    createStars();
    createParticles();

    // 2. Theme Switching Logic
    const themeDots = document.querySelectorAll('.theme-dot');

    // Function to darken or lighten a color (simplified)
    const adjustColor = (hex, amount) => {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        r = Math.max(0, Math.min(255, r + amount));
        g = Math.max(0, Math.min(255, g + amount));
        b = Math.max(0, Math.min(255, b + amount));

        const toHex = (n) => n.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const setTheme = (color) => {
        const root = document.documentElement;

        // Helper to convert hex to RGB
        const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `${r}, ${g}, ${b}`;
        };

        // Update main primary colors
        root.style.setProperty('--primary-500', color);
        root.style.setProperty('--primary-rgb', hexToRgb(color));
        root.style.setProperty('--primary-400', adjustColor(color, 40));
        root.style.setProperty('--primary-300', adjustColor(color, 80));
        root.style.setProperty('--primary-600', adjustColor(color, -40));
        root.style.setProperty('--primary-700', adjustColor(color, -80));
        root.style.setProperty('--primary-100', adjustColor(color, 150));
        root.style.setProperty('--success', color);

        // Update active class on dots
        themeDots.forEach(dot => {
            if (dot.dataset.color === color) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const color = dot.dataset.color;
            setTheme(color);
        });
    });


    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active spy
        spyLinks();
    });

    // 3. Section Spy for Navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const spyLinks = () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    // 4. Counters Animation
    const animateCounters = () => {
        const stats = document.querySelectorAll('.stat-number');
        const speed = 200;

        stats.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // Trigger counters when in view
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) counterObserver.observe(statsSection);

    // 5. Intersection Observer for Reveals
    const revealElements = document.querySelectorAll('.service-card-flip, .testimonial-card, .about-content');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        revealObserver.observe(el);
    });

    // Function to add visible class styles
    const addRevealStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };
    addRevealStyles();

    // 6. Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-active');
        });
    }

    // 7. Smooth Scroll
    document.querySelectorAll('a[href^="#"]:not(.open-modal)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 8. Appointment Modal Logic
    const modal = document.getElementById('appointment-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const appointmentForm = document.getElementById('appointment-form');

    const openModal = (e) => {
        if (e) e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData.entries());
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = '¡Enviado con éxito!';
            submitBtn.style.background = 'var(--success)';

            setTimeout(() => {
                closeModal();
                appointmentForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
            }, 2000);
        });
    }

    // 9. Chatbot Logic
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const voiceBtn = document.getElementById('chatbot-voice');
    const muteBtn = document.getElementById('chatbot-mute');
    let isMuted = false;

    const speak = (text) => {
        if (!isMuted && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            window.speechSynthesis.speak(utterance);
        }
    };

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            muteBtn.classList.toggle('muted', isMuted);
            const icon = muteBtn.querySelector('i');
            if (isMuted) {
                icon.className = 'fas fa-volume-mute';
                muteBtn.title = "Activar sonido";
                window.speechSynthesis.cancel(); // Stop current speech
            } else {
                icon.className = 'fas fa-volume-up';
                muteBtn.title = "Silenciar";
            }
        });
    }

    let recognition;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';

        recognition.onstart = () => {
            voiceBtn.classList.add('listening');
            chatbotInput.placeholder = "Escuchando...";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatbotInput.value = transcript;
            voiceBtn.classList.remove('listening');
            chatbotForm.dispatchEvent(new Event('submit'));
        };

        recognition.onerror = () => voiceBtn.classList.remove('listening');
        recognition.onend = () => voiceBtn.classList.remove('listening');
    }

    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            if (recognition) {
                if (voiceBtn.classList.contains('listening')) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            }
        });
    }

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
            if (chatbotWindow.classList.contains('active')) chatbotInput.focus();
        });
    }

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerText = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const searchWikipedia = async (query) => {
        const cleanQuery = query.toLowerCase()
            .replace(/¿|\?|qué es |quién es |define |que son |que es |busca |sobre |dime |cuéntame |háblame /g, "")
            .trim();
        if (cleanQuery.length < 3) return null;
        try {
            const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&format=json&origin=*`;
            const res = await fetch(searchUrl);
            const data = await res.json();
            if (data.query?.search?.length > 0) {
                const title = data.query.search[0].title;
                const sumRes = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`);
                if (sumRes.ok) {
                    const sumData = await sumRes.json();
                    return sumData.extract;
                }
            }
        } catch (e) { console.error("Error Wikipedia:", e); }
        return null;
    };

    const getAgentResponse = async (userInput) => {
        const input = userInput.toLowerCase().trim();

        // 1. SALUDOS
        const greetings = ['hola', 'buenos dias', 'buenos días', 'buenas tardes', 'buenas noches', 'buenas'];
        if (greetings.some(g => input === g || input.startsWith(g + ' '))) {
            return "¡Hola! 👋 Soy el asistente de Clínica Sobrino. ¿Quieres saber sobre nuestros servicios, horarios o cómo pedir una cita?";
        }

        // 2. CONTACTO / UBICACIÓN / HORARIO
        if (input.includes('donde') || input.includes('dónde') || input.includes('ubicacion') || input.includes('dirección') || input.includes('direccion')) {
            return "Estamos en **Av. Virgen de la Montaña, Nº 19, Bajo, en Cáceres**. ¡Estaremos encantados de recibirte!";
        }
        if (input.includes('telefono') || input.includes('teléfono') || input.includes('contacto') || input.includes('llamar')) {
            return "Puedes llamarnos al **+34 679 86 29 54**.";
        }
        if (input.includes('horario') || input.includes('abierto') || input.includes('abren')) {
            return "Nuestro horario es de **Lunes a Viernes de 9:00 a 20:00**.";
        }

        // 3. CITAS Y PRECIOS
        if (input.includes('cita') || input.includes('reserva')) {
            return "Para concertar una cita, puedes llamarnos directamente al **+34 679 86 29 54** o pulsar el botón **'Cita Previa'** arriba a la derecha para reservar online.";
        }
        if (input.includes('precio') || input.includes('cuanto cuesta') || input.includes('vale')) {
            return "La quiropodología general cuesta **35€**. Para otros tratamientos, te daremos presupuesto tras valorarte.";
        }

        // 4. SERVICIOS (Prioridad Local)
        const servicesCards = Array.from(document.querySelectorAll('.service-card-back'));

        // Si pregunta específicamente por uno
        for (let s of servicesCards) {
            const title = s.querySelector('h3').innerText.toLowerCase();
            if (input.includes(title)) {
                return `Sobre **${title.toUpperCase()}**: ${s.querySelector('p').innerText}`;
            }
        }

        // Si pregunta por servicios en general
        if (input.includes('servicio') || input.includes('tratamiento') || input.includes('haces') || input.includes('ofrece')) {
            let response = "En Clínica Sobrino ofrecemos los siguientes tratamientos avanzados:\n\n";
            servicesCards.forEach(s => {
                const title = s.querySelector('h3').innerText;
                const desc = s.querySelector('p').innerText;
                response += `• **${title}**: ${desc}\n`;
            });
            response += "\n¿Te gustaría saber más sobre alguno en concreto?";
            return response;
        }

        // 5. MÉDICO (Wikipedia) - MUY SELECTIVO
        const medical = ['fascitis', 'juanete', 'hongo', 'uña', 'papiloma', 'verruga', 'heloma', 'callo'];
        if (medical.some(m => input.includes(m))) {
            const wiki = await searchWikipedia(input);
            if (wiki) return `Dato médico externo: ${wiki} \n\nRecuerda pedir cita con la Dra. Julia para un diagnóstico real.`;
        }

        return "Lo siento, no tengo esa información exacta. ¿Quieres que hablemos de nuestros servicios, horarios o citas?";
    };

    if (chatbotForm) {
        chatbotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                chatbotInput.value = '';
                typingIndicator.style.display = 'block';

                const response = await getAgentResponse(message);

                typingIndicator.style.display = 'none';
                addMessage(response, 'agent');
                speak(response);
            }
        });
    }
});
