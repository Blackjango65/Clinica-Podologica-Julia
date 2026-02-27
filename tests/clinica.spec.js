// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ============================================================
// CP-01: Carga inicial de la página
// ============================================================
test.describe('CP-01: Carga inicial de la página', () => {
    test('la página carga correctamente con status 200 y título correcto', async ({ page }) => {
        const response = await page.goto(BASE_URL);
        expect(response.status()).toBe(200);
        await expect(page).toHaveTitle('Clínica Podológica Sobrino | Cuida tus pasos, mejora tu vida');
        await expect(page.locator('body')).toBeVisible();
    });
});

// ============================================================
// CP-02: Meta tags y SEO básico
// ============================================================
test.describe('CP-02: Meta tags y SEO básico', () => {
    test('contiene meta tags esenciales', async ({ page }) => {
        await page.goto(BASE_URL);

        const charset = page.locator('meta[charset="UTF-8"]');
        await expect(charset).toHaveCount(1);

        const viewport = page.locator('meta[name="viewport"]');
        await expect(viewport).toHaveCount(1);

        const description = page.locator('meta[name="description"]');
        await expect(description).toHaveCount(1);
        const content = await description.getAttribute('content');
        expect(content).toContain('Clínica Podológica Sobrino');

        const googleVerification = page.locator('meta[name="google-site-verification"]');
        await expect(googleVerification).toHaveCount(1);
    });
});

// ============================================================
// CP-03: Navbar - Elementos visibles (Desktop)
// ============================================================
test.describe('CP-03: Navbar - Elementos visibles', () => {
    test('muestra logo y enlaces de navegación', async ({ page }) => {
        await page.goto(BASE_URL);

        await expect(page.locator('.nav-content .logo')).toBeVisible();
        await expect(page.locator('.nav-content .logo')).toContainText('Sobrino');

        await expect(page.locator('.nav-link', { hasText: 'Inicio' })).toBeVisible();
        await expect(page.locator('.nav-link', { hasText: 'Servicios' })).toBeVisible();
        await expect(page.locator('.nav-link', { hasText: 'Nosotros' })).toBeVisible();
        await expect(page.locator('.nav-link', { hasText: 'Opiniones' })).toBeVisible();
        await expect(page.locator('.open-modal', { hasText: 'Cita Previa' })).toBeVisible();
    });
});

// ============================================================
// CP-04: Navbar - Efecto scroll
// ============================================================
test.describe('CP-04: Navbar - Efecto scroll', () => {
    test('navbar obtiene clase scrolled al hacer scroll', async ({ page }) => {
        await page.goto(BASE_URL);

        const navbar = page.locator('#navbar');
        await expect(navbar).not.toHaveClass(/scrolled/);

        await page.evaluate(() => window.scrollTo(0, 200));
        await page.waitForTimeout(500);

        await expect(navbar).toHaveClass(/scrolled/);
    });
});

// ============================================================
// CP-05: Navbar - Navegación por secciones
// ============================================================
test.describe('CP-05: Navegación por secciones', () => {
    test('el enlace "Servicios" desplaza a la sección correcta', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('.nav-link', { hasText: 'Servicios' }).click();
        await page.waitForTimeout(1000);

        const isVisible = await page.locator('#servicios').isVisible();
        expect(isVisible).toBeTruthy();
    });

    test('el enlace "Nosotros" desplaza a la sección correcta', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('.nav-link', { hasText: 'Nosotros' }).click();
        await page.waitForTimeout(1000);

        const isVisible = await page.locator('#sobre-nosotros').isVisible();
        expect(isVisible).toBeTruthy();
    });

    test('el enlace "Opiniones" desplaza a la sección correcta', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('.nav-link', { hasText: 'Opiniones' }).click();
        await page.waitForTimeout(1000);

        const isVisible = await page.locator('#testimonios').isVisible();
        expect(isVisible).toBeTruthy();
    });
});

// ============================================================
// CP-06: Menú Hamburguesa (Móvil)
// ============================================================
test.describe('CP-06: Menú hamburguesa móvil', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('el menú hamburguesa abre y cierra el menú', async ({ page }) => {
        await page.goto(BASE_URL);

        // Ocultar theme-switcher que puede interceptar clicks en móvil
        await page.evaluate(() => {
            const switcher = document.querySelector('.theme-switcher');
            if (switcher) switcher.style.display = 'none';
        });

        const menuToggle = page.locator('#menu-toggle');
        await expect(menuToggle).toBeVisible();

        const navLinks = page.locator('.nav-links');

        // Abrir menú
        await menuToggle.click();
        await expect(navLinks).toHaveClass(/mobile-active/);

        // Cerrar menú
        await menuToggle.click();
        await expect(navLinks).not.toHaveClass(/mobile-active/);
    });
});

// ============================================================
// CP-07: Hero Section - Contenido
// ============================================================
test.describe('CP-07: Hero Section - Contenido', () => {
    test('muestra el contenido principal del hero', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForSelector('.hero-label');

        // Verificar contenido textual
        await expect(page.locator('.hero-label')).toHaveText(/Especialistas en Salud del Pie/i);
        await expect(page.locator('.hero-title')).toContainText('Clínica Podológica Sobrino');
        await expect(page.locator('.gradient-text')).toContainText('Cuida tus pasos');
        await expect(page.locator('.badge-text')).toContainText('domicilio');
        await expect(page.locator('.hero-ctas .btn-primary.open-modal')).toContainText('Reservar Cita Online');
        await expect(page.locator('.hero-ctas .btn-secondary')).toContainText('Ver Tratamientos');
    });
});

// ============================================================
// CP-08: Hero Section - Contadores animados
// ============================================================
test.describe('CP-08: Contadores animados', () => {
    test('los contadores llegan a su valor objetivo', async ({ page }) => {
        await page.goto(BASE_URL);

        // Scroll a la sección de stats para activar IntersectionObserver
        await page.locator('.hero-stats').scrollIntoViewIfNeeded();

        // Esperar a que los contadores alcancen sus valores finales
        await expect(page.locator('.stat-number[data-target="5"]')).toHaveText('5', { timeout: 15000 });
        await expect(page.locator('.stat-number[data-target="5000"]')).toHaveText('5000', { timeout: 15000 });
        await expect(page.locator('.stat-number[data-target="100"]')).toHaveText('100', { timeout: 15000 });
    });
});

// ============================================================
// CP-09: Theme Switcher
// ============================================================
test.describe('CP-09: Theme Switcher', () => {
    test('cambiar el tema al hacer click en un dot', async ({ page }) => {
        await page.goto(BASE_URL);

        // Click en el dot verde (#22c55e)
        const greenDot = page.locator('.theme-dot[data-color="#22c55e"]');
        await greenDot.click();

        await expect(greenDot).toHaveClass(/active/);

        // Verificar que el color primario cambió
        const primaryColor = await page.evaluate(() =>
            getComputedStyle(document.documentElement).getPropertyValue('--primary-500').trim()
        );
        expect(primaryColor).toBe('#22c55e');

        // El dot azul ya no está activo
        const blueDot = page.locator('.theme-dot[data-color="#3b82f6"]');
        await expect(blueDot).not.toHaveClass(/active/);
    });

    test('cambiar a cada color disponible', async ({ page }) => {
        await page.goto(BASE_URL);

        const colors = ['#22c55e', '#f43f5e', '#eab308', '#8b5cf6', '#3b82f6'];
        for (const color of colors) {
            const dot = page.locator(`.theme-dot[data-color="${color}"]`);
            await dot.click();
            await expect(dot).toHaveClass(/active/);
        }
    });
});

// ============================================================
// CP-10: Social Proof - Aseguradoras
// ============================================================
test.describe('CP-10: Partners y Convenios', () => {
    test('muestra aseguradoras y convenios', async ({ page }) => {
        await page.goto(BASE_URL);

        await expect(page.locator('.social-proof')).toContainText('Colaboramos con las mejores aseguradoras');

        const partners = ['Caser', 'Catalana Occidente', 'Divina Pastora', 'Nueva Mutua Sanitaria', 'Santalucía'];
        for (const partner of partners) {
            await expect(page.locator('.partner-name', { hasText: partner }).first()).toBeVisible();
        }

        const convenios = ['MUGEJU', 'MUFACE', 'ISFAS'];
        for (const c of convenios) {
            await expect(page.locator('.partner-name', { hasText: c })).toBeVisible();
        }
    });
});

// ============================================================
// CP-11: Servicios - Tarjetas visibles
// ============================================================
test.describe('CP-11: Servicios - Tarjetas', () => {
    test('muestra las 7 tarjetas de servicios', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('#servicios').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const cards = page.locator('.service-card-flip');
        await expect(cards).toHaveCount(7);

        const expectedTitles = [
            'Quiropodología',
            'Estudio Biomecánico',
            'Podología Deportiva',
            'Cirugía Ungueal',
            'Podología Infantil',
            'Plantillas Ortopédicas',
            'Atención a Domicilio',
        ];
        for (const title of expectedTitles) {
            await expect(page.locator('.service-title-front', { hasText: title })).toHaveCount(1);
        }
    });
});

// ============================================================
// CP-12: Servicios - Flip de tarjetas (hover)
// ============================================================
test.describe('CP-12: Servicios - Flip en hover', () => {
    test('la tarjeta rota al hacer hover mostrando la descripción', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('#servicios').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const firstCard = page.locator('.service-card-flip').first();
        await firstCard.hover();
        await page.waitForTimeout(600);

        // Verificar que el back de la primera tarjeta contiene texto de descripción
        const backText = await firstCard.locator('.service-card-back .service-description').textContent();
        expect(backText.length).toBeGreaterThan(10);
    });
});

// ============================================================
// CP-13: Sección Nosotros
// ============================================================
test.describe('CP-13: Sección Nosotros', () => {
    test('muestra información de la doctora y la clínica', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('#sobre-nosotros').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        await expect(page.locator('.about .section-title')).toContainText('Pasión por la salud podológica');
        await expect(page.locator('.badge-title')).toContainText('Dra. Julia Aparicio');
        await expect(page.locator('.badge-subtitle')).toContainText('838-100-503');

        const features = page.locator('.about-feat-item');
        await expect(features).toHaveCount(4);
    });
});

// ============================================================
// CP-14: Testimonios
// ============================================================
test.describe('CP-14: Testimonios', () => {
    test('muestra 3 tarjetas de testimonios con nombres correctos', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('#testimonios').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        await expect(page.locator('.testimonials .section-title')).toContainText('Lo que dicen nuestros pacientes');

        const cards = page.locator('.testimonial-card');
        await expect(cards).toHaveCount(3);

        await expect(page.locator('.user-name', { hasText: 'Carlos Sánchez' })).toBeVisible();
        await expect(page.locator('.user-name', { hasText: 'Elena Martínez' })).toBeVisible();
        await expect(page.locator('.user-name', { hasText: 'Ricardo Gómez' })).toBeVisible();

        // Cada testimonio tiene 5 estrellas
        const starContainers = page.locator('.testimonial-card .stars');
        const count = await starContainers.count();
        for (let i = 0; i < count; i++) {
            const stars = starContainers.nth(i).locator('.fa-star');
            await expect(stars).toHaveCount(5);
        }
    });
});

// ============================================================
// CP-15: CTA Banner
// ============================================================
test.describe('CP-15: CTA Banner', () => {
    test('muestra el CTA final con botón de reserva', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('.cta-banner').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        await expect(page.locator('.cta-title')).toContainText('¿Sientes molestias al caminar?');
        await expect(page.locator('.cta-banner .btn-primary')).toContainText('Reservar Mi Cita Ahora');
    });
});

// ============================================================
// CP-16: Footer - Contenido
// ============================================================
test.describe('CP-16: Footer', () => {
    test('muestra información de contacto y enlaces', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('.footer').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        await expect(page.locator('.footer')).toContainText('Av. Virgen de la Montaña');
        await expect(page.locator('.footer')).toContainText('10002 Cáceres');
        await expect(page.locator('.footer')).toContainText('+34 679 86 29 54');
        await expect(page.locator('.footer')).toContainText('9:30-13:30');

        // Links de servicios
        await expect(page.locator('.footer-links li')).toHaveCount(6);

        // Redes sociales
        await expect(page.locator('.social-links a')).toHaveCount(3);

        // Copyright
        await expect(page.locator('.footer-bottom')).toContainText('2024 Clínica Podológica Sobrino');
    });
});

// ============================================================
// CP-17: Modal de Cita - Apertura y cierre
// ============================================================
test.describe('CP-17: Modal de Cita', () => {
    test('se abre con "Cita Previa" y se cierra con ×', async ({ page }) => {
        await page.goto(BASE_URL);

        const modal = page.locator('#appointment-modal');

        // Abrir desde el navbar
        await page.locator('.nav-links .open-modal', { hasText: 'Cita Previa' }).click();
        await expect(modal).toHaveClass(/active/);
        await expect(modal).toContainText('679 86 29 54');

        // Cerrar con botón ×
        await page.locator('#close-modal').click();
        await expect(modal).not.toHaveClass(/active/);
    });

    test('se abre con "Reservar Cita Online" del hero', async ({ page }) => {
        await page.goto(BASE_URL);

        const modal = page.locator('#appointment-modal');

        await page.locator('.hero .btn-primary.open-modal').click();
        await expect(modal).toHaveClass(/active/);
    });

    test('se cierra al hacer click fuera del contenido', async ({ page }) => {
        await page.goto(BASE_URL);

        const modal = page.locator('#appointment-modal');

        await page.locator('.hero .btn-primary.open-modal').click();
        await expect(modal).toHaveClass(/active/);

        // Click en el overlay (fuera del contenido del modal)
        await modal.click({ position: { x: 10, y: 10 } });
        await expect(modal).not.toHaveClass(/active/);
    });
});

// ============================================================
// CP-18: Modal de Cita - Enlace telefónico
// ============================================================
test.describe('CP-18: Enlace telefónico', () => {
    test('el enlace de teléfono tiene href correcto', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('.hero .btn-primary.open-modal').click();

        const phoneLink = page.locator('.phone-number-link');
        await expect(phoneLink).toHaveAttribute('href', 'tel:+34679862954');
    });
});

// ============================================================
// CP-19: Chatbot - Abrir y cerrar
// ============================================================
test.describe('CP-19: Chatbot - Abrir y cerrar', () => {
    test('el chatbot se abre y cierra correctamente', async ({ page }) => {
        await page.goto(BASE_URL);

        const chatWindow = page.locator('#chatbot-window');
        const chatToggle = page.locator('#chatbot-toggle');

        // Abrir
        await chatToggle.click();
        await expect(chatWindow).toHaveClass(/active/);

        // Verifica mensaje de bienvenida
        await expect(page.locator('#chatbot-messages .message.agent').first()).toContainText('asistente virtual');

        // Cerrar
        await chatToggle.click();
        await expect(chatWindow).not.toHaveClass(/active/);
    });
});

// ============================================================
// CP-20: Chatbot - Respuesta a saludo
// ============================================================
test.describe('CP-20: Chatbot - Saludo', () => {
    test('el chatbot responde a "hola"', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.locator('#chatbot-toggle').click();
        await page.locator('#chatbot-input').fill('hola');
        await page.locator('.chatbot-send').click();
        await page.waitForTimeout(1500);

        const messages = page.locator('#chatbot-messages .message.agent');
        const lastMessage = messages.last();
        await expect(lastMessage).toContainText('asistente');
    });
});

// ============================================================
// CP-21: Chatbot - Consulta de horarios
// ============================================================
test.describe('CP-21: Chatbot - Horarios', () => {
    test('el chatbot responde con horarios', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.locator('#chatbot-toggle').click();
        await page.locator('#chatbot-input').fill('¿Cuál es el horario?');
        await page.locator('.chatbot-send').click();
        await page.waitForTimeout(1500);

        const lastMessage = page.locator('#chatbot-messages .message.agent').last();
        await expect(lastMessage).toContainText('9:30');
    });
});

// ============================================================
// CP-22: Chatbot - Consulta de ubicación
// ============================================================
test.describe('CP-22: Chatbot - Ubicación', () => {
    test('el chatbot responde con la dirección', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.locator('#chatbot-toggle').click();
        await page.locator('#chatbot-input').fill('¿Dónde estáis?');
        await page.locator('.chatbot-send').click();
        await page.waitForTimeout(1500);

        const lastMessage = page.locator('#chatbot-messages .message.agent').last();
        await expect(lastMessage).toContainText('Virgen de la Montaña');
    });
});

// ============================================================
// CP-23: Chatbot - Consulta de servicios
// ============================================================
test.describe('CP-23: Chatbot - Servicios', () => {
    test('el chatbot lista los servicios', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.locator('#chatbot-toggle').click();
        await page.locator('#chatbot-input').fill('¿Qué servicios ofrecéis?');
        await page.locator('.chatbot-send').click();
        await page.waitForTimeout(1500);

        const lastMessage = page.locator('#chatbot-messages .message.agent').last();
        await expect(lastMessage).toContainText('Quiropodología');
    });
});

// ============================================================
// CP-24: Chatbot - Consulta de precios
// ============================================================
test.describe('CP-24: Chatbot - Precios', () => {
    test('el chatbot responde con el precio', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.locator('#chatbot-toggle').click();
        await page.locator('#chatbot-input').fill('precio consulta');
        await page.locator('.chatbot-send').click();
        await page.waitForTimeout(1500);

        const lastMessage = page.locator('#chatbot-messages .message.agent').last();
        await expect(lastMessage).toContainText('35');
    });
});

// ============================================================
// CP-25: Chatbot - Consulta de seguros
// ============================================================
test.describe('CP-25: Chatbot - Seguros', () => {
    test('el chatbot responde sobre aseguradoras', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.locator('#chatbot-toggle').click();
        await page.locator('#chatbot-input').fill('¿Aceptáis seguro médico?');
        await page.locator('.chatbot-send').click();
        await page.waitForTimeout(1500);

        const lastMessage = page.locator('#chatbot-messages .message.agent').last();
        await expect(lastMessage).toContainText('Caser');
    });
});

// ============================================================
// CP-26: Chatbot - Servicios a domicilio
// ============================================================
test.describe('CP-26: Chatbot - Domicilio', () => {
    test('el chatbot responde sobre servicios a domicilio', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.locator('#chatbot-toggle').click();
        await page.locator('#chatbot-input').fill('¿Venís a domicilio?');
        await page.locator('.chatbot-send').click();
        await page.waitForTimeout(1500);

        const lastMessage = page.locator('#chatbot-messages .message.agent').last();
        await expect(lastMessage).toContainText('domicilio');
    });
});

// ============================================================
// CP-27: Estrellas y partículas
// ============================================================
test.describe('CP-27: Background - Estrellas y partículas', () => {
    test('se generan estrellas y partículas en el fondo', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForTimeout(1000);

        const starCount = await page.locator('#stars-container .star').count();
        expect(starCount).toBeGreaterThan(0);

        const particleCount = await page.locator('#particles-container .particle').count();
        expect(particleCount).toBeGreaterThan(0);
    });
});

// ============================================================
// CP-28: Responsive - Servicios en móvil
// ============================================================
test.describe('CP-28: Responsive - Móvil', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('las tarjetas de servicios son visibles en móvil', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.locator('#servicios').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const cards = page.locator('.service-card-flip');
        await expect(cards).toHaveCount(7);

        // Verificar que al menos la primera tarjeta es visible
        await expect(cards.first()).toBeVisible();
    });
});

// ============================================================
// CP-29: Accesibilidad - Imágenes con alt text
// ============================================================
test.describe('CP-29: Accesibilidad - Alt text', () => {
    test('todas las imágenes tienen atributo alt', async ({ page }) => {
        await page.goto(BASE_URL);

        const images = page.locator('img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            const alt = await images.nth(i).getAttribute('alt');
            expect(alt, `Imagen ${i + 1} no tiene alt text`).toBeTruthy();
        }
    });
});

// ============================================================
// CP-30: Rendimiento - Carga rápida
// ============================================================
test.describe('CP-30: Rendimiento', () => {
    test('la página carga en menos de 5 segundos', async ({ page }) => {
        const startTime = Date.now();
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
        const loadTime = Date.now() - startTime;

        expect(loadTime).toBeLessThan(5000);
        console.log(`Tiempo de carga (DOMContentLoaded): ${loadTime}ms`);
    });
});
