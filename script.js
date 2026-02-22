document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle System
    const createParticles = () => {
        const container = document.getElementById('particles-container');
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay and duration
            const delay = Math.random() * 20;
            const duration = 15 + Math.random() * 10;
            
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            container.appendChild(particle);
        }
    };

    createParticles();

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
            if(entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if(statsSection) counterObserver.observe(statsSection);

    // 5. Intersection Observer for Reveals
    const revealElements = document.querySelectorAll('.service-card-flip, .testimonial-card, .about-content');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: trigger specific animations here
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

    // 6. Mobile Menu (Basic implementation)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-active');
            // Style for mobile-active would go in CSS if needed more complexly
        });
    }

    // 7. Smooth Scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
